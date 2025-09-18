// src\pages\admin\SubAdminManagement.jsx
import { useState } from "react"
import {
  Plus,
  Edit,
  Trash2,
  UserCheck,
  Calendar,
  Shield,
  Mail,
  Phone
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
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

export default function SubAdminManagement() {
  const { toast } = useToast()
  const [subAdmins, setSubAdmins] = useState([
    {
      id: 1,
      name: "محمد أحمد",
      email: "mohamed@tallaam.com",
      phone: "+963912345678",
      role: "مدير فرعي",
      status: "نشط",
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      lastLogin: "2024-01-25",
      permissions: ["إدارة الدورات", "إدارة الطلاب"],
      avatar: null
    },
    {
      id: 2,
      name: "فاطمة علي",
      email: "fatima@tallaam.com",
      phone: "+963987654321",
      role: "مدير فرعي",
      status: "معطل",
      startDate: "2024-01-10",
      endDate: "2024-06-10",
      lastLogin: "2024-01-20",
      permissions: ["إدارة المبيعات", "التقارير"],
      avatar: null
    }
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingSubAdmin, setEditingSubAdmin] = useState(null)
  const [newSubAdmin, setNewSubAdmin] = useState({
    name: "",
    email: "",
    phone: "",
    role: "مدير فرعي",
    startDate: "",
    endDate: "",
    permissions: []
  })

  const availablePermissions = [
    "إدارة الدورات",
    "إدارة الطلاب", 
    "إدارة المبيعات",
    "الإدارة المالية",
    "إدارة الإعلانات",
    "كوبونات الخصم",
    "المدراء الفرعيين",
    "المقترحات",
    "التحقق من الروابط"
  ]

  const handleAddSubAdmin = () => {
    if (!newSubAdmin.name || !newSubAdmin.email || !newSubAdmin.phone || !newSubAdmin.startDate || !newSubAdmin.endDate) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      })
      return
    }

    const subAdmin = {
      id: subAdmins.length + 1,
      ...newSubAdmin,
      status: "نشط",
      lastLogin: null,
      avatar: null
    }

    setSubAdmins([...subAdmins, subAdmin])
    setNewSubAdmin({
      name: "",
      email: "",
      phone: "",
      role: "مدير فرعي",
      startDate: "",
      endDate: "",
      permissions: []
    })
    setIsAddDialogOpen(false)
    
    toast({
      title: "نجح",
      description: "تم إضافة المدير الفرعي بنجاح"
    })
  }

  const handleEditSubAdmin = (subAdmin) => {
    setEditingSubAdmin(subAdmin)
    setIsEditDialogOpen(true)
  }

  const handleUpdateSubAdmin = () => {
    if (!editingSubAdmin.name || !editingSubAdmin.email || !editingSubAdmin.phone) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      })
      return
    }

    setSubAdmins(subAdmins.map(admin => 
      admin.id === editingSubAdmin.id 
        ? editingSubAdmin
        : admin
    ))
    setIsEditDialogOpen(false)
    setEditingSubAdmin(null)
    
    toast({
      title: "نجح",
      description: "تم تحديث المدير الفرعي بنجاح"
    })
  }

  const handleDeleteSubAdmin = (adminId) => {
    setSubAdmins(subAdmins.filter(admin => admin.id !== adminId))
    toast({
      title: "نجح",
      description: "تم حذف المدير الفرعي بنجاح"
    })
  }

  const handleToggleStatus = (adminId) => {
    setSubAdmins(subAdmins.map(admin => 
      admin.id === adminId 
        ? { ...admin, status: admin.status === "نشط" ? "معطل" : "نشط" }
        : admin
    ))
  }

  const togglePermission = (permission) => {
    if (editingSubAdmin) {
      const permissions = editingSubAdmin.permissions.includes(permission)
        ? editingSubAdmin.permissions.filter(p => p !== permission)
        : [...editingSubAdmin.permissions, permission]
      
      setEditingSubAdmin({...editingSubAdmin, permissions})
    } else {
      const permissions = newSubAdmin.permissions.includes(permission)
        ? newSubAdmin.permissions.filter(p => p !== permission)
        : [...newSubAdmin.permissions, permission]
      
      setNewSubAdmin({...newSubAdmin, permissions})
    }
  }

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getStatusBadgeVariant = (status) => {
    return status === "نشط" ? "default" : "destructive"
  }

  const activeSubAdmins = subAdmins.filter(admin => admin.status === "نشط").length
  const totalSubAdmins = subAdmins.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة المدراء الفرعيين</h1>
          <p className="text-muted-foreground mt-1">
            إدارة حسابات المدراء الفرعيين وصلاحياتهم
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-hero">
              <Plus className="w-4 h-4 ml-2" />
              إضافة مدير فرعي
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إضافة مدير فرعي جديد</DialogTitle>
              <DialogDescription>
                إنشاء حساب مدير فرعي جديد مع صلاحيات محددة
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="admin-name">الاسم الكامل</Label>
                  <Input
                    id="admin-name"
                    value={newSubAdmin.name}
                    onChange={(e) => setNewSubAdmin({...newSubAdmin, name: e.target.value})}
                    placeholder="أدخل الاسم الكامل"
                  />
                </div>
                <div>
                  <Label htmlFor="admin-email">البريد الإلكتروني</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    value={newSubAdmin.email}
                    onChange={(e) => setNewSubAdmin({...newSubAdmin, email: e.target.value})}
                    placeholder="admin@tallaam.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="admin-phone">رقم الهاتف</Label>
                  <Input
                    id="admin-phone"
                    value={newSubAdmin.phone}
                    onChange={(e) => setNewSubAdmin({...newSubAdmin, phone: e.target.value})}
                    placeholder="+963912345678"
                  />
                </div>
                <div>
                  <Label htmlFor="admin-role">الدور</Label>
                  <Input
                    id="admin-role"
                    value={newSubAdmin.role}
                    onChange={(e) => setNewSubAdmin({...newSubAdmin, role: e.target.value})}
                    placeholder="مدير فرعي"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="admin-start">تاريخ البداية</Label>
                  <Input
                    id="admin-start"
                    type="date"
                    value={newSubAdmin.startDate}
                    onChange={(e) => setNewSubAdmin({...newSubAdmin, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="admin-end">تاريخ النهاية</Label>
                  <Input
                    id="admin-end"
                    type="date"
                    value={newSubAdmin.endDate}
                    onChange={(e) => setNewSubAdmin({...newSubAdmin, endDate: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label>الصلاحيات</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {availablePermissions.map((permission) => (
                    <label key={permission} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newSubAdmin.permissions.includes(permission)}
                        onChange={() => togglePermission(permission)}
                        className="rounded"
                      />
                      <span className="text-sm">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleAddSubAdmin}>
                  إضافة المدير
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المدراء</p>
                <p className="text-2xl font-bold">{totalSubAdmins}</p>
                <p className="text-xs text-success">+1 هذا الشهر</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المدراء النشطون</p>
                <p className="text-2xl font-bold">{activeSubAdmins}</p>
                <p className="text-xs text-success">متاحون حالياً</p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">المدراء المعطلون</p>
                <p className="text-2xl font-bold">{totalSubAdmins - activeSubAdmins}</p>
                <p className="text-xs text-muted-foreground">معطلون</p>
              </div>
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sub Admins Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة المدراء الفرعيين</CardTitle>
          <CardDescription>
            جميع المدراء الفرعيين المسجلين في النظام
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>المدير</TableHead>
                <TableHead>البريد الإلكتروني</TableHead>
                <TableHead>الهاتف</TableHead>
                <TableHead>الصلاحيات</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>فترة العمل</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subAdmins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={admin.avatar} />
                        <AvatarFallback>{getInitials(admin.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{admin.name}</div>
                        <div className="text-sm text-muted-foreground">{admin.role}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      {admin.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      {admin.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {admin.permissions.slice(0, 2).map((permission) => (
                        <Badge key={permission} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                      {admin.permissions.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{admin.permissions.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(admin.status)}>
                      {admin.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs">
                        {admin.startDate} - {admin.endDate}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditSubAdmin(admin)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleStatus(admin.id)}
                      >
                        {admin.status === "نشط" ? "تعطيل" : "تفعيل"}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteSubAdmin(admin.id)}
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
            <DialogTitle>تعديل المدير الفرعي</DialogTitle>
            <DialogDescription>
              تعديل معلومات المدير الفرعي وصلاحياته
            </DialogDescription>
          </DialogHeader>
          {editingSubAdmin && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">الاسم الكامل</Label>
                  <Input
                    id="edit-name"
                    value={editingSubAdmin.name}
                    onChange={(e) => setEditingSubAdmin({...editingSubAdmin, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-email">البريد الإلكتروني</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editingSubAdmin.email}
                    onChange={(e) => setEditingSubAdmin({...editingSubAdmin, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-phone">رقم الهاتف</Label>
                  <Input
                    id="edit-phone"
                    value={editingSubAdmin.phone}
                    onChange={(e) => setEditingSubAdmin({...editingSubAdmin, phone: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-role">الدور</Label>
                  <Input
                    id="edit-role"
                    value={editingSubAdmin.role}
                    onChange={(e) => setEditingSubAdmin({...editingSubAdmin, role: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-start">تاريخ البداية</Label>
                  <Input
                    id="edit-start"
                    type="date"
                    value={editingSubAdmin.startDate}
                    onChange={(e) => setEditingSubAdmin({...editingSubAdmin, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-end">تاريخ النهاية</Label>
                  <Input
                    id="edit-end"
                    type="date"
                    value={editingSubAdmin.endDate}
                    onChange={(e) => setEditingSubAdmin({...editingSubAdmin, endDate: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label>الصلاحيات</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {availablePermissions.map((permission) => (
                    <label key={permission} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={editingSubAdmin.permissions.includes(permission)}
                        onChange={() => togglePermission(permission)}
                        className="rounded"
                      />
                      <span className="text-sm">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleUpdateSubAdmin}>
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