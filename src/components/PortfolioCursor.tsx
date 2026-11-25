import { useEffect } from "react";
import { customCursorStyle, disposeCursor, initCursor, resetCursor, updateConfig, updateCursor } from "ipad-cursor";
import type { IpadCursorStyle } from "ipad-cursor";
import { useMotionPreference } from "./MotionSystem";

const controls = "a[href], button, input, [role='button']";
const media = ".portrait-play, .carousel-thumb, .research-figure a, .project-play-cover, video, .ld-hits polygon";
const freeControls = media + ", .motion-accordion button, .email-link, .preview-open, .hero-bottom a, .skip-link, .pause-toggle, .research-note, input";
const fittedShapes = ".skills-content .tags > span, .project-play-stamp, .portrait-play-icon";
const primary = ".button, .contact-pill, .delta-contact-pill, .showcase-primary";
const normal: IpadCursorStyle = {
  width: 14, height: 14, radius: "50%", background: "#eb883caa",
  border: "1.5px solid #57351e", backdropBlur: 0, backdropSaturate: "135%",
  durationBase: 230, durationPosition: 0, durationBackdropFilter: 90, scale: 1,
};
const surfaces = {
  normal,
  text: { ...normal, width: 3, height: 17, radius: 2, border: "0", background: "var(--cursor-ink)" },
  ripple: { ...normal, width: 8, height: 8, border: "1px solid #cb772e", background: "#fff8ee60" },
  media: { ...normal, width: 30, height: 30, backdropBlur: 0.65, background: "#ed883824", border: "2px solid #ed8838" },
  seek: { ...normal, width: 5, height: 19, radius: 3, background: "#ed8838" },
};

export default function PortfolioCursor() {
  const { reduced } = useMotionPreference();
  useEffect(() => {
    if (reduced) return;
    const eligible = matchMedia("(any-hover: hover) and (any-pointer: fine) and (forced-colors: none)");
    let cursor: HTMLElement | null = null;
    let surface: keyof typeof surfaces = "normal";

    const originalStyles = new WeakMap<HTMLElement, string[]>();
    const changedProperties = ["transform", "transition", "--translateX", "--translateY"];
    const tag = (el: Element) => {
      if (!(el instanceof HTMLElement) || el.matches(freeControls) || el.hasAttribute("data-cursor")) return;
      originalStyles.set(el, changedProperties.map((key) => el.style.getPropertyValue(key)));
      el.setAttribute("data-cursor", "block");
      if (el.matches(primary)) {
        el.setAttribute("data-cursor-style", customCursorStyle({
          background: "#ed883823", border: "1.5px solid #d87427", radius: "999px",
        }));
      } else if (el.matches(".delta-nav-link, .delta-wave-pill")) {
        el.setAttribute("data-cursor-style", customCursorStyle({
          background: "#ed883820", border: "1.5px solid #ed8838aa", radius: "999px", durationBase: 190,
        }));
      } else if (el.matches(".social-links a, .motion-controls button, .carousel-controls button, .monogram, .delta-logo-btn, .delta-theme-shell button, .project-player-controls > button:first-child")) {
        el.setAttribute("data-cursor-style", customCursorStyle({ radius: "50%", durationBase: 200 }));
      } else if (el.matches("[download], .showcase-links a")) {
        el.setAttribute("data-cursor-style", customCursorStyle({ background: "#9fc5ff2e", border: "1px solid #749ada" }));
      }
    };

    const positionLayer = () => {
      if (!cursor) return;
      const host = document.fullscreenElement ?? document.querySelector("dialog[open]") ?? document.body;
      if (cursor.parentElement !== host || (host !== document.body && cursor.hasAttribute("popover") && !cursor.matches(":popover-open"))) {
        if (cursor.hasAttribute("popover")) cursor.hidePopover?.();
        host.append(cursor);
        if (host !== document.body && cursor.showPopover) {
          cursor.setAttribute("popover", "manual");
          cursor.showPopover();
        } else cursor.removeAttribute("popover");
        resetCursor();
      }
    };

    const observer = new MutationObserver((records) => {
      let changed = false;
      for (const record of records) {
        for (const node of [...record.addedNodes, ...record.removedNodes]) {
          if (!(node instanceof Element) || node === cursor || node.matches(".ripple-slice")) continue;
          const nested = node.querySelectorAll(controls);
          if (!node.matches(controls) && !nested.length) continue;
          changed = true;
          if (node.isConnected) {
            if (node.matches(controls)) tag(node);
            nested.forEach(tag);
          }
        }
      }
      if (changed) updateCursor();
      positionLayer();
    });

    const fitShape = (target: Element | null) => {
      if (!cursor) return;
      cursor.toggleAttribute("data-fit", target instanceof HTMLElement);
      if (!(target instanceof HTMLElement)) return;
      const box = target.getBoundingClientRect();
      cursor.style.setProperty("--fit-x", `${box.left + box.width / 2}px`);
      cursor.style.setProperty("--fit-y", `${box.top + box.height / 2}px`);
      cursor.style.setProperty("--fit-width", `${target.offsetWidth + 4}px`);
      cursor.style.setProperty("--fit-height", `${target.offsetHeight + 4}px`);
      cursor.style.setProperty("--fit-radius", getComputedStyle(target).borderRadius);
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !eligible.matches) {
        hide();
        return;
      }
      if (!cursor) {
        document.querySelectorAll(controls).forEach(tag);
        initCursor({
          className: "portfolio-cursor", adsorptionStrength: 2, blockPadding: 2,
          normalStyle: normal, textStyle: surfaces.text,
          blockStyle: { background: "var(--cursor-tint)", border: "1px solid var(--cursor-outline)",
            radius: "auto", durationBase: 240, durationPosition: 175, backdropBlur: 0, backdropSaturate: "115%" },
          mouseDownStyle: { scale: 0.78, background: "#ed88386b" },
          enableLighting: true, enableMouseDownEffect: true,
        });
        cursor = document.querySelector(".portfolio-cursor");
        if (!cursor) return;
        cursor.setAttribute("aria-hidden", "true");
        positionLayer();
        observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["open"] });
      }
      if (document.documentElement.dataset.customPointer !== "on") document.documentElement.dataset.customPointer = "on";
      const el = event.target;
      if (!(el instanceof Element)) return;
      fitShape(el.closest(fittedShapes));
      let next: keyof typeof surfaces = "normal";
      if (el.closest(media)) next = "media";
      else if (el.closest("input[type=range]")) next = "seek";
      else if (!el.closest("[data-cursor=block]")) {
        if (el.closest("[data-ripple]")) next = "ripple";
        else if (el.closest(freeControls)) next = "media";
        else if (el.closest("p, li, h1, h2, h3, h4, dd, dt, figcaption, code")) next = "text";
      }
      if (surface !== next) {
        surface = next;
        updateConfig({ normalStyle: surfaces[next] });
        if (!el.closest("[data-cursor=block]")) resetCursor();
      }
    };

    const hide = () => {
      if (cursor) document.documentElement.dataset.customPointer = "idle";
      fitShape(null);
    };
    const key = (e: KeyboardEvent) => { if (e.key === "Tab") hide(); };
    const stop = () => {
      observer.disconnect();
      if (cursor) {
        resetCursor();
        disposeCursor();
        document.querySelectorAll<HTMLElement>("[data-cursor=block]").forEach((el) => {
          const saved = originalStyles.get(el);
          if (!saved) return;
          changedProperties.forEach((key, i) => el.style.setProperty(key, saved[i]));
          el.removeAttribute("data-cursor");
          el.removeAttribute("data-cursor-style");
        });
        cursor = null;
      }
      surface = "normal";
      delete document.documentElement.dataset.customPointer;
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    document.addEventListener("keydown", key);
    document.addEventListener("fullscreenchange", positionLayer);
    window.addEventListener("blur", hide);
    window.addEventListener("scroll", hide, true);
    eligible.addEventListener("change", stop);
    return () => {
      stop();
      document.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", hide);
      document.removeEventListener("keydown", key);
      document.removeEventListener("fullscreenchange", positionLayer);
      window.removeEventListener("blur", hide);
      window.removeEventListener("scroll", hide, true);
      eligible.removeEventListener("change", stop);
    };
  }, [reduced]);
  return null;
}
