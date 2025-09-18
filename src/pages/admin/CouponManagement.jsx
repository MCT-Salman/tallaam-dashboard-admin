// src\pages\admin\CouponManagement.jsx
import { useState } from "react"
import {
  Plus,
  Edit,
  Trash2,
  Copy,
  Percent,
  Calendar,
  DollarSign,
  Users
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

export default function CouponManagement() {
  const { toast } = useToast()
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      code: "WELCOME50",
      type: "نسبة مئوية",
      value: 50,
      description: "خصم 50% للعملاء الجدد",
      usageLimit: 100,
      usedCount: 23,
      status: "نشط",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      createdAt: "2024-01-01"
    },
    {
      id: 2,
      code: "SAVE20",
      type: "مبلغ ثابت",
      value: 20,
      description: "خصم 20 دولار على أي دورة",
      usageLimit: 50,
      usedCount: 15,
      status: "نشط",
      startDate: "2024-01-15",
      endDate: "2024-06-15",
      createdAt: "2024-01-15"
    },
    {
      id: 3,
      code: "EXPIRED10",
      type: "نسبة مئوية",
      value: 10,
      description: "خصم 10% - منتهي الصلاحية",
      usageLimit: 200,
      usedCount: 200,
      status: "منتهي",
      startDate: "2023-12-01",
      endDate: "2023-12-31",
      createdAt: "2023-12-01"
    }
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState(null)
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    type: "",
    value: "",
    description: "",
    usageLimit: "",
    startDate: "",
    endDate: ""
  })

  const generateCouponCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let code = ""
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setNewCoupon({...newCoupon, code})
  }

  const handleAddCoupon = () => {
    if (!newCoupon.code || !newCoupon.type || !newCoupon.value || !newCoupon.description || !newCoupon.startDate || !newCoupon.endDate) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      })
      return
    }

    const coupon = {
      id: coupons.length + 1,
      ...newCoupon,
      value: parseFloat(newCoupon.value),
      usageLimit: parseInt(newCoupon.usageLimit),
      usedCount: 0,
      status: "نشط",
      createdAt: new Date().toISOString().split('T')[0]
    }

    setCoupons([...coupons, coupon])
    setNewCoupon({
      code: "",
      type: "",
      value: "",
      description: "",
      usageLimit: "",
      startDate: "",
      endDate: ""
    })
    setIsAddDialogOpen(false)
    
    toast({
      title: "نجح",
      description: "تم إضافة الكوبون بنجاح"
    })
  }

  const handleEditCoupon = (coupon) => {
    setEditingCoupon(coupon)
    setIsEditDialogOpen(true)
  }

  const handleUpdateCoupon = () => {
    if (!editingCoupon.code || !editingCoupon.type || !editingCoupon.value || !editingCoupon.description) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      })
      return
    }

    setCoupons(coupons.map(coupon => 
      coupon.id === editingCoupon.id 
        ? { ...editingCoupon, value: parseFloat(editingCoupon.value), usageLimit: parseInt(editingCoupon.usageLimit) }
        : coupon
    ))
    setIsEditDialogOpen(false)
    setEditingCoupon(null)
    
    toast({
      title: "نجح",
      description: "تم تحديث الكوبون بنجاح"
    })
  }

  const handleDeleteCoupon = (couponId) => {
    setCoupons(coupons.filter(coupon => coupon.id !== couponId))
    toast({
      title: "نجح",
      description: "تم حذف الكوبون بنجاح"
    })
  }

  const handleToggleStatus = (couponId) => {
    setCoupons(coupons.map(coupon => 
      coupon.id === couponId 
        ? { ...coupon, status: coupon.status === "نشط" ? "معطل" : "نشط" }
        : coupon
    ))
  }

  const copyCouponCode = (code) => {
    navigator.clipboard.writeText(code)
    toast({
      title: "تم النسخ",
      description: `تم نسخ الكود: ${code}`
    })
  }

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "نشط":
        return "default"
      case "معطل":
        return "secondary"
      case "منتهي":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getTypeBadgeVariant = (type) => {
    return type === "نسبة مئوية" ? "default" : "secondary"
  }

  const activeCoupons = coupons.filter(coupon => coupon.status === "نشط").length
  const totalUsage = coupons.reduce((sum, coupon) => sum + coupon.usedCount, 0)
  const totalSavings = coupons.reduce((sum, coupon) => {
    const averageDiscount = coupon.type === "نسبة مئوية" ? 50 : coupon.value
    return sum + (coupon.usedCount * averageDiscount)
  }, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة كوبونات الخصم</h1>
          <p className="text-muted-foreground mt-1">
            إنشاء وإدارة أكواد الخصم والكوبونات
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-hero">
              <Plus className="w-4 h-4 ml-2" />
              إنشاء كوبون جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إنشاء كوبون خصم جديد</DialogTitle>
              <DialogDescription>
                إنشاء كوبون خصم جديد للعملاء
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="coupon-code">كود الكوبون</Label>
                  <div className="flex gap-2">
                    <Input
                      id="coupon-code"
                      value={newCoupon.code}
                      onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
                      placeholder="WELCOME50"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={generateCouponCode}
                    >
                      توليد
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="coupon-type">نوع الخصم</Label>
                  <Select value={newCoupon.type} onValueChange={(value) => setNewCoupon({...newCoupon, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر النوع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="نسبة مئوية">نسبة مئوية</SelectItem>
                      <SelectItem value="مبلغ ثابت">مبلغ ثابت</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="coupon-value">
                    {newCoupon.type === "نسبة مئوية" ? "النسبة المئوية (%)" : "المبلغ (USD)"}
                  </Label>
                  <Input
                    id="coupon-value"
                    type="number"
                    value={newCoupon.value}
                    onChange={(e) => setNewCoupon({...newCoupon, value: e.target.value})}
                    placeholder={newCoupon.type === "نسبة مئوية" ? "50" : "20"}
                    min="0"
                    max={newCoupon.type === "نسبة مئوية" ? "100" : undefined}
                  />
                </div>
                <div>
                  <Label htmlFor="coupon-limit">حد الاستخدام</Label>
                  <Input
                    id="coupon-limit"
                    type="number"
                    value={newCoupon.usageLimit}
                    onChange={(e) => setNewCoupon({...newCoupon, usageLimit: e.target.value})}
                    placeholder="100"
                    min="1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="coupon-description">وصف الكوبون</Label>
                <Input
                  id="coupon-description"
                  value={newCoupon.description}
                  onChange={(e) => setNewCoupon({...newCoupon, description: e.target.value})}
                  placeholder="خصم 50% للعملاء الجدد"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="coupon-start">تاريخ البداية</Label>
                  <Input
                    id="coupon-start"
                    type="date"
                    value={newCoupon.startDate}
                    onChange={(e) => setNewCoupon({...newCoupon, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="coupon-end">تاريخ النهاية</Label>
                  <Input
                    id="coupon-end"
                    type="date"
                    value={newCoupon.endDate}
                    onChange={(e) => setNewCoupon({...newCoupon, endDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleAddCoupon}>
                  إنشاء الكوبون
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الكوبونات</p>
                <p className="text-2xl font-bold">{coupons.length}</p>
                <p className="text-xs text-success">+3 هذا الشهر</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Percent className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الكوبونات النشطة</p>
                <p className="text-2xl font-bold">{activeCoupons}</p>
                <p className="text-xs text-success">متاحة للاستخدام</p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الاستخدام</p>
                <p className="text-2xl font-bold">{totalUsage}</p>
                <p className="text-xs text-success">استخدام</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي التوفير</p>
                <p className="text-2xl font-bold">${totalSavings}</p>
                <p className="text-xs text-success">وفر للعملاء</p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Coupons Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة الكوبونات</CardTitle>
          <CardDescription>
            جميع كوبونات الخصم المتاحة في النظام
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>كود الكوبون</TableHead>
                <TableHead>النوع</TableHead>
                <TableHead>القيمة</TableHead>
                <TableHead>الاستخدام</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>تاريخ الانتهاء</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-muted px-2 py-1 rounded font-mono">
                        {coupon.code}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyCouponCode(coupon.code)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {coupon.description}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getTypeBadgeVariant(coupon.type)}>
                      {coupon.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {coupon.type === "نسبة مئوية" ? `${coupon.value}%` : `$${coupon.value}`}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {coupon.usedCount} / {coupon.usageLimit}
                    </div>
                    <div className="w-full bg-muted rounded-full h-1 mt-1">
                      <div 
                        className="bg-primary h-1 rounded-full" 
                        style={{width: `${(coupon.usedCount / coupon.usageLimit) * 100}%`}}
                      ></div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(coupon.status)}>
                      {coupon.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      {coupon.endDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditCoupon(coupon)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleStatus(coupon.id)}
                      >
                        {coupon.status === "نشط" ? "تعطيل" : "تفعيل"}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteCoupon(coupon.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>تعديل الكوبون</DialogTitle>
            <DialogDescription>
              تعديل تفاصيل الكوبون
            </DialogDescription>
          </DialogHeader>
          {editingCoupon && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-code">كود الكوبون</Label>
                  <Input
                    id="edit-code"
                    value={editingCoupon.code}
                    onChange={(e) => setEditingCoupon({...editingCoupon, code: e.target.value.toUpperCase()})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-type">نوع الخصم</Label>
                  <Select value={editingCoupon.type} onValueChange={(value) => setEditingCoupon({...editingCoupon, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="نسبة مئوية">نسبة مئوية</SelectItem>
                      <SelectItem value="مبلغ ثابت">مبلغ ثابت</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-value">
                    {editingCoupon.type === "نسبة مئوية" ? "النسبة المئوية (%)" : "المبلغ (USD)"}
                  </Label>
                  <Input
                    id="edit-value"
                    type="number"
                    value={editingCoupon.value}
                    onChange={(e) => setEditingCoupon({...editingCoupon, value: e.target.value})}
                    min="0"
                    max={editingCoupon.type === "نسبة مئوية" ? "100" : undefined}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-limit">حد الاستخدام</Label>
                  <Input
                    id="edit-limit"
                    type="number"
                    value={editingCoupon.usageLimit}
                    onChange={(e) => setEditingCoupon({...editingCoupon, usageLimit: e.target.value})}
                    min="1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-description">وصف الكوبون</Label>
                <Input
                  id="edit-description"
                  value={editingCoupon.description}
                  onChange={(e) => setEditingCoupon({...editingCoupon, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-start">تاريخ البداية</Label>
                  <Input
                    id="edit-start"
                    type="date"
                    value={editingCoupon.startDate}
                    onChange={(e) => setEditingCoupon({...editingCoupon, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-end">تاريخ النهاية</Label>
                  <Input
                    id="edit-end"
                    type="date"
                    value={editingCoupon.endDate}
                    onChange={(e) => setEditingCoupon({...editingCoupon, endDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleUpdateCoupon}>
                  حفظ التغييرات
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}