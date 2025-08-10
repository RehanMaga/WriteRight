import SwiftUI
import PencilKit
import CoreML

struct DrawingView: View {
    @EnvironmentObject var shapeManager: ShapeManager
    @State private var canvasView = PKCanvasView()
    @State private var prediction = ""
    @State private var score = ""
    @State private var showResults = false

    var body: some View {
        VStack(spacing: 20) {
            Text("Draw: \(shapeManager.currentShape)")
                .font(.title)
                .bold()

            DrawingCanvas(canvasView: $canvasView)
                .frame(width: 300, height: 300)
                .border(Color.gray)

            Text("Prediction: \(prediction)")
            Text("Score: \(score)")

            HStack {
                Button("Clear") {
                    canvasView.drawing = PKDrawing()
                    prediction = ""
                    score = ""
                }
                .padding()
                .background(Color.gray.opacity(0.2))
                .cornerRadius(8)

                Button("Evaluate") {
                    evaluateDrawing()
                }
                .padding()
                .background(Color.green)
                .foregroundColor(.white)
                .cornerRadius(8)

                Button("Next") {
                    shapeManager.addResult(predicted: prediction, score: Double(score.replacingOccurrences(of: "%", with: "")) ?? 0.0)
                    if shapeManager.isLastShape {
                        showResults = true
                    } else {
                        shapeManager.nextShape()
                        canvasView.drawing = PKDrawing()
                        prediction = ""
                        score = ""
                    }
                }
                .disabled(prediction.isEmpty)
                .padding()
                .background(Color.blue)
                .foregroundColor(.white)
                .cornerRadius(8)
            }

            NavigationLink("", destination: ResultsView().environmentObject(shapeManager), isActive: $showResults)
        }
        .padding()
    }

    func evaluateDrawing() {
        // Check for empty drawing
        guard !canvasView.drawing.bounds.isEmpty else {
            prediction = "Please draw something"
            score = "0.00%"
            return
        }

        let image = canvasView.drawing.image(from: canvasView.bounds, scale: 1.0)

        guard let resizedImage = image.resized(to: CGSize(width: 64, height: 64)),
              let buffer = resizedImage.pixelBuffer() else {
            prediction = "Error"
            score = "N/A"
            return
        }

        do {
            let model = try ShapePredictor(configuration: MLModelConfiguration())
            let output = try model.prediction(inputs: buffer)

            if let topPrediction = output.Identity.max(by: { $0.value < $1.value }) {
                prediction = topPrediction.key
                score = String(format: "%.2f%%", topPrediction.value * 100)
            }

        } catch {
            print("Model prediction failed: \(error)")
            prediction = "Prediction Error"
            score = "N/A"
        }
    }
}
