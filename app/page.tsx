"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Recycle,
  Calendar,
  MapPin,
  Users,
  Award,
  BookOpen,
  Phone,
  Mail,
  MapPinIcon as LocationPin,
} from "lucide-react"

export default function Home() {
  // Add smooth scrolling behavior
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => {
      document.documentElement.style.scrollBehavior = "auto"
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Recycle className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">EcoSmart Waste Solutions</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/register">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Sustainable Waste Management Solutions
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Join our community to improve waste collection, encourage recycling, and reduce environmental
                    pollution.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="gap-1.5">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <img
                src="/placeholder.svg?height=550&width=550"
                alt="Waste Management Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                width={550}
                height={550}
              />
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides comprehensive tools for waste management and recycling
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Calendar className="h-12 w-12 text-green-600" />
                <h3 className="text-xl font-bold">Collection Scheduling</h3>
                <p className="text-center text-muted-foreground">
                  Schedule waste collection, set reminders, and request on-demand pickups.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <MapPin className="h-12 w-12 text-red-600" />
                <h3 className="text-xl font-bold">Illegal Dumping Reports</h3>
                <p className="text-center text-muted-foreground">
                  Report illegal dumpsites with images, location data, and track cleanup progress.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <BookOpen className="h-12 w-12 text-blue-600" />
                <h3 className="text-xl font-bold">Recycling Information</h3>
                <p className="text-center text-muted-foreground">
                  Access educational resources on waste segregation and find nearby recycling centers.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Users className="h-12 w-12 text-purple-600" />
                <h3 className="text-xl font-bold">Community Engagement</h3>
                <p className="text-center text-muted-foreground">
                  Create or join community clean-up events and track participation.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Award className="h-12 w-12 text-yellow-600" />
                <h3 className="text-xl font-bold">Rewards System</h3>
                <p className="text-center text-muted-foreground">
                  Earn points for recycling and redeem rewards from partner businesses.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <Recycle className="h-12 w-12 text-green-600" />
                <h3 className="text-xl font-bold">Admin Dashboard</h3>
                <p className="text-center text-muted-foreground">
                  Manage collection requests, monitor reports, and track community engagement.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  About EcoSmart Waste Solutions
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  EcoSmart Waste Solutions aims to provide an innovative and scalable solution to improve waste
                  management and recycling efforts, enhancing environmental sustainability through digital tools and
                  community participation.
                </p>
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    <span className="font-medium">Location:</span> 45 Samora Machel Avenue, Harare, Zimbabwe
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-medium">Mission:</span> To promote sustainable waste management and recycling
                    through digital innovation.
                  </p>
                </div>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  Our platform connects users, waste pickers, and administrators to create a more efficient and
                  environmentally friendly waste management system.
                </p>
              </div>
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="About EcoSmart Waste Solutions"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
                width={600}
                height={400}
              />
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get in Touch</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have questions or suggestions? We'd love to hear from you.
                </p>
              </div>
              <div className="grid w-full max-w-sm gap-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <p className="text-muted-foreground">+263 77 123 4567</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <p className="text-muted-foreground">info@ecosmartwaste.co.zw</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <LocationPin className="h-5 w-5 text-muted-foreground" />
                    <p className="text-muted-foreground">45 Samora Machel Avenue, Harare, Zimbabwe</p>
                  </div>
                </div>
                <form className="flex flex-col space-y-4">
                  <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Your email"
                    type="email"
                    required
                  />
                  <textarea
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Your message"
                    required
                  ></textarea>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Recycle className="h-5 w-5 text-green-600" />
            <p className="text-sm text-muted-foreground">© 2024 EcoSmart Waste Solutions. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

