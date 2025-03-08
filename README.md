# Skeletal Malocclusion Classification App

![Project Banner](https://via.placeholder.com/1200x400) <!-- Add a banner image if available -->

This project is a **Skeletal Malocclusion Classification** application that takes an image as input and predicts the class of malocclusion. The app is built using **React.js** and utilizes **TensorFlow.js (TFJS)** for running the machine learning model directly in the browser. This is my updated project on previous project whihc utilized **Flask**

---

## Introduction

Skeletal malocclusion refers to the misalignment of teeth and jaws, which can lead to various dental and facial issues. This project aims to classify skeletal malocclusion types based on input images using a machine learning model. The model is trained on a dataset of dental images and deployed in a web application for easy use. Dataset used for training are private. Similar data can be obtained in Kaggle

---

## Features

- **Image Input**: Users can upload an image of dental X-rays or facial profiles.
- **Real-Time Prediction**: The app uses TensorFlow.js to run the model directly in the browser.
- **Classification Results**: Displays the predicted class of malocclusion along with confidence scores.
- **User-Friendly Interface**: Built with React.js for a smooth and responsive user experience.

---

## How It Works

1. **Image Upload**: Users upload an image through the web interface.
2. **Image Preprocessing**: The image is resized and normalized to match the model's input requirements.
3. **Model Inference**: The preprocessed image is passed to the TensorFlow.js model for prediction.
4. **Result Display**: The app displays the predicted class and confidence scores.

---

## Model Training

The machine learning model was trained on **Google Colab** using a dataset of dental images. The model is a convolutional neural network (CNN) designed for image classification tasks.

- **Training Notebook**: https://github.com/Pahyn/Malocclusion-image-classification-model/blob/main/Malocclusion_Training.ipynb
- **Model Accuracy**: The current model has a test accuracy of around **50%** because of lack in pre-processing method included in the react apps, indicating room for improvement. Alternatively, pre-trained model also can be used to improvement the accuracy.

---

## Technologies Used

- **Frontend**: React.js
- **Machine Learning**: TensorFlow.js (TFJS)
- **Model Training**: TensorFlow (Python) on Google Colab
- **Styling**: Tailwind CSS

---

## Technologies Used

- compatibility issues between Tensorflow and Keras with the Tensorflow js. This issue create error in the model.json
