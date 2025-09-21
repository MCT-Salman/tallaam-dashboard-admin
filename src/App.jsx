// src\App.jsx
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import Courses from "./pages/Courses"
import Students from "./pages/Students"
import Reports from "./pages/Reports"
import Notifications from "./pages/Notifications"
import Profile from "./pages/Profile"
import Settings from "./pages/Settings"

// Admin Pages
import CourseManagement from "./pages/admin/CourseManagement"
import StudentManagement from "./pages/admin/StudentManagement"
import SalesManagement from "./pages/admin/SalesManagement"
import FinancialManagement from "./pages/admin/FinancialManagement"
import AdsManagement from "./pages/admin/AdsManagement"
import CouponManagement from "./pages/admin/CouponManagement"
import SubAdminManagement from "./pages/admin/SubAdminManagement"
import SuggestionsManagement from "./pages/admin/SuggestionsManagement"
import LinkVerification from "./pages/admin/LinkVerification"
import StoriesManagement from "./pages/admin/StoriesManagement"
import './app.css'
import AccessCodes from "./pages/admin/AccessCodes"
import { AppSettingsProvider } from "./contexts/AppSettingsContext"
import AdminSettings from "./pages/admin/AdminSettings"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppSettingsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />
          {/* Admin Routes */}
          <Route
            path="/admin/courses"
            element={
              <DashboardLayout>
                <CourseManagement />
              </DashboardLayout>
            }
          />
          <Route
            path="/admin/students"
            element={
              <DashboardLayout>
                <StudentManagement />
              </DashboardLayout>
            }
          />
          <Route
            path="/admin/sales"
            element={
              <DashboardLayout>
                <SalesManagement />
              </DashboardLayout>
            }
          />
          <Route
            path="/admin/financial"
            element={
              <DashboardLayout>
                <FinancialManagement />
              </DashboardLayout>
            }
          />
          <Route
            path="/admin/ads"
            element={
              <DashboardLayout>
                <AdsManagement />
              </DashboardLayout>
            }
          />
          <Route
            path="/admin/coupons"
            element={
              <DashboardLayout>
                <CouponManagement />
              </DashboardLayout>
            }
          />
          <Route
            path="/admin/sub-admins"
            element={
              <DashboardLayout>
                <SubAdminManagement />
              </DashboardLayout>
            }
          />
          <Route
            path="/admin/suggestions"
            element={
              <DashboardLayout>
                <SuggestionsManagement />
              </DashboardLayout>
            }
          />
          <Route
            path="/admin/stories"
            element={
              <DashboardLayout>
                <StoriesManagement />
              </DashboardLayout>
            }
          />
          <Route
            path="/admin/link-verification"
            element={
              <DashboardLayout>
                <LinkVerification />
              </DashboardLayout>
            }
          />
          <Route
            path="/admin/access-codes"
            element={
              <DashboardLayout>
                <AccessCodes />
              </DashboardLayout>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <DashboardLayout>
                <AdminSettings />
              </DashboardLayout>
            }
          />
          {/* Legacy Routes */}
          <Route
            path="/courses"
            element={
              <DashboardLayout>
                <Courses />
              </DashboardLayout>
            }
          />
          <Route
            path="/students"
            element={
              <DashboardLayout>
                <Students />
              </DashboardLayout>
            }
          />
          <Route
            path="/reports"
            element={
              <DashboardLayout>
                <Reports />
              </DashboardLayout>
            }
          />
          <Route
            path="/notifications"
            element={
              <DashboardLayout>
                <Notifications />
              </DashboardLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </AppSettingsProvider>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
