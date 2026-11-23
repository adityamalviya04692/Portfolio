import { useState } from 'react'
import { Copy, Check, Download } from 'lucide-react'
import { usePortfolio, asset } from '../hooks/usePortfolio'
import SocialLinks from './SocialLinks'
import './Footer.css'

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
]

const LOGO_ANGLES = Array.from({ length: 12 }, (_, index) => index * 30)

export default function Footer() {
  const { profile } = usePortfolio()
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.social.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard unavailable */ }
  }

  return (
    <footer id="contact" className="relative z-10 border-t border-line px-5 pt-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h2 className="chrome-text text-2xl font-semibold sm:text-3xl">{profile.name}</h2>
            <p className="mt-2 text-sm text-neutral-400">{profile.specialization}</p>
            <p className="mono mt-1 text-[11px] text-neutral-600">{profile.location}</p>
            <a
              href={asset(profile.resume)}
              download
              className="mt-6 inline-flex items-center gap-2 rounded-full accent-bg px-5 py-2.5 text-sm font-medium text-white"
            >
              <Download size={15} /> Download Resume
            </a>
          </div>

          <div>
            <h3 className="mono mb-4 text-[11px] tracking-[0.2em] text-neutral-500">NAVIGATE</h3>
            <ul className="space-y-2.5">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="text-sm text-neutral-400 transition-colors hover:text-white">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mono mb-4 text-[11px] tracking-[0.2em] text-neutral-500">REACH OUT</h3>
            <button
              onClick={copyEmail}
              className="group flex items-center gap-2 text-sm text-neutral-300 transition-colors hover:text-white"
            >
              {profile.social.email}
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} className="text-neutral-600 group-hover:text-neutral-300" />}
            </button>
            <a href={`tel:${profile.social.phone.replace(/\s/g, '')}`} className="mt-2 block text-sm text-neutral-400 hover:text-white">
              {profile.social.phone}
            </a>
            <div className="mt-6">
              <SocialLinks compact />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono text-[11px] text-neutral-600">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p className="mono text-[11px] text-neutral-600">
            Built with React · TypeScript · Vite · Tailwind
          </p>
        </div>
      </div>
      <div className="footer-ring" aria-hidden="true">
        <div className="footer-ring-plane">
          <svg className="footer-ring-wheel" viewBox="0 0 640 640">
            <defs>
              <image id="footer-ring-logo" href={asset('am-monogram-v1.svg')} x="-53" y="27" width="106" height="106" />
            </defs>
            {LOGO_ANGLES.map((angle) => (
              <use key={angle} href="#footer-ring-logo" transform={`rotate(${angle} 320 320) translate(320)`} />
            ))}
          </svg>
        </div>
      </div>
    </footer>
  )
}
