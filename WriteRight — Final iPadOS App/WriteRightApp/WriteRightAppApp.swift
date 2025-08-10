//
//  WriteRightAppApp.swift
//  WriteRightApp
//
//  Created by rehan maghamseh on 06/08/2025.
//

import SwiftUI

@main
struct WriteRightAppApp: App {
    @StateObject var shapeManager = ShapeManager()

      var body: some Scene {
          WindowGroup {
              WelcomeView()
                  .environmentObject(shapeManager)   
          }
      }
}
