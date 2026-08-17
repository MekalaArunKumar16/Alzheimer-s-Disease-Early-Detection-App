const features = [
  {
    name: "Functional Assessment",
    value: 92,
  },
  {
    name: "ADL",
    value: 84,
  },
  {
    name: "MMSE",
    value: 79,
  },
  {
    name: "Memory Complaints",
    value: 68,
  },
  {
    name: "Behavioral Problems",
    value: 54,
  },
];


function FeatureImportance() {
  return (
    <section className="feature-card">

      <div className="feature-heading">

        <div>
          <span className="label">
            MODEL INTERPRETATION
          </span>

          <h2>
            Key Feature Importance
          </h2>
        </div>

        <span className="feature-note">
          Relative importance
        </span>

      </div>


      <div className="feature-list">

        {features.map((feature) => (

          <div
            className="feature-row"
            key={feature.name}
          >

            <div className="feature-name">
              {feature.name}
            </div>

            <div className="feature-track">

              <div
                className="feature-fill"
                style={{
                  width: `${feature.value}%`,
                }}
              />

            </div>

            <div className="feature-value">
              {feature.value}
            </div>

          </div>

        ))}

      </div>

      <p className="feature-disclaimer">
        Feature importance shown here is for
        visualization. Values should be replaced
        with the actual trained model importances.
      </p>

    </section>
  );
}

export default FeatureImportance;