import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import AssessmentForm from "./components/AssessmentForm";
import PredictionCard from "./components/PredictionCard";
import ModelOverview from "./components/ModelOverview";
import FeatureImportance from "./components/FeatureImportance";

import {
  predictAlzheimer,
  getModelInfo,
} from "./services/api";

import "./App.css";


const initialForm = {
  FunctionalAssessment: "",
  ADL: "",
  MMSE: "",
  MemoryComplaints: "",
  BehavioralProblems: "",
  CholesterolHDL: "",
  DietQuality: "",
  PhysicalActivity: "",
  CholesterolTriglycerides: "",
  BMI: "",
};


function App() {

  const [formData, setFormData] =
    useState(initialForm);

  const [result, setResult] =
    useState(null);

  const [modelInfo, setModelInfo] =
    useState(null);

  const [loading, setLoading] =
    useState(false);


  // Load actual model information
  useEffect(() => {

    const loadModelInfo = async () => {

      try {

        const info =
          await getModelInfo();

        setModelInfo(info);

      } catch (error) {

        console.error(
          "Model info error:",
          error
        );

      }
    };

    loadModelInfo();

  }, []);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setResult(null);
  };


  const handleReset = () => {

    setFormData(initialForm);

    setResult(null);
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setResult(null);


    // EXACT 10 features used by the trained model
    const data = {

      FunctionalAssessment:
        Number(formData.FunctionalAssessment),

      ADL:
        Number(formData.ADL),

      MMSE:
        Number(formData.MMSE),

      MemoryComplaints:
        Number(formData.MemoryComplaints),

      BehavioralProblems:
        Number(formData.BehavioralProblems),

      CholesterolHDL:
        Number(formData.CholesterolHDL),

      DietQuality:
        Number(formData.DietQuality),

      PhysicalActivity:
        Number(formData.PhysicalActivity),

      CholesterolTriglycerides:
        Number(formData.CholesterolTriglycerides),

      BMI:
        Number(formData.BMI),
    };


    console.log(
      "Prediction payload:",
      data
    );


    try {

      const prediction =
        await predictAlzheimer(data);

      setResult(prediction);

    } catch (error) {

      setResult({
        error: error.message,
      });

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="app">

      <Navbar />


      <main className="container">

        {/* Hero */}

        <section className="hero">

          <div>

            <span className="hero-label">
              AI-POWERED HEALTH ANALYTICS
            </span>

            <h1>
              Alzheimer's Risk
              <br />
              Assessment
            </h1>

            <p>
              Machine-learning assisted assessment
              using a Random Forest classification model.
            </p>

          </div>

        </section>


        {/* Assessment + Prediction */}

        <div className="main-grid">

          <section>

            <AssessmentForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              handleReset={handleReset}
              loading={loading}
            />

          </section>


          <aside>

            <PredictionCard
              result={result}
            />

          </aside>

        </div>


        {/* Model Overview */}

        <ModelOverview
          modelInfo={modelInfo}
        />


        {/* Feature Importance */}

        <FeatureImportance
          modelInfo={modelInfo}
        />


        {/* Footer */}

        <footer>

          <span>
            NeuroAI · ML Health Analytics
          </span>

          <span>
            Educational project · Not a medical diagnosis
          </span>

        </footer>

      </main>

    </div>
  );
}


export default App;