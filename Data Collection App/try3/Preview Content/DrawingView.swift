import SwiftUI

struct DrawingView: View {
    @State private var paths: [Path] = [] // Store multiple paths for discontinuous drawing
    @State private var currentPath = Path() // Store the current path being drawn
    @State private var drawingCoordinates: [[(CGPoint, TimeInterval)]] = [] // Store coordinates for each path
    @State private var startTime: TimeInterval? // Time when drawing starts
    @State private var showAlert = false
    @State private var alertMessage = ""

    let userData: UserData // UserData passed from DataCollectionView
    let shapeType: String // The shape being drawn (Circle, Square, etc.)
    let onSave: (_ shapeType: String, _ drawingData: String) -> Void // Callback for saving drawing

    var body: some View {
        VStack {
            HStack {
                Button(action: resetCanvas) {
                    Text("Erase")
                        .font(.headline)
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(Color.red)
                        .foregroundColor(.white)
                        .cornerRadius(10)
                }

                Button(action: saveDrawingAndProceed) {
                    Text("Save and Next")
                        .font(.headline)
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(Color.blue)
                        .foregroundColor(.white)
                        .cornerRadius(10)
                }
            }
            .padding()

            Text("Draw a \(shapeType)!")
                .font(.title)
                .padding()

            Canvas { context, size in
                for path in paths {
                    context.stroke(path, with: .color(.blue), lineWidth: 2)
                }
                context.stroke(currentPath, with: .color(.blue), lineWidth: 2)
            }
            .frame(width: 300, height: 300)
            .background(Color.gray.opacity(0.2))
            .cornerRadius(10)
            .gesture(DragGesture()
                        .onChanged { value in
                            let currentTime = Date().timeIntervalSince1970
                            if currentPath.isEmpty {
                                currentPath.move(to: value.location)
                                startTime = currentTime // Record the start time
                            } else {
                                currentPath.addLine(to: value.location)
                            }

                            if let startTime = startTime {
                                if drawingCoordinates.isEmpty || drawingCoordinates.last!.isEmpty {
                                    drawingCoordinates.append([]) // Add a new array for the current path
                                }
                                drawingCoordinates[drawingCoordinates.count - 1].append((value.location, currentTime - startTime))
                            }
                        }
                        .onEnded { _ in
                            paths.append(currentPath) // Add the current path to the list of paths
                            currentPath = Path() // Reset the current path for the next stroke
                        })
            .padding()
        }
    }

    /// Saves the current drawing and resets the canvas
    func saveDrawingAndProceed() {
        // Convert drawing data to a string format
        let drawingData = drawingCoordinates.map { pathCoordinates in
            pathCoordinates.map { point, time in
                "\(point.x),\(point.y),\(time)"
            }.joined(separator: " ")
        }.joined(separator: " | ") // Separate different strokes with a " | "

        // Trigger the callback to save the drawing
        onSave(shapeType, drawingData)

        // Reset the canvas for the next shape
        resetCanvas()
    }

    /// Resets the canvas and clears the drawing data
    func resetCanvas() {
        paths.removeAll() // Clear all paths
        currentPath = Path() // Reset the current path
        drawingCoordinates.removeAll() // Clear all coordinates
        startTime = nil // Reset the start time
    }
}
