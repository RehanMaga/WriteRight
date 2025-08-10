import Foundation

class UserData: Codable {
    let nickname: String
    let age: Int
    let gender: String
    let handPreference: String
    let yearsStudying: Int

    init(nickname: String, age: Int, gender: String, handPreference: String, yearsStudying: Int) {
        self.nickname = nickname
        self.age = age
        self.gender = gender
        self.handPreference = handPreference
        self.yearsStudying = yearsStudying
    }

    func toCSVRow() -> String {
        return "\(nickname),\(age),\(gender),\(handPreference),\(yearsStudying)\n"
    }
}
