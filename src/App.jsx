import { useState } from "react";
import reactLogo from "./assets/react.svg";
import twitterLogo from "./assets/twitter_logo.png"; // new logo import
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [prediction, setPrediction] = useState("");

  const handlePredict = async () => {
    try {
      const response = await fetch("https://web-production-feb5e.up.railway.app/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.statusText}`);
      }

      const data = await response.json();
      setPrediction(data.prediction || "Error in prediction");
    } catch (error) {
      setPrediction("Error: " + error.message);
      console.error("Prediction API error:", error);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch("https://web-production-feb5e.up.railway.app/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error("Failed to download the file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "prediction_output.txt"; // File name when downloaded
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <>
      <header>
        <img src={twitterLogo} alt="Twitter Logo" className="twitter-logo" />
        <h1 className="app-heading">
          DEPARTMENT OF INFORMATION TECHNOLOGY
          <br />
          NATIONAL INSTITUTE OF TECHNOLOGY KARNATAKA, SURATHKAL
        </h1>
        <p className="project-details">
          Deep Learning Course Project:{" "}
          <span className="project-highlight">
            "A ConvBiLSTM Deep Learning Model-Based Approach for Twitter
            Sentiment Classification"
          </span>
          <br />
          Carried out by: Adithya V (221AI005 ) &amp; Sachin Choudhary
          (221AI034)
          <br />
          Session January - April 2025
        </p>
      </header>
      <main>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter the tweet here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="tweet-input"
          />
          <div className="button-group">
            <button onClick={handlePredict}>Predict</button>
            <button onClick={handleDownload}>Download Output</button>
          </div>
        </div>
        <div className="output-container">
          <p className="output-container_para">Prediction Output:</p>
          <div className="prediction-box">{prediction}</div>
        </div>
      </main>
    </>
  );
}

export default App;
