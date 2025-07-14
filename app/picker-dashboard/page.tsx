"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { 
  Truck, 
  CheckSquare, 
  Clock, 
  Calendar, 
  ArrowRight, 
  MapPin, 
  Route,
  Fuel,
  AlertTriangle,
  Star,
  Navigation,
  Camera,
  Phone,
  MessageSquare,
  DollarSign,
  Target,
  Zap,
  Timer,
  TrendingUp,
  Users,
  Settings,
  Bell
} from "lucide-react"

interface Assignment {
  id: string
  type: string
  customerName: string
  address: string
  scheduledTime: string
  estimatedDuration: number
  priority: "low" | "medium" | "high" | "urgent"
  status: "pending" | "in_progress" | "completed" | "delayed"
  specialInstructions?: string
  customerPhone?: string
  estimatedWeight?: number
  wasteTypes: string[]
  earnings: number
  distance: number
}

export default function PickerDashboardPage() {
  const { toast } = useToast()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "A001",
      type: "General Waste",
      customerName: "Johnson Family",
      address: "123 Main Street, Downtown",
      scheduledTime: "10:00 AM",
      estimatedDuration: 25,
      priority: "high",
      status: "pending",
      specialInstructions: "Gate access code: 1234. Large bins behind house.",
      customerPhone: "+1-555-0101",
      estimatedWeight: 45,
      wasteTypes: ["General Waste", "Cardboard"],
      earnings: 15.50,
      distance: 2.3
    },
    {
      id: "A002", 
      type: "Recyclables",
      customerName: "Green Tech Office",
      address: "456 Park Avenue, Business District",
      scheduledTime: "11:30 AM",
      estimatedDuration: 20,
      priority: "urgent",
      status: "pending",
      specialInstructions: "Loading dock on side entrance. Contact security first.",
      customerPhone: "+1-555-0102",
      estimatedWeight: 32,
      wasteTypes: ["Recyclables", "Electronic Waste"],
      earnings: 22.00,
      distance: 4.1
    },
    {
      id: "A003",
      type: "Organic Waste",
      customerName: "Riverside Restaurant", 
      address: "789 Oak Drive, Riverside",
      scheduledTime: "1:00 PM",
      estimatedDuration: 15,
      priority: "medium",
      status: "pending",
      specialInstructions: "Weekly pickup. Bins are marked with restaurant logo.",
      customerPhone: "+1-555-0103",
      estimatedWeight: 28,
      wasteTypes: ["Organic Waste"],
      earnings: 12.75,
      distance: 1.8
    }
  ])
  
  const [dailyStats, setDailyStats] = useState({
    totalAssignments: 8,
    completed: 3,
    inProgress: 1,
    pending: 4,
    totalEarnings: 127.50,
    avgCompletionTime: 22,
    fuelEfficiency: 8.2,
    customerRating: 4.8,
    totalDistance: 45.7
  })

  const [vehicleStatus, setVehicleStatus] = useState({
    fuelLevel: 78,
    loadCapacity: 45,
    maintenanceAlert: false,
    location: "Downtown Collection Route"
  })

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const handleStartCollection = (assignmentId: string) => {
    setAssignments(prev => prev.map(assignment => 
      assignment.id === assignmentId 
        ? { ...assignment, status: "in_progress" }
        : assignment
    ))
    
    toast({
      title: "Collection Started",
      description: `Started collection for assignment ${assignmentId}. Navigation will begin automatically.`,
      duration: 4000,
    })
  }

  const handleCompleteCollection = (assignmentId: string) => {
    const assignment = assignments.find(a => a.id === assignmentId)
    if (!assignment) return

    setAssignments(prev => prev.map(a => 
      a.id === assignmentId 
        ? { ...a, status: "completed" }
        : a
    ))
    
    setDailyStats(prev => ({
      ...prev,
      completed: prev.completed + 1,
      pending: prev.pending - 1,
      totalEarnings: prev.totalEarnings + assignment.earnings
    }))

    toast({
      title: "Collection Completed!",
      description: `Earned $${assignment.earnings.toFixed(2)}. Upload photos and get signature to finalize.`,
      duration: 5000,
    })
  }

  const handleCallCustomer = (phone: string, customerName: string) => {
    toast({
      title: "Calling Customer",
      description: `Initiating call to ${customerName} at ${phone}`,
      duration: 3000,
    })
  }

  const handleNavigate = (address: string) => {
    toast({
      title: "Navigation Started",
      description: `Opening GPS navigation to ${address}`,
      duration: 3000,
    })
  }

  const getPriorityColor = (priority: Assignment["priority"]) => {
    switch (priority) {
      case "urgent": return "bg-red-500"
      case "high": return "bg-orange-500"
      case "medium": return "bg-yellow-500"
      case "low": return "bg-green-500"
      default: return "bg-gray-500"
    }
  }

  const getStatusColor = (status: Assignment["status"]) => {
    switch (status) {
      case "completed": return "text-green-600"
      case "in_progress": return "text-blue-600"
      case "delayed": return "text-red-600"
      case "pending": return "text-orange-600"
      default: return "text-gray-600"
    }
  }

  return (
    <div className="container py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Waste Picker Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Current time: {currentTime.toLocaleTimeString()} | 
            Vehicle: {vehicleStatus.location}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/picker-dashboard/assignments">
              <Route className="mr-2 h-4 w-4" />
              Route Optimizer
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/picker-dashboard/performance">
              <TrendingUp className="mr-2 h-4 w-4" />
              Performance
            </Link>
          </Button>
        </div>
      </div>

      {/* Real-time Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Progress</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dailyStats.completed}/{dailyStats.totalAssignments}</div>
            <Progress value={(dailyStats.completed / dailyStats.totalAssignments) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {dailyStats.pending} pending, {dailyStats.inProgress} in progress
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${dailyStats.totalEarnings.toFixed(2)}</div>
            <p className="text-xs text-green-600">+${(dailyStats.totalEarnings * 0.15).toFixed(2)} efficiency bonus</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vehicle Status</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Fuel: {vehicleStatus.fuelLevel}%</span>
                <span>Load: {vehicleStatus.loadCapacity}%</span>
              </div>
              <Progress value={vehicleStatus.fuelLevel} className="h-2" />
              <Progress value={vehicleStatus.loadCapacity} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dailyStats.customerRating}/5</div>
            <p className="text-xs text-muted-foreground">
              Avg time: {dailyStats.avgCompletionTime}min | {dailyStats.totalDistance}km today
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Camera className="h-6 w-6" />
              <span className="text-xs">Photo Verification</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <MessageSquare className="h-6 w-6" />
              <span className="text-xs">Contact Dispatch</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <AlertTriangle className="h-6 w-6" />
              <span className="text-xs">Report Issue</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Bell className="h-6 w-6" />
              <span className="text-xs">Emergency</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Assignment Management Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">Active Route ({assignments.filter(a => a.status !== "completed").length})</TabsTrigger>
          <TabsTrigger value="priority">Priority</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Today's Collection Route</span>
                <Badge variant="outline">Optimized for efficiency</Badge>
              </CardTitle>
              <CardDescription>
                Assignments ordered by proximity and priority. Estimated total time: 3h 45min
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {assignments.map((assignment, index) => (
                <div 
                  key={assignment.id} 
                  className={`flex items-center gap-4 rounded-lg border p-4 transition-all ${
                    assignment.status === "in_progress" ? "bg-blue-50 border-blue-200" :
                    assignment.status === "completed" ? "bg-green-50 border-green-200" :
                    "hover:bg-muted/50"
                  }`}
                >
                  {/* Route Number */}
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {index + 1}
                  </div>

                  {/* Priority Badge */}
                  <div className={`w-3 h-3 rounded-full ${getPriorityColor(assignment.priority)}`} 
                       title={`${assignment.priority} priority`} />

                  {/* Assignment Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{assignment.customerName}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(assignment.status)}>
                          {assignment.status.replace("_", " ")}
                        </Badge>
                        <span className="text-sm font-medium text-green-600">
                          +${assignment.earnings.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {assignment.address}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {assignment.scheduledTime} ({assignment.estimatedDuration}min)
                      </div>
                      <div className="flex items-center gap-1">
                        <Route className="h-3 w-3" />
                        {assignment.distance}km away
                      </div>
                    </div>

                    {assignment.specialInstructions && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded p-2 text-sm">
                        <strong>Instructions:</strong> {assignment.specialInstructions}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1">
                      {assignment.wasteTypes.map(type => (
                        <Badge key={type} variant="secondary" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    {assignment.status === "pending" && (
                      <>
                        <Button 
                          size="sm"
                          onClick={() => handleStartCollection(assignment.id)}
                        >
                          Start Collection
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleNavigate(assignment.address)}
                        >
                          <Navigation className="h-3 w-3 mr-1" />
                          Navigate
                        </Button>
                      </>
                    )}
                    
                    {assignment.status === "in_progress" && (
                      <>
                        <Button 
                          size="sm"
                          onClick={() => handleCompleteCollection(assignment.id)}
                        >
                          Complete
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                        >
                          <Camera className="h-3 w-3 mr-1" />
                          Photo
                        </Button>
                      </>
                    )}

                    {assignment.customerPhone && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCallCustomer(assignment.customerPhone!, assignment.customerName)}
                      >
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="gap-1" asChild>
                <Link href="/picker-dashboard/assignments">
                  View detailed route map
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="priority" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Priority Assignments
              </CardTitle>
              <CardDescription>Urgent and high-priority collections that need immediate attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {assignments
                .filter(a => a.priority === "urgent" || a.priority === "high")
                .map(assignment => (
                  <div key={assignment.id} className="border border-red-200 bg-red-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${getPriorityColor(assignment.priority)}`} />
                        <div>
                          <h3 className="font-semibold">{assignment.customerName}</h3>
                          <p className="text-sm text-muted-foreground">{assignment.address}</p>
                        </div>
                      </div>
                      <Badge variant="destructive">
                        {assignment.priority.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Completed Collections</CardTitle>
              <CardDescription>Successfully completed waste collections with earnings summary</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <CheckSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Completed collections will appear here</p>
                <p className="text-sm">Total earnings from completed: ${dailyStats.totalEarnings.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Route Map View
              </CardTitle>
              <CardDescription>Interactive map with all assignments and optimized route</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Interactive map will be loaded here</p>
                  <p className="text-sm text-muted-foreground">Integration with GPS navigation coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

