"use client"

import { useState } from "react"
import Login from "@/components/login"
import Register from "@/components/register"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  const toggleForm = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/30">
      <div className="w-full max-w-md mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">AfiaTrack</h1>
        <p className="text-muted-foreground">Your personal health companion</p>
      </div>

      {isLogin ? <Login onToggleForm={toggleForm} /> : <Register onToggleForm={toggleForm} />}
    </div>
  )
}

