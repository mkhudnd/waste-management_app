"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"
import {
  Truck, MapPin, Users, Recycle, Calendar, Search, CheckCircle, Clock, AlertTriangle,
  Settings, BarChart3, Route, Shield, DollarSign, FileText, Bell, Activity,
  UserPlus, Edit, Trash2, Eye, Download, RefreshCw, Car, Wrench, Phone,
  TrendingUp, TrendingDown, Star, Award, Target, AlertCircle, Zap, Globe
} from "lucide-react"

// Type definitions
interface User {
  id: string
  name: string
  email: string
  role: 'user' | 'picker' | 'admin'
  status: 'active' | 'inactive' | 'suspended'
  joinDate: string
  lastActive: string
  collections?: number
  earnings?: number
}

interface SystemStat {
  title: string
  value: string | number
  change: number
  icon: any
  color: string
}

interface Route {
  id: string
  name: string
  area: string
  pickerId: string
  pickerName: string
  stops: number
  status: 'active' | 'paused' | 'completed'
  efficiency: number
  estimatedTime: string
}

interface Alert {
  id: string
  type: 'emergency' | 'maintenance' | 'system' | 'performance'
  title: string
  message: string
  timestamp: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  resolved: boolean
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  // Separate data for each account type
  const [regularUsers, setRegularUsers] = useState<User[]>([
    {
      id: "U001",
      name: "John Smith",
      email: "john@example.com",
      role: "user",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2024-03-24",
      collections: 15
    },
    {
      id: "U002",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "user",
      status: "active",
      joinDate: "2024-02-10",
      lastActive: "2024-03-23",
      collections: 8
    },
    {
      id: "U003",
      name: "Mike Chen",
      email: "mike@example.com",
      role: "user",
      status: "inactive",
      joinDate: "2024-01-20",
      lastActive: "2024-03-20",
      collections: 22
    }
  ])

  const [wastePickers, setWastePickers] = useState<User[]>([
    {
      id: "WP001", 
      name: "Maria Garcia",
      email: "maria@example.com",
      role: "picker",
      status: "active",
      joinDate: "2024-02-01",
      lastActive: "2024-03-24",
      collections: 142,
      earnings: 2840
    },
    {
      id: "WP002",
      name: "James Wilson",
      email: "james@example.com",
      role: "picker", 
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2024-03-24",
      collections: 95,
      earnings: 1920
    },
    {
      id: "WP003",
      name: "Lisa Rodriguez",
      email: "lisa@example.com",
      role: "picker",
      status: "active", 
      joinDate: "2024-03-01",
      lastActive: "2024-03-23",
      collections: 67,
      earnings: 1340
    }
  ])

  const [systemAdmins, setSystemAdmins] = useState<User[]>([
    {
      id: "A001",
      name: "Admin User",
      email: "admin@example.com", 
      role: "admin",
      status: "active",
      joinDate: "2024-01-01",
      lastActive: "2024-03-24"
    },
    {
      id: "A002",
      name: "System Manager",
      email: "manager@example.com",
      role: "admin",
      status: "active",
      joinDate: "2024-01-01", 
      lastActive: "2024-03-23"
    }
  ])

  const [routes, setRoutes] = useState<Route[]>([
    {
      id: "R001",
      name: "Downtown Circuit",
      area: "Downtown",
      pickerId: "2",
      pickerName: "Maria Garcia",
      stops: 24,
      status: "active",
      efficiency: 94,
      estimatedTime: "4h 30m"
    },
    {
      id: "R002", 
      name: "Residential North",
      area: "North District",
      pickerId: "4",
      pickerName: "James Wilson",
      stops: 18,
      status: "completed",
      efficiency: 87,
      estimatedTime: "3h 15m"
    }
  ])

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "A001",
      type: "emergency",
      title: "Hazardous Waste Spill",
      message: "Chemical spill reported at Industrial Zone - immediate response required",
      timestamp: "2024-03-24 14:30",
      severity: "critical",
      resolved: false
    },
    {
      id: "A002",
      type: "maintenance", 
      title: "Vehicle Maintenance Due",
      message: "Truck TRK-005 is due for scheduled maintenance",
      timestamp: "2024-03-24 12:15",
      severity: "medium",
      resolved: false
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showUserDialog, setShowUserDialog] = useState(false)
  const [currentAccountType, setCurrentAccountType] = useState<'user' | 'picker' | 'admin'>('user')
  const [systemSettings, setSystemSettings] = useState({
    autoAssignment: true,
    realTimeTracking: true,
    emergencyAlerts: true,
    performanceMonitoring: true,
    paymentProcessing: true
  })
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [systemStats, setSystemStats] = useState([
    {
      title: "Total Users",
      value: regularUsers.length + wastePickers.length + systemAdmins.length,
      change: 12.5,
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Pickers",
      value: wastePickers.filter(p => p.status === 'active').length,
      change: 8.3,
      icon: Truck,
      color: "text-green-600"
    },
    {
      title: "Daily Collections",
      value: 234,
      change: -2.1,
      icon: Recycle,
      color: "text-orange-600"
    },
    {
      title: "System Uptime",
      value: "99.9%",
      change: 0,
      icon: Activity,
      color: "text-emerald-600"
    },
    {
      title: "Revenue Today",
      value: "$12,450",
      change: 15.7,
      icon: DollarSign,
      color: "text-purple-600"
    },
    {
      title: "Efficiency Rate",
      value: "94%",
      change: 3.2,
      icon: Target,
      color: "text-cyan-600"
    }
  ])

  // Helper functions to get current data based on account type
  const getCurrentUsers = () => {
    switch (currentAccountType) {
      case 'user': return regularUsers
      case 'picker': return wastePickers
      case 'admin': return systemAdmins
      default: return regularUsers
    }
  }

  const getCurrentSetUsers = () => {
    switch (currentAccountType) {
      case 'user': return setRegularUsers
      case 'picker': return setWastePickers
      case 'admin': return setSystemAdmins
      default: return setRegularUsers
    }
  }

  const filteredUsers = getCurrentUsers().filter((user: User) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreateUser = (accountType: 'user' | 'picker' | 'admin' = currentAccountType) => {
    setCurrentAccountType(accountType)
    setSelectedUser(null)
    setShowUserDialog(true)
  }

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setShowUserDialog(true)
  }

  const handleDeleteUser = (userId: string) => {
    const currentUsers = getCurrentUsers()
    const setCurrentUsers = getCurrentSetUsers()
    const user = currentUsers.find((u: User) => u.id === userId)
    if (user) {
      setCurrentUsers(currentUsers.filter((u: User) => u.id !== userId))
      toast.success(`${user.role === 'admin' ? 'Administrator' : user.role === 'picker' ? 'Waste Picker' : 'User'} ${user.name} deleted successfully`)
    }
  }

  const handleSaveUser = () => {
    const nameInput = document.getElementById('name') as HTMLInputElement
    const emailInput = document.getElementById('email') as HTMLInputElement
    const roleSelect = document.querySelector('[id="role"]') as HTMLSelectElement
    
    if (!nameInput?.value || !emailInput?.value) {
      toast.error("Please fill in all required fields")
      return
    }
    
    const currentUsers = getCurrentUsers()
    const setCurrentUsers = getCurrentSetUsers()
    
    if (selectedUser) {
      // Update existing user
      setCurrentUsers(currentUsers.map((u: User) => 
        u.id === selectedUser.id 
          ? { ...u, name: nameInput.value, email: emailInput.value }
          : u
      ))
      const userType = currentAccountType === 'admin' ? 'Administrator' : currentAccountType === 'picker' ? 'Waste Picker' : 'User'
      toast.success(`${userType} ${nameInput.value} updated successfully`)
    } else {
      // Create new user with appropriate ID prefix
      const idPrefix = currentAccountType === 'admin' ? 'A' : currentAccountType === 'picker' ? 'WP' : 'U'
      const newId = `${idPrefix}${String(currentUsers.length + 1).padStart(3, '0')}`
      
      const newUser: User = {
        id: newId,
        name: nameInput.value,
        email: emailInput.value,
        role: currentAccountType,
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
        lastActive: new Date().toISOString().split('T')[0],
        collections: currentAccountType !== 'admin' ? 0 : undefined,
        earnings: currentAccountType === 'picker' ? 0 : undefined
      }
      setCurrentUsers([...currentUsers, newUser])
      const userType = currentAccountType === 'admin' ? 'Administrator' : currentAccountType === 'picker' ? 'Waste Picker' : 'User'
      toast.success(`${userType} ${nameInput.value} created successfully`)
    }
    
    setShowUserDialog(false)
  }

  const handleToggleUserStatus = (userId: string) => {
    const currentUsers = getCurrentUsers()
    const setCurrentUsers = getCurrentSetUsers()
    setCurrentUsers(currentUsers.map((u: User) => 
      u.id === userId 
        ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' as 'active' | 'inactive' | 'suspended' }
        : u
    ))
    toast.success("User status updated")
  }

  const handleResolveAlert = (alertId: string) => {
    setAlerts(alerts.map(a => 
      a.id === alertId ? { ...a, resolved: true } : a
    ))
    toast.success("Alert resolved")
  }

  const handleOptimizeRoute = (routeId: string) => {
    setRoutes(routes.map(r => 
      r.id === routeId 
        ? { ...r, efficiency: Math.min(100, r.efficiency + Math.floor(Math.random() * 10) + 1) }
        : r
    ))
    toast.success("Route optimized successfully")
  }

  const exportData = (type: string) => {
    // Simulate file download
    const timestamp = new Date().toISOString().split('T')[0]
    const filename = `${type.toLowerCase()}-report-${timestamp}.csv`
    
    toast.success(`${type} data exported as ${filename}`)
    
    // In a real app, this would generate and download actual CSV/PDF files
    const data = type === 'Financial' ? 
      'Date,Revenue,Expenses,Profit\n2024-03-24,$12450,$8900,$3550' :
      type === 'Collection' ?
      'Date,Collections,Weight,Efficiency\n2024-03-24,234,128.5 tons,94%' :
      'Date,Routes,Completed,Avg Efficiency\n2024-03-24,15,12,91%'
      
    const blob = new Blob([data], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const refreshData = async () => {
    setIsRefreshing(true)
    toast.info("Refreshing system data...")
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // In a real app, this would fetch fresh data from the API
    setIsRefreshing(false)
    toast.success("Data refreshed successfully - all systems up to date")
  }

  const openSystemSettings = () => {
    setActiveTab("settings")
    toast.info("Navigated to system settings")
  }

  const createRoute = () => {
    const routeId = `R${String(routes.length + 1).padStart(3, '0')}`
    const newRoute: Route = {
      id: routeId,
      name: `New Route ${routes.length + 1}`,
      area: "Unassigned",
      pickerId: "",
      pickerName: "Unassigned",
      stops: Math.floor(Math.random() * 25 + 10),
      status: "paused",
      efficiency: 0,
      estimatedTime: "TBD"
    }
    
    setRoutes([...routes, newRoute])
    toast.success(`Route ${routeId} created successfully`)
  }

  const sendSystemAlert = () => {
    const alertId = `A${String(alerts.length + 1).padStart(3, '0')}`
    const newAlert: Alert = {
      id: alertId,
      type: "system",
      title: "System Maintenance Scheduled",
      message: "Routine system maintenance scheduled for tonight at 2:00 AM",
      timestamp: new Date().toLocaleString(),
      severity: "medium",
      resolved: false
    }
    
    setAlerts([newAlert, ...alerts])
    setActiveTab("alerts")
    toast.success("System alert broadcasted to all users")
  }

  const processPayouts = () => {
    toast.info("Processing payments...")
    setTimeout(() => {
      toast.success("All picker payments processed successfully. $45,670 distributed to 23 active pickers.")
    }, 2000)
  }

  const generateInvoices = () => {
    toast.info("Generating customer invoices...")
    setTimeout(() => {
      toast.success("156 customer invoices generated and sent via email")
    }, 1500)
  }

  const assignVehicle = (vehicleId: string) => {
    toast.success(`Vehicle ${vehicleId} assigned to available route`)
  }

  const scheduleMaintenace = (vehicleId: string) => {
    toast.success(`Maintenance scheduled for vehicle ${vehicleId} - next available slot: March 28`)
  }

  const viewVehicleIssue = (vehicleId: string) => {
    toast.info(`Opening detailed diagnostics for vehicle ${vehicleId}`)
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Administration</h1>
          <p className="text-muted-foreground">Complete system oversight and management console</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => exportData('System')}>
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
          <Button variant="outline" size="sm" onClick={refreshData} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
          <Button size="sm" onClick={openSystemSettings}>
            <Settings className="h-4 w-4 mr-2" />
            System Settings
          </Button>
        </div>
      </div>

      {/* Critical Alerts */}
      {alerts.some(a => !a.resolved && a.severity === 'critical') && (
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
              <AlertTriangle className="h-5 w-5" />
              Critical Alerts Require Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {alerts.filter(a => !a.resolved && a.severity === 'critical').map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded border">
                  <div>
                    <h4 className="font-medium">{alert.title}</h4>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleResolveAlert(alert.id)}
                  >
                    Resolve
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* System Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {systemStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.change !== 0 && (
                <p className={`text-xs flex items-center gap-1 ${
                  stat.change > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change > 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {Math.abs(stat.change)}% from last period
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="routes">Route Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="fleet">Fleet Management</TabsTrigger>
          <TabsTrigger value="alerts">Alerts & Safety</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
                <CardDescription>Real-time system metrics and health</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Server Load</span>
                    <span>23%</span>
                  </div>
                  <Progress value={23} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Database Performance</span>
                    <span>91%</span>
                  </div>
                  <Progress value={91} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>API Response Time</span>
                    <span>147ms</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Active Connections</span>
                    <span>1,248</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest system events and operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New waste picker registered</p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Route optimization completed</p>
                      <p className="text-xs text-muted-foreground">8 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Vehicle maintenance alert</p>
                      <p className="text-xs text-muted-foreground">15 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Payment processed successfully</p>
                      <p className="text-xs text-muted-foreground">23 minutes ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Button className="h-20 flex-col gap-2" onClick={() => handleCreateUser('user')}>
                  <UserPlus className="h-6 w-6" />
                  Add New User
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2" onClick={createRoute}>
                  <Route className="h-6 w-6" />
                  Create Route
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2" onClick={sendSystemAlert}>
                  <Bell className="h-6 w-6" />
                  Send Alert
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => exportData('System')}>
                  <FileText className="h-6 w-6" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Management</CardTitle>
              <CardDescription>Manage different types of user accounts separately</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Account Type Selector */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Account Type:</label>
                    <Select value={currentAccountType} onValueChange={(value: 'user' | 'picker' | 'admin') => {
                      setCurrentAccountType(value)
                      setSearchTerm("")
                    }}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">Regular Users ({regularUsers.length})</SelectItem>
                        <SelectItem value="picker">Waste Pickers ({wastePickers.length})</SelectItem>
                        <SelectItem value="admin">Administrators ({systemAdmins.length})</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      placeholder={`Search ${currentAccountType === 'admin' ? 'administrators' : currentAccountType === 'picker' ? 'waste pickers' : 'users'}...`}
                      className="pl-10 w-[300px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <Button onClick={() => handleCreateUser(currentAccountType)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add {currentAccountType === 'admin' ? 'Administrator' : currentAccountType === 'picker' ? 'Waste Picker' : 'User'}
                </Button>
              </div>

              {/* Current Account Type Stats */}
              <div className="grid gap-4 md:grid-cols-3 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="text-2xl font-bold">{getCurrentUsers().length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Active</p>
                        <p className="text-2xl font-bold">{getCurrentUsers().filter(u => u.status === 'active').length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Inactive</p>
                        <p className="text-2xl font-bold">{getCurrentUsers().filter(u => u.status !== 'active').length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    {currentAccountType !== 'admin' && <TableHead>Collections</TableHead>}
                    {currentAccountType === 'picker' && <TableHead>Earnings</TableHead>}
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-mono text-sm">{user.id}</TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      {currentAccountType !== 'admin' && <TableCell>{user.collections || 0}</TableCell>}
                      {currentAccountType === 'picker' && <TableCell>${user.earnings || 0}</TableCell>}
                      <TableCell>{user.lastActive}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleToggleUserStatus(user.id)}
                          >
                            <Shield className="h-4 w-4" />
                          </Button>
                          {/* Prevent deletion of the last admin */}
                          {!(currentAccountType === 'admin' && systemAdmins.filter(a => a.status === 'active').length === 1 && user.status === 'active') && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredUsers.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No {currentAccountType === 'admin' ? 'administrators' : currentAccountType === 'picker' ? 'waste pickers' : 'users'} found
                    {searchTerm && ` matching "${searchTerm}"`}.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Route Management</CardTitle>
              <CardDescription>Optimize and manage collection routes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routes.map((route) => (
                  <div key={route.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium">{route.name}</h3>
                        <p className="text-sm text-muted-foreground">{route.area}</p>
                      </div>
                      <Badge variant={route.status === 'active' ? 'default' : 'secondary'}>
                        {route.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Assigned Picker</p>
                        <p className="font-medium">{route.pickerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Stops</p>
                        <p className="font-medium">{route.stops}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Efficiency</p>
                        <div className="flex items-center gap-2">
                          <Progress value={route.efficiency} className="h-2 flex-1" />
                          <span className="text-sm font-medium">{route.efficiency}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Est. Time</p>
                        <p className="font-medium">{route.estimatedTime}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => toast.info(`Viewing detailed route information for ${route.name}`)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleOptimizeRoute(route.id)}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        Optimize
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => toast.info(`Opening route editor for ${route.name}`)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Route
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Collection Analytics</CardTitle>
                <CardDescription>Performance metrics and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Daily Collections</span>
                    <span className="font-bold">234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Weekly Average</span>
                    <span className="font-bold">1,640</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Monthly Target</span>
                    <span className="font-bold">7,500</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress to Target</span>
                      <span>68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Financial performance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Today's Revenue</span>
                    <span className="font-bold">$12,450</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Monthly Revenue</span>
                    <span className="font-bold">$345,600</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Operating Costs</span>
                    <span className="font-bold">$198,400</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Net Profit</span>
                    <span className="font-bold text-green-600">$147,200</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Export Analytics</CardTitle>
              <CardDescription>Download detailed reports and data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button variant="outline" onClick={() => exportData('Collection')}>
                  <Download className="h-4 w-4 mr-2" />
                  Collection Report
                </Button>
                <Button variant="outline" onClick={() => exportData('Financial')}>
                  <Download className="h-4 w-4 mr-2" />
                  Financial Report
                </Button>
                <Button variant="outline" onClick={() => exportData('Performance')}>
                  <Download className="h-4 w-4 mr-2" />
                  Performance Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fleet" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fleet Management</CardTitle>
              <CardDescription>Manage vehicles, equipment, and maintenance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">TRK-001</CardTitle>
                      <CardDescription>Pickup Truck</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Status</span>
                          <Badge variant="default">Active</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Assigned to</span>
                          <span className="text-sm font-medium">Maria Garcia</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Fuel Level</span>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Next Service</span>
                          <span className="text-sm font-medium">Apr 15</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => scheduleMaintenace('TRK-001')}>
                        <Wrench className="h-4 w-4 mr-2" />
                        Maintenance
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">TRK-002</CardTitle>
                      <CardDescription>Waste Truck</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Status</span>
                          <Badge variant="destructive">Maintenance</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Assigned to</span>
                          <span className="text-sm font-medium">-</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Issue</span>
                          <span className="text-sm font-medium">Engine Check</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">ETA Repair</span>
                          <span className="text-sm font-medium">Mar 26</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => viewVehicleIssue('TRK-002')}>
                        <AlertCircle className="h-4 w-4 mr-2" />
                        View Issue
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">TRK-003</CardTitle>
                      <CardDescription>Recycling Truck</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Status</span>
                          <Badge variant="secondary">Idle</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Assigned to</span>
                          <span className="text-sm font-medium">-</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Fuel Level</span>
                          <span className="text-sm font-medium">95%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Location</span>
                          <span className="text-sm font-medium">Depot</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => assignVehicle('TRK-003')}>
                        <Car className="h-4 w-4 mr-2" />
                        Assign Route
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts & Safety</CardTitle>
              <CardDescription>Monitor and manage system alerts and safety notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div 
                    key={alert.id} 
                    className={`p-4 border rounded-lg ${
                      alert.severity === 'critical' ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950' :
                      alert.severity === 'high' ? 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950' :
                      alert.severity === 'medium' ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950' :
                      'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={
                            alert.type === 'emergency' ? 'destructive' :
                            alert.type === 'maintenance' ? 'secondary' :
                            alert.type === 'system' ? 'default' :
                            'outline'
                          }>
                            {alert.type}
                          </Badge>
                          <Badge variant={
                            alert.severity === 'critical' ? 'destructive' :
                            alert.severity === 'high' ? 'destructive' :
                            alert.severity === 'medium' ? 'secondary' :
                            'outline'
                          }>
                            {alert.severity}
                          </Badge>
                          {alert.resolved && <Badge variant="outline">Resolved</Badge>}
                        </div>
                        <h3 className="font-medium mb-1">{alert.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        {!alert.resolved && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleResolveAlert(alert.id)}
                          >
                            Resolve
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Financial performance summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Today's Revenue</span>
                    <span className="font-bold text-green-600">$12,450</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>This Week</span>
                    <span className="font-bold">$87,150</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>This Month</span>
                    <span className="font-bold">$345,600</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>This Year</span>
                    <span className="font-bold">$3,456,780</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
                <CardDescription>Operating costs analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Picker Payments</span>
                    <span className="font-bold">$85,400</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Vehicle Maintenance</span>
                    <span className="font-bold">$23,500</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Fuel Costs</span>
                    <span className="font-bold">$34,200</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>System Operations</span>
                    <span className="font-bold">$12,800</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payment Management</CardTitle>
              <CardDescription>Process and manage payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button variant="outline" onClick={processPayouts}>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Process Payouts
                </Button>
                <Button variant="outline" onClick={generateInvoices}>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Invoices
                </Button>
                <Button variant="outline" onClick={() => exportData('Financial')}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Financial Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure system behavior and features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-assignment">Automatic Assignment</Label>
                    <p className="text-sm text-muted-foreground">Automatically assign new collection requests</p>
                  </div>
                  <Switch 
                    id="auto-assignment"
                    checked={systemSettings.autoAssignment}
                    onCheckedChange={(checked) => 
                      setSystemSettings({...systemSettings, autoAssignment: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="real-time-tracking">Real-time Tracking</Label>
                    <p className="text-sm text-muted-foreground">Enable GPS tracking for waste pickers</p>
                  </div>
                  <Switch 
                    id="real-time-tracking"
                    checked={systemSettings.realTimeTracking}
                    onCheckedChange={(checked) => 
                      setSystemSettings({...systemSettings, realTimeTracking: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emergency-alerts">Emergency Alerts</Label>
                    <p className="text-sm text-muted-foreground">Send emergency notifications</p>
                  </div>
                  <Switch 
                    id="emergency-alerts"
                    checked={systemSettings.emergencyAlerts}
                    onCheckedChange={(checked) => 
                      setSystemSettings({...systemSettings, emergencyAlerts: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="performance-monitoring">Performance Monitoring</Label>
                    <p className="text-sm text-muted-foreground">Track picker performance metrics</p>
                  </div>
                  <Switch 
                    id="performance-monitoring"
                    checked={systemSettings.performanceMonitoring}
                    onCheckedChange={(checked) => 
                      setSystemSettings({...systemSettings, performanceMonitoring: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="payment-processing">Automatic Payment Processing</Label>
                    <p className="text-sm text-muted-foreground">Process payments automatically</p>
                  </div>
                  <Switch 
                    id="payment-processing"
                    checked={systemSettings.paymentProcessing}
                    onCheckedChange={(checked) => 
                      setSystemSettings({...systemSettings, paymentProcessing: checked})
                    }
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button onClick={() => {
                  toast.success("System settings saved successfully")
                  setTimeout(() => {
                    toast.info("Settings have been applied across all system components")
                  }, 1000)
                }}>
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* User Management Dialog */}
              <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {selectedUser ? 'Edit' : 'Create New'} {currentAccountType === 'admin' ? 'Administrator' : currentAccountType === 'picker' ? 'Waste Picker' : 'User'}
              </DialogTitle>
              <DialogDescription>
                {selectedUser ? 'Update' : 'Add a new'} {currentAccountType === 'admin' ? 'administrator' : currentAccountType === 'picker' ? 'waste picker' : 'user'} {selectedUser ? 'information' : 'to the system'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  defaultValue={selectedUser?.name || ""}
                  className="col-span-3"
                  placeholder="Enter full name"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={selectedUser?.email || ""}
                  className="col-span-3"
                  placeholder="Enter email address"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">
                  Account Type
                </Label>
                <div className="col-span-3">
                  <Badge variant="outline" className="text-sm">
                    {currentAccountType === 'admin' ? 'System Administrator' : currentAccountType === 'picker' ? 'Waste Picker' : 'Regular User'}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    Account type is determined by the current section
                  </p>
                </div>
              </div>
              {currentAccountType === 'picker' && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">
                    Vehicle ID
                  </Label>
                  <Input
                    id="vehicleId"
                    className="col-span-3"
                    placeholder="Optional vehicle assignment"
                  />
                </div>
              )}
              {currentAccountType === 'admin' && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">
                    Admin Level
                  </Label>
                  <Select defaultValue="standard">
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard Admin</SelectItem>
                      <SelectItem value="super">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowUserDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" onClick={handleSaveUser}>
                {selectedUser ? 'Update' : 'Create'} {currentAccountType === 'admin' ? 'Administrator' : currentAccountType === 'picker' ? 'Waste Picker' : 'User'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </div>
  )
}

