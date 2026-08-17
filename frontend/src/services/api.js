const API_URL = "http://127.0.0.1:8000";


// Prediction API
export const predictAlzheimer = async (data) => {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });


  const result = await response.json();


  if (!response.ok) {
    throw new Error(
      result.detail || "Prediction failed"
    );
  }


  return result;
};


// Model information API
export const getModelInfo = async () => {
  const response = await fetch(
    `${API_URL}/model-info`
  );
  const result = await response.json();
  if (!response.ok) {
    throw new Error(
      result.detail ||
      "Unable to load model information"
    );
  }


  return result;
};