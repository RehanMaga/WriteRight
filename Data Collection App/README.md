# Data Collection App – WriteRight  

This folder contains the **iPadOS application** built for the **WriteRight** project’s data collection phase. The app is designed to record stroke-drawing data from participants, capturing precise **(x, y, t)** coordinate sequences using **Apple Pencil**.  

## Purpose  
The main goal of this app is to gather high-quality handwriting and shape-drawing datasets to train our **machine learning models** for shape recognition and scoring. The data collected is stored in a structured format for preprocessing and later use in training CNN and ResNet-based models.  

## Features  
- **Shape Selection** – Users choose from a list of target shapes (circle, square, triangle, star, etc.).  
- **Full-Screen Drawing Canvas** – Optimized for Apple Pencil with low-latency input.  
- **Stroke Capture** – Records **(x, y)** positions and **timestamps (t)** for each point drawn.  
- **Multiple Shape Columns** – Each shape’s stroke data stored separately for clarity.  
- **Participant Metadata Collection** – Age, gender, handedness, years of education, and nickname.  
- **CSV Export** – Saves all drawings in CSV format, with each row representing a participant.  

## Technical Details  
- **Platform:** iPadOS 14+  
- **Frameworks:**  
  - `SwiftUI` – UI and layout  
  - `PencilKit` – Apple Pencil integration and stroke handling  
  - `Combine` – Data handling and state updates  
- **Data Format:** CSV with columns for each shape and metadata.  
- **Storage:** Local save (offline), with potential for cloud sync in future updates.  

## Output Example  
Each CSV row contains:  
Nickname, Age, Gender, Handedness, YearsOfEducation, Circle, Square, Triangle, ... ,Where each shape field contains a space-separated list of **x,y,t** triplets: "0.12,0.45,0.0001 0.15,0.48,0.0003 ..."

## Role in the Final Project  
This app was used during the **data acquisition phase** of our **B.Sc. final year project** at the University of Haifa. The dataset collected here forms the backbone of our **machine learning model training** for the WriteRight system.  

