// src\pages\admin\SalesManagement.jsx
import { useState } from "react"
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Calendar,
  Download,
  Filter
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

export default function SalesManagement() {
  const { toast } = useToast()
  const [timeFilter, setTimeFilter] = useState("month")
  const [courseFilter, setCourseFilter] = useState("all")

  const salesData = [
    {
      id: 1,
      courseTitle: "أساسيات البرمجة",
      studentName: "أحمد محمد",
      purchaseCode: "TAL100123456",
      amount: 50,
      currency: "USD",
      purchaseDate: "2024-01-25",
      status: "مكتمل",
      paymentMethod: "واتساب"
    },
    {
      id: 2,
      courseTitle: "تطوير المواقع",
      studentName: "سارة أحمد",
      purchaseCode: "TAL200123457",
      amount: 75,
      currency: "USD",
      purchaseDate: "2024-01-24",
      status: "مكتمل",
      paymentMethod: "تيليغرام"
    },
    {
      id: 3,
      courseTitle: "أساسيات البرمجة",
      studentName: "محمد علي",
      purchaseCode: "TAL100123458",
      amount: 50,
      currency: "USD",
      purchaseDate: "2024-01-23",
      status: "في الانتظار",
      paymentMethod: "واتساب"
    }
  ]

  const filteredSales = salesData.filter(sale => {
    const matchesCourse = courseFilter === "all" || sale.courseTitle.includes(courseFilter)
    return matchesCourse
  })

  const totalRevenue = salesData.reduce((sum, sale) => sum + sale.amount, 0)
  const completedSales = salesData.filter(sale => sale.status === "مكتمل").length
  const pendingSales = salesData.filter(sale => sale.status === "في الانتظار").length

  const exportToExcel = () => {
    // محاكاة تصدير البيانات
    toast({
      title: "تم التصدير",
      description: "تم تصدير بيانات المبيعات إلى Excel بنجاح"
    })
  }

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "مكتمل":
        return "default"
      case "في الانتظار":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة المبيعات</h1>
          <p className="text-muted-foreground mt-1">
            تقارير وإحصائيات المبيعات
          </p>
        </div>
        <Button onClick={exportToExcel} className="btn-hero">
          <Download className="w-4 h-4 ml-2" />
          تصدير Excel
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>فلترة البيانات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="الفترة الزمنية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">هذا الأسبوع</SelectItem>
                <SelectItem value="month">هذا الشهر</SelectItem>
                <SelectItem value="quarter">هذا الربع</SelectItem>
                <SelectItem value="year">هذا العام</SelectItem>
              </SelectContent>
            </Select>
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="الدورة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الدورات</SelectItem>
                <SelectItem value="أساسيات البرمجة">أساسيات البرمجة</SelectItem>
                <SelectItem value="تطوير المواقع">تطوير المواقع</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الإيرادات</p>
                <p className="text-2xl font-bold">${totalRevenue}</p>
                <p className="text-xs text-success">+12% من الشهر الماضي</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المبيعات</p>
                <p className="text-2xl font-bold">{salesData.length}</p>
                <p className="text-xs text-success">+8% من الشهر الماضي</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المبيعات المكتملة</p>
                <p className="text-2xl font-bold">{completedSales}</p>
                <p className="text-xs text-muted-foreground">
                  {((completedSales / salesData.length) * 100).toFixed(1)}% من إجمالي المبيعات
                </p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">في الانتظار</p>
                <p className="text-2xl font-bold">{pendingSales}</p>
                <p className="text-xs text-warning">
                  {((pendingSales / salesData.length) * 100).toFixed(1)}% من إجمالي المبيعات
                </p>
              </div>
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>مخطط المبيعات</CardTitle>
          <CardDescription>تطور المبيعات عبر الوقت</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">مخطط المبيعات سيظهر هنا</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle>تفاصيل المبيعات</CardTitle>
          <CardDescription>قائمة بجميع المعاملات المالية</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>كود الشراء</TableHead>
                <TableHead>الدورة</TableHead>
                <TableHead>الطالب</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>طريقة الدفع</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {sale.purchaseCode}
                    </code>
                  </TableCell>
                  <TableCell className="font-medium">{sale.courseTitle}</TableCell>
                  <TableCell>{sale.studentName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      {sale.amount} {sale.currency}
                    </div>
                  </TableCell>
                  <TableCell>{sale.paymentMethod}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {sale.purchaseDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(sale.status)}>
                      {sale.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Course Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>أداء الدورات</CardTitle>
            <CardDescription>مبيعات الدورات المختلفة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">أساسيات البرمجة</span>
                <span className="text-sm text-muted-foreground">2 مبيعات</span>
              </div>
              <Progress value={66} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">تطوير المواقع</span>
                <span className="text-sm text-muted-foreground">1 مبيعات</span>
              </div>
              <Progress value={33} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>طرق الدفع</CardTitle>
            <CardDescription>توزيع طرق الدفع المستخدمة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">واتساب</span>
                <span className="text-sm text-muted-foreground">2 معاملات</span>
              </div>
              <Progress value={66} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">تيليغرام</span>
                <span className="text-sm text-muted-foreground">1 معاملة</span>
              </div>
              <Progress value={33} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}