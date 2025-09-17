import { useState } from "react"
import {
  BarChart,
  Users,
  BookOpen,
  TrendingUp,
  Download,
  Filter
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { StatsCard } from "@/components/dashboard/StatsCard"

const reportData = {
  coursesStats: [
    { name: "البرمجة", students: 245, completed: 189, revenue: 73350 },
    { name: "التصميم", students: 189, completed: 134, revenue: 52640 },
    { name: "التسويق", students: 156, completed: 98, revenue: 38844 }
  ],
  monthlyStats: [
    { month: "يناير", enrollments: 45, completions: 32, revenue: 22400 },
    { month: "فبراير", enrollments: 52, completions: 38, revenue: 28600 },
    { month: "مارس", enrollments: 67, completions: 45, revenue: 35200 },
    { month: "أبريل", enrollments: 58, completions: 41, revenue: 31900 }
  ]
}

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState("thisMonth")
  const [selectedReport, setSelectedReport] = useState("overview")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            التقارير والإحصائيات
          </h1>
          <p className="text-muted-foreground mt-2">
            عرض شامل لأداء المنصة التعليمية
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            تخصيص التقرير
          </Button>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* Report Controls */}
      <Card className="card-elevated">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">
                نوع التقرير
              </label>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">نظرة عامة</SelectItem>
                  <SelectItem value="courses">تقرير الدورات</SelectItem>
                  <SelectItem value="students">تقرير الطلاب</SelectItem>
                  <SelectItem value="financial">التقرير المالي</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">
                الفترة الزمنية
              </label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">اليوم</SelectItem>
                  <SelectItem value="thisWeek">هذا الأسبوع</SelectItem>
                  <SelectItem value="thisMonth">هذا الشهر</SelectItem>
                  <SelectItem value="lastMonth">الشهر الماضي</SelectItem>
                  <SelectItem value="thisYear">هذا العام</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="إجمالي الإيرادات"
          value="164,834 ريال"
          change="12.5%"
          changeType="increase"
          icon={TrendingUp}
        />
        <StatsCard
          title="الطلاب الجدد"
          value="222"
          change="8.2%"
          changeType="increase"
          icon={Users}
        />
        <StatsCard
          title="الدورات المباعة"
          value="590"
          change="15.3%"
          changeType="increase"
          icon={BookOpen}
        />
        <StatsCard
          title="معدل الإكمال"
          value="74%"
          change="3.1%"
          changeType="increase"
          icon={BarChart}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Performance */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>أداء الدورات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.coursesStats.map((course, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{course.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {course.students} طالب
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-primary h-3 rounded-full"
                      style={{
                        width: `${(course.completed / course.students) * 100}%`
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{course.completed} مكتمل</span>
                    <span>{course.revenue.toLocaleString()} ريال</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>الاتجاهات الشهرية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {reportData.monthlyStats.map((month, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg"
                >
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">
                      {month.enrollments}
                    </p>
                    <p className="text-xs text-muted-foreground">تسجيلات</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">
                      {month.completions}
                    </p>
                    <p className="text-xs text-muted-foreground">إكمالات</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-warning">
                      {month.revenue.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">ريال</p>
                  </div>
                  <div className="col-span-3 text-center text-sm font-medium border-t pt-2">
                    {month.month}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>أفضل الدورات أداءً</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "أساسيات البرمجة", rating: 4.9, students: 245 },
                { name: "التسويق الرقمي", rating: 4.8, students: 189 },
                { name: "التصميم الجرافيكي", rating: 4.7, students: 156 }
              ].map((course, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{course.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {course.students} طالب
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-warning">⭐ {course.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>الطلاب الأكثر نشاطًا</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "أحمد محمد", courses: 5, completion: 95 },
                { name: "فاطمة أحمد", courses: 4, completion: 90 },
                { name: "محمد علي", courses: 3, completion: 88 }
              ].map((student, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {student.courses} دورات
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-success">
                      {student.completion}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>ملخص الأداء</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <p className="text-2xl font-bold text-primary">85%</p>
                <p className="text-sm text-muted-foreground">رضا الطلاب</p>
              </div>
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <p className="text-2xl font-bold text-success">74%</p>
                <p className="text-sm text-muted-foreground">معدل الإكمال</p>
              </div>
              <div className="text-center p-4 bg-warning/10 rounded-lg">
                <p className="text-2xl font-bold text-warning">4.8</p>
                <p className="text-sm text-muted-foreground">التقييم العام</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
