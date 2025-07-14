"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Recycle, Trash2, Truck, CalendarIcon, Clock, MapPin, CheckCircle, AlertCircle } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function SchedulePage() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date>()
  const [scheduleType, setScheduleType] = useState("regular")
  const [wasteType, setWasteType] = useState("")
  const [timeSlot, setTimeSlot] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [scheduledCollections, setScheduledCollections] = useState([
    {
      id: 1,
      type: "General Waste",
      date: "Tomorrow",
      time: "8:00 AM",
      status: "scheduled",
      icon: Trash2,
      color: "gray"
    },
    {
      id: 2,
      type: "Recyclables",
      date: "Friday",
      time: "9:00 AM", 
      status: "scheduled",
      icon: Recycle,
      color: "blue"
    },
    {
      id: 3,
      type: "Organic Waste",
      date: "Sunday",
      time: "7:00 AM",
      status: "pending",
      icon: Truck,
      color: "green"
    }
  ])

  const handleScheduleSubmit = async () => {
    if (!date || !wasteType || !timeSlot) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to schedule a collection.",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      const newCollection = {
        id: scheduledCollections.length + 1,
        type: wasteType,
        date: format(date, "MMMM do"),
        time: timeSlot,
        status: "scheduled",
        icon: wasteType.includes("Recycle") ? Recycle : Trash2,
        color: wasteType.includes("Recycle") ? "blue" : "gray"
      }
      
      setScheduledCollections(prev => [...prev, newCollection])
      setIsSubmitting(false)
      
      // Reset form
      setDate(undefined)
      setWasteType("")
      setTimeSlot("")
      
      toast({
        title: "Collection Scheduled!",
        description: `Your ${wasteType} collection has been scheduled for ${format(date, "MMMM do")} at ${timeSlot}.`,
        duration: 4000,
      })
    }, 2000)
  }

  const handleReschedule = (collectionId: number, collectionType: string) => {
    toast({
      title: "Reschedule Request",
      description: `Reschedule request for ${collectionType} has been submitted. You'll receive confirmation within 24 hours.`,
      duration: 4000,
    })
  }

  const handleCancel = (collectionId: number, collectionType: string) => {
    setScheduledCollections(prev => 
      prev.filter(collection => collection.id !== collectionId)
    )
    
    toast({
      title: "Collection Cancelled",
      description: `Your ${collectionType} collection has been cancelled.`,
      duration: 3000,
    })
  }

  return (
    <div className="container py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Collection Schedule</h1>
        <p className="text-muted-foreground">View upcoming collections and schedule new pickups.</p>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Collections</TabsTrigger>
          <TabsTrigger value="schedule">Schedule Collection</TabsTrigger>
          <TabsTrigger value="history">Collection History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {scheduledCollections.map((collection) => (
              <Card key={collection.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <collection.icon className={`h-5 w-5 text-${collection.color}-500`} />
                    {collection.type}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    {collection.status === "scheduled" ? (
                      <CheckCircle className="h-3 w-3 text-green-500" />
                    ) : (
                      <Clock className="h-3 w-3 text-amber-500" />
                    )}
                    {collection.status === "scheduled" ? "Confirmed" : "Pending Confirmation"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <span>{collection.date}, {collection.time}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Curbside Pickup</span>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleReschedule(collection.id, collection.type)}
                  >
                    Reschedule
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleCancel(collection.id, collection.type)}
                  >
                    Cancel
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Schedule New Collection</CardTitle>
              <CardDescription>Request a waste collection pickup for your location.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="waste-type">Waste Type</Label>
                  <Select value={wasteType} onValueChange={setWasteType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select waste type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General Waste">General Waste</SelectItem>
                      <SelectItem value="Recyclables">Recyclables</SelectItem>
                      <SelectItem value="Organic Waste">Organic Waste</SelectItem>
                      <SelectItem value="Electronic Waste">Electronic Waste</SelectItem>
                      <SelectItem value="Hazardous Waste">Hazardous Waste</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time-slot">Preferred Time</Label>
                  <Select value={timeSlot} onValueChange={setTimeSlot}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7:00 AM - 9:00 AM">7:00 AM - 9:00 AM</SelectItem>
                      <SelectItem value="9:00 AM - 11:00 AM">9:00 AM - 11:00 AM</SelectItem>
                      <SelectItem value="11:00 AM - 1:00 PM">11:00 AM - 1:00 PM</SelectItem>
                      <SelectItem value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</SelectItem>
                      <SelectItem value="3:00 PM - 5:00 PM">3:00 PM - 5:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Preferred Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea 
                  id="notes"
                  placeholder="Any special instructions or notes for the collection team..."
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={handleScheduleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Scheduling..." : "Schedule Collection"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Collection History</CardTitle>
              <CardDescription>View your past waste collections and their status.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: "General Waste", date: "March 15, 2024", status: "Completed", time: "8:30 AM" },
                  { type: "Recyclables", date: "March 12, 2024", status: "Completed", time: "9:15 AM" },
                  { type: "Organic Waste", date: "March 10, 2024", status: "Completed", time: "7:45 AM" },
                  { type: "Electronic Waste", date: "March 8, 2024", status: "Completed", time: "10:00 AM" },
                ].map((record, index) => (
                  <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium">{record.type}</p>
                        <p className="text-sm text-muted-foreground">{record.date} at {record.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                        {record.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

