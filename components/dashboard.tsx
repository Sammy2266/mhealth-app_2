"use client"

import { useState } from "react"
import { Activity, Heart, TrendingUp, Droplets, Plus, Minus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useAuth } from "@/contexts/auth-context"

export default function Dashboard() {
  const { user } = useAuth()
  const [healthMetrics, setHealthMetrics] = useState({
    steps: 7842,
    heartRate: 72,
    sleep: 7.33, // 7h 20m in decimal
    water: 1.2,
  })

  const [waterGoal] = useState(3.0) // 3L daily goal

  const incrementWater = () => {
    setHealthMetrics((prev) => ({
      ...prev,
      water: Math.min(prev.water + 0.25, waterGoal), // Add 250ml (0.25L)
    }))
  }

  const decrementWater = () => {
    setHealthMetrics((prev) => ({
      ...prev,
      water: Math.max(prev.water - 0.25, 0), // Remove 250ml (0.25L)
    }))
  }

  // Calculate water percentage
  const waterPercentage = Math.round((healthMetrics.water / waterGoal) * 100)

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Hello, {user?.name || "User"}</h2>
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="font-medium text-primary">S</span>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Today's Summary</CardTitle>
          <CardDescription>March 26, 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm text-muted-foreground">Steps</span>
              <span className="text-lg font-semibold">{healthMetrics.steps.toLocaleString()}</span>
              <span className="text-xs text-green-600">+12% from avg</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-2">
                <Heart className="h-5 w-5 text-red-600" />
              </div>
              <span className="text-sm text-muted-foreground">Heart Rate</span>
              <span className="text-lg font-semibold">{healthMetrics.heartRate} bpm</span>
              <span className="text-xs text-muted-foreground">Resting</span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm text-muted-foreground">Sleep</span>
              <span className="text-lg font-semibold">
                {Math.floor(healthMetrics.sleep)}h {Math.round((healthMetrics.sleep % 1) * 60)}m
              </span>
              <span className="text-xs text-amber-600">-5% from avg</span>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg relative">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                      <Droplets className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="text-sm text-muted-foreground">Water</span>
                    <span className="text-lg font-semibold">{healthMetrics.water.toFixed(1)}L</span>
                    <span className="text-xs text-red-600">-{100 - waterPercentage}% from goal</span>
                    <div className="absolute -right-1 -bottom-1 flex flex-col">
                      <Button size="icon" variant="ghost" className="h-6 w-6 rounded-full" onClick={incrementWater}>
                        <Plus className="h-3 w-3" />
                        <span className="sr-only">Add water</span>
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 rounded-full"
                        onClick={decrementWater}
                        disabled={healthMetrics.water <= 0}
                      >
                        <Minus className="h-3 w-3" />
                        <span className="sr-only">Remove water</span>
                      </Button>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tap + to log water intake</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Weekly Goals</CardTitle>
          <CardDescription>Progress for this week</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Exercise (3/5 days)</span>
              <span className="text-sm text-muted-foreground">60%</span>
            </div>
            <Progress value={60} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Meditation (2/7 days)</span>
              <span className="text-sm text-muted-foreground">29%</span>
            </div>
            <Progress value={29} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Water Intake ({waterPercentage}%)</span>
              <span className="text-sm text-muted-foreground">{waterPercentage}%</span>
            </div>
            <Progress value={waterPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Upcoming</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
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
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium">Dr. Johnson</h3>
                <p className="text-xs text-muted-foreground">Cardiology Appointment</p>
                <p className="text-xs font-medium text-primary">Tomorrow, 10:30 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
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
                >
                  <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
                  <circle cx="17" cy="7" r="5" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium">Medication Reminder</h3>
                <p className="text-xs text-muted-foreground">Take Lisinopril</p>
                <p className="text-xs font-medium text-primary">Today, 8:00 PM</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

