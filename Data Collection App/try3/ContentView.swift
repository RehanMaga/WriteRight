import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationView {
            WelcomeView() // Wrap WelcomeView in NavigationView
        }
        .navigationViewStyle(StackNavigationViewStyle()) // Prevents odd behavior on iPad
    }
}
