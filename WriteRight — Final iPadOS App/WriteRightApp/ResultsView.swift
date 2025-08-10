import SwiftUI
import Charts

struct ResultsView: View {
    @EnvironmentObject var shapeManager: ShapeManager

    var body: some View {
        VStack(spacing: 20) {
            Text("Results")
                .font(.largeTitle)
                .bold()

            List {
                ForEach(shapeManager.results, id: \.shape) { result in
                    HStack {
                        Text(result.shape)
                        Spacer()
                        Text("Predicted: \(result.predicted)")
                        Text(String(format: "%.1f%%", result.score))
                    }
                }
            }

            Chart {
                ForEach(shapeManager.results, id: \.shape) { result in
                    BarMark(
                        x: .value("Shape", result.shape),
                        y: .value("Score", result.score)
                    )
                    .foregroundStyle(Color.blue)
                }
            }
            .frame(height: 250)

            Spacer()
        }
        .padding()
    }
}
