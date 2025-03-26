"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { authenticateUser, createUser, saveSession, getSession, clearSession } from "@/lib/auth-db"

interface User {
  id: string
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on load
  useEffect(() => {
    const session = getSession()
    if (session) {
      setUser(session.user as User)
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    const authenticatedUser = authenticateUser(email, password)

    if (authenticatedUser) {
      saveSession(authenticatedUser)
      setUser(authenticatedUser as User)
      return true
    }

    return false
  }

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    const newUser = createUser(email, password, name)

    if (newUser) {
      const { password: _, ...userWithoutPassword } = newUser
      saveSession(userWithoutPassword)
      setUser(userWithoutPassword as User)
      return true
    }

    return false
  }

  const logout = () => {
    clearSession()
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

