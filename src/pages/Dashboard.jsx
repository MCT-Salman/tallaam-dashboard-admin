import {
  Users,
  BookOpen,
  TrendingUp,
  Star,
  Clock,
  Calendar,
  Trophy,
  PlayCircle
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

export default function Dashboard() {
  const recentCourses = [
    {
      id: 1,
      title: "أساسيات البرمجة",
      students: 124,
      progress: 85,
      status: "نشط"
    },
    {
      id: 2,
      title: "تطوير المواقع",
      students: 89,
      progress: 72,
      status: "نشط"
    },
    {
      id: 3,
      title: "الذكاء الاصطناعي",
      students: 156,
      progress: 91,
      status: "مكتمل"
    }
  ]

  const upcomingActivities = [
    {
      time: "09:00",
      title: "محاضرة البرمجة المتقدمة",
      type: "محاضرة"
    },
    {
      time: "14:30",
      title: "مراجعة مشاريع الطلاب",
      type: "مراجعة"
    },
    {
      time: "16:00",
      title: "اجتماع فريق التطوير",
      type: "اجتماع"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            مرحباً، أحمد 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            إليك ملخص سريع عن أدائك اليوم
          </p>
        </div>
        <Button className="btn-hero">
          <PlayCircle className="w-4 h-4 ml-2" />
          بدء دورة جديدة
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="إجمالي الطلاب"
          value="1,234"
          change="+12%"
          changeType="increase"
          icon={Users}
        />
        <StatsCard
          title="الدورات النشطة"
          value="24"
          change="+3"
          changeType="increase"
          icon={BookOpen}
        />
        <StatsCard
          title="معدل الإكمال"
          value="87%"
          change="+5%"
          changeType="increase"
          icon={TrendingUp}
        />
        <StatsCard
          title="التقييم العام"
          value="4.8"
          change="+0.2"
          changeType="increase"
          icon={Star}
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
              آخر الدورات التي تم إنشاؤها أو تحديثها
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
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        course.status === "نشط"
                          ? "bg-success/20 text-success"
                          : "bg-primary/20 text-primary"
                      }`}
                    >
                      {course.status}
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>التقدم</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Activities */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-secondary" />
              الأنشطة القادمة
            </CardTitle>
            <CardDescription>جدولك لبقية اليوم</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-secondary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {activity.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                    <span className="text-xs px-2 py-1 bg-muted rounded-full">
                      {activity.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <Button variant="outline" className="w-full mt-4">
              عرض الجدول الكامل
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Section */}
      <Card className="card-gradient">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                🎉 تهانينا! لقد حققت إنجازاً جديداً
              </h3>
              <p className="text-muted-foreground">
                تم إكمال 100 ساعة تدريسية بنجاح. استمر في العمل الرائع!
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
