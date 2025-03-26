"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Dashboard from "@/components/dashboard"
import Appointments from "@/components/appointments"
import Resources from "@/components/resources"
import Profile from "@/components/profile"
import AuthPage from "@/components/auth-page"
import { AuthProvider, useAuth } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"

// Main app component that handles authenticated content
function AppContent() {
  const { user, loading } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")

  // If still loading auth state, show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // If no user is logged in, show auth page
  if (!user) {
    return <AuthPage />
  }

  // User is authenticated, show app content
  return (
    <main className="container max-w-md mx-auto pb-16">
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold">AfiaTrack</h1>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-sm text-muted-foreground">Updates</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsContent value="dashboard">
          <Dashboard />
        </TabsContent>
        <TabsContent value="appointments">
          <Appointments />
        </TabsContent>
        <TabsContent value="resources">
          <Resources />
        </TabsContent>
        <TabsContent value="profile">
          <Profile />
        </TabsContent>

        <div className="fixed bottom-0 left-0 right-0 border-t bg-background">
          <TabsList className="w-full h-16 grid grid-cols-4">
            <TabsTrigger value="dashboard" className="flex flex-col gap-1 data-[state=active]:bg-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto"
              >
                <rect width="7" height="9" x="3" y="3" rx="1" />
                <rect width="7" height="5" x="14" y="3" rx="1" />
                <rect width="7" height="9" x="14" y="12" rx="1" />
                <rect width="7" height="5" x="3" y="16" rx="1" />
              </svg>
              <span className="text-xs">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex flex-col gap-1 data-[state=active]:bg-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
                <path d="M8 14h.01" />
                <path d="M12 14h.01" />
                <path d="M16 14h.01" />
                <path d="M8 18h.01" />
                <path d="M12 18h.01" />
                <path d="M16 18h.01" />
              </svg>
              <span className="text-xs">Appointments</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex flex-col gap-1 data-[state=active]:bg-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
              <span className="text-xs">Resources</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex flex-col gap-1 data-[state=active]:bg-muted">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 1 0-16 0" />
              </svg>
              <span className="text-xs">Profile</span>
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    </main>
  )
}

// Wrap the app with the auth provider
export default function Home() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

