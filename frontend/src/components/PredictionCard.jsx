function PredictionCard({ result }) {

  if (!result) {
    return (
      <div className="prediction-card">

        <div className="card-top">
          <div>
            <span className="label">
              MODEL OUTPUT
            </span>

            <h2>Prediction</h2>
          </div>

          <div className="card-symbol">
            ✦
          </div>
        </div>


        <div className="empty-state">

          <div className="empty-circle">
            ✦
          </div>

          <h3>Ready for assessment</h3>

          <p>
            Complete the assessment and run the
            model to generate a prediction.
          </p>

        </div>

      </div>
    );
  }


  if (result.error) {
    return (
      <div className="prediction-card">

        <div className="error-state">
          <h3>Prediction failed</h3>

          <p>{result.error}</p>
        </div>

      </div>
    );
  }


  const probability =
    result.probability * 100;

  const isPositive =
    result.prediction === 1;


  return (
    <div className="prediction-card">

      <div className="card-top">

        <div>
          <span className="label">
            MODEL OUTPUT
          </span>

          <h2>Prediction</h2>
        </div>

        <div className="card-symbol">
          ✓
        </div>

      </div>


      <div className="prediction-content">

        <div className="score-ring">

          <div className="score-inner">

            <strong>
              {probability.toFixed(0)}%
            </strong>

            <span>
              probability
            </span>

          </div>

        </div>


        <div
          className={
            isPositive
              ? "prediction-status positive"
              : "prediction-status negative"
          }
        >
          {result.result}
        </div>


        <p className="prediction-description">
          The Random Forest model generated this
          classification from the selected assessment
          features.
        </p>


        <div className="confidence">

          <div className="confidence-header">
            <span>Model confidence</span>

            <strong>
              {probability.toFixed(1)}%
            </strong>
          </div>

          <div className="progress">
            <div
              className="progress-bar"
              style={{
                width: `${probability}%`,
              }}
            ></div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default PredictionCard;