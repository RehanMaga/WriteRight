import SwiftUI

struct WelcomeView: View {
    var body: some View {
        VStack(spacing: 20) {
            Text("Welcome to WriteRight!")
                .font(.largeTitle)
                .multilineTextAlignment(.center)
                .padding()

            NavigationLink(destination: DataCollectionView()) {
                Text("Start")
                    .font(.headline)
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }
            .padding()
        }
        .padding()
    }
}
