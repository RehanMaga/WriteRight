import SwiftUI

struct DataCollectionView: View {
    @State private var nickname: String = ""
    @State private var age: String = ""
    @State private var gender: String = "Male"
    @State private var handPreference: String = "Right Hand"
    @State private var yearsStudying: String = ""
    @State private var showNextScreen = false
    @State private var showAlert = false
    @State private var alertMessage = ""

    var body: some View {
        VStack(spacing: 20) {
            Text("Enter Your Details")
                .font(.title)
                .padding()

            TextField("Nickname (at least 5 characters)", text: $nickname)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding(.horizontal)

            TextField("Age (numbers only)", text: $age)
                .keyboardType(.numberPad)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding(.horizontal)

            Picker("Gender", selection: $gender) {
                Text("Male").tag("Male")
                Text("Female").tag("Female")
            }
            .pickerStyle(SegmentedPickerStyle())
            .padding(.horizontal)

            Picker("Hand Preference", selection: $handPreference) {
                Text("Right Hand").tag("Right Hand")
                Text("Left Hand").tag("Left Hand")
            }
            .pickerStyle(SegmentedPickerStyle())
            .padding(.horizontal)

            TextField("Years Studying", text: $yearsStudying)
                .keyboardType(.numberPad)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding(.horizontal)

            NavigationLink(
                destination: MultiShapeDrawingView(
                    userData: UserData(nickname: nickname, age: Int(age) ?? 0, gender: gender, handPreference: handPreference, yearsStudying: Int(yearsStudying) ?? 0)
                ),
                isActive: $showNextScreen
            ) {
                EmptyView()
            }

            Button(action: validateAndSaveInput) {
                Text("Next")
                    .font(.headline)
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }
            .padding(.horizontal)
            .alert(isPresented: $showAlert) {
                Alert(title: Text("Invalid Input"), message: Text(alertMessage), dismissButton: .default(Text("OK")))
            }
        }
    }

    func validateAndSaveInput() {
        let nicknameRegex = "^[a-zA-Z0-9]{5,}$"
        if !NSPredicate(format: "SELF MATCHES %@", nicknameRegex).evaluate(with: nickname) {
            alertMessage = "Nickname must be at least 5 characters long and contain only letters and numbers."
            showAlert = true
            return
        }

        guard let ageInt = Int(age), ageInt > 0 else {
            alertMessage = "Age must be a valid number greater than 0."
            showAlert = true
            return
        }

        guard let yearsStudyingInt = Int(yearsStudying), yearsStudyingInt >= 0 else {
            alertMessage = "Years of studying must be a valid number."
            showAlert = true
            return
        }

        showNextScreen = true
    }
}
