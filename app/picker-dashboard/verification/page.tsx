"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { 
  Camera, 
  Upload, 
  CheckCircle, 
  FileText,
  Scale,
  Signature,
  QrCode,
  AlertTriangle,
  Clock,
  MapPin,
  Users,
  Star,
  Download,
  Share,
  Trash2,
  RotateCw,
  Zoom,
  X
} from "lucide-react"

interface CollectionRecord {
  assignmentId: string
  customerName: string
  address: string
  wasteTypes: string[]
  photos: {
    before: string[]
    after: string[]
    waste: string[]
  }
  weight: number
  signature: string
  timestamp: Date
  notes: string
  customerRating: number
  issues: string[]
  verification_status: "pending" | "verified" | "rejected"
}

export default function VerificationPage() {
  const { toast } = useToast()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentAssignment] = useState({
    id: "A001",
    customerName: "Johnson Family",
    address: "123 Main Street, Downtown",
    wasteTypes: ["General Waste", "Cardboard"],
    scheduledWeight: 45
  })

  const [collectionData, setCollectionData] = useState<Partial<CollectionRecord>>({
    assignmentId: currentAssignment.id,
    customerName: currentAssignment.customerName,
    address: currentAssignment.address,
    wasteTypes: currentAssignment.wasteTypes,
    photos: { before: [], after: [], waste: [] },
    weight: 0,
    signature: "",
    notes: "",
    customerRating: 5,
    issues: [],
    verification_status: "pending"
  })

  const [captureMode, setCaptureMode] = useState<"before" | "after" | "waste">("before")
  const [showCamera, setShowCamera] = useState(false)

  // Simulated photo capture
  const handlePhotoCapture = () => {
    const photoUrl = `data:image/svg+xml;base64,${btoa(`
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f0f0f0"/>
        <circle cx="150" cy="100" r="30" fill="#4CAF50"/>
        <text x="150" y="160" text-anchor="middle" font-family="Arial" font-size="12">
          ${captureMode.toUpperCase()} PHOTO
        </text>
        <text x="150" y="175" text-anchor="middle" font-family="Arial" font-size="10">
          ${new Date().toLocaleTimeString()}
        </text>
      </svg>
    `)}`

    setCollectionData(prev => ({
      ...prev,
      photos: {
        ...prev.photos!,
        [captureMode]: [...(prev.photos![captureMode] || []), photoUrl]
      }
    }))

    setShowCamera(false)
    toast({
      title: "Photo Captured",
      description: `${captureMode.charAt(0).toUpperCase() + captureMode.slice(1)} photo saved successfully.`,
      duration: 3000,
    })
  }

  // Digital signature handling
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.beginPath()
      ctx.moveTo(x, y)
      setIsDrawing(true)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.lineWidth = 2
      ctx.lineCap = "round"
      ctx.strokeStyle = "#000"
      ctx.lineTo(x, y)
      ctx.stroke()
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (canvas) {
      setCollectionData(prev => ({
        ...prev,
        signature: canvas.toDataURL()
      }))
    }
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        setCollectionData(prev => ({ ...prev, signature: "" }))
      }
    }
  }

  const handleWeightInput = (weight: number) => {
    setCollectionData(prev => ({ ...prev, weight }))
    
    const difference = weight - currentAssignment.scheduledWeight
    if (Math.abs(difference) > 10) {
      toast({
        title: "Weight Discrepancy",
        description: `Actual weight differs from estimate by ${Math.abs(difference).toFixed(1)}kg. Please verify.`,
        variant: "destructive",
        duration: 5000,
      })
    }
  }

  const handleSubmitVerification = async () => {
    if (!collectionData.signature) {
      toast({
        title: "Signature Required",
        description: "Customer signature is required to complete verification.",
        variant: "destructive",
        duration: 4000,
      })
      return
    }

    if (collectionData.photos?.before.length === 0) {
      toast({
        title: "Photos Required",
        description: "At least one 'before' photo is required for verification.",
        variant: "destructive",
        duration: 4000,
      })
      return
    }

    // Simulate submission
    setTimeout(() => {
      toast({
        title: "Verification Complete!",
        description: `Collection verified successfully. Earnings: $15.50 + $2.00 efficiency bonus`,
        duration: 5000,
      })
      
      // Reset form
      setCollectionData({
        assignmentId: "",
        photos: { before: [], after: [], waste: [] },
        weight: 0,
        signature: "",
        notes: "",
        customerRating: 5,
        issues: [],
        verification_status: "pending"
      })
      clearSignature()
    }, 2000)
  }

  const removePhoto = (category: keyof typeof collectionData.photos, index: number) => {
    setCollectionData(prev => ({
      ...prev,
      photos: {
        ...prev.photos!,
        [category]: prev.photos![category].filter((_, i) => i !== index)
      }
    }))
  }

  return (
    <div className="container py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Collection Verification</h1>
          <p className="text-muted-foreground">
            Document and verify waste collection with photos, signatures, and measurements
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Assignment: {currentAssignment.id}</Badge>
          <Badge variant="secondary">{currentAssignment.customerName}</Badge>
        </div>
      </div>

      {/* Current Assignment Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Current Collection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-sm font-medium">Customer</Label>
              <p>{currentAssignment.customerName}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Address</Label>
              <p>{currentAssignment.address}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Waste Types</Label>
              <div className="flex flex-wrap gap-1 mt-1">
                {currentAssignment.wasteTypes.map(type => (
                  <Badge key={type} variant="secondary" className="text-xs">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Tabs */}
      <Tabs defaultValue="photos" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="photos">
            <Camera className="mr-2 h-4 w-4" />
            Photos
          </TabsTrigger>
          <TabsTrigger value="weight">
            <Scale className="mr-2 h-4 w-4" />
            Weight
          </TabsTrigger>
          <TabsTrigger value="signature">
            <Signature className="mr-2 h-4 w-4" />
            Signature
          </TabsTrigger>
          <TabsTrigger value="review">
            <CheckCircle className="mr-2 h-4 w-4" />
            Review
          </TabsTrigger>
        </TabsList>

        <TabsContent value="photos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Photo Documentation</CardTitle>
              <CardDescription>
                Capture before, after, and waste type photos for verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Photo Capture Modes */}
              <div className="flex gap-2">
                <Button 
                  variant={captureMode === "before" ? "default" : "outline"}
                  onClick={() => setCaptureMode("before")}
                >
                  Before Collection
                </Button>
                <Button 
                  variant={captureMode === "after" ? "default" : "outline"}
                  onClick={() => setCaptureMode("after")}
                >
                  After Collection
                </Button>
                <Button 
                  variant={captureMode === "waste" ? "default" : "outline"}
                  onClick={() => setCaptureMode("waste")}
                >
                  Waste Type
                </Button>
              </div>

              {/* Camera Interface */}
              {showCamera ? (
                <Card className="p-4">
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4">
                    <div className="text-center">
                      <Camera className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg font-semibold">Camera Preview</p>
                      <p className="text-sm text-muted-foreground">
                        Capturing {captureMode} photo
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handlePhotoCapture} className="flex-1">
                      <Camera className="mr-2 h-4 w-4" />
                      Capture Photo
                    </Button>
                    <Button variant="outline" onClick={() => setShowCamera(false)}>
                      Cancel
                    </Button>
                  </div>
                </Card>
              ) : (
                <Button onClick={() => setShowCamera(true)} className="w-full h-20">
                  <Camera className="mr-2 h-6 w-6" />
                  Open Camera
                </Button>
              )}

              {/* Photo Gallery */}
              {Object.entries(collectionData.photos || {}).map(([category, photos]) => (
                <div key={category} className="space-y-2">
                  <Label className="text-sm font-medium capitalize">
                    {category} Photos ({photos.length})
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={photo} 
                          alt={`${category} ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removePhoto(category as keyof typeof collectionData.photos, index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weight" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weight Measurement</CardTitle>
              <CardDescription>
                Record actual waste weight and compare with estimates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="estimated-weight">Estimated Weight</Label>
                    <Input 
                      id="estimated-weight"
                      value={`${currentAssignment.scheduledWeight} kg`}
                      disabled
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="actual-weight">Actual Weight</Label>
                    <Input 
                      id="actual-weight"
                      type="number"
                      placeholder="Enter weight in kg"
                      value={collectionData.weight || ""}
                      onChange={(e) => handleWeightInput(Number(e.target.value))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="weight-notes">Weight Notes</Label>
                    <Textarea 
                      id="weight-notes"
                      placeholder="Any discrepancies or notes about the weight..."
                      value={collectionData.notes || ""}
                      onChange={(e) => setCollectionData(prev => ({ ...prev, notes: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-6 text-center">
                  <Scale className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <div className="space-y-2">
                    <p className="text-2xl font-bold">
                      {collectionData.weight || 0} kg
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Difference: {collectionData.weight ? 
                        `${(collectionData.weight - currentAssignment.scheduledWeight > 0 ? '+' : '')}${(collectionData.weight - currentAssignment.scheduledWeight).toFixed(1)} kg` 
                        : 'N/A'}
                    </p>
                    {collectionData.weight && Math.abs(collectionData.weight - currentAssignment.scheduledWeight) > 10 && (
                      <Badge variant="destructive">Significant Discrepancy</Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* QR Code Scanning */}
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <QrCode className="h-8 w-8" />
                  <div className="flex-1">
                    <h4 className="font-semibold">Container Tracking</h4>
                    <p className="text-sm text-muted-foreground">Scan waste container QR codes for tracking</p>
                  </div>
                  <Button variant="outline">
                    <QrCode className="mr-2 h-4 w-4" />
                    Scan Code
                  </Button>
                </div>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signature" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Signature</CardTitle>
              <CardDescription>
                Obtain customer signature to confirm collection completion
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Digital Signature Pad</Label>
                <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-4">
                  <canvas
                    ref={canvasRef}
                    width={400}
                    height={200}
                    className="border rounded cursor-crosshair w-full max-w-lg"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={clearSignature} variant="outline">
                    <RotateCw className="mr-2 h-4 w-4" />
                    Clear Signature
                  </Button>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                </div>
              </div>

              {/* Customer Rating */}
              <div className="space-y-4">
                <Label>Customer Satisfaction</Label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      variant="ghost"
                      size="sm"
                      onClick={() => setCollectionData(prev => ({ ...prev, customerRating: star }))}
                    >
                      <Star 
                        className={`h-6 w-6 ${
                          star <= (collectionData.customerRating || 0) 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-gray-300'
                        }`} 
                      />
                    </Button>
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {collectionData.customerRating}/5 stars
                  </span>
                </div>
              </div>

              {/* Collection Issues */}
              <div className="space-y-4">
                <Label>Collection Issues (if any)</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Access Issues",
                    "Wrong Waste Type", 
                    "Container Full",
                    "Customer Complaint",
                    "Safety Concern",
                    "Equipment Problem"
                  ].map((issue) => (
                    <Button
                      key={issue}
                      variant={collectionData.issues?.includes(issue) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setCollectionData(prev => ({
                          ...prev,
                          issues: prev.issues?.includes(issue)
                            ? prev.issues.filter(i => i !== issue)
                            : [...(prev.issues || []), issue]
                        }))
                      }}
                    >
                      {issue}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Verification Review</CardTitle>
              <CardDescription>
                Review all collected data before submission
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Collection Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Photos Captured</h4>
                  <div className="space-y-1 text-sm">
                    <p>Before: {collectionData.photos?.before.length || 0} photos</p>
                    <p>After: {collectionData.photos?.after.length || 0} photos</p>
                    <p>Waste: {collectionData.photos?.waste.length || 0} photos</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Weight Information</h4>
                  <div className="space-y-1 text-sm">
                    <p>Estimated: {currentAssignment.scheduledWeight} kg</p>
                    <p>Actual: {collectionData.weight || 0} kg</p>
                    <p>Difference: {collectionData.weight ? 
                      `${(collectionData.weight - currentAssignment.scheduledWeight).toFixed(1)} kg` 
                      : 'N/A'}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Customer Details</h4>
                  <div className="space-y-1 text-sm">
                    <p>Signature: {collectionData.signature ? '✓ Obtained' : '✗ Missing'}</p>
                    <p>Rating: {collectionData.customerRating}/5 stars</p>
                    <p>Issues: {collectionData.issues?.length || 0} reported</p>
                  </div>
                </div>
              </div>

              {/* Issues Summary */}
              {collectionData.issues && collectionData.issues.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Reported Issues:</h4>
                  <div className="flex flex-wrap gap-1">
                    {collectionData.issues.map(issue => (
                      <Badge key={issue} variant="outline" className="text-yellow-700">
                        {issue}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <Button 
                  onClick={handleSubmitVerification}
                  className="w-full h-12 text-lg"
                  disabled={!collectionData.signature || !collectionData.photos?.before.length}
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Submit Collection Verification
                </Button>
                {(!collectionData.signature || !collectionData.photos?.before.length) && (
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    {!collectionData.signature && "Customer signature required. "}
                    {!collectionData.photos?.before.length && "At least one 'before' photo required."}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 