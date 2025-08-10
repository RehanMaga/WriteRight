import Foundation

func saveDrawingsToCSV(userData: UserData, drawings: [String: String]) {
    let fileManager = FileManager.default
    guard let documentsDirectory = fileManager.urls(for: .documentDirectory, in: .userDomainMask).first else {
        print("Unable to locate document directory")
        return
    }

    let fileURL = documentsDirectory.appendingPathComponent("DataDrawings.csv")

    // Extract data for each shape
    let circleData = drawings["Circle"] ?? ""
    let squareData = drawings["Square"] ?? ""
    let triangleData = drawings["Triangle"] ?? ""
    let pentagonData = drawings["Pentagon"] ?? ""
    let horizontalLineData = drawings["Horizontal Line"] ?? ""
    let verticalLineData = drawings["Vertical Line"] ?? ""
    let rectangleHorizontalData = drawings["Rectangle Horizontal"] ?? ""
    let rectangleVerticalData = drawings["Rectangle Vertical"] ?? ""
    let crossData = drawings["Cross"] ?? ""
    let starData = drawings["Star"] ?? ""
    let heartData = drawings["Heart"] ?? ""

    // Create a single row of user data + shape data
    let csvRow = "\(userData.nickname),\(userData.age),\(userData.gender),\(userData.handPreference),\(userData.yearsStudying),\"\(circleData)\",\"\(squareData)\",\"\(triangleData)\",\"\(pentagonData)\",\"\(horizontalLineData)\",\"\(verticalLineData)\",\"\(rectangleHorizontalData)\",\"\(rectangleVerticalData)\",\"\(crossData)\",\"\(starData)\",\"\(heartData)\"\n"

    do {
        // Check if the file exists
        if !fileManager.fileExists(atPath: fileURL.path) {
            // Add a header row only if the file does not exist
            let header = "Nickname,Age,Gender,Hand Preference,Years Studying,Circle,Square,Triangle,Pentagon,Horizontal Line,Vertical Line,Rectangle Horizontal,Rectangle Vertical,Cross,Star,Heart\n"
            try header.write(to: fileURL, atomically: true, encoding: .utf8)
        }

        // Append the data row to the file
        let fileHandle = try FileHandle(forWritingTo: fileURL)
        fileHandle.seekToEndOfFile()
        if let data = csvRow.data(using: .utf8) {
            fileHandle.write(data)
        }
        fileHandle.closeFile()

        print("Data saved successfully at \(fileURL.path)")
    } catch {
        print("Error saving data: \(error.localizedDescription)")
    }
}
