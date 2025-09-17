import { useState } from "react"
import {
  Plus,
  Search,
  Filter,
  Users,
  GraduationCap,
  TrendingUp,
  Calendar
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StatsCard } from "@/components/dashboard/StatsCard"

const studentsData = [
  {
    id: 1,
    name: "أحمد محمد علي",
    email: "ahmed@example.com",
    phone: "+966 12 345 6789",
    avatar: "/placeholder.svg",
    enrolledCourses: 3,
    completedCourses: 1,
    status: "نشط",
    joinDate: "2024/01/15",
    progress: 75,
    grade: "ممتاز"
  },
  {
    id: 2,
    name: "فاطمة أحمد السعيد",
    email: "fatima@example.com",
    phone: "+966 12 345 6790",
    avatar: "/placeholder.svg",
    enrolledCourses: 2,
    completedCourses: 2,
    status: "نشط",
    joinDate: "2024/02/20",
    progress: 90,
    grade: "ممتاز"
  },
  {
    id: 3,
    name: "محمد عبدالله القحطاني",
    email: "mohammed@example.com",
    phone: "+966 12 345 6791",
    avatar: "/placeholder.svg",
    enrolledCourses: 1,
    completedCourses: 0,
    status: "معلق",
    joinDate: "2024/03/10",
    progress: 25,
    grade: "جيد"
  }
]

const statusFilters = ["الكل", "نشط", "معلق", "مكتمل"]

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("الكل")

  const filteredStudents = studentsData.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      selectedStatus === "الكل" || student.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة الطلاب</h1>
          <p className="text-muted-foreground mt-2">
            متابعة وإدارة جميع الطلاب المسجلين
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          إضافة طالب جديد
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="إجمالي الطلاب"
          value="1,247"
          change="8%"
          changeType="increase"
          icon={Users}
        />
        <StatsCard
          title="الطلاب النشطون"
          value="987"
          change="12+"
          changeType="increase"
          icon={TrendingUp}
        />
        <StatsCard
          title="المتخرجون"
          value="156"
          change="23+"
          changeType="increase"
          icon={GraduationCap}
        />
        <StatsCard
          title="التسجيلات الجديدة"
          value="45"
          change="15%"
          changeType="increase"
          icon={Calendar}
        />
      </div>

      {/* Search and Filters */}
      <Card className="card-elevated">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="البحث في الطلاب..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {statusFilters.map(status => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              المزيد من المرشحات
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <div className="grid gap-4">
        {filteredStudents.map(student => (
          <Card
            key={student.id}
            className="card-elevated hover:shadow-lg transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={student.avatar} alt={student.name} />
                    <AvatarFallback>
                      {student.name
                        .split(" ")
                        .map(n => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {student.email}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {student.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">
                      {student.enrolledCourses}
                    </p>
                    <p className="text-xs text-muted-foreground">دورات مسجلة</p>
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">
                      {student.completedCourses}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      دورات مكتملة
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-2xl font-bold text-warning">
                      {student.progress}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      نسبة الإنجاز
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Badge
                      className={`${
                        student.status === "نشط"
                          ? "bg-success"
                          : student.status === "معلق"
                          ? "bg-warning"
                          : "bg-muted"
                      }`}
                    >
                      {student.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      انضم في {student.joinDate}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      عرض الملف
                    </Button>
                    <Button size="sm">تعديل</Button>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    التقدم العام
                  </span>
                  <span className="text-sm font-medium">
                    التقدير: {student.grade}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${student.progress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card className="card-elevated">
          <CardContent className="p-12 text-center">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">لا يوجد طلاب</h3>
            <p className="text-muted-foreground">
              لم يتم العثور على طلاب يطابقون معايير البحث الخاصة بك
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
