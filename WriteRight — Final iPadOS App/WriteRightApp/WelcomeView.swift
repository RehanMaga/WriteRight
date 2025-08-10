import SwiftUI

struct WelcomeView: View {
    var body: some View {
        NavigationStack {
            VStack(spacing: 30) {
                
                // Logo Image
                Image("WriteRightLOGO")
                    .resizable()
                    .scaledToFit()
                    .frame(width: 200, height: 200)
                
                // Welcome Text
                Text("Welcome to WriteRight!")
                    .font(.largeTitle)
                    .fontWeight(.bold)
                    .multilineTextAlignment(.center)
                
                Text("Tap 'Next' to start your drawing task.")
                    .font(.title2)
                    .multilineTextAlignment(.center)
                    .padding(.horizontal)

                // Navigation Button
                NavigationLink(destination: DrawingView()) {
                    Text("Next")
                        .foregroundColor(.white)
                        .font(.title2)
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(Color.blue)
                        .cornerRadius(10)
                        .padding(.horizontal)
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(Color(.systemBackground))
        }
    }
}
