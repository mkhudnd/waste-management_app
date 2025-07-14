"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Camera, Upload, CheckCircle, Clock, AlertTriangle } from "lucide-react"

export default function ReportPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Report Illegal Dumping</h1>
        <p className="text-muted-foreground">Help keep our community clean by reporting illegal waste dumping.</p>
      </div>

      <Tabs defaultValue="new-report" className="space-y-4">
        <TabsList>
          <TabsTrigger value="new-report">New Report</TabsTrigger>
          <TabsTrigger value="my-reports">My Reports</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>
        <TabsContent value="new-report" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Submit a New Report</CardTitle>
              <CardDescription>Provide details about the illegal dumping you've observed.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="flex gap-2">
                  <Input id="location" placeholder="Enter address or location description" className="flex-1" />
                  <Button variant="outline" size="icon">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter an address or use the pin button to use your current location
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="waste-type">Waste Type</Label>
                <Select>
                  <SelectTrigger id="waste-type">
                    <SelectValue placeholder="Select waste type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="household">Household Waste</SelectItem>
                    <SelectItem value="construction">Construction Debris</SelectItem>
                    <SelectItem value="electronic">Electronic Waste</SelectItem>
                    <SelectItem value="hazardous">Hazardous Materials</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="severity">Severity</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="severity">
                    <SelectValue placeholder="Select severity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Small amount of waste</SelectItem>
                    <SelectItem value="medium">Medium - Moderate dumping</SelectItem>
                    <SelectItem value="high">High - Large illegal dumpsite</SelectItem>
                    <SelectItem value="hazardous">Hazardous - Immediate attention needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the illegal dumping in detail (size, contents, how long it's been there, etc.)"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Upload Images</Label>
                <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-6">
                  {selectedImage ? (
                    <div className="relative w-full max-w-md">
                      <img
                        src={selectedImage || "/placeholder.svg"}
                        alt="Selected"
                        className="h-auto w-full rounded-lg object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute right-2 top-2"
                        onClick={() => setSelectedImage(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Camera className="h-10 w-10 text-muted-foreground" />
                      <div className="space-y-1 text-center">
                        <p className="text-sm font-medium">Drag and drop an image or click to upload</p>
                        <p className="text-xs text-muted-foreground">
                          Upload clear images of the illegal dumping (max 5MB)
                        </p>
                      </div>
                      <Input id="image" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                      <Button variant="outline" onClick={() => document.getElementById("image")?.click()}>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">Contact Information (Optional)</Label>
                <Input id="contact" placeholder="Phone number or email for follow-up" />
                <p className="text-xs text-muted-foreground">We may contact you for additional information if needed</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Submit Report</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="my-reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Reports</CardTitle>
              <CardDescription>Track the status of your submitted reports.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                  <div>Date</div>
                  <div>Location</div>
                  <div>Type</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-5 gap-4 p-4">
                    <div>Mar 20, 2024</div>
                    <div>Riverside Park Area</div>
                    <div>Construction Debris</div>
                    <div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                        <Clock className="h-3 w-3" />
                        In Progress
                      </span>
                    </div>
                    <div className="text-right">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-4 p-4">
                    <div>Mar 15, 2024</div>
                    <div>Main Street Corner</div>
                    <div>Household Waste</div>
                    <div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                        <CheckCircle className="h-3 w-3" />
                        Resolved
                      </span>
                    </div>
                    <div className="text-right">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-4 p-4">
                    <div>Mar 5, 2024</div>
                    <div>Industrial Zone</div>
                    <div>Hazardous Materials</div>
                    <div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300">
                        <AlertTriangle className="h-3 w-3" />
                        Urgent
                      </span>
                    </div>
                    <div className="text-right">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Map of Reported Dumpsites</CardTitle>
              <CardDescription>View all reported illegal dumpsites in your area.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">Interactive map would be displayed here</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <div className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-red-500"></span>
                  <span className="text-xs">Urgent</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
                  <span className="text-xs">In Progress</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-green-500"></span>
                  <span className="text-xs">Resolved</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

