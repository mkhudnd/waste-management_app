"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Award, Gift, Recycle, ArrowRight, CheckCircle, Clock, Calendar, MapPin, Users } from "lucide-react"

export default function RewardsPage() {
  const [progress, setProgress] = useState(65)

  return (
    <div className="container py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Recycling Rewards</h1>
        <p className="text-muted-foreground">Earn points for recycling and redeem them for rewards.</p>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Your Recycling Points</CardTitle>
          <CardDescription>Earn points by participating in recycling activities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">245</p>
              <p className="text-sm text-muted-foreground">Current Points</p>
            </div>
            <div>
              <p className="text-xl font-medium text-right">Silver</p>
              <p className="text-sm text-muted-foreground text-right">Current Tier</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress to Gold Tier</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground">Earn 155 more points to reach Gold Tier</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="rewards" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rewards">Available Rewards</TabsTrigger>
          <TabsTrigger value="history">Redemption History</TabsTrigger>
          <TabsTrigger value="earn">Ways to Earn</TabsTrigger>
        </TabsList>
        <TabsContent value="rewards" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">$10 Grocery Voucher</CardTitle>
                  <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                    <Award className="h-3 w-3" />
                    <span>100 Points</span>
                  </div>
                </div>
                <CardDescription>Local Grocery Store</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Redeem your points for a $10 voucher valid at any participating local grocery store.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Redeem</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Reusable Water Bottle</CardTitle>
                  <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                    <Award className="h-3 w-3" />
                    <span>150 Points</span>
                  </div>
                </div>
                <CardDescription>EcoCollect Merchandise</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  High-quality stainless steel water bottle with the EcoCollect logo. Reduces plastic waste!
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Redeem</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Free Compost Bin</CardTitle>
                  <div className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                    <Award className="h-3 w-3" />
                    <span>300 Points</span>
                  </div>
                </div>
                <CardDescription>Home Composting Kit</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Start composting at home with this easy-to-use compost bin. Includes instructions and starter kit.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" disabled>
                  Redeem
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">50% Off Eco Workshop</CardTitle>
                  <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                    <Award className="h-3 w-3" />
                    <span>200 Points</span>
                  </div>
                </div>
                <CardDescription>EcoEducation Workshops</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Get 50% off any workshop offered by EcoEducation, including upcycling, composting, and sustainable
                  living.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Redeem</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Tree Planting Donation</CardTitle>
                  <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                    <Award className="h-3 w-3" />
                    <span>250 Points</span>
                  </div>
                </div>
                <CardDescription>Green Future Initiative</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Donate your points to plant trees in your community. Each redemption plants 5 trees.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Redeem</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">Free Waste Collection</CardTitle>
                  <div className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                    <Award className="h-3 w-3" />
                    <span>350 Points</span>
                  </div>
                </div>
                <CardDescription>Special Waste Pickup</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Redeem for a free special waste collection service, including bulky items or electronic waste.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" disabled>
                  Redeem
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" className="gap-1">
              View All Rewards
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Redemption History</CardTitle>
              <CardDescription>Track your reward redemptions and status.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-4 gap-4 p-4 font-medium">
                  <div>Reward</div>
                  <div>Date</div>
                  <div>Points</div>
                  <div>Status</div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-4 gap-4 p-4">
                    <div>
                      <p className="font-medium">$10 Grocery Voucher</p>
                      <p className="text-xs text-muted-foreground">Local Grocery Store</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Mar 15, 2024</span>
                    </div>
                    <div>
                      <span className="text-sm">100 points</span>
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                        <CheckCircle className="h-3 w-3" />
                        Redeemed
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 p-4">
                    <div>
                      <p className="font-medium">Reusable Water Bottle</p>
                      <p className="text-xs text-muted-foreground">EcoCollect Merchandise</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Mar 5, 2024</span>
                    </div>
                    <div>
                      <span className="text-sm">150 points</span>
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                        <Clock className="h-3 w-3" />
                        Processing
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="earn" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ways to Earn Points</CardTitle>
              <CardDescription>Participate in these activities to earn recycling points.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                    <Recycle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Regular Recycling</h3>
                    <p className="text-sm text-muted-foreground">
                      Earn 5 points for each scheduled recycling collection. Points are awarded after collection is
                      completed.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                    <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Reporting Illegal Dumping</h3>
                    <p className="text-sm text-muted-foreground">
                      Earn 20 points for each verified illegal dumping report. Reports must include clear images and
                      location data.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                    <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Community Event Participation</h3>
                    <p className="text-sm text-muted-foreground">
                      Earn 30 points for participating in community clean-up events. Additional 10 points for organizing
                      an event.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900">
                    <Gift className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Special Recycling Drives</h3>
                    <p className="text-sm text-muted-foreground">
                      Earn 15 points for participating in special recycling drives for electronics, hazardous waste, or
                      other materials.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                    <Award className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Referral Program</h3>
                    <p className="text-sm text-muted-foreground">
                      Earn 25 points for each new user you refer who signs up and completes their first recycling
                      activity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Tier Benefits</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-zinc-500" />
                      <span className="font-medium">Bronze Tier</span>
                    </div>
                    <span className="text-sm">0-100 points</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">Silver Tier</span>
                    </div>
                    <span className="text-sm">101-400 points</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-yellow-400" />
                      <span className="font-medium">Gold Tier</span>
                    </div>
                    <span className="text-sm">401-800 points</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Platinum Tier</span>
                    </div>
                    <span className="text-sm">801+ points</span>
                  </div>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Higher tiers unlock exclusive rewards and special benefits.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

