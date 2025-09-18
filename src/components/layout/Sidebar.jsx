// src\components\layout\Sidebar.jsx
import { Link, useLocation } from "react-router-dom"
import {
  Home,
  BookOpen,
  Users,
  Settings,
  User,
  BarChart3,
  Bell,
  LogOut,
  Menu,
  X,
  GraduationCap,
  DollarSign,
  Megaphone,
  Percent,
  UserCheck,
  MessageSquare,
  Link as LinkIcon,
  FileText
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const sidebarItems = [
  {
    title: "الرئيسية",
    href: "/dashboard",
    icon: Home
  },
  {
    title: "إدارة الدورات",
    href: "/admin/courses",
    icon: BookOpen
  },
  {
    title: "إدارة الطلاب",
    href: "/admin/students",
    icon: Users
  },
  {
    title: "إدارة المبيعات",
    href: "/admin/sales",
    icon: DollarSign
  },
  {
    title: "الإدارة المالية",
    href: "/admin/financial",
    icon: BarChart3
  },
  {
    title: "إدارة الإعلانات",
    href: "/admin/ads",
    icon: Megaphone
  },
  {
    title: "كوبونات الخصم",
    href: "/admin/coupons",
    icon: Percent
  },
  {
    title: "المدراء الفرعيين",
    href: "/admin/sub-admins",
    icon: UserCheck
  },
  {
    title: "المقترحات",
    href: "/admin/suggestions",
    icon: MessageSquare
  },
  {
    title: "التحقق من الروابط",
    href: "/admin/link-verification",
    icon: LinkIcon
  },
  {
    title: "الإشعارات",
    href: "/notifications",
    icon: Bell
  },
  {
    title: "الملف الشخصي",
    href: "/profile",
    icon: User
  },
  {
    title: "الإعدادات",
    href: "/settings",
    icon: Settings
  }
]

export function Sidebar({ collapsed, onToggle }) {
  const location = useLocation()

  return (
    <div
      className={cn(
        "bg-card border-l border-border transition-all duration-300 flex flex-col fixed top-0 right-0 h-screen z-50",
        "lg:border-l md:border-l sm:border-b sm:border-l-0",
        "sm:w-full sm:h-auto sm:right-0 sm:left-0",
        "lg:w-64 md:w-64 sm:w-full",
        collapsed ? "lg:w-16 md:w-16 sm:w-full" : "lg:w-64 md:w-64 sm:w-full"
      )}
    >
      {/* Header - Fixed */}
      <div className="p-4 border-b border-border flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {!collapsed && (<><img
              src="/tallaam_logo2.png"
              alt="تعلّم"
              className="w-10 h-10 object-contain"
            />
              <span className="font-bold text-xl text-primary block " >تعلّم</span></>
            )}

          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="hover:bg-accent "
          >
            {collapsed ? (
              <img
                src="/tallaam_logo2.png"
                alt="تعلّم"
                className="w-10 h-10 object-contain"
              />
            ) : (
              <X className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation - Scrollable */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent hover:scrollbar-thumb-primary max-h-[calc(100vh-150px)] lg:max-h-[calc(100vh-150px)]">
        {sidebarItems.map(item => {
          const isActive = location.pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-colors text-sm font-medium",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent",
                collapsed && "justify-center lg:justify-center"
              )}
            >

              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="block">{item.title}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer - Fixed */}
      <div className="p-4 border-t border-border flex-shrink-0">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-accent",
            collapsed && "justify-center lg:justify-center"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="block">تسجيل الخروج</span>}

        </Button>
      </div>
    </div>
  )
}
