import SwiftUI

struct MultiShapeDrawingView: View {
    @State private var drawings: [String: String] = [:] // Store drawings for each shape
    @State private var currentShapeIndex = 0 // Track the current shape being drawn
    @State private var showAlert = false
    @State private var alertMessage = ""

    // Updated list of shapes
    let shapes = [
        "Circle",
        "Square",
        "Triangle",
        "Pentagon",
        "Horizontal Line",
        "Vertical Line",
        "Rectangle Horizontal",
        "Rectangle Vertical",
        "Cross",
        "Star",
        "Heart"
    ]

    let userData: UserData // User data from DataCollectionView

    var body: some View {
        if currentShapeIndex < shapes.count {
            DrawingView(
                userData: userData,
                shapeType: shapes[currentShapeIndex],
                onSave: { shape, drawingData in
                    drawings[shape] = drawingData // Save the drawing for the current shape
                    currentShapeIndex += 1 // Move to the next shape
                }
            )
        } else {
            VStack(spacing: 20) {
                Text("All shapes completed!")
                    .font(.title)
                    .padding()

                Button(action: {
                    saveDrawingsToCSV(userData: userData, drawings: drawings) // Save all drawings when done
                    alertMessage = "Data saved successfully!"
                    showAlert = true
                }) {
                    Text("Save")
                        .font(.headline)
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(Color.blue)
                        .foregroundColor(.white)
                        .cornerRadius(10)
                }
                .padding()

                Button(action: shareCSVFile) {
                    Text("Share CSV")
                        .font(.headline)
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(Color.green)
                        .foregroundColor(.white)
                        .cornerRadius(10)
                }
                .padding()
            }
            .alert(isPresented: $showAlert) {
                Alert(title: Text("Status"), message: Text(alertMessage), dismissButton: .default(Text("OK")))
            }
        }
    }

    /// Function to share the CSV file
    func shareCSVFile() {
        let fileManager = FileManager.default
        guard let documentsDirectory = fileManager.urls(for: .documentDirectory, in: .userDomainMask).first else {
            alertMessage = "Unable to locate document directory."
            showAlert = true
            return
        }

        let fileURL = documentsDirectory.appendingPathComponent("DataDrawings.csv")
        guard fileManager.fileExists(atPath: fileURL.path) else {
            alertMessage = "CSV file does not exist."
            showAlert = true
            return
        }

        let activityVC = UIActivityViewController(activityItems: [fileURL], applicationActivities: nil)

        if let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
           let rootVC = windowScene.windows.first?.rootViewController {
            activityVC.popoverPresentationController?.sourceView = rootVC.view
            activityVC.popoverPresentationController?.sourceRect = CGRect(
                x: rootVC.view.bounds.midX,
                y: rootVC.view.bounds.midY,
                width: 0,
                height: 0
            )
            activityVC.popoverPresentationController?.permittedArrowDirections = []

            rootVC.present(activityVC, animated: true, completion: nil)
        }
    }
}
