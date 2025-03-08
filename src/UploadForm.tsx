import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

const UploadForm = () => {
    const [model, setModel] = useState<tf.LayersModel | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null); // For image preview
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [prediction, setPrediction] = useState<number[][] | null>(null);

    // Load the model when the component mounts
    useEffect(() => {
        const loadModel = async () => {
            try {
                const loadedModel = await tf.loadLayersModel('model_tfjs/model.json'); // Adjust path as needed
                setModel(loadedModel);
                console.log('Model loaded successfully');
            } catch (error) {
                console.error('Error loading model:', error);
            }
        };
        loadModel();
    }, []);

    // Handle image selection
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0];
        if (!file) return;

        const img = new Image();
        img.src = URL.createObjectURL(file);
        setImagePreview(URL.createObjectURL(file)); // Generate preview URL
        img.onload = () => setImage(img);
    };

    // Process image for model input
    const processImage = (imageElement: HTMLImageElement): tf.Tensor => {
        return tf.tidy(() => {
            let tensor = tf.browser.fromPixels(imageElement) // Convert to tensor
                .resizeNearestNeighbor([64, 64]) // Resize to model input size
                .mean(2) // Convert to grayscale (averages RGB channels)
                .expandDims(-1) // Add channel dimension (64, 64, 1)
                .toFloat()
                .div(tf.scalar(255)); // Normalize pixel values

            return tensor.expandDims(0); // Add batch dimension (1, 64, 64, 1)
        });
    };

    // Run prediction
    const predict = async () => {
        if (!model || !image) return;

        const tensor = processImage(image);
        const prediction = model.predict(tensor) as tf.Tensor;
        const output = await prediction.array() as number[][];

        setPrediction(output);
        console.log('Prediction:', output);
        console.log(typeof (output))
    };

    return (
        <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg">

            {/* <h2 className="text-xl font-semibold uppercase">Select a model:</h2>
            <select className="block w-1/5 px-4 py-1 pr-8 leading-tight bg-white border border-gray-400 rounded shadow appearance-none hover:border-gray-500 focus:outline-none focus:shadow-outline"
                name="model">
                <option value="volvo">Model 1</option>
            </select> */}


            <h2 className="text-xl font-semibold uppercase">Upload an Image</h2>

            <input type="file" accept="image/*" onChange={handleImageUpload} className="p-2 border rounded-md" />

            {/* Image preview */}
            {imagePreview && (
                <div className="mt-5 text-center">
                    <h3 className="mb-2 text-lg font-semibold">Image Preview:</h3>
                    <div className="max-w-xs p-2 overflow-hidden border border-gray-200 rounded-lg max-h-xs">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="object-contain w-full h-auto"
                        />
                    </div>
                </div>
            )}

            <button
                onClick={predict}
                className="px-4 py-2 font-semibold text-white transition bg-blue-500 rounded-lg hover:border-white hover:bg-blue-400"
            >
                Classify
            </button>

            {prediction && (
                <div>
                    <h3><b>Prediction Results:</b></h3>
                    <ul>
                        {prediction[0].map((prob, index) => (
                            <li key={index}>
                                Class {index + 1}: {prob.toFixed(4)}
                            </li>
                        ))}
                    </ul>
                    <p>
                        Model prediction is <strong> Class {prediction[0].indexOf(Math.max(...prediction[0])) + 1} </strong>
                    </p>
                </div>
            )}
        </div>
    );
};

export default UploadForm;