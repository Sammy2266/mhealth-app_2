// Mock database using localStorage for persistence

// User type definition
export interface User {
  id: string
  email: string
  password: string // In a real app, this would be hashed
  name: string
  createdAt: string
}

// Simple mock of password hashing (DO NOT use in production)
const mockHashPassword = (password: string): string => {
  return btoa(password + "salt_value") // Base64 encoding with salt (NOT secure)
}

// Verify password
const verifyPassword = (inputPassword: string, storedPassword: string): boolean => {
  return mockHashPassword(inputPassword) === storedPassword
}

// Generate a random ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

// Initialize the database
const initializeDB = (): void => {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([]))
  }
}

// Get all users
const getUsers = (): User[] => {
  initializeDB()
  return JSON.parse(localStorage.getItem("users") || "[]")
}

// Find user by email
export const findUserByEmail = (email: string): User | undefined => {
  const users = getUsers()
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase())
}

// Create a new user
export const createUser = (email: string, password: string, name: string): User | null => {
  if (findUserByEmail(email)) {
    return null // User already exists
  }

  const newUser: User = {
    id: generateId(),
    email,
    password: mockHashPassword(password),
    name,
    createdAt: new Date().toISOString(),
  }

  const users = getUsers()
  users.push(newUser)
  localStorage.setItem("users", JSON.stringify(users))

  // Return user without password for security
  const { password: _, ...userWithoutPassword } = newUser
  return newUser
}

// Authenticate user
export const authenticateUser = (email: string, password: string): Omit<User, "password"> | null => {
  const user = findUserByEmail(email)

  if (!user) {
    console.log("User not found:", email)
    return null // User not found
  }

  if (!verifyPassword(password, user.password)) {
    console.log("Password doesn't match for user:", email)
    return null // Password doesn't match
  }

  // Return user without password
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

// Save session
export const saveSession = (user: Omit<User, "password">): void => {
  localStorage.setItem(
    "session",
    JSON.stringify({
      user,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
    }),
  )
}

// Get current session
export const getSession = (): { user: Omit<User, "password">; expiresAt: string } | null => {
  const session = localStorage.getItem("session")
  if (!session) return null

  const parsedSession = JSON.parse(session)

  // Check if session is expired
  if (new Date(parsedSession.expiresAt) < new Date()) {
    localStorage.removeItem("session")
    return null
  }

  return parsedSession
}

// Clear session (logout)
export const clearSession = (): void => {
  localStorage.removeItem("session")
}

// Debug function to check users in localStorage
export const debugUsers = (): void => {
  console.log("Current users:", getUsers())
}

