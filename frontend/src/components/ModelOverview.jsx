function ModelOverview({ modelInfo }) {

  return (
    <section className="overview">

      <div className="overview-title">

        <span className="label">
          MODEL OVERVIEW
        </span>

        <h2>
          Alzheimer's Classification Model
        </h2>

        <p>
          Information retrieved directly from
          the trained machine learning model.
        </p>

      </div>


      <div className="metrics">

        <div className="metric">

          <span>Algorithm</span>

          <strong>
            {modelInfo?.algorithm || "Loading..."}
          </strong>

        </div>


        <div className="metric">

          <span>Estimators</span>

          <strong>
            {modelInfo?.n_estimators || "—"}
          </strong>

        </div>


        <div className="metric">

          <span>Features</span>

          <strong>
            {modelInfo?.features || "—"}
          </strong>

        </div>


        <div className="metric">

          <span>Backend</span>

          <strong>
            FastAPI
          </strong>

        </div>


        <div className="metric">

          <span>Frontend</span>

          <strong>
            React
          </strong>

        </div>

      </div>

    </section>
  );
}

export default ModelOverview;