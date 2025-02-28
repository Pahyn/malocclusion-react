import React, { useState } from "react";
import './tailwind.css'

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
        <div className="flex flex-col items-center gap-4 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold">Upload an Image</h2>

            <input type="file" accept="image/*" onChange={handleFileChange} className="p-2 border rounded-md" />

            {preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-md" />}

            <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-500 text-white  rounded-lg hover:bg-blue-300 transition"
            >
                Upload
            </button>
        </div>
    );
};

export default UploadForm;