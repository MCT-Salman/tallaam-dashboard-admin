import { useState } from "react"
import {
  Plus,
  Search,
  Filter,
  BookOpen,
  Users,
  Clock,
  Star
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { StatsCard } from "@/components/dashboard/StatsCard"

const coursesData = [
  {
    id: 1,
    title: "أساسيات البرمجة بـ JavaScript",
    instructor: "أحمد محمد",
    students: 245,
    duration: "8 أسابيع",
    rating: 4.8,
    status: "نشط",
    image: "/placeholder.svg",
    price: "299 ريال",
    progress: 75,
    category: "برمجة"
  },
  {
    id: 2,
    title: "التصميم الجرافيكي باستخدام Adobe",
    instructor: "فاطمة أحمد",
    students: 189,
    duration: "6 أسابيع",
    rating: 4.6,
    status: "نشط",
    image: "/placeholder.svg",
    price: "399 ريال",
    progress: 45,
    category: "تصميم"
  },
  {
    id: 3,
    title: "التسويق الرقمي والسوشيال ميديا",
    instructor: "محمد علي",
    students: 156,
    duration: "5 أسابيع",
    rating: 4.9,
    status: "قريباً",
    image: "/placeholder.svg",
    price: "249 ريال",
    progress: 0,
    category: "تسويق"
  }
]

const categories = ["الكل", "برمجة", "تصميم", "تسويق", "أعمال", "لغات"]

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("الكل")

  const filteredCourses = coursesData.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategory === "الكل" || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            الدورات التدريبية
          </h1>
          <p className="text-muted-foreground mt-2">
            إدارة ومتابعة جميع الدورات التدريبية
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          إضافة دورة جديدة
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="إجمالي الدورات"
          value="42"
          change="3+"
          changeType="increase"
          icon={BookOpen}
        />
        <StatsCard
          title="الدورات النشطة"
          value="28"
          change="5+"
          changeType="increase"
          icon={Clock}
        />
        <StatsCard
          title="إجمالي الطلاب"
          value="1,247"
          change="12%"
          changeType="increase"
          icon={Users}
        />
        <StatsCard
          title="متوسط التقييم"
          value="4.7"
          change="0.2+"
          changeType="increase"
          icon={Star}
        />
      </div>

      {/* Search and Filters */}
      <Card className="card-elevated">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="البحث في الدورات..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
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

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <Card
            key={course.id}
            className="card-elevated hover:shadow-lg transition-all duration-300"
          >
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <Badge
                className={`absolute top-4 right-4 ${
                  course.status === "نشط"
                    ? "bg-success"
                    : course.status === "قريباً"
                    ? "bg-warning"
                    : "bg-muted"
                }`}
              >
                {course.status}
              </Badge>
            </div>

            <CardHeader className="pb-3">
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="text-lg line-clamp-2">
                  {course.title}
                </CardTitle>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span>{course.rating}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                المدرب: {course.instructor}
              </p>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.students} طالب
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </span>
                </div>

                {course.progress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>نسبة الإنجاز</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold text-primary">
                    {course.price}
                  </span>
                  <Button size="sm">عرض التفاصيل</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <Card className="card-elevated">
          <CardContent className="p-12 text-center">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">لا توجد دورات</h3>
            <p className="text-muted-foreground">
              لم يتم العثور على دورات تطابق معايير البحث الخاصة بك
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
