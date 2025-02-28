import React, { useState } from "react";
import "./App.css"; // Import the CSS file

const UploadForm: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    // Handle file selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    // Handle form submission
    const handleUpload = async () => {
        if (!selectedFile) return alert("Please select a file first!");

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error("Upload failed!");

            alert("File uploaded successfully!");
        } catch (error) {
            console.error("Upload error:", error);
            alert("Error uploading file!");
        }
    };

    return (
        <div className="upload-container">
            <h2 className="upload-title">Upload an Image</h2>

            <input type="file" accept="image/*" onChange={handleFileChange} className="upload-input" />

            {preview && <img src={preview} alt="Preview" className="upload-preview" />}

            <button onClick={handleUpload} className="upload-button">
                Upload
            </button>
        </div>
    );
};

export default UploadForm;