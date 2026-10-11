import {
  ShoppingBag,
  Activity,
  ArrowUpRight,
  Database,
  ShieldCheck,
} from "lucide-react";
export default function ProjectArt({ type }: { type: string }) {
  if (type === "smartrac" || type === "byjus") {
    const isSmartrac = type === "smartrac";
    return (
      <div className={`project-art project-visual account-visual ${type}`} aria-hidden="true">
        <div className="visual-orbit orbit-one" />
        <div className="visual-orbit orbit-two" />
        <div className="visual-dashboard account-dashboard">
          <div className="visual-topline">
            <span className="visual-dots"><i /><i /><i /></span>
            <span>{isSmartrac ? "SMARTRAC / R&D DATA PLATFORM" : "BYJU’S / GRADEUP"}</span>
            <img className="account-visual-logo" src={`${import.meta.env.BASE_URL}assets/${isSmartrac ? "avery-dennison-logo.png" : "byjus-logo.png"}`} alt="" />
          </div>
          {isSmartrac ? (
            <div className="visual-body">
              <div className="visual-title-row"><div><small>GCP + DATABRICKS</small><strong>RFID research data, prepared for AI.</strong></div><Database size={20} /></div>
              <div className="visual-flow">
                <div><b>01</b><strong>INGEST</strong><span>RFID R&D datasets</span></div>
                <div><b>02</b><strong>PREPARE</strong><span>Cleanse · transform</span></div>
                <div><b>03</b><strong>EXPLORE</strong><span>AI · semantic search</span></div>
              </div>
              <div className="visual-bottom"><span>VERTEX AI / CLOUD FUNCTIONS</span><span className="account-visual-note">R&D DATA PLATFORM</span></div>
            </div>
          ) : (
            <div className="visual-body">
              <div className="visual-title-row"><div><small>PYTHON DEVELOPMENT / INTERNSHIP</small><strong>Working with GradeUp.</strong></div><span className="python-symbol">Py</span></div>
              <div className="byjus-visual-grid">
                <div><small>ROLE</small><strong>Python Developer</strong><span>July — November 2021</span></div>
                <div><small>ACCOUNT</small><strong>GradeUp</strong><span>BYJU’S</span></div>
              </div>
              <div className="visual-bottom"><span>REMOTE / HYDERABAD</span><span className="account-visual-note">2021</span></div>
            </div>
          )}
        </div>
      </div>
    );
  }
  if (type === "pipeline" || type === "backend") {
    const isPipeline = type === "pipeline";
    return (
      <div className={`project-art project-visual ${type}`} aria-hidden="true">
        <div className="visual-orbit orbit-one" />
        <div className="visual-orbit orbit-two" />
        <div className="visual-dashboard">
          <div className="visual-topline">
            <span className="visual-dots"><i /><i /><i /></span>
            <span>ROLLS-ROYCE DIGITAL / {isPipeline ? "ENGINE HISTORY" : "ASSUMPTIONS"}</span>
            <img src={`${import.meta.env.BASE_URL}assets/rolls-royce-plc.svg`} alt="" />
          </div>
          {isPipeline ? (
            <div className="visual-body">
              <div className="visual-title-row"><div><small>LAKEHOUSE / PRODUCTION</small><strong>Engine data, ready for insight.</strong></div><Database size={20} /></div>
              <div className="visual-flow">
                <div><b>01</b><strong>BRONZE</strong><span>Raw ingestion</span></div>
                <div><b>02</b><strong>SILVER</strong><span>Clean · validate · normalize</span></div>
                <div><b>03</b><strong>GOLD</strong><span>Business ready models</span></div>
              </div>
              <div className="visual-bottom"><span><Activity size={15} /> SPARK JOB OPTIMIZED</span><strong>52 <i>→</i> 14 <small>MIN</small></strong><span className="visual-trend"><ArrowUpRight size={14} /> 73% FASTER</span></div>
            </div>
          ) : (
            <div className="visual-body">
              <div className="visual-title-row"><div><small>PLATFORM / PRODUCTION</small><strong>Reliable services, clear signals.</strong></div><ShieldCheck size={20} /></div>
              <div className="visual-service-grid"><div className="service-main"><span>API RESPONSE / HEALTH</span><div className="service-wave"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div><strong>Operational <span>●</span></strong></div><div className="service-side"><span>ACCESS + DELIVERY</span><strong>RBAC / Docker</strong><small>Protected, repeatable services</small></div></div>
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className={`project-art ${type}`} aria-hidden="true">
      <div className="mini-browser">
        <div className="window-bar">
          <i />
          <i />
          <i />
          <span>
            {type === "store"
              ? "moriveda.in"
              : type === "pipeline"
                ? "engine-history / lakehouse"
                : "assumptions / platform"}
          </span>
        </div>
          <div className="store-art">
            <div className="store-brand">
              moriveda<span>NATURE, IN YOUR EVERYDAY.</span>
            </div>
            <div className="store-shelf">
              <div className="bottle">
                <span>
                  moriveda
                  <br />
                  <small>BOTANICAL CARE</small>
                </span>
              </div>
              <div className="store-copy">
                A little closer
                <br />
                to nature.<span>Thoughtfully made. Naturally yours.</span>
                <b>Explore the collection ↗</b>
              </div>
              <ShoppingBag className="store-bag" />
            </div>
          </div>
      </div>
    </div>
  );
}
