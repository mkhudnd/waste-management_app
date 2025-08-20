# 🌱 EcoCollect - Waste Management Application

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Status](https://img.shields.io/badge/Status-In%20Progress-yellow?style=flat-square)](https://github.com/mkhudnd/waste-management_app)

> **⚠️ Work in Progress**: This application is currently under active development. Features are being continuously added and improved.

A comprehensive waste management application built with Next.js, TypeScript, and modern UI components. EcoCollect provides separate dashboards for regular users, waste pickers, and system administrators to manage waste collection efficiently.

## 🚀 Features

### 👤 **User Dashboard**
- **Interactive Collection Scheduling** - Schedule waste pickups with date/time selection
- **Real-time Notifications** - Toast notifications for all user actions
- **Waste Reporting** - Report illegal dumping with location tracking
- **Community Events** - View and join local environmental events
- **Recycling Guide** - Educational resources for proper waste sorting
- **Rewards System** - Track recycling points and achievements

### 🚛 **Waste Picker Dashboard**
- **Smart Assignment Management** - Real-time route assignments with priority indicators
- **GPS Navigation & Route Optimization** - Interactive maps with turn-by-turn directions
- **Collection Verification System** - Photo capture and digital signatures
- **Performance & Earnings Tracking** - Detailed analytics and payment summaries
- **Vehicle Management** - Monitor vehicle status and maintenance alerts
- **Emergency Features** - Quick access to emergency contacts and protocols

### ⚙️ **System Administrator Dashboard**
- **Isolated Account Management** - Separate management for users, pickers, and admins
- **Real-time Analytics** - System performance metrics and reporting
- **Route Management** - Create, optimize, and assign collection routes
- **Fleet Management** - Vehicle tracking, maintenance scheduling, and status monitoring
- **Financial Management** - Payment processing, invoicing, and expense tracking
- **Alert & Safety System** - Monitor and manage system-wide alerts

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Forms**: React Hook Form with Zod validation
- **Notifications**: Sonner toast notifications

## 📁 Project Structure

```
waste-management-app/
├── app/
│   ├── dashboard/              # User dashboard
│   │   ├── admin/             # Admin management pages
│   │   ├── schedule/          # Collection scheduling
│   │   ├── report/            # Waste reporting
│   │   └── ...
│   ├── picker-dashboard/       # Waste picker interface
│   │   ├── assignments/       # Route assignments
│   │   ├── verification/      # Collection verification
│   │   ├── performance/       # Performance tracking
│   │   └── ...
│   ├── login/                 # Authentication
│   └── register/              # User registration
├── components/
│   ├── ui/                    # Reusable UI components
│   └── theme-provider.tsx     # Theme configuration
├── hooks/                     # Custom React hooks
└── lib/                       # Utility functions
```

## 🎯 Key Features Implemented

### ✅ **Completed Features**
- [x] Responsive user interface with modern design
- [x] Complete user dashboard with interactive scheduling
- [x] Waste picker dashboard with GPS navigation
- [x] Admin dashboard with isolated account management
- [x] Real-time notifications and feedback
- [x] Form validation and error handling
- [x] Route optimization and management
- [x] Performance tracking and analytics
- [x] Vehicle and fleet management

### 🚧 **In Progress**
- [ ] Backend API integration
- [ ] Real GPS integration
- [ ] Payment gateway integration
- [ ] Push notifications
- [ ] Mobile app version
- [ ] Advanced reporting features
- [ ] Machine learning route optimization
- [ ] Multi-language support

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/mkhudnd/waste-management_app.git
   cd waste-management_app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Screenshots

> Screenshots will be added as features are completed

## 🎨 Design Principles

- **User-Centric Design**: Intuitive interfaces for different user types
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Accessibility**: Built with accessibility standards in mind
- **Performance**: Optimized for fast loading and smooth interactions
- **Scalability**: Modular architecture for easy feature expansion

## 🤝 Contributing

This is currently a personal project under development. Contributions, suggestions, and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Status

**Current Phase**: Core Feature Implementation  
**Next Phase**: Backend Integration & API Development  
**Target**: Production-ready waste management platform

## 📧 Contact

**Developer**: mkhudnd @ mkhundhlovu@gmail.com
**Repository**: [https://github.com/mkhudnd/waste-management_app](https://github.com/mkhudnd/waste-management_app)

---

⭐ **Star this repository** if you find it interesting or useful!

> This project is part of an ongoing effort to create sustainable waste management solutions through technology. 
