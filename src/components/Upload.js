import React, { useState } from "react";
import Tesseract from "tesseract.js";
import * as pdfjsLib from "pdfjs-dist/webpack";
import parseReport from "../utils/parseReport";

export default function Upload({ onExtracted }) {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);

    // ✅ If file is a PDF
    if (file.type === "application/pdf") {
      setLoading(true);

      const fileReader = new FileReader();
      fileReader.onload = async function () {
        try {
          const typedarray = new Uint8Array(this.result);

          const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;
          const page = await pdf.getPage(1);

          const viewport = page.getViewport({ scale: 2.0 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({ canvasContext: context, viewport }).promise;

          const imgData = canvas.toDataURL("image/png");

          Tesseract.recognize(imgData, "eng")
            .then(({ data: { text } }) => {
              console.log("OCR Output:", text);
              const extracted = parseReport(text);
              console.log("Extracted Data:", extracted);
              onExtracted(extracted, text);
            })
            .catch((err) => {
              console.error("Tesseract error:", err);
              alert("OCR failed. Please try another PDF/image.");
            })
            .finally(() => setLoading(false));
        } catch (error) {
          console.error("PDF processing error:", error);
          alert("Failed to read PDF. Please try another file.");
          setLoading(false);
        }
      };
      fileReader.readAsArrayBuffer(file);
      return;
    }

    // ✅ Otherwise, handle as image
    if (!file.type.startsWith("image/")) {
      alert("Please upload a PDF or image file (PNG, JPEG).");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLoading(true);
      Tesseract.recognize(reader.result, "eng")
        .then(({ data: { text } }) => {
          const extracted = parseReport(text);
          onExtracted(extracted, text);
        })
        .catch((err) => {
          console.error("Tesseract error:", err);
          alert("OCR failed. Please try another image.");
        })
        .finally(() => setLoading(false));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-4">
      <label className="form-label">Upload Lab Report Image or PDF</label>
      <input
        className="form-control"
        type="file"
        accept="image/*,.pdf"
        onChange={handleFileUpload}
      />

      {loading && (
        <div className="alert alert-info mt-3">
          Processing report... please wait.
        </div>
      )}

      {selectedFile && (
        <div className="text-center mt-4">
          <h5>Preview of Uploaded File</h5>
          {selectedFile.type.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="Uploaded Preview"
              className="img-thumbnail"
              style={{ maxHeight: "300px" }}
            />
          ) : (
            <p>PDF Uploaded: {selectedFile.name}</p>
          )}
        </div>
      )}
    </div>
  );
}
