// src\pages\Dashboard.jsx
import {
  Users,
  BookOpen,
  TrendingUp,
  Star,
  Clock,
  Calendar,
  Trophy,
  PlayCircle,
  DollarSign,
  Megaphone,
  Percent,
  UserCheck,
  MessageSquare,
  Link as LinkIcon,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  ShoppingCart
} from "lucide-react"
import { StatsCard } from "@/components/dashboard/StatsCard"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const navigate = useNavigate()
  
  // بيانات إحصائيات الإدمن
  const adminStats = {
    totalStudents: 1247,
    totalCourses: 24,
    totalRevenue: 12500,
    totalSales: 156,
    activeSubAdmins: 3,
    unreadSuggestions: 12,
    brokenLinks: 2,
    activeAds: 5
  }

  const recentCourses = [
    {
      id: 1,
      title: "أساسيات البرمجة",
      students: 124,
      revenue: 6200,
      status: "نشط",
      linkStatus: "يعمل"
    },
    {
      id: 2,
      title: "تطوير المواقع",
      students: 89,
      revenue: 4450,
      status: "نشط",
      linkStatus: "معطل"
    },
    {
      id: 3,
      title: "الذكاء الاصطناعي",
      students: 156,
      revenue: 7800,
      status: "نشط",
      linkStatus: "يعمل"
    }
  ]

  const recentActivities = [
    {
      time: "10:30",
      title: "طلب كوبون خصم جديد",
      type: "كوبون",
      status: "مكتمل"
    },
    {
      time: "09:15",
      title: "إضافة دورة جديدة: تطوير التطبيقات",
      type: "دورة",
      status: "مكتمل"
    },
    {
      time: "08:45",
      title: "مقترح جديد من الطالب أحمد محمد",
      type: "مقترح",
      status: "غير مقروء"
    },
    {
      time: "08:20",
      title: "رابط معطل تم اكتشافه: دورة تطوير المواقع",
      type: "تحذير",
      status: "يحتاج إصلاح"
    }
  ]

  const systemAlerts = [
    {
      id: 1,
      type: "تحذير",
      message: "2 روابط YouTube معطلة تحتاج إصلاح",
      icon: AlertTriangle,
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      id: 2,
      type: "مقترحات",
      message: "12 مقترح جديد من الطلاب",
      icon: MessageSquare,
      color: "text-info",
      bgColor: "bg-info/10"
    },
    {
      id: 3,
      type: "نجاح",
      message: "تم إنشاء 3 كوبونات خصم جديدة",
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/10"
    }
  ]

  const quickActions = [
    {
      title: "إضافة دورة جديدة",
      icon: BookOpen,
      action: () => navigate("/admin/courses"),
      color: "bg-primary/10 text-primary"
    },
    {
      title: "إنشاء كوبون خصم",
      icon: Percent,
      action: () => navigate("/admin/coupons"),
      color: "bg-secondary/10 text-secondary"
    },
    {
      title: "إضافة إعلان جديد",
      icon: Megaphone,
      action: () => navigate("/admin/ads"),
      color: "bg-accent/10 text-accent"
    },
    {
      title: "فحص الروابط",
      icon: LinkIcon,
      action: () => navigate("/admin/link-verification"),
      color: "bg-warning/10 text-warning"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            لوحة تحكم المدير 
          </h1>
          <p className="text-muted-foreground mt-1">
            نظرة عامة على إدارة منصة تعلّم التعليمية
          </p>
        </div>
        <Button className="btn-hero" onClick={() => navigate("/admin/courses")}>
          <PlayCircle className="w-4 h-4 ml-2" />
          إضافة دورة جديدة
        </Button>
      </div>

      {/* System Alerts */}
      {systemAlerts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {systemAlerts.map((alert) => {
            const Icon = alert.icon
            return (
              <Card key={alert.id} className="border-l-4 border-l-warning">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${alert.bgColor}`}>
                      <Icon className={`w-5 h-5 ${alert.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.type}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="إجمالي الطلاب"
          value={adminStats.totalStudents.toLocaleString()}
          change="+12%"
          changeType="increase"
          icon={Users}
        />
        <StatsCard
          title="الدورات النشطة"
          value={adminStats.totalCourses.toString()}
          change="+3"
          changeType="increase"
          icon={BookOpen}
        />
        <StatsCard
          title="إجمالي الإيرادات"
          value={`$${adminStats.totalRevenue.toLocaleString()}`}
          change="+8%"
          changeType="increase"
          icon={DollarSign}
        />
        <StatsCard
          title="إجمالي المبيعات"
          value={adminStats.totalSales.toString()}
          change="+15%"
          changeType="increase"
          icon={ShoppingCart}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="المدراء الفرعيين"
          value={adminStats.activeSubAdmins.toString()}
          change="نشط"
          changeType="increase"
          icon={UserCheck}
        />
        <StatsCard
          title="المقترحات الجديدة"
          value={adminStats.unreadSuggestions.toString()}
          change="يحتاج مراجعة"
          changeType="warning"
          icon={MessageSquare}
        />
        <StatsCard
          title="الروابط المعطلة"
          value={adminStats.brokenLinks.toString()}
          change="يحتاج إصلاح"
          changeType="warning"
          icon={XCircle}
        />
        <StatsCard
          title="الإعلانات النشطة"
          value={adminStats.activeAds.toString()}
          change="نشط"
          changeType="increase"
          icon={Megaphone}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Courses */}
        <Card className="lg:col-span-2 card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              الدورات الحديثة
            </CardTitle>
            <CardDescription>
              آخر الدورات مع الإيرادات وحالة الروابط
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentCourses.map(course => (
              <div
                key={course.id}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-xl"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">
                    {course.title}
                  </h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students} طالب
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      ${course.revenue}
                    </span>
                    <Badge 
                      variant={course.linkStatus === "يعمل" ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {course.linkStatus === "يعمل" ? (
                        <CheckCircle className="w-3 h-3 ml-1" />
                      ) : (
                        <XCircle className="w-3 h-3 ml-1" />
                      )}
                      {course.linkStatus}
                    </Badge>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/admin/courses`)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => navigate("/admin/courses")}
            >
              عرض جميع الدورات
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-secondary" />
              إجراءات سريعة
            </CardTitle>
            <CardDescription>العمليات الأكثر استخداماً</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto p-3"
                  onClick={action.action}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${action.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm">{action.title}</span>
                </Button>
              )
            })}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-secondary" />
              الأنشطة الأخيرة
            </CardTitle>
            <CardDescription>آخر العمليات في النظام</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {activity.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                    <Badge 
                      variant={activity.status === "مكتمل" ? "default" : 
                              activity.status === "غير مقروء" ? "secondary" : "destructive"}
                      className="text-xs"
                    >
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              حالة النظام
            </CardTitle>
            <CardDescription>نظرة عامة على صحة النظام</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">الروابط العاملة</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm text-success">{(adminStats.totalCourses - adminStats.brokenLinks)}/{adminStats.totalCourses}</span>
                </div>
              </div>
              <Progress value={((adminStats.totalCourses - adminStats.brokenLinks) / adminStats.totalCourses) * 100} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">المقترحات المراجعة</span>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-info" />
                  <span className="text-sm text-info">مراجعة مطلوبة</span>
                </div>
              </div>
              <Progress value={25} className="h-2" />
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">الإعلانات النشطة</span>
                <div className="flex items-center gap-2">
                  <Megaphone className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary">{adminStats.activeAds} نشط</span>
                </div>
              </div>
              <Progress value={80} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Section */}
      <Card className="card-gradient">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                🎉 لوحة تحكم الإدمن جاهزة!
              </h3>
              <p className="text-muted-foreground">
                جميع الوظائف الإدارية متاحة الآن. يمكنك إدارة الدورات والطلاب والمبيعات والمزيد من مكان واحد.
              </p>
            </div>
            <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8 text-warning" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
