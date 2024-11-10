import React, { useState } from "react";
import axios from "axios";
import './Features.css';

export const Features = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY; // Ensure this is correctly set in your environment variables

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImage(URL.createObjectURL(file));
    setLoading(true);
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64Image = reader.result.split(',')[1]; // Get base64 string

      try {
        const response = await axios.post(
          `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`,
          {
            requests: [
              {
                image: {
                  content: base64Image,
                },
                features: [
                  {
                    type: "DOCUMENT_TEXT_DETECTION",
                  },
                ],
              },
            ],
          }
        );

        console.log("API Response:", response.data); // Log API response to check for issues
        const text = response.data.responses[0].fullTextAnnotation?.text || "No text found.";
        setExtractedText(text);
      } catch (error) {
        console.error("Error during text extraction:", error);
        alert("Error during text extraction: " + (error.response?.data?.error?.message || error.message));
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(extractedText);
    alert("Text copied to clipboard!");
  };

  return (
    <div id="features" className="full-page-container">
      <div className="upload-section">
        <h2>Upload Image</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input"
        />
        {selectedImage && (
          <div className="image-preview">
            <img src={selectedImage} alt="Uploaded" />
          </div>
        )}
        {loading ? (
          <p className="loading-text">Extracting text, please wait...</p>
        ) : extractedText ? (
          <div className="text-output">
            <h3>Extracted Text</h3>
            <textarea value={extractedText} readOnly rows="10"></textarea>
            <button className="btn btn-primary" onClick={handleCopyText}>
              Copy Text
            </button>
          </div>
        ) : (
          <p className="no-extraction">No text extracted yet.</p>
        )}
      </div>
    </div>
  );
};
