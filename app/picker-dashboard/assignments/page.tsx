"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { 
  MapPin, 
  Navigation, 
  Route, 
  Clock, 
  Fuel,
  AlertTriangle,
  CheckCircle,
  Phone,
  Camera,
  Target,
  Zap,
  RefreshCw,
  MapIcon,
  List,
  Timer,
  TrendingUp,
  Calendar,
  Users
} from "lucide-react"

interface Assignment {
  id: string
  customerName: string
  address: string
  coordinates: { lat: number; lng: number }
  scheduledTime: string
  estimatedDuration: number
  priority: "low" | "medium" | "high" | "urgent"
  status: "pending" | "in_progress" | "completed" | "delayed"
  specialInstructions?: string
  customerPhone?: string
  wasteTypes: string[]
  earnings: number
  distance: number
}

interface RouteOptimization {
  totalDistance: number
  estimatedTime: number
  fuelCost: number
  optimizationSavings: {
    distance: number
    time: number
    fuel: number
  }
}

export default function AssignmentsPage() {
  const { toast } = useToast()
  const [currentLocation, setCurrentLocation] = useState({ lat: 40.7128, lng: -74.0060 })
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [routeOptimization, setRouteOptimization] = useState<RouteOptimization>({
    totalDistance: 23.7,
    estimatedTime: 225,
    fuelCost: 12.50,
    optimizationSavings: {
      distance: 5.2,
      time: 45,
      fuel: 3.75
    }
  })

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "A001",
      customerName: "Johnson Family",
      address: "123 Main Street, Downtown",
      coordinates: { lat: 40.7589, lng: -73.9851 },
      scheduledTime: "10:00 AM",
      estimatedDuration: 25,
      priority: "high",
      status: "pending",
      specialInstructions: "Gate access code: 1234. Large bins behind house.",
      customerPhone: "+1-555-0101",
      wasteTypes: ["General Waste", "Cardboard"],
      earnings: 15.50,
      distance: 2.3
    },
    {
      id: "A002",
      customerName: "Green Tech Office",
      address: "456 Park Avenue, Business District",
      coordinates: { lat: 40.7505, lng: -73.9934 },
      scheduledTime: "11:30 AM",
      estimatedDuration: 20,
      priority: "urgent",
      status: "pending",
      specialInstructions: "Loading dock on side entrance. Contact security first.",
      customerPhone: "+1-555-0102",
      wasteTypes: ["Recyclables", "Electronic Waste"],
      earnings: 22.00,
      distance: 4.1
    },
    {
      id: "A003",
      customerName: "Riverside Restaurant",
      address: "789 Oak Drive, Riverside",
      coordinates: { lat: 40.7282, lng: -74.0776 },
      scheduledTime: "1:00 PM",
      estimatedDuration: 15,
      priority: "medium",
      status: "pending",
      specialInstructions: "Weekly pickup. Bins are marked with restaurant logo.",
      customerPhone: "+1-555-0103",
      wasteTypes: ["Organic Waste"],
      earnings: 12.75,
      distance: 1.8
    },
    {
      id: "A004",
      customerName: "City Mall Complex",
      address: "321 Shopping Center Dr",
      coordinates: { lat: 40.7614, lng: -73.9776 },
      scheduledTime: "2:30 PM",
      estimatedDuration: 40,
      priority: "high",
      status: "pending",
      specialInstructions: "Use service entrance B. Large volume pickup.",
      customerPhone: "+1-555-0104",
      wasteTypes: ["General Waste", "Recyclables", "Cardboard"],
      earnings: 35.00,
      distance: 3.2
    }
  ])

  const [traffic, setTraffic] = useState({
    currentConditions: "moderate",
    delays: [
      { route: "Main St to Park Ave", delay: "15 min", reason: "Construction" },
      { route: "Downtown Bridge", delay: "8 min", reason: "Heavy traffic" }
    ],
    alternativeRoutes: 2
  })

  const [weather, setWeather] = useState({
    current: "Sunny",
    temperature: "72°F",
    conditions: "Clear skies",
    alerts: []
  })

  const handleOptimizeRoute = async () => {
    setIsOptimizing(true)
    
    // Simulate route optimization API call
    setTimeout(() => {
      setIsOptimizing(false)
      const newOptimization = {
        totalDistance: 18.5,
        estimatedTime: 180,
        fuelCost: 8.75,
        optimizationSavings: {
          distance: 5.2,
          time: 45,
          fuel: 3.75
        }
      }
      setRouteOptimization(newOptimization)
      
      toast({
        title: "Route Optimized!",
        description: `Saved ${newOptimization.optimizationSavings.time} minutes and $${newOptimization.optimizationSavings.fuel.toFixed(2)} in fuel costs.`,
        duration: 5000,
      })
    }, 3000)
  }

  const handleStartNavigation = (assignment: Assignment) => {
    toast({
      title: "Navigation Started",
      description: `GPS navigation to ${assignment.customerName} has begun. ETA: ${assignment.estimatedDuration} minutes.`,
      duration: 4000,
    })
  }

  const handleEmergencyRoute = () => {
    toast({
      title: "Emergency Mode Activated",
      description: "Fastest route calculated. Emergency services have been notified of your route.",
      duration: 6000,
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

  // Simulate real-time location updates
  useEffect(() => {
    const locationTimer = setInterval(() => {
      // Simulate small GPS movements
      setCurrentLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }))
    }, 10000)

    return () => clearInterval(locationTimer)
  }, [])

  return (
    <div className="container py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Route & Navigation</h1>
          <p className="text-muted-foreground">
            GPS-optimized collection routes with real-time traffic updates
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={handleOptimizeRoute} 
            disabled={isOptimizing}
            variant="outline"
          >
            {isOptimizing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Optimizing...
              </>
            ) : (
              <>
                <Route className="mr-2 h-4 w-4" />
                Optimize Route
              </>
            )}
          </Button>
          <Button variant="destructive" onClick={handleEmergencyRoute}>
            <AlertTriangle className="mr-2 h-4 w-4" />
            Emergency
          </Button>
        </div>
      </div>

      {/* Route Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Distance</CardTitle>
            <Route className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{routeOptimization.totalDistance} km</div>
            <p className="text-xs text-green-600">
              -{routeOptimization.optimizationSavings.distance} km optimized
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estimated Time</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.floor(routeOptimization.estimatedTime / 60)}h {routeOptimization.estimatedTime % 60}m</div>
            <p className="text-xs text-green-600">
              -{routeOptimization.optimizationSavings.time}min saved
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fuel Cost</CardTitle>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${routeOptimization.fuelCost.toFixed(2)}</div>
            <p className="text-xs text-green-600">
              -${routeOptimization.optimizationSavings.fuel.toFixed(2)} saved
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Traffic Status</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{traffic.currentConditions}</div>
            <p className="text-xs text-muted-foreground">
              {traffic.alternativeRoutes} alternate routes available
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Alerts */}
      {traffic.delays.length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <AlertTriangle className="h-5 w-5" />
              Traffic Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {traffic.delays.map((delay, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="font-medium">{delay.route}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-amber-700">
                      +{delay.delay}
                    </Badge>
                    <span className="text-muted-foreground">{delay.reason}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="map" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="map">
            <MapIcon className="mr-2 h-4 w-4" />
            Map View
          </TabsTrigger>
          <TabsTrigger value="list">
            <List className="mr-2 h-4 w-4" />
            Assignment List
          </TabsTrigger>
          <TabsTrigger value="navigation">
            <Navigation className="mr-2 h-4 w-4" />
            Turn-by-Turn
          </TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Interactive Route Map</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{weather.current} {weather.temperature}</Badge>
                  <Badge variant="secondary">Live GPS Tracking</Badge>
                </div>
              </CardTitle>
              <CardDescription>
                Real-time map with optimized route, traffic conditions, and assignment locations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-96 relative border-2 border-dashed border-muted-foreground/20">
                {/* Simulated Map Interface */}
                <div className="absolute inset-4 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <MapIcon className="h-16 w-16 mx-auto text-muted-foreground" />
                    <div>
                      <p className="text-lg font-semibold">Interactive GPS Map</p>
                      <p className="text-sm text-muted-foreground">
                        Current Location: {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map Controls Overlay */}
                <div className="absolute top-4 right-4 space-y-2">
                  <Button size="sm" variant="secondary">
                    <Target className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Zap className="h-4 w-4" />
                  </Button>
                </div>

                {/* Route Progress Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <Card className="p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Route Progress</span>
                      <span>2 of 4 assignments</span>
                    </div>
                    <Progress value={50} className="mt-2" />
                  </Card>
                </div>
              </div>

              {/* Map Legend */}
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Urgent Priority</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span>High Priority</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Current Location</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Completed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Optimized Assignment Sequence</CardTitle>
              <CardDescription>
                Assignments ordered by efficiency, considering traffic, priority, and proximity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {assignments.map((assignment, index) => (
                <div key={assignment.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    {/* Route Number */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                      {index + 1}
                    </div>

                    {/* Priority Indicator */}
                    <div className={`w-4 h-4 rounded-full ${getPriorityColor(assignment.priority)}`} />

                    {/* Assignment Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{assignment.customerName}</h3>
                        <Badge variant="outline" className={getStatusColor(assignment.status)}>
                          {assignment.status.replace("_", " ")}
                        </Badge>
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
                    </div>

                    {/* Navigation Actions */}
                    <div className="flex flex-col gap-2">
                      <Button size="sm" onClick={() => handleStartNavigation(assignment)}>
                        <Navigation className="h-3 w-3 mr-1" />
                        Navigate
                      </Button>
                      {assignment.customerPhone && (
                        <Button variant="outline" size="sm">
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="navigation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5" />
                Turn-by-Turn Navigation
              </CardTitle>
              <CardDescription>
                Detailed directions to your next assignment with real-time updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Current Navigation */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">En Route to: Johnson Family</h4>
                    <Badge>2.3 km remaining</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="font-medium">Turn right on Main Street in 0.3 km</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                      <span>Continue straight for 1.5 km</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                      <span>Turn left on Oak Drive</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span>Arrive at destination on right</span>
                    </div>
                  </div>
                </div>

                {/* Navigation Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">8</div>
                    <div className="text-xs text-muted-foreground">Minutes remaining</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">45</div>
                    <div className="text-xs text-muted-foreground">km/h avg speed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">10:15</div>
                    <div className="text-xs text-muted-foreground">Estimated arrival</div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Customer
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Report Issue
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

