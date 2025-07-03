import React, { useState } from "react";
import Upload from "./components/Upload";
import ReportTable from "./components/ReportTable";
import TrendChart from "./components/TrendChart";
import HighlightedMetrics from "./components/HighlightedMetrics";

function App() {
  const [extractedData, setExtractedData] = useState([]);
  const [rawOCRText, setRawOCRText] = useState("");

  const handleExtracted = (data, rawText) => {
    setExtractedData(data);
    setRawOCRText(rawText);
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-primary mb-4">
        <div className="container">
          <span className="navbar-brand mb-0 h1">Korai Health Dashboard</span>
          <span className="text-white">Welcome, User</span>
        </div>
      </nav>

      <div className="container my-4">
        <div className="card shadow p-4">
          <h2 className="mb-4 text-center">Upload Your Lab Report</h2>
          <Upload onExtracted={handleExtracted} />

          {extractedData.length > 0 ? (
            <>
              <h2 className="mt-5 mb-3">Extracted Health Parameters</h2>
              <HighlightedMetrics data={extractedData} />

              <ul className="nav nav-tabs mt-5 mb-3">
                <li className="nav-item">
                  <button
                    className="nav-link active"
                    data-bs-toggle="tab"
                    data-bs-target="#data"
                    type="button"
                  >
                    Extracted Data
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link"
                    data-bs-toggle="tab"
                    data-bs-target="#trends"
                    type="button"
                  >
                    Trends
                  </button>
                </li>
              </ul>

              <div className="tab-content">
                <div className="tab-pane fade show active" id="data">
                  <ReportTable data={extractedData} />
                </div>
                <div className="tab-pane fade" id="trends">
                  <TrendChart />
                </div>
              </div>
            </>
          ) : (
            <div className="alert alert-warning mt-4">
              No health data extracted. Please upload a lab report with numeric
              parameters.
            </div>
          )}

          {rawOCRText && (
            <div className="mt-4">
              <h4>Raw OCR Text:</h4>
              <pre style={{ whiteSpace: "pre-wrap" }}>{rawOCRText}</pre>
            </div>
          )}

          {rawOCRText && (
            <button
              className="btn btn-secondary mt-3"
              onClick={() => {
                const blob = new Blob([rawOCRText], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "ocr_output.txt";
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              Download OCR Text
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
