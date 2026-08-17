function AssessmentForm({
  formData,
  handleChange,
  handleSubmit,
  handleReset,
  loading,
}) {
  return (
    <form className="assessment-form" onSubmit={handleSubmit}>

      {/* Cognitive Assessment */}
      <div className="form-section">

        <div className="section-heading">
          <div className="section-icon">01</div>

          <div>
            <h2>Cognitive Assessment</h2>
            <p>Cognitive and functional measurements</p>
          </div>
        </div>

        <div className="fields-grid">

          <div className="field">
            <label>Functional Assessment</label>

            <input
              type="number"
              step="any"
              name="FunctionalAssessment"
              placeholder="e.g. 4.4"
              value={formData.FunctionalAssessment}
              onChange={handleChange}
              required
            />

            <small>Functional capability score</small>
          </div>


          <div className="field">
            <label>ADL</label>

            <input
              type="number"
              step="any"
              name="ADL"
              placeholder="e.g. 23"
              value={formData.ADL}
              onChange={handleChange}
              required
            />

            <small>Activities of daily living</small>
          </div>


          <div className="field">
            <label>MMSE Score</label>

            <input
              type="number"
              step="any"
              name="MMSE"
              placeholder="e.g. 24"
              value={formData.MMSE}
              onChange={handleChange}
              required
            />

            <small>Mini-Mental State Examination</small>
          </div>


          <div className="field">
            <label>Memory Complaints</label>

            <select
              name="MemoryComplaints"
              value={formData.MemoryComplaints}
              onChange={handleChange}
              required
            >
              <option value="">Select status</option>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>

            <small>Reported memory concerns</small>
          </div>


          <div className="field">
            <label>Behavioral Problems</label>

            <select
              name="BehavioralProblems"
              value={formData.BehavioralProblems}
              onChange={handleChange}
              required
            >
              <option value="">Select status</option>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>

            <small>Behavioral symptoms reported</small>
          </div>

        </div>
      </div>


      {/* Health & Lifestyle */}
      <div className="form-section">

        <div className="section-heading">
          <div className="section-icon">02</div>

          <div>
            <h2>Health & Lifestyle</h2>
            <p>Physical and health indicators</p>
          </div>
        </div>

        <div className="fields-grid">

          <div className="field">
            <label>HDL Cholesterol</label>

            <input
              type="number"
              step="any"
              name="CholesterolHDL"
              placeholder="e.g. 50"
              value={formData.CholesterolHDL}
              onChange={handleChange}
              required
            />

            <small>HDL cholesterol level</small>
          </div>


          <div className="field">
            <label>Diet Quality</label>

            <input
              type="number"
              step="any"
              name="DietQuality"
              placeholder="e.g. 6"
              value={formData.DietQuality}
              onChange={handleChange}
              required
            />

            <small>Diet quality score</small>
          </div>


          <div className="field">
            <label>Physical Activity</label>

            <input
              type="number"
              step="any"
              name="PhysicalActivity"
              placeholder="e.g. 5"
              value={formData.PhysicalActivity}
              onChange={handleChange}
              required
            />

            <small>Physical activity level</small>
          </div>


          <div className="field">
            <label>Triglycerides</label>

            <input
              type="number"
              step="any"
              name="CholesterolTriglycerides"
              placeholder="e.g. 150"
              value={formData.CholesterolTriglycerides}
              onChange={handleChange}
              required
            />

            <small>Cholesterol triglyceride level</small>
          </div>


          <div className="field">
            <label>BMI</label>

            <input
              type="number"
              step="any"
              name="BMI"
              placeholder="e.g. 24.5"
              value={formData.BMI}
              onChange={handleChange}
              required
            />

            <small>Body Mass Index</small>
          </div>

        </div>
      </div>


      {/* Buttons */}
      <div className="form-actions">

        <button
          type="button"
          className="secondary-button"
          onClick={handleReset}
        >
          Reset
        </button>

        <button
          type="submit"
          className="primary-button"
          disabled={loading}
        >
          {loading
            ? "Analyzing..."
            : "Analyze Assessment →"}
        </button>

      </div>

    </form>
  );
}

export default AssessmentForm;