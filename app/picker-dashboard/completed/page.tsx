"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Truck, Calendar, Search, CheckCircle } from "lucide-react"

export default function CompletedCollectionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Completed Collections</h1>
          <p className="text-muted-foreground">View your completed waste collection assignments.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by location..."
              className="pl-10 w-full md:w-[200px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select defaultValue="all" onValueChange={(value) => setFilterType(value)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="recyclables">Recyclables</SelectItem>
              <SelectItem value="organic">Organic</SelectItem>
              <SelectItem value="bulk">Bulk</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="week" className="space-y-4">
        <TabsList>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
          <TabsTrigger value="all">All Time</TabsTrigger>
        </TabsList>
        <TabsContent value="week" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>This Week's Completed Collections</CardTitle>
              <CardDescription>Waste collections you've completed in the past 7 days.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 gap-4 p-4 font-medium">
                  <div>ID</div>
                  <div>Type</div>
                  <div>Location</div>
                  <div>Date & Time</div>
                  <div>Time Taken</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-6 gap-4 p-4">
                    <div>#WC-1236</div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-green-500" />
                      <span>Organic</span>
                    </div>
                    <div>789 Oak Drive</div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Today, 8:45 AM</span>
                    </div>
                    <div>22 minutes</div>
                    <div className="text-right">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-4 p-4">
                    <div>#WC-1230</div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-blue-500" />
                      <span>Recyclables</span>
                    </div>
                    <div>234 Maple Lane</div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Yesterday, 3:30 PM</span>
                    </div>
                    <div>35 minutes</div>
                    <div className="text-right">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-4 p-4">
                    <div>#WC-1228</div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-gray-500" />
                      <span>General</span>
                    </div>
                    <div>876 Cedar Court</div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Yesterday, 11:15 AM</span>
                    </div>
                    <div>18 minutes</div>
                    <div className="text-right">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between w-full">
                <div className="text-sm text-muted-foreground">Showing 3 of 18 collections</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="month" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>This Month's Completed Collections</CardTitle>
              <CardDescription>Waste collections you've completed in the past 30 days.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 gap-4 p-4 font-medium">
                  <div>ID</div>
                  <div>Type</div>
                  <div>Location</div>
                  <div>Date</div>
                  <div>Time Taken</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-6 gap-4 p-4">
                    <div>#WC-1236</div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-green-500" />
                      <span>Organic</span>
                    </div>
                    <div>789 Oak Drive</div>
                    <div>Today, 8:45 AM</div>
                    <div>22 minutes</div>
                    <div className="text-right">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-4 p-4">
                    <div>#WC-1230</div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-blue-500" />
                      <span>Recyclables</span>
                    </div>
                    <div>234 Maple Lane</div>
                    <div>Yesterday, 3:30 PM</div>
                    <div>35 minutes</div>
                    <div className="text-right">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-4 p-4">
                    <div>#WC-1228</div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-gray-500" />
                      <span>General</span>
                    </div>
                    <div>876 Cedar Court</div>
                    <div>Yesterday, 11:15 AM</div>
                    <div>18 minutes</div>
                    <div className="text-right">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-4 p-4">
                    <div>#WC-1220</div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-amber-500" />
                      <span>Bulk</span>
                    </div>
                    <div>543 Birch Avenue</div>
                    <div>Mar 15, 10:00 AM</div>
                    <div>45 minutes</div>
                    <div className="text-right">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between w-full">
                <div className="text-sm text-muted-foreground">Showing 4 of 42 collections</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Completed Collections</CardTitle>
              <CardDescription>All waste collections you've completed since joining.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">Collection Statistics</h3>
                  <p className="text-sm text-muted-foreground">Your overall collection performance</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">124</p>
                    <p className="text-xs text-muted-foreground">Total Collections</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">26 min</p>
                    <p className="text-xs text-muted-foreground">Average Time</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">98%</p>
                    <p className="text-xs text-muted-foreground">Completion Rate</p>
                  </div>
                </div>
              </div>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 gap-4 p-4 font-medium">
                  <div>ID</div>
                  <div>Type</div>
                  <div>Location</div>
                  <div>Date</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-6 gap-4 p-4">
                    <div>#WC-1236</div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-green-500" />
                      <span>Organic</span>
                    </div>
                    <div>789 Oak Drive</div>
                    <div>Today, 8:45 AM</div>
                    <div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                        <CheckCircle className="h-3 w-3" />
                        Completed
                      </span>
                    </div>
                    <div className="text-right">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-4 p-4">
                    <div>#WC-1220</div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-amber-500" />
                      <span>Bulk</span>
                    </div>
                    <div>543 Birch Avenue</div>
                    <div>Mar 15, 10:00 AM</div>
                    <div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                        <CheckCircle className="h-3 w-3" />
                        Completed
                      </span>
                    </div>
                    <div className="text-right">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-4 p-4">
                    <div>#WC-1210</div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-blue-500" />
                      <span>Recyclables</span>
                    </div>
                    <div>321 Pine Street</div>
                    <div>Mar 10, 2:15 PM</div>
                    <div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                        <CheckCircle className="h-3 w-3" />
                        Completed
                      </span>
                    </div>
                    <div className="text-right">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center justify-between w-full">
                <div className="text-sm text-muted-foreground">Showing 3 of 124 collections</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

