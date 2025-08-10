import Foundation

class ShapeManager: ObservableObject {
    @Published var currentShapeIndex = 0
    @Published var results: [(shape: String, predicted: String, score: Double)] = []

    let shapes = [
        "Circle", "Square", "Triangle", "Pentagon", "Horizontal Line",
        "Vertical Line", "Rectangle Horizontal", "Rectangle Vertical",
        "Cross", "Star", "Heart"
    ]

    var isLastShape: Bool {
        currentShapeIndex == shapes.count - 1
    }

    var currentShape: String {
        shapes[currentShapeIndex]
    }

    func nextShape() {
        if currentShapeIndex < shapes.count - 1 {
            currentShapeIndex += 1
        }
    }

    func addResult(predicted: String, score: Double) {
        results.append((shape: currentShape, predicted: predicted, score: score))
    }
}
