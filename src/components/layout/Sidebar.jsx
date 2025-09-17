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
  GraduationCap
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
    title: "الدورات",
    href: "/courses",
    icon: BookOpen
  },
  {
    title: "الطلاب",
    href: "/students",
    icon: Users
  },
  {
    title: "التقارير",
    href: "/reports",
    icon: BarChart3
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
        "bg-card border-l border-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <img 
                src="/tallaam_logo.png" 
                alt="تعلّم" 
                className="w-10 h-10 object-contain"
              />
              <span className="font-bold text-xl text-primary">تعلّم</span>
            </div>
          )}
          {/* {collapsed && (
            <div className="flex justify-center">
              <img 
                src="/tallaam_logo.png" 
                alt="تعلّم" 
                className="w-8 h-8 object-contain"
              />
            </div>
          )} */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="hover:bg-accent"
          >
            {collapsed ? (
              <Menu className="w-5 h-5" />
            ) : (
              <X className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
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
                collapsed && "justify-center"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-accent",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>تسجيل الخروج</span>}
        </Button>
      </div>
    </div>
  )
}
