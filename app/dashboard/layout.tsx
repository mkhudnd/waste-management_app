"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { Recycle, Home, Calendar, MapPin, BookOpen, Users, Award, Settings, LogOut, Menu, Bell } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
}

const userNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Collection Schedule",
    href: "/dashboard/schedule",
    icon: Calendar,
  },
  {
    title: "Report Dumping",
    href: "/dashboard/report",
    icon: MapPin,
  },
  {
    title: "Recycling Guide",
    href: "/dashboard/guide",
    icon: BookOpen,
  },
  {
    title: "Community Events",
    href: "/dashboard/events",
    icon: Users,
  },
  {
    title: "Rewards",
    href: "/dashboard/rewards",
    icon: Award,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 sm:max-w-xs">
                <div className="flex items-center gap-2 pb-4 pt-2">
                  <Recycle className="h-6 w-6 text-green-600" />
                  <span className="text-xl font-bold">EcoCollect</span>
                </div>
                <nav className="flex flex-col gap-4 py-4">
                  {userNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileNavOpen(false)}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                        pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.title}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/dashboard" className="flex items-center gap-2">
              <Recycle className="h-6 w-6 text-green-600" />
              <span className="text-xl font-bold hidden md:inline-block">EcoCollect</span>
            </Link>
          </div>
          <nav className="hidden lg:flex gap-6">
            {userNavItems.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 text-sm font-medium ${
                  pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary"></span>
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>
                      {pathname.includes('/picker-dashboard') ? 'WP' : 
                       pathname.includes('/admin') ? 'AD' : 'JD'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none">
                    {pathname.includes('/picker-dashboard') ? 'Maria Garcia' : 
                     pathname.includes('/admin') ? 'System Administrator' : 'John Smith'}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {pathname.includes('/picker-dashboard') ? 'maria@example.com' : 
                     pathname.includes('/admin') ? 'admin@example.com' : 'john@example.com'}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-2 h-2 rounded-full ${
                      pathname.includes('/picker-dashboard') ? 'bg-green-500' : 
                      pathname.includes('/admin') ? 'bg-blue-500' : 'bg-gray-500'
                    }`}></div>
                    <span className="text-xs font-medium">
                      {pathname.includes('/picker-dashboard') ? 'Waste Picker' : 
                       pathname.includes('/admin') ? 'System Administrator' : 'Regular User'}
                    </span>
                  </div>
                  {pathname.includes('/picker-dashboard') && (
                    <div className="text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Today's Collections:</span>
                        <span className="font-medium">8</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Earnings:</span>
                        <span className="font-medium">$160</span>
                      </div>
                    </div>
                  )}
                  {pathname.includes('/admin') && (
                    <div className="text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Active Users:</span>
                        <span className="font-medium">1,248</span>
                      </div>
                      <div className="flex justify-between">
                        <span>System Status:</span>
                        <span className="font-medium text-green-600">Online</span>
                      </div>
                    </div>
                  )}
                  {!pathname.includes('/picker-dashboard') && !pathname.includes('/admin') && (
                    <div className="text-xs text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Recycling Points:</span>
                        <span className="font-medium">245</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Collections:</span>
                        <span className="font-medium">15</span>
                      </div>
                    </div>
                  )}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-muted/40">{children}</main>
      <Toaster />
    </div>
  )
}

