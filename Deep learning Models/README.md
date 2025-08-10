# WriteRight - Machine Learning Models

This folder contains all **machine learning components** developed for the WriteRight project, the final B.Sc. project in Information Systems. These models power the **real-time shape classification and scoring** features in the WriteRight iPad app.

---

## Contents

### 1. Python Scripts & Jupyter Notebooks
- Data preprocessing from raw stroke points `(x, y, t)`
- Conversion of strokes into **64×64 grayscale rasterized images**
- Support for both **single-channel** `(x, y)` and **multi-channel** `(x, y, t)` input formats

### 2. Model Architectures
- **CNN (Convolutional Neural Network)** – for image-based shape classification
- **ResNet** – deeper convolutional model with skip connections for enhanced feature extraction
- **Temporal CNN** – sequence-based model trained on raw `(x, y, t)` stroke data


### 3. Data Augmentation & Optimization
- Random rotations, shifts, zoom, and flips for better generalization
- **Learning rate scheduling** with `ReduceLROnPlateau`
- **Early stopping** to prevent overfitting

### 4. Evaluation Tools
- Scripts for **accuracy/loss curves**, **confusion matrices**, and **classification reports**
- Metrics for both training and validation performance

---

## Dataset
All models were trained on **real-world shape-drawing data** collected from study participants using our **custom iPad data collection app**.  
- **11 distinct shapes** supported (Circle, Square, Triangle, Star, Heart, etc.)
- Each sample consists of hundreds of `(x, y, t)` points

---

## License
This code and models are part of the **WriteRight Final B.Sc. Project** and are intended for academic and research use.

