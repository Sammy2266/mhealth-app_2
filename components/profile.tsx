"use client"

import { useState } from "react"
import { Bell, ChevronRight, FileText, HelpCircle, LogOut, Settings, User, X } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useAuth } from "@/contexts/auth-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

export default function Profile() {
  const { user, logout } = useAuth()
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [profileCompletion, setProfileCompletion] = useState(75)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  // Personal Information state
  const [personalInfo, setPersonalInfo] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "+254 712 345678",
    dateOfBirth: "1990-01-01",
    gender: "Male",
    bloodType: "O+",
    height: "175",
    weight: "70",
    address: "Nairobi, Kenya",
  })

  // Medical Records state
  const [medicalRecords, setMedicalRecords] = useState([
    {
      id: 1,
      date: "2024-02-15",
      doctor: "Dr. Kamau",
      diagnosis: "Annual checkup",
      notes: "All vitals normal. Blood pressure slightly elevated, recommended lifestyle changes.",
      hospital: "Kenyatta National Hospital",
    },
    {
      id: 2,
      date: "2023-11-10",
      doctor: "Dr. Omondi",
      diagnosis: "Influenza",
      notes: "Prescribed antibiotics and rest for 3 days.",
      hospital: "Aga Khan University Hospital",
    },
  ])

  // New medical record state
  const [newRecord, setNewRecord] = useState({
    date: "",
    doctor: "",
    diagnosis: "",
    notes: "",
    hospital: "",
  })

  // Settings state
  const [settings, setSettings] = useState({
    language: "english",
    theme: "system",
    dataUsage: true,
    biometricLogin: false,
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    medicationReminders: true,
  })

  // Handle personal info form submission
  const handlePersonalInfoSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would update the user's information in the database
    toast({
      title: "Profile updated",
      description: "Your personal information has been updated successfully.",
      duration: 3000,
    })
    setProfileCompletion(Math.min(profileCompletion + 10, 100))
  }

  // Handle adding a new medical record
  const handleAddMedicalRecord = (e) => {
    e.preventDefault()
    const record = {
      id: medicalRecords.length + 1,
      ...newRecord,
    }
    setMedicalRecords([...medicalRecords, record])
    setNewRecord({
      date: "",
      doctor: "",
      diagnosis: "",
      notes: "",
      hospital: "",
    })
    toast({
      title: "Record added",
      description: "Your medical record has been added successfully.",
      duration: 3000,
    })
    setProfileCompletion(Math.min(profileCompletion + 5, 100))
  }

  // Handle settings form submission
  const handleSettingsSubmit = (e) => {
    e.preventDefault()
    toast({
      title: "Settings updated",
      description: "Your settings have been updated successfully.",
      duration: 3000,
    })
  }

  const handleNotificationToggle = (checked) => {
    setNotificationsEnabled(checked)
    setSettings({
      ...settings,
      emailNotifications: checked,
      smsNotifications: checked,
      appointmentReminders: checked,
      medicationReminders: checked,
    })
    toast({
      title: checked ? "Notifications enabled" : "Notifications disabled",
      description: checked
        ? "You will receive updates about your health and appointments."
        : "You will not receive any notifications.",
      duration: 3000,
    })
  }

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
      duration: 3000,
    })
    setShowLogoutConfirm(false)
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col items-center justify-center py-4">
        <Avatar className="w-20 h-20 mb-2">
          <AvatarFallback className="text-xl">{user?.name.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold">{user?.name || "User"}</h2>
        <p className="text-sm text-muted-foreground">{user?.email || "user@example.com"}</p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Health Profile Completion</h3>
            <Progress value={profileCompletion} className="h-2" />
            <p className="text-xs text-muted-foreground">Complete your profile to get personalized recommendations</p>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2"
              onClick={() => {
                setProfileCompletion(Math.min(profileCompletion + 10, 100))
                toast({
                  title: "Profile updated",
                  description: "Your health profile has been updated.",
                  duration: 3000,
                })
              }}
            >
              Complete Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-1">
        {/* Personal Information Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">Personal Information</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Personal Information</DialogTitle>
              <DialogDescription>Update your personal details and health information</DialogDescription>
            </DialogHeader>
            <form onSubmit={handlePersonalInfoSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={personalInfo.fullName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={personalInfo.dateOfBirth}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, dateOfBirth: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={personalInfo.gender}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value })}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodType">Blood Type</Label>
                  <select
                    id="bloodType"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={personalInfo.bloodType}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, bloodType: e.target.value })}
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={personalInfo.height}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, height: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={personalInfo.weight}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, weight: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={personalInfo.address}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                />
              </div>
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Medical Records Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">Medical Records</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Medical Records</DialogTitle>
              <DialogDescription>View and manage your medical history</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="records" className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="records">My Records</TabsTrigger>
                <TabsTrigger value="add">Add New Record</TabsTrigger>
              </TabsList>
              <TabsContent value="records" className="space-y-4 mt-4">
                {medicalRecords.length > 0 ? (
                  medicalRecords.map((record) => (
                    <Card key={record.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{record.diagnosis}</h3>
                            <p className="text-sm text-muted-foreground">
                              {record.date} • {record.hospital}
                            </p>
                            <p className="text-sm mt-1">Doctor: {record.doctor}</p>
                            <p className="text-sm mt-2">{record.notes}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              setMedicalRecords(medicalRecords.filter((r) => r.id !== record.id))
                              toast({
                                title: "Record deleted",
                                description: "Medical record has been deleted.",
                                duration: 3000,
                              })
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No medical records found</p>
                    <p className="text-sm text-muted-foreground mt-1">Add your first medical record</p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="add" className="mt-4">
                <form onSubmit={handleAddMedicalRecord} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newRecord.date}
                        onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="doctor">Doctor</Label>
                      <Input
                        id="doctor"
                        placeholder="Dr. Kamau"
                        value={newRecord.doctor}
                        onChange={(e) => setNewRecord({ ...newRecord, doctor: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="diagnosis">Diagnosis/Reason</Label>
                    <Input
                      id="diagnosis"
                      placeholder="Annual checkup"
                      value={newRecord.diagnosis}
                      onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hospital">Hospital/Clinic</Label>
                    <Input
                      id="hospital"
                      placeholder="Kenyatta National Hospital"
                      value={newRecord.hospital}
                      onChange={(e) => setNewRecord({ ...newRecord, hospital: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Enter any additional notes or prescriptions"
                      value={newRecord.notes}
                      onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Add Record
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>

        {/* Notifications Toggle */}
        <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Bell className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <span className="text-sm font-medium">Notifications</span>
            </div>
          </div>
          <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={handleNotificationToggle} />
        </div>

        {/* Settings Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Settings className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">Settings</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Settings</DialogTitle>
              <DialogDescription>Customize your app preferences</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSettingsSubmit} className="space-y-6 mt-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">App Preferences</h3>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <select
                    id="language"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={settings.language}
                    onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                  >
                    <option value="english">English</option>
                    <option value="swahili">Swahili</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <RadioGroup
                    value={settings.theme}
                    onValueChange={(value) => setSettings({ ...settings, theme: value })}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light">Light</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark">Dark</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="system" />
                      <Label htmlFor="system">System</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dataUsage"
                    checked={settings.dataUsage}
                    onCheckedChange={(checked) => setSettings({ ...settings, dataUsage: checked === true })}
                  />
                  <Label htmlFor="dataUsage">Optimize for low data usage</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="biometricLogin"
                    checked={settings.biometricLogin}
                    onCheckedChange={(checked) => setSettings({ ...settings, biometricLogin: checked === true })}
                  />
                  <Label htmlFor="biometricLogin">Enable biometric login</Label>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notification Settings</h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked === true })}
                  />
                  <Label htmlFor="emailNotifications">Email notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="smsNotifications"
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked === true })}
                  />
                  <Label htmlFor="smsNotifications">SMS notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="appointmentReminders"
                    checked={settings.appointmentReminders}
                    onCheckedChange={(checked) => setSettings({ ...settings, appointmentReminders: checked === true })}
                  />
                  <Label htmlFor="appointmentReminders">Appointment reminders</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="medicationReminders"
                    checked={settings.medicationReminders}
                    onCheckedChange={(checked) => setSettings({ ...settings, medicationReminders: checked === true })}
                  />
                  <Label htmlFor="medicationReminders">Medication reminders</Label>
                </div>
              </div>

              <DialogFooter>
                <Button type="submit">Save Settings</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Help & Support Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <HelpCircle className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">Help & Support</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Help & Support</DialogTitle>
              <DialogDescription>Get help with using AfiaTrack</DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I book an appointment?</AccordionTrigger>
                    <AccordionContent>
                      To book an appointment, go to the Appointments tab and click the "+ New" button. Fill in the
                      required details and submit the form.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do I track my health metrics?</AccordionTrigger>
                    <AccordionContent>
                      Your health metrics are displayed on the Dashboard. You can update your water intake by clicking
                      the + and - buttons on the water card.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How do I add medical records?</AccordionTrigger>
                    <AccordionContent>
                      Go to Profile {">"} Medical Records {">"} Add New Record. Fill in the details of your medical
                      visit and click "Add Record".
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Is my data secure?</AccordionTrigger>
                    <AccordionContent>
                      Yes, AfiaTrack takes data security seriously. Your health information is encrypted and stored
                      securely. We never share your data with third parties without your consent.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Contact Support</h3>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    toast({
                      title: "Support request sent",
                      description: "We'll get back to you as soon as possible.",
                      duration: 3000,
                    })
                    e.target.reset()
                  }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="What do you need help with?" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Describe your issue in detail" rows={4} required />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Contact Information</h3>
                <p className="text-sm">Email: support@afiatrack.com</p>
                <p className="text-sm">Phone: +254 700 123456</p>
                <p className="text-sm">Hours: Monday-Friday, 8am-5pm EAT</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Logout Dialog */}
        <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
          <DialogTrigger asChild>
            <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg cursor-pointer text-red-500">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <LogOut className="h-4 w-4 text-red-500" />
                </div>
                <span className="text-sm font-medium">Log Out</span>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Log Out</DialogTitle>
              <DialogDescription>Are you sure you want to log out of your account?</DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-2 mt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button variant="destructive" onClick={handleLogout}>
                Log Out
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <Toaster />
    </div>
  )
}

