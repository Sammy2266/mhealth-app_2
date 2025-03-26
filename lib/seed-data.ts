"use client"

import { createUser, debugUsers } from "./auth-db"

export function seedDatabase() {
  // Check if we've already seeded the database
  if (localStorage.getItem("db_seeded")) {
    // Debug: Check if users exist
    debugUsers()
    return
  }

  // Create some sample users
  createUser("john@example.com", "password123", "John Doe")
  createUser("sarah@example.com", "password123", "Sarah Johnson")
  createUser("demo@example.com", "demo1234", "Demo User")

  // Mark as seeded
  localStorage.setItem("db_seeded", "true")

  // Debug: Verify users were created
  debugUsers()

  console.log("Database seeded successfully")
}

