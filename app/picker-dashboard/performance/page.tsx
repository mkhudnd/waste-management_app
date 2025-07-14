"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Target,
  Star,
  Award,
  Calendar,
  Fuel,
  Route,
  CheckCircle,
  AlertCircle,
  Trophy,
  Users,
  BarChart3,
  PieChart,
  LineChart,
  Download,
  Share,
  RefreshCw,
  Zap
} from "lucide-react"

interface PerformanceData {
  daily: {
    earnings: number
    collections: number
    efficiency: number
    rating: number
    distance: number
    fuelUsed: number
  }
  weekly: {
    earnings: number
    collections: number
    avgEfficiency: number
    avgRating: number
    totalDistance: number
    fuelCost: number
  }
  monthly: {
    earnings: number
    collections: number
    efficiency: number
    rating: number
    distance: number
    goals: {
      earnings: number
      collections: number
      efficiency: number
    }
  }
}

interface EarningsBreakdown {
  baseEarnings: number
  efficiencyBonus: number
  timeBonus: number
  qualityBonus: number
  milestoneBonus: number
  penalties: number
  total: number
}

export default function PerformancePage() {
  const { toast } = useToast()
  const [currentPeriod, setCurrentPeriod] = useState<"daily" | "weekly" | "monthly">("daily")
  const [isLoading, setIsLoading] = useState(false)

  const [performanceData] = useState<PerformanceData>({
    daily: {
      earnings: 147.50,
      collections: 8,
      efficiency: 92,
      rating: 4.8,
      distance: 45.7,
      fuelUsed: 8.2
    },
    weekly: {
      earnings: 1250.00,
      collections: 56,
      avgEfficiency: 89,
      avgRating: 4.7,
      totalDistance: 320.5,
      fuelCost: 58.75
    },
    monthly: {
      earnings: 4850.00,
      collections: 234,
      efficiency: 88,
      rating: 4.6,
      distance: 1285.3,
      goals: {
        earnings: 5000.00,
        collections: 250,
        efficiency: 90
      }
    }
  })

  const [todaysEarnings] = useState<EarningsBreakdown>({
    baseEarnings: 120.00,
    efficiencyBonus: 18.00,
    timeBonus: 12.50,
    qualityBonus: 8.00,
    milestoneBonus: 5.00,
    penalties: -2.00,
    total: 161.50
  })

  const [recentActivity] = useState([
    {
      time: "2:30 PM",
      action: "Collection Completed",
      location: "City Mall Complex",
      earning: 35.00,
      rating: 5,
      efficiency: 95
    },
    {
      time: "1:45 PM", 
      action: "Collection Completed",
      location: "Riverside Restaurant",
      earning: 12.75,
      rating: 5,
      efficiency: 88
    },
    {
      time: "11:20 AM",
      action: "Collection Completed", 
      location: "Green Tech Office",
      earning: 22.00,
      rating: 4,
      efficiency: 92
    }
  ])

  const [achievements] = useState([
    {
      title: "Efficiency Expert",
      description: "Maintained 90%+ efficiency for 7 days",
      icon: Target,
      earned: true,
      bonus: 25.00
    },
    {
      title: "Customer Favorite",
      description: "Achieved 4.8+ rating for the month",
      icon: Star,
      earned: true,
      bonus: 20.00
    },
    {
      title: "Distance Champion",
      description: "Complete 1000km in a month",
      icon: Route,
      earned: false,
      progress: 85,
      bonus: 50.00
    },
    {
      title: "Perfect Week",
      description: "Zero issues reported for a week",
      icon: Trophy,
      earned: false,
      progress: 60,
      bonus: 30.00
    }
  ])

  const [weeklyChart] = useState([
    { day: "Mon", earnings: 145, efficiency: 88, collections: 8 },
    { day: "Tue", earnings: 167, efficiency: 92, collections: 9 },
    { day: "Wed", earnings: 134, efficiency: 85, collections: 7 },
    { day: "Thu", earnings: 189, efficiency: 94, collections: 10 },
    { day: "Fri", earnings: 156, efficiency: 89, collections: 8 },
    { day: "Sat", earnings: 178, efficiency: 91, collections: 9 },
    { day: "Sun", earnings: 142, efficiency: 87, collections: 7 }
  ])

  const handleRefreshData = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Data Refreshed",
        description: "Performance metrics updated with latest data.",
        duration: 3000,
      })
    }, 1500)
  }

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Generating performance report. Download will begin shortly.",
      duration: 4000,
    })
  }

  const currentData = performanceData[currentPeriod]

  return (
    <div className="container py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance Analytics</h1>
          <p className="text-muted-foreground">
            Track your earnings, efficiency, and performance metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleRefreshData} disabled={isLoading}>
            {isLoading ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Refresh
          </Button>
          <Button variant="outline" onClick={handleExportData}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2">
        {(["daily", "weekly", "monthly"] as const).map((period) => (
          <Button
            key={period}
            variant={currentPeriod === period ? "default" : "outline"}
            onClick={() => setCurrentPeriod(period)}
            className="capitalize"
          >
            {period}
          </Button>
        ))}
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${currentData.earnings.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {currentPeriod === "monthly" ? 
                `${((currentData.earnings / currentData.goals.earnings) * 100).toFixed(0)}% of goal` :
                `Average $${(currentData.earnings / (currentPeriod === "weekly" ? 7 : 1)).toFixed(2)}/day`
              }
            </p>
            {currentPeriod === "monthly" && (
              <Progress 
                value={(currentData.earnings / currentData.goals.earnings) * 100} 
                className="mt-2" 
              />
            )}
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collections</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.collections}</div>
            <p className="text-xs text-muted-foreground">
              {currentPeriod === "monthly" ? 
                `${((currentData.collections / currentData.goals.collections) * 100).toFixed(0)}% of goal` :
                `${(currentData.collections / (currentPeriod === "weekly" ? 7 : 1)).toFixed(1)} per day`
              }
            </p>
            {currentPeriod === "monthly" && (
              <Progress 
                value={(currentData.collections / currentData.goals.collections) * 100} 
                className="mt-2" 
              />
            )}
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentData.efficiency || currentData.avgEfficiency}%</div>
            <p className="text-xs text-muted-foreground">
              {currentPeriod === "monthly" ? 
                `${(currentData.efficiency - currentData.goals.efficiency > 0 ? '+' : '')}${currentData.efficiency - currentData.goals.efficiency}% vs goal` :
                "Time vs. estimated"
              }
            </p>
            <Progress value={currentData.efficiency || currentData.avgEfficiency} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(currentData.rating || currentData.avgRating).toFixed(1)}/5</div>
            <div className="flex mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star}
                  className={`h-3 w-3 ${
                    star <= Math.round(currentData.rating || currentData.avgRating) 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-gray-300'
                  }`} 
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="earnings" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="earnings">
            <DollarSign className="mr-2 h-4 w-4" />
            Earnings
          </TabsTrigger>
          <TabsTrigger value="performance">
            <BarChart3 className="mr-2 h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="achievements">
            <Trophy className="mr-2 h-4 w-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="insights">
            <LineChart className="mr-2 h-4 w-4" />
            Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="earnings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Today's Earnings Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Earnings Breakdown</CardTitle>
                <CardDescription>Detailed breakdown of today's earnings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Base Earnings</span>
                  <span className="font-semibold">${todaysEarnings.baseEarnings.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-green-600">
                  <span>Efficiency Bonus</span>
                  <span className="font-semibold">+${todaysEarnings.efficiencyBonus.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-green-600">
                  <span>Time Bonus</span>
                  <span className="font-semibold">+${todaysEarnings.timeBonus.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-green-600">
                  <span>Quality Bonus</span>
                  <span className="font-semibold">+${todaysEarnings.qualityBonus.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-green-600">
                  <span>Milestone Bonus</span>
                  <span className="font-semibold">+${todaysEarnings.milestoneBonus.toFixed(2)}</span>
                </div>
                {todaysEarnings.penalties !== 0 && (
                  <div className="flex justify-between items-center text-red-600">
                    <span>Penalties</span>
                    <span className="font-semibold">${todaysEarnings.penalties.toFixed(2)}</span>
                  </div>
                )}
                <hr />
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span>${todaysEarnings.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Earnings Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Earnings Trend</CardTitle>
                <CardDescription>Daily earnings for the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {weeklyChart.map((day) => (
                    <div key={day.day} className="flex items-center gap-4">
                      <div className="w-8 text-sm font-medium">{day.day}</div>
                      <div className="flex-1">
                        <Progress value={(day.earnings / 200) * 100} className="h-4" />
                      </div>
                      <div className="w-16 text-sm font-semibold text-right">
                        ${day.earnings}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Collection Activity</CardTitle>
              <CardDescription>Your latest completed collections with earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="font-medium">{activity.action}</span>
                        <Badge variant="outline">{activity.time}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{activity.location}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">+${activity.earning.toFixed(2)}</div>
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{activity.rating}/5</span>
                        <span className="text-muted-foreground">• {activity.efficiency}% eff</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Efficiency Trends</CardTitle>
                <CardDescription>Your efficiency performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {weeklyChart.map((day) => (
                    <div key={day.day} className="flex items-center gap-4">
                      <div className="w-8 text-sm font-medium">{day.day}</div>
                      <div className="flex-1">
                        <Progress value={day.efficiency} className="h-4" />
                      </div>
                      <div className="w-12 text-sm font-semibold text-right">
                        {day.efficiency}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Collection Volume</CardTitle>
                <CardDescription>Daily collection counts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {weeklyChart.map((day) => (
                    <div key={day.day} className="flex items-center gap-4">
                      <div className="w-8 text-sm font-medium">{day.day}</div>
                      <div className="flex-1">
                        <Progress value={(day.collections / 12) * 100} className="h-4" />
                      </div>
                      <div className="w-12 text-sm font-semibold text-right">
                        {day.collections}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
              <CardDescription>Your performance across different metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">{performanceData.daily.distance}</div>
                  <div className="text-sm text-muted-foreground">km traveled today</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{performanceData.daily.fuelUsed}</div>
                  <div className="text-sm text-muted-foreground">L fuel efficiency</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">24</div>
                  <div className="text-sm text-muted-foreground">min avg per collection</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((achievement, index) => (
              <Card key={index} className={achievement.earned ? "border-green-200 bg-green-50" : ""}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <achievement.icon className={`h-5 w-5 ${achievement.earned ? 'text-green-600' : 'text-muted-foreground'}`} />
                    {achievement.title}
                    {achievement.earned && <Badge className="bg-green-500">Earned</Badge>}
                  </CardTitle>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {achievement.earned ? (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-600">Achievement Unlocked!</span>
                      <span className="font-bold text-green-600">+${achievement.bonus.toFixed(2)}</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{achievement.progress || 0}%</span>
                      </div>
                      <Progress value={achievement.progress || 0} />
                      <div className="text-sm text-muted-foreground">
                        Bonus: +${achievement.bonus.toFixed(2)} when completed
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
                <CardDescription>AI-powered recommendations to improve your performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-800">Peak Performance Time</h4>
                      <p className="text-sm text-blue-700">You're 15% more efficient between 10 AM - 2 PM. Schedule high-priority collections during this window.</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800">Route Optimization</h4>
                      <p className="text-sm text-green-700">Your route planning has improved 23% this month. Keep using the route optimizer for best results.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800">Fuel Efficiency</h4>
                      <p className="text-sm text-yellow-700">Your fuel consumption is 8% higher than average. Consider more gradual acceleration and route planning.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Goals & Targets</CardTitle>
                <CardDescription>Track your progress toward monthly goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Monthly Earnings Goal</span>
                    <span>${performanceData.monthly.earnings.toFixed(0)} / ${performanceData.monthly.goals.earnings.toFixed(0)}</span>
                  </div>
                  <Progress value={(performanceData.monthly.earnings / performanceData.monthly.goals.earnings) * 100} />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Collections Goal</span>
                    <span>{performanceData.monthly.collections} / {performanceData.monthly.goals.collections}</span>
                  </div>
                  <Progress value={(performanceData.monthly.collections / performanceData.monthly.goals.collections) * 100} />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Efficiency Goal</span>
                    <span>{performanceData.monthly.efficiency}% / {performanceData.monthly.goals.efficiency}%</span>
                  </div>
                  <Progress value={(performanceData.monthly.efficiency / performanceData.monthly.goals.efficiency) * 100} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

