"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { 
  User, Mail, Phone, MapPin, Calendar, Shield, Bell, 
  Camera, Edit, Save, Award, Recycle, Star, TrendingUp,
  Truck, Route, Clock, DollarSign, Target, Zap
} from "lucide-react"

export default function PickerProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  
  const [profile, setProfile] = useState({
    id: "WP001",
    name: "Maria Garcia",
    email: "maria@example.com",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Avenue, City, ST 12345",
    joinDate: "2024-02-01",
    profileImage: "/placeholder-user.jpg",
    bio: "Experienced waste picker committed to environmental sustainability and efficient collection routes.",
    vehicleId: "TRK-005",
    licenseNumber: "CDL-789456",
    emergencyContact: {
      name: "Carlos Garcia",
      phone: "+1 (555) 123-9876",
      relationship: "Spouse"
    },
    preferences: {
      startTime: "06:00",
      maxRoutes: 8,
      preferredAreas: ["Downtown", "Residential North"]
    }
  })

  const performanceStats = [
    {
      label: "Total Collections",
      value: "142",
      icon: Recycle,
      color: "text-green-600",
      change: "+8 this week"
    },
    {
      label: "Total Earnings",
      value: "$2,840",
      icon: DollarSign,
      color: "text-blue-600",
      change: "+$340 this week"
    },
    {
      label: "Efficiency Rate",
      value: "94%",
      icon: Target,
      color: "text-purple-600",
      change: "+2% this month"
    },
    {
      label: "Route Completion",
      value: "98%",
      icon: Route,
      color: "text-orange-600",
      change: "Perfect record"
    }
  ]

  const recentAchievements = [
    {
      id: "1",
      title: "Speed Demon",
      description: "Completed 10 routes in record time",
      date: "2024-03-20",
      icon: "⚡",
      category: "Speed"
    },
    {
      id: "2", 
      title: "Efficiency Expert",
      description: "Maintained 95%+ efficiency for 30 days",
      date: "2024-03-15",
      icon: "🎯",
      category: "Efficiency"
    },
    {
      id: "3",
      title: "Safety First",
      description: "Zero incidents for 6 months",
      date: "2024-03-10",
      icon: "🛡️",
      category: "Safety"
    }
  ]

  const vehicleInfo = {
    id: "TRK-005",
    make: "Ford",
    model: "F-150",
    year: "2022",
    plateNumber: "ECO-789",
    lastMaintenance: "2024-03-15",
    nextMaintenance: "2024-04-15",
    fuelEfficiency: "18 MPG",
    status: "Active"
  }

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully")
    setIsEditing(false)
  }

  const handleImageUpload = () => {
    toast.success("Profile image updated")
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Waste Picker Profile</h1>
          <p className="text-muted-foreground">Manage your picker account and performance</p>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveProfile}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={profile.profileImage} alt={profile.name} />
                    <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{profile.name}</h3>
                    <p className="text-sm text-muted-foreground">Waste Picker ID: {profile.id}</p>
                    <p className="text-sm text-muted-foreground">Member since {new Date(profile.joinDate).toLocaleDateString()}</p>
                    <Button variant="outline" size="sm" className="mt-2" onClick={handleImageUpload}>
                      <Camera className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={profile.address}
                      onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license">License Number</Label>
                    <Input
                      id="license"
                      value={profile.licenseNumber}
                      onChange={(e) => setProfile(prev => ({ ...prev, licenseNumber: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicle">Assigned Vehicle</Label>
                    <Input
                      id="vehicle"
                      value={profile.vehicleId}
                      disabled
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                    disabled={!isEditing}
                    rows={3}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Emergency Contact</h4>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="emergency-name">Name</Label>
                      <Input
                        id="emergency-name"
                        value={profile.emergencyContact.name}
                        onChange={(e) => setProfile(prev => ({ 
                          ...prev, 
                          emergencyContact: { ...prev.emergencyContact, name: e.target.value }
                        }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergency-phone">Phone</Label>
                      <Input
                        id="emergency-phone"
                        value={profile.emergencyContact.phone}
                        onChange={(e) => setProfile(prev => ({ 
                          ...prev, 
                          emergencyContact: { ...prev.emergencyContact, phone: e.target.value }
                        }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergency-relationship">Relationship</Label>
                      <Input
                        id="emergency-relationship"
                        value={profile.emergencyContact.relationship}
                        onChange={(e) => setProfile(prev => ({ 
                          ...prev, 
                          emergencyContact: { ...prev.emergencyContact, relationship: e.target.value }
                        }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Work Preferences</CardTitle>
                <CardDescription>Your work schedule and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="start-time">Preferred Start Time</Label>
                  <Input
                    id="start-time"
                    type="time"
                    value={profile.preferences.startTime}
                    onChange={(e) => setProfile(prev => ({ 
                      ...prev, 
                      preferences: { ...prev.preferences, startTime: e.target.value }
                    }))}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-routes">Max Routes per Day</Label>
                  <Select 
                    value={profile.preferences.maxRoutes.toString()}
                    onValueChange={(value) => setProfile(prev => ({ 
                      ...prev, 
                      preferences: { ...prev.preferences, maxRoutes: parseInt(value) }
                    }))}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 routes</SelectItem>
                      <SelectItem value="8">8 routes</SelectItem>
                      <SelectItem value="10">10 routes</SelectItem>
                      <SelectItem value="12">12 routes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Preferred Areas</Label>
                  <div className="space-y-2">
                    {profile.preferences.preferredAreas.map((area, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Badge variant="secondary">{area}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {performanceStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Your performance over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Daily Average Collections</span>
                    <span className="font-medium">4.7</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Route Efficiency</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Customer Satisfaction</span>
                    <span className="font-medium">4.9/5</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Safety Score</span>
                    <span className="font-medium">100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vehicle" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Information</CardTitle>
              <CardDescription>Details about your assigned vehicle</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Vehicle ID:</span>
                    <span className="text-sm">{vehicleInfo.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Make & Model:</span>
                    <span className="text-sm">{vehicleInfo.make} {vehicleInfo.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Year:</span>
                    <span className="text-sm">{vehicleInfo.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Plate Number:</span>
                    <span className="text-sm">{vehicleInfo.plateNumber}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Status:</span>
                    <Badge variant="default">{vehicleInfo.status}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Fuel Efficiency:</span>
                    <span className="text-sm">{vehicleInfo.fuelEfficiency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Last Maintenance:</span>
                    <span className="text-sm">{new Date(vehicleInfo.lastMaintenance).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Next Maintenance:</span>
                    <span className="text-sm">{new Date(vehicleInfo.nextMaintenance).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>Your latest accomplishments and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{achievement.title}</h4>
                        <Badge variant="outline">{achievement.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Earned on {new Date(achievement.date).toLocaleDateString()}
                      </p>
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