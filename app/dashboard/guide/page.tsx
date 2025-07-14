import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Recycle, Trash2, Leaf, Zap, Search, MapPin, ExternalLink } from "lucide-react"

export default function GuidePage() {
  return (
    <div className="container py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Recycling Guide</h1>
        <p className="text-muted-foreground">Learn how to properly sort and recycle different types of waste.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search for recycling information..." className="pl-10" />
      </div>

      <Tabs defaultValue="sorting" className="space-y-4">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="sorting">Waste Sorting</TabsTrigger>
          <TabsTrigger value="centers">Recycling Centers</TabsTrigger>
          <TabsTrigger value="tips">Recycling Tips</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        <TabsContent value="sorting" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Recycle className="h-5 w-5 text-green-500" />
                  Recyclables
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">Paper, cardboard, glass, metal cans, and certain plastics.</p>
                <ul className="ml-5 list-disc text-sm space-y-1">
                  <li>Clean and dry paper products</li>
                  <li>Rinsed glass bottles and jars</li>
                  <li>Aluminum and steel cans</li>
                  <li>Plastic bottles with codes #1 and #2</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Learn More
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Trash2 className="h-5 w-5 text-gray-500" />
                  General Waste
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">Non-recyclable and non-hazardous waste.</p>
                <ul className="ml-5 list-disc text-sm space-y-1">
                  <li>Food-soiled paper and cardboard</li>
                  <li>Plastic bags and wrappers</li>
                  <li>Styrofoam containers</li>
                  <li>Disposable diapers</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Learn More
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  Organic Waste
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">Biodegradable waste that can be composted.</p>
                <ul className="ml-5 list-disc text-sm space-y-1">
                  <li>Food scraps and leftovers</li>
                  <li>Yard trimmings and leaves</li>
                  <li>Coffee grounds and filters</li>
                  <li>Uncoated paper products</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Learn More
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  Hazardous Waste
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm">Materials that require special handling.</p>
                <ul className="ml-5 list-disc text-sm space-y-1">
                  <li>Batteries and electronics</li>
                  <li>Paint and solvents</li>
                  <li>Pesticides and chemicals</li>
                  <li>Fluorescent light bulbs</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Interactive Waste Sorting Guide</CardTitle>
              <CardDescription>
                Learn how to properly sort different types of waste with our interactive guide.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">Interactive waste sorting guide would be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="centers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recycling Centers Near You</CardTitle>
              <CardDescription>Find recycling centers and drop-off locations in your area.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">Map of recycling centers would be displayed here</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">City Recycling Center</h3>
                      <p className="text-sm text-muted-foreground">123 Main Street, Downtown</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                          Recyclables
                        </span>
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          E-Waste
                        </span>
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                          Hazardous
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <MapPin className="h-4 w-4" />
                        Directions
                      </Button>
                      <p className="text-xs text-muted-foreground">1.2 miles away</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm">
                      <span className="font-medium">Hours:</span> Mon-Sat: 8AM-6PM, Sun: 10AM-4PM
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">GreenCycle Depot</h3>
                      <p className="text-sm text-muted-foreground">456 Park Avenue, Westside</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                          Recyclables
                        </span>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                          Organic
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <MapPin className="h-4 w-4" />
                        Directions
                      </Button>
                      <p className="text-xs text-muted-foreground">2.5 miles away</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm">
                      <span className="font-medium">Hours:</span> Mon-Fri: 9AM-7PM, Sat-Sun: 9AM-5PM
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">EcoTech Recycling</h3>
                      <p className="text-sm text-muted-foreground">789 Industrial Blvd, Eastside</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          E-Waste
                        </span>
                        <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                          Batteries
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <MapPin className="h-4 w-4" />
                        Directions
                      </Button>
                      <p className="text-xs text-muted-foreground">3.8 miles away</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm">
                      <span className="font-medium">Hours:</span> Mon-Fri: 10AM-6PM, Closed weekends
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">View All Recycling Centers</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="tips" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recycling Tips & Best Practices</CardTitle>
              <CardDescription>Learn how to maximize your recycling efforts and reduce waste.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">General Recycling Tips</h3>
                <ul className="ml-6 list-disc space-y-2">
                  <li className="text-sm">
                    <span className="font-medium">Rinse containers:</span> Remove food residue from containers before
                    recycling.
                  </li>
                  <li className="text-sm">
                    <span className="font-medium">Remove lids and caps:</span> Separate plastic caps from glass bottles.
                  </li>
                  <li className="text-sm">
                    <span className="font-medium">Flatten cardboard boxes:</span> Break down boxes to save space in
                    recycling bins.
                  </li>
                  <li className="text-sm">
                    <span className="font-medium">Check local guidelines:</span> Recycling rules vary by location, so
                    check your local requirements.
                  </li>
                  <li className="text-sm">
                    <span className="font-medium">Don't bag recyclables:</span> Keep recyclables loose in your bin, not
                    in plastic bags.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Reducing Waste at Home</h3>
                <ul className="ml-6 list-disc space-y-2">
                  <li className="text-sm">
                    <span className="font-medium">Use reusable bags:</span> Bring your own bags when shopping.
                  </li>
                  <li className="text-sm">
                    <span className="font-medium">Buy in bulk:</span> Reduce packaging waste by purchasing larger
                    quantities.
                  </li>
                  <li className="text-sm">
                    <span className="font-medium">Compost food scraps:</span> Start a compost bin for organic waste.
                  </li>
                  <li className="text-sm">
                    <span className="font-medium">Choose products with less packaging:</span> Look for items with
                    minimal or recyclable packaging.
                  </li>
                  <li className="text-sm">
                    <span className="font-medium">Repair instead of replace:</span> Fix broken items when possible
                    instead of buying new ones.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Common Recycling Mistakes</h3>
                <ul className="ml-6 list-disc space-y-2">
                  <li className="text-sm">
                    <span className="font-medium">Greasy pizza boxes:</span> The greasy part of pizza boxes cannot be
                    recycled.
                  </li>
                  <li className="text-sm">
                    <span className="font-medium">Plastic bags:</span> Most curbside programs don't accept plastic bags.
                  </li>
                  <li className="text-sm">
                    <span className="font-medium">Shredded paper:</span> Small paper shreds often can't be processed by
                    recycling equipment.
                  </li>
                  <li className="text-sm">
                    <span className="font-medium">Coffee cups:</span> Most disposable coffee cups have a plastic lining
                    that makes them non-recyclable.
                  </li>
                  <li className="text-sm">
                    <span className="font-medium">Wishful recycling:</span> When in doubt, check before tossing items in
                    the recycling bin.
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full gap-1">
                <ExternalLink className="h-4 w-4" />
                Download Recycling Guide PDF
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Common questions about waste management and recycling.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">What items can be recycled in my curbside bin?</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Most curbside programs accept paper, cardboard, glass bottles and jars, aluminum and steel cans, and
                    plastic containers with recycling codes #1 and #2. Some programs also accept #3-#7 plastics. Check
                    your local guidelines for specific information.
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Do I need to clean containers before recycling them?</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Yes, containers should be rinsed and free of food residue. They don't need to be spotless, but
                    excess food can contaminate other recyclables and attract pests at recycling facilities.
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Can I recycle plastic bags?</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Most curbside recycling programs do not accept plastic bags as they can jam sorting machinery.
                    However, many grocery stores and retailers offer plastic bag recycling drop-off points.
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">How do I dispose of electronic waste?</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Electronic waste (e-waste) should not go in regular trash or recycling. Many communities have
                    special e-waste collection events or drop-off locations. Some electronics retailers also offer
                    recycling programs for old devices.
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">What happens to my recycling after it's collected?</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    After collection, recyclables are taken to a Materials Recovery Facility (MRF) where they're sorted
                    by type. The sorted materials are then baled and sold to manufacturers who process them into new
                    products.
                  </p>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">How can I reduce waste at home?</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Reduce waste by buying products with less packaging, using reusable items instead of disposables,
                    composting food scraps, repairing items instead of replacing them, and donating usable items instead
                    of throwing them away.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="w-full space-y-2">
                <p className="text-sm text-muted-foreground">Don't see your question? Contact our support team.</p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

