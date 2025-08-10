# WriteRight — Final iPadOS App

An iPadOS app that helps stroke patients practice drawing shapes and **get instant, data-driven feedback**. Built with **SwiftUI**, **PencilKit**, and **CoreML**, it captures high-resolution Apple Pencil strokes, classifies the drawn shape with a trained **CNN/ResNet** model, and visualizes **daily / weekly / monthly** progress.

>  This is the **final B.Sc. project** by **Amir Diab** and **Rehan Maghamseh**, supervised by **Prof. Ilan Shamshoni**, with clinical guidance from **Dr. Rola Farah**.

---

## What’s inside

- **Real-time(ish) evaluation** of 11 shapes:
  - Circle, Square, Triangle, Pentagon, Rectangle (Horizontal/Vertical), Horizontal Line, Vertical Line, Cross, Star, Heart
- **On-device ML (CoreML)** for private, fast inference  
- **Apple Pencil**–optimized drawing canvas (PencilKit)
- **Progress dashboard**: daily average, weekly trend, monthly overview
- **Therapy-friendly UI** designed with clinician input


---

## Requirements

- **Xcode** 14+ (15+ recommended)  
- **iPadOS** 14+ (A12 Bionic or newer recommended)  
- **Apple Pencil** (1st or 2nd gen)

---

## Build & Run

1. **Open** `WriteRightApp.xcodeproj` (or `.xcworkspace` if you use packages).  
2. **Add the model**: place your CoreML file at `Resources/Models/WriteRight.mlmodel`.  
   - Xcode will auto-compile it to `.mlmodelc` at build time.  
3. Select an **iPad** target (simulator or device) and **Run**.

### Model updates
- Replace `Resources/Models/WriteRight.mlmodel` with a new export.  
- Keep the **input** size at **64×64 grayscale** if you’re using the provided preprocessing.  
- If you change labels/classes, update the **label map** in the `Evaluation` feature.

---

## How to use

1. **Pick a shape** from the list.  
2. **Draw** on the canvas with Apple Pencil.  
3. Tap **Evaluate** to see:
   - Predicted shape + confidence  
   - A numeric **score (0–100)**  
4. Check the **Progress** tab to review daily, weekly, and monthly trends.

---

##  Privacy

- Inference is **on-device** with CoreML.  
- Drawing data stays **local** unless you explicitly export it.  
- No external API calls are made during evaluation.

---

##  Known limitations

- **Live “while-drawing” predictions** are **disabled** in this build to avoid CoreML UI jank; evaluation happens on **Evaluate**.  
- On some physical devices, if the compiled model can’t be loaded correctly, you might see **placeholder predictions** or repeated classes.  
  -  Fix: ensure `WriteRight.mlmodel` exists, builds to `.mlmodelc`, and the **target membership** is enabled.  
  - If you changed the model’s **class labels**, update the app’s **label mapping** accordingly.

---

## Dataset & Training (context)

- Training data was collected via our **Data Collection App** (iPadOS), capturing **(x, y, t)** sequences for the 11 shapes.  
- We trained **CNN** and **ResNet** models on **64×64** rasterized images derived from those strokes.  
- ResNet achieved the best accuracy; confusion occurs mostly among **Square** and **Rectangles** (H/V) due to visual similarity.

---

## Roadmap

- Re-enable **real-time** (streaming) inference while drawing  
- Expand to **letters and words** (handwriting tasks)  
- Richer **therapist controls** and export options  
- Finalize a **secure web dashboard** for remote monitoring (current repo has **UI-only prototype**)


