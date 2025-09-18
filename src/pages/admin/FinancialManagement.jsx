// src\pages\admin\FinancialManagement.jsx
import { useState } from "react"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  FileText,
  BarChart3
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

export default function FinancialManagement() {
  const { toast } = useToast()
  const [timeFilter, setTimeFilter] = useState("month")
  const [typeFilter, setTypeFilter] = useState("all")

  const financialData = [
    {
      id: 1,
      type: "إيراد",
      description: "مبيعات دورة أساسيات البرمجة",
      amount: 50,
      currency: "USD",
      date: "2024-01-25",
      category: "مبيعات",
      status: "مؤكد"
    },
    {
      id: 2,
      type: "إيراد",
      description: "مبيعات دورة تطوير المواقع",
      amount: 75,
      currency: "USD",
      date: "2024-01-24",
      category: "مبيعات",
      status: "مؤكد"
    },
    {
      id: 3,
      type: "مصروف",
      description: "رسوم منصة YouTube",
      amount: -20,
      currency: "USD",
      date: "2024-01-23",
      category: "تشغيلية",
      status: "مؤكد"
    },
    {
      id: 4,
      type: "مصروف",
      description: "تكاليف التسويق",
      amount: -100,
      currency: "USD",
      date: "2024-01-22",
      category: "تسويق",
      status: "مؤكد"
    }
  ]

  const filteredData = financialData.filter(item => {
    const matchesType = typeFilter === "all" || item.type === typeFilter
    return matchesType
  })

  const totalRevenue = financialData
    .filter(item => item.type === "إيراد")
    .reduce((sum, item) => sum + item.amount, 0)

  const totalExpenses = financialData
    .filter(item => item.type === "مصروف")
    .reduce((sum, item) => sum + Math.abs(item.amount), 0)

  const netProfit = totalRevenue - totalExpenses

  const exportToExcel = () => {
    toast({
      title: "تم التصدير",
      description: "تم تصدير البيانات المالية إلى Excel بنجاح"
    })
  }

  const getTypeBadgeVariant = (type) => {
    return type === "إيراد" ? "default" : "destructive"
  }

  const getStatusBadgeVariant = (status) => {
    return status === "مؤكد" ? "default" : "secondary"
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "مبيعات":
        return "text-primary"
      case "تشغيلية":
        return "text-secondary"
      case "تسويق":
        return "text-accent"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">الإدارة المالية</h1>
          <p className="text-muted-foreground mt-1">
            إدارة الإيرادات والمصروفات والتقارير المالية
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
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="نوع المعاملة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="إيراد">الإيرادات</SelectItem>
                <SelectItem value="مصروف">المصروفات</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الإيرادات</p>
                <p className="text-2xl font-bold text-success">${totalRevenue}</p>
                <p className="text-xs text-success">+15% من الشهر الماضي</p>
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
                <p className="text-sm text-muted-foreground">إجمالي المصروفات</p>
                <p className="text-2xl font-bold text-destructive">${totalExpenses}</p>
                <p className="text-xs text-muted-foreground">-5% من الشهر الماضي</p>
              </div>
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">صافي الربح</p>
                <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
                  ${netProfit}
                </p>
                <p className={`text-xs ${netProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {netProfit >= 0 ? '+' : ''}{((netProfit / totalRevenue) * 100).toFixed(1)}% من الإيرادات
                </p>
              </div>
              <div className={`w-12 h-12 ${netProfit >= 0 ? 'bg-success/10' : 'bg-destructive/10'} rounded-full flex items-center justify-center`}>
                <DollarSign className={`w-6 h-6 ${netProfit >= 0 ? 'text-success' : 'text-destructive'}`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">معدل الربحية</p>
                <p className="text-2xl font-bold">{((netProfit / totalRevenue) * 100).toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">من إجمالي الإيرادات</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Chart */}
      <Card>
        <CardHeader>
          <CardTitle>الرسم البياني المالي</CardTitle>
          <CardDescription>تطور الإيرادات والمصروفات عبر الوقت</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">الرسم البياني المالي سيظهر هنا</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>المعاملات المالية</CardTitle>
          <CardDescription>سجل جميع الإيرادات والمصروفات</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>النوع</TableHead>
                <TableHead>الوصف</TableHead>
                <TableHead>التصنيف</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>الحالة</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <Badge variant={getTypeBadgeVariant(transaction.type)}>
                      {transaction.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{transaction.description}</TableCell>
                  <TableCell>
                    <span className={`text-sm font-medium ${getCategoryColor(transaction.category)}`}>
                      {transaction.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className={transaction.amount >= 0 ? 'text-success' : 'text-destructive'}>
                        {transaction.amount >= 0 ? '+' : ''}{transaction.amount} {transaction.currency}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {transaction.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>توزيع الإيرادات</CardTitle>
            <CardDescription>توزيع الإيرادات حسب التصنيف</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">مبيعات الدورات</span>
                <span className="text-sm text-muted-foreground">$125 (100%)</span>
              </div>
              <Progress value={100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>توزيع المصروفات</CardTitle>
            <CardDescription>توزيع المصروفات حسب التصنيف</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">تكاليف التسويق</span>
                <span className="text-sm text-muted-foreground">$100 (83%)</span>
              </div>
              <Progress value={83} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">التكاليف التشغيلية</span>
                <span className="text-sm text-muted-foreground">$20 (17%)</span>
              </div>
              <Progress value={17} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Summary */}
      <Card>
        <CardHeader>
          <CardTitle>ملخص شهري</CardTitle>
          <CardDescription>نظرة عامة على الأداء المالي للشهر الحالي</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">${totalRevenue}</div>
              <div className="text-sm text-muted-foreground">إجمالي الإيرادات</div>
              <div className="text-xs text-success mt-1">+15% من الشهر الماضي</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-destructive mb-2">${totalExpenses}</div>
              <div className="text-sm text-muted-foreground">إجمالي المصروفات</div>
              <div className="text-xs text-muted-foreground mt-1">-5% من الشهر الماضي</div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold mb-2 ${netProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
                ${netProfit}
              </div>
              <div className="text-sm text-muted-foreground">صافي الربح</div>
              <div className={`text-xs mt-1 ${netProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
                {((netProfit / totalRevenue) * 100).toFixed(1)}% من الإيرادات
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}