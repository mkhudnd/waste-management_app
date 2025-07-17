"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { 
  Settings, Shield, Bell, Clock, Truck, Route, 
  MapPin, AlertTriangle, Volume2, Smartphone, Globe
} from "lucide-react"

export default function PickerSettingsPage() {
  const [activeTab, setActiveTab] = useState("work")
  
  const [workSettings, setWorkSettings] = useState({
    startTime: "06:00",
    endTime: "14:00",
    maxRoutes: 8,
    breakDuration: 30,
    preferredAreas: ["Downtown", "Residential North"],
    avoidAreas: ["Industrial Zone"],
    acceptUrgentRoutes: true,
    workWeekends: false
  })

  const [notificationSettings, setNotificationSettings] = useState({
    newAssignments: true,
    routeUpdates: true,
    emergencyAlerts: true,
    paymentUpdates: true,
    performanceReports: true,
    maintenanceAlerts: true,
    weatherAlerts: true,
    trafficAlerts: true,
    smsNotifications: true,
    emailNotifications: true,
    pushNotifications: true,
    soundEnabled: true,
    vibrationEnabled: true
  })

  const [safetySettings, setSafetySettings] = useState({
    gpsTracking: true,
    emergencyButton: true,
    speedLimiting: true,
    restBreakReminders: true,
    hazardReporting: true,
    weatherWarnings: true,
    nightModeEnabled: true,
    safetyCheckIn: true,
    emergencyContactNotify: true
  })

  const [vehicleSettings, setVehicleSettings] = useState({
    fuelAlerts: true,
    maintenanceReminders: true,
    inspectionReminders: true,
    mileageTracking: true,
    fuelEfficiencyReports: true,
    vehicleLocation: true,
    diagnosticAlerts: true
  })

  const handleWorkSettingChange = (setting: keyof typeof workSettings, value: any) => {
    setWorkSettings(prev => ({ ...prev, [setting]: value }))
    toast.success(`Work preference updated`)
  }

  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: !prev[setting] }))
    toast.success(`Notification setting updated`)
  }

  const handleSafetyToggle = (setting: keyof typeof safetySettings) => {
    setSafetySettings(prev => ({ ...prev, [setting]: !prev[setting] }))
    toast.success(`Safety setting updated`)
  }

  const handleVehicleToggle = (setting: keyof typeof vehicleSettings) => {
    setVehicleSettings(prev => ({ ...prev, [setting]: !prev[setting] }))
    toast.success(`Vehicle setting updated`)
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Picker Settings</h1>
          <p className="text-muted-foreground">Configure your work preferences and safety settings</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="work">Work Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
          <TabsTrigger value="vehicle">Vehicle</TabsTrigger>
        </TabsList>

        <TabsContent value="work" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Work Schedule
                </CardTitle>
                <CardDescription>Set your preferred working hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input
                      id="start-time"
                      type="time"
                      value={workSettings.startTime}
                      onChange={(e) => handleWorkSettingChange('startTime', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time">End Time</Label>
                    <Input
                      id="end-time"
                      type="time"
                      value={workSettings.endTime}
                      onChange={(e) => handleWorkSettingChange('endTime', e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-routes">Maximum Routes per Day</Label>
                  <Select 
                    value={workSettings.maxRoutes.toString()}
                    onValueChange={(value) => handleWorkSettingChange('maxRoutes', parseInt(value))}
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
                  <Label htmlFor="break-duration">Break Duration (minutes)</Label>
                  <Select 
                    value={workSettings.breakDuration.toString()}
                    onValueChange={(value) => handleWorkSettingChange('breakDuration', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Accept Urgent Routes</Label>
                    <p className="text-sm text-muted-foreground">Get priority assignments</p>
                  </div>
                  <Switch 
                    checked={workSettings.acceptUrgentRoutes}
                    onCheckedChange={(checked) => handleWorkSettingChange('acceptUrgentRoutes', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Work Weekends</Label>
                    <p className="text-sm text-muted-foreground">Available for weekend shifts</p>
                  </div>
                  <Switch 
                    checked={workSettings.workWeekends}
                    onCheckedChange={(checked) => handleWorkSettingChange('workWeekends', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Area Preferences
                </CardTitle>
                <CardDescription>Choose your preferred work areas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Preferred Areas</Label>
                  <div className="flex flex-wrap gap-2">
                    {workSettings.preferredAreas.map((area, index) => (
                      <Badge key={index} variant="default">{area}</Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm">Add Area</Button>
                </div>
                <div className="space-y-2">
                  <Label>Areas to Avoid</Label>
                  <div className="flex flex-wrap gap-2">
                    {workSettings.avoidAreas.map((area, index) => (
                      <Badge key={index} variant="destructive">{area}</Badge>
                    ))}
                  </div>
                  <Button variant="outline" size="sm">Add Area</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Work Notifications
                </CardTitle>
                <CardDescription>Manage work-related notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>New Assignments</Label>
                    <p className="text-sm text-muted-foreground">Route assignments and updates</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.newAssignments}
                    onCheckedChange={() => handleNotificationToggle('newAssignments')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Route Updates</Label>
                    <p className="text-sm text-muted-foreground">Changes to assigned routes</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.routeUpdates}
                    onCheckedChange={() => handleNotificationToggle('routeUpdates')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Emergency Alerts</Label>
                    <p className="text-sm text-muted-foreground">Safety and emergency notifications</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.emergencyAlerts}
                    onCheckedChange={() => handleNotificationToggle('emergencyAlerts')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Payment Updates</Label>
                    <p className="text-sm text-muted-foreground">Earning and payment notifications</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.paymentUpdates}
                    onCheckedChange={() => handleNotificationToggle('paymentUpdates')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Performance Reports</Label>
                    <p className="text-sm text-muted-foreground">Weekly and monthly reports</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.performanceReports}
                    onCheckedChange={() => handleNotificationToggle('performanceReports')}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Alert Settings
                </CardTitle>
                <CardDescription>Configure how you receive alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weather Alerts</Label>
                    <p className="text-sm text-muted-foreground">Weather condition updates</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.weatherAlerts}
                    onCheckedChange={() => handleNotificationToggle('weatherAlerts')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Traffic Alerts</Label>
                    <p className="text-sm text-muted-foreground">Route traffic updates</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.trafficAlerts}
                    onCheckedChange={() => handleNotificationToggle('trafficAlerts')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Text message alerts</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={() => handleNotificationToggle('smsNotifications')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Email updates</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={() => handleNotificationToggle('emailNotifications')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">App notifications</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.pushNotifications}
                    onCheckedChange={() => handleNotificationToggle('pushNotifications')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sound Enabled</Label>
                    <p className="text-sm text-muted-foreground">Audio alerts</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.soundEnabled}
                    onCheckedChange={() => handleNotificationToggle('soundEnabled')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Vibration Enabled</Label>
                    <p className="text-sm text-muted-foreground">Vibration alerts</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.vibrationEnabled}
                    onCheckedChange={() => handleNotificationToggle('vibrationEnabled')}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="safety" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Safety & Security
              </CardTitle>
              <CardDescription>Configure safety features and emergency settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>GPS Tracking</Label>
                      <p className="text-sm text-muted-foreground">Real-time location tracking</p>
                    </div>
                    <Switch 
                      checked={safetySettings.gpsTracking}
                      onCheckedChange={() => handleSafetyToggle('gpsTracking')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Emergency Button</Label>
                      <p className="text-sm text-muted-foreground">Quick emergency access</p>
                    </div>
                    <Switch 
                      checked={safetySettings.emergencyButton}
                      onCheckedChange={() => handleSafetyToggle('emergencyButton')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Speed Limiting</Label>
                      <p className="text-sm text-muted-foreground">Speed limit notifications</p>
                    </div>
                    <Switch 
                      checked={safetySettings.speedLimiting}
                      onCheckedChange={() => handleSafetyToggle('speedLimiting')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Rest Break Reminders</Label>
                      <p className="text-sm text-muted-foreground">Break time notifications</p>
                    </div>
                    <Switch 
                      checked={safetySettings.restBreakReminders}
                      onCheckedChange={() => handleSafetyToggle('restBreakReminders')}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Hazard Reporting</Label>
                      <p className="text-sm text-muted-foreground">Report safety hazards</p>
                    </div>
                    <Switch 
                      checked={safetySettings.hazardReporting}
                      onCheckedChange={() => handleSafetyToggle('hazardReporting')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Weather Warnings</Label>
                      <p className="text-sm text-muted-foreground">Severe weather alerts</p>
                    </div>
                    <Switch 
                      checked={safetySettings.weatherWarnings}
                      onCheckedChange={() => handleSafetyToggle('weatherWarnings')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Night Mode</Label>
                      <p className="text-sm text-muted-foreground">Night shift safety mode</p>
                    </div>
                    <Switch 
                      checked={safetySettings.nightModeEnabled}
                      onCheckedChange={() => handleSafetyToggle('nightModeEnabled')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Safety Check-in</Label>
                      <p className="text-sm text-muted-foreground">Regular safety confirmations</p>
                    </div>
                    <Switch 
                      checked={safetySettings.safetyCheckIn}
                      onCheckedChange={() => handleSafetyToggle('safetyCheckIn')}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vehicle" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Vehicle Settings
              </CardTitle>
              <CardDescription>Configure vehicle monitoring and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Fuel Alerts</Label>
                      <p className="text-sm text-muted-foreground">Low fuel notifications</p>
                    </div>
                    <Switch 
                      checked={vehicleSettings.fuelAlerts}
                      onCheckedChange={() => handleVehicleToggle('fuelAlerts')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Maintenance Reminders</Label>
                      <p className="text-sm text-muted-foreground">Scheduled maintenance alerts</p>
                    </div>
                    <Switch 
                      checked={vehicleSettings.maintenanceReminders}
                      onCheckedChange={() => handleVehicleToggle('maintenanceReminders')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Inspection Reminders</Label>
                      <p className="text-sm text-muted-foreground">Vehicle inspection alerts</p>
                    </div>
                    <Switch 
                      checked={vehicleSettings.inspectionReminders}
                      onCheckedChange={() => handleVehicleToggle('inspectionReminders')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Mileage Tracking</Label>
                      <p className="text-sm text-muted-foreground">Track vehicle mileage</p>
                    </div>
                    <Switch 
                      checked={vehicleSettings.mileageTracking}
                      onCheckedChange={() => handleVehicleToggle('mileageTracking')}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Fuel Efficiency Reports</Label>
                      <p className="text-sm text-muted-foreground">Fuel usage analytics</p>
                    </div>
                    <Switch 
                      checked={vehicleSettings.fuelEfficiencyReports}
                      onCheckedChange={() => handleVehicleToggle('fuelEfficiencyReports')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Vehicle Location</Label>
                      <p className="text-sm text-muted-foreground">Track vehicle location</p>
                    </div>
                    <Switch 
                      checked={vehicleSettings.vehicleLocation}
                      onCheckedChange={() => handleVehicleToggle('vehicleLocation')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Diagnostic Alerts</Label>
                      <p className="text-sm text-muted-foreground">Engine and system diagnostics</p>
                    </div>
                    <Switch 
                      checked={vehicleSettings.diagnosticAlerts}
                      onCheckedChange={() => handleVehicleToggle('diagnosticAlerts')}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 