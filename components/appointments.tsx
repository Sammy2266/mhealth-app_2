"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function Appointments() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: "Dr. Kamau",
      type: "Cardiology Appointment",
      date: "March 27, 2025",
      time: "10:30 AM",
      location: "Kenyatta National Hospital, Hospital Road, Nairobi",
      isPast: false,
      summary: "",
      prescription: "",
    },
    {
      id: 2,
      doctor: "Dr. Omondi",
      type: "Annual Physical",
      date: "April 15, 2025",
      time: "9:00 AM",
      location: "Aga Khan University Hospital, 3rd Parklands Avenue, Nairobi",
      isPast: false,
      summary: "",
      prescription: "",
    },
    {
      id: 3,
      doctor: "Dr. Wanjiku",
      type: "Dental Checkup",
      date: "February 10, 2025",
      time: "2:00 PM",
      location: "Nairobi Hospital, Argwings Kodhek Road, Nairobi",
      isPast: true,
      summary: "Regular dental checkup. No cavities found. Recommended professional cleaning every 6 months.",
      prescription: "Fluoride mouthwash - use daily after brushing.",
    },
    {
      id: 4,
      doctor: "Dr. Otieno",
      type: "Eye Exam",
      date: "January 5, 2025",
      time: "11:15 AM",
      location: "Moi Teaching & Referral Hospital, Nandi Road, Eldoret",
      isPast: true,
      summary: "Vision test performed. Slight astigmatism detected. Recommended glasses for reading and computer work.",
      prescription: "Prescription glasses - collect from optical shop in 1 week.",
    },
  ])

  const [newAppointment, setNewAppointment] = useState({
    doctor: "",
    type: "",
    date: "",
    time: "",
    location: "",
  })

  const [activeTab, setActiveTab] = useState("upcoming")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // State for appointment being rescheduled
  const [rescheduleAppointment, setRescheduleAppointment] = useState(null)

  // State for appointment summary being viewed
  const [viewSummaryAppointment, setViewSummaryAppointment] = useState(null)

  const handleAddAppointment = (e) => {
    e.preventDefault()

    const appointment = {
      id: appointments.length + 1,
      ...newAppointment,
      isPast: false,
      summary: "",
      prescription: "",
    }

    setAppointments([...appointments, appointment])
    setNewAppointment({
      doctor: "",
      type: "",
      date: "",
      time: "",
      location: "",
    })
    setIsDialogOpen(false)

    toast({
      title: "Appointment scheduled",
      description: "Your appointment has been successfully scheduled.",
      duration: 3000,
    })
  }

  const handleRescheduleAppointment = (e) => {
    e.preventDefault()

    // Find and update the appointment
    const updatedAppointments = appointments.map((app) =>
      app.id === rescheduleAppointment.id
        ? { ...app, date: rescheduleAppointment.date, time: rescheduleAppointment.time }
        : app,
    )

    setAppointments(updatedAppointments)
    setRescheduleAppointment(null)

    toast({
      title: "Appointment rescheduled",
      description: "Your appointment has been successfully rescheduled.",
      duration: 3000,
    })
  }

  const handleBookAgain = (appointment) => {
    // Create a new appointment based on the past one
    const newApp = {
      id: appointments.length + 1,
      doctor: appointment.doctor,
      type: appointment.type,
      date: "", // Empty to be filled by user
      time: "", // Empty to be filled by user
      location: appointment.location,
      isPast: false,
      summary: "",
      prescription: "",
    }

    // Set as the appointment being rescheduled
    setRescheduleAppointment(newApp)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewAppointment({
      ...newAppointment,
      [name]: value,
    })
  }

  const handleRescheduleInputChange = (e) => {
    const { name, value } = e.target
    setRescheduleAppointment({
      ...rescheduleAppointment,
      [name]: value,
    })
  }

  const handleSelectChange = (name, value) => {
    setNewAppointment({
      ...newAppointment,
      [name]: value,
    })
  }

  const handleRescheduleSelectChange = (name, value) => {
    setRescheduleAppointment({
      ...rescheduleAppointment,
      [name]: value,
    })
  }

  const getDirectionsUrl = (location) => {
    // Encode the location for use in a Google Maps URL
    const encodedLocation = encodeURIComponent(location)
    return `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`
  }

  // Kenyan hospitals for the location dropdown
  const kenyanHospitals = [
    "Kenyatta National Hospital, Hospital Road, Nairobi",
    "Aga Khan University Hospital, 3rd Parklands Avenue, Nairobi",
    "Nairobi Hospital, Argwings Kodhek Road, Nairobi",
    "Moi Teaching & Referral Hospital, Nandi Road, Eldoret",
    "Coast General Hospital, Moi Avenue, Mombasa",
    "Kisumu County Hospital, Ojijo Oteko Road, Kisumu",
    "Nakuru Level 5 Hospital, Kenyatta Avenue, Nakuru",
    "Machakos Level 5 Hospital, Syokimau Road, Machakos",
    "Nyeri County Referral Hospital, Mumbi Road, Nyeri",
    "Kakamega County Referral Hospital, Kakamega-Kisumu Road, Kakamega",
  ]

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Appointments</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="h-8">
              + New
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Appointment</DialogTitle>
              <DialogDescription>Enter the details for your new medical appointment.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddAppointment} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="doctor">Doctor Name</Label>
                <Input
                  id="doctor"
                  name="doctor"
                  value={newAppointment.doctor}
                  onChange={handleInputChange}
                  placeholder="Dr. Kamau"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Appointment Type</Label>
                <Select
                  value={newAppointment.type}
                  onValueChange={(value) => handleSelectChange("type", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Annual Physical">Annual Physical</SelectItem>
                    <SelectItem value="Cardiology Appointment">Cardiology Appointment</SelectItem>
                    <SelectItem value="Dental Checkup">Dental Checkup</SelectItem>
                    <SelectItem value="Eye Exam">Eye Exam</SelectItem>
                    <SelectItem value="Specialist Consultation">Specialist Consultation</SelectItem>
                    <SelectItem value="Pediatric Checkup">Pediatric Checkup</SelectItem>
                    <SelectItem value="Maternity Appointment">Maternity Appointment</SelectItem>
                    <SelectItem value="Vaccination">Vaccination</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={newAppointment.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={newAppointment.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select
                  value={newAppointment.location}
                  onValueChange={(value) => handleSelectChange("location", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select hospital" />
                  </SelectTrigger>
                  <SelectContent>
                    {kenyanHospitals.map((hospital, index) => (
                      <SelectItem key={index} value={hospital}>
                        {hospital}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit">Add Appointment</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Reschedule Dialog */}
      <Dialog open={rescheduleAppointment !== null} onOpenChange={(open) => !open && setRescheduleAppointment(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
            <DialogDescription>
              {rescheduleAppointment?.id ? "Update your appointment time." : "Book this appointment again."}
            </DialogDescription>
          </DialogHeader>
          {rescheduleAppointment && (
            <form onSubmit={handleRescheduleAppointment} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label>Doctor</Label>
                <div className="p-2 border rounded-md bg-muted/50">{rescheduleAppointment.doctor}</div>
              </div>
              <div className="space-y-2">
                <Label>Appointment Type</Label>
                <div className="p-2 border rounded-md bg-muted/50">{rescheduleAppointment.type}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reschedule-date">Date</Label>
                  <Input
                    id="reschedule-date"
                    name="date"
                    type="date"
                    value={rescheduleAppointment.date}
                    onChange={handleRescheduleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reschedule-time">Time</Label>
                  <Input
                    id="reschedule-time"
                    name="time"
                    type="time"
                    value={rescheduleAppointment.time}
                    onChange={handleRescheduleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <div className="p-2 border rounded-md bg-muted/50">{rescheduleAppointment.location}</div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button type="button" variant="outline" onClick={() => setRescheduleAppointment(null)}>
                  Cancel
                </Button>
                <Button type="submit">{rescheduleAppointment.id ? "Update Appointment" : "Book Appointment"}</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* View Summary Dialog */}
      <Dialog open={viewSummaryAppointment !== null} onOpenChange={(open) => !open && setViewSummaryAppointment(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Appointment Summary</DialogTitle>
            <DialogDescription>Details from your appointment with {viewSummaryAppointment?.doctor}</DialogDescription>
          </DialogHeader>
          {viewSummaryAppointment && (
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Date</h3>
                  <p className="text-sm">{viewSummaryAppointment.date}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Time</h3>
                  <p className="text-sm">{viewSummaryAppointment.time}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Type</h3>
                <p className="text-sm">{viewSummaryAppointment.type}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-1">Location</h3>
                <p className="text-sm">{viewSummaryAppointment.location}</p>
              </div>
              <div className="pt-2 border-t">
                <h3 className="text-sm font-medium mb-1">Doctor's Notes</h3>
                <p className="text-sm p-3 bg-muted/50 rounded-md">{viewSummaryAppointment.summary}</p>
              </div>
              {viewSummaryAppointment.prescription && (
                <div>
                  <h3 className="text-sm font-medium mb-1">Prescription</h3>
                  <p className="text-sm p-3 bg-muted/50 rounded-md">{viewSummaryAppointment.prescription}</p>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setViewSummaryAppointment(null)}>
                  Close
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4 mt-4">
          {appointments
            .filter((app) => !app.isPast)
            .map((appointment) => (
              <Card key={appointment.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{appointment.doctor}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{appointment.type}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{appointment.location}</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setRescheduleAppointment({ ...appointment })}
                      >
                        Reschedule
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          window.open(getDirectionsUrl(appointment.location), "_blank")
                          toast({
                            title: "Opening directions",
                            description: "Directions to " + appointment.location.split(",")[0],
                            duration: 3000,
                          })
                        }}
                      >
                        Directions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

          {appointments.filter((app) => !app.isPast).length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No upcoming appointments</p>
              <Button variant="outline" size="sm" className="mt-2" onClick={() => setIsDialogOpen(true)}>
                Schedule an appointment
              </Button>
            </div>
          )}
        </TabsContent>
        <TabsContent value="past" className="space-y-4 mt-4">
          {appointments
            .filter((app) => app.isPast)
            .map((appointment) => (
              <Card key={appointment.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{appointment.doctor}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{appointment.type}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{appointment.location}</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setViewSummaryAppointment(appointment)}
                      >
                        View Summary
                      </Button>
                      <Button size="sm" className="flex-1" onClick={() => handleBookAgain(appointment)}>
                        Book Again
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

          {appointments.filter((app) => app.isPast).length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No past appointments</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  )
}

