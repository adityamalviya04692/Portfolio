import { useMotionPreference } from "./MotionSystem";

const ROW_ONE = [
  "Azure Databricks",
  "PySpark",
  "Delta Lake",
  "Unity Catalog",
  "Azure Data Factory",
  "Medallion Lakehouse",
  "FastAPI",
  "Apache Kafka",
  "Microsoft Fabric (DP-700)",
  "Liquid Clustering",
  "Structured Streaming",
  "Docker",
];

const ROW_TWO = [
  "Rolls-Royce Digital",
  "Avery Dennison",
  "73% Faster Spark Runtime",
  "~40% Azure Cost Savings",
  "30–40 GB/day Streaming",
  "Scrum Master · 4-Engineer Team",
  "GCP Vertex AI & RAG",
  "95–100% Pytest Coverage",
  "Azure DevOps CI/CD",
  "SQL / T-SQL",
];

export default function ZeroFlowRibbon() {
  const { reduced } = useMotionPreference();

  return (
    <section
      className="zero-flow-ribbon"
      aria-label="Core engineering stack and enterprise impact"
      data-reduced={reduced}
    >
      <div className="zero-ribbon-track zero-ribbon-forward">
        {[0, 1].map((dup) => (
          <div className="zero-ribbon-group" key={dup} aria-hidden={dup === 1}>
            {ROW_ONE.map((item) => (
              <span className="zero-ribbon-pill" key={`${dup}-${item}`}>
                <i className="zero-ribbon-dot" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="zero-ribbon-track zero-ribbon-reverse">
        {[0, 1].map((dup) => (
          <div className="zero-ribbon-group" key={dup} aria-hidden={dup === 1}>
            {ROW_TWO.map((item) => (
              <span className="zero-ribbon-pill is-metric" key={`${dup}-${item}`}>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
