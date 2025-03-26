"use client"

import { useEffect } from "react"
import { seedDatabase } from "@/lib/seed-data"

export default function DatabaseInitializer() {
  // Seed the database on initial load
  useEffect(() => {
    seedDatabase()
  }, [])

  // This component doesn't render anything
  return null
}

