// src\pages\admin\StudentManagement.jsx
import { useState } from "react"
import {
  Search,
  Filter,
  Eye,
  UserX,
  Trash2,
  MapPin,
  Phone,
  Calendar
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export default function StudentManagement() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "أحمد محمد",
      phone: "+963912345678",
      email: "ahmed@example.com",
      location: "داخل سوريا",
      status: "نشط",
      joinDate: "2024-01-15",
      coursesCount: 3,
      lastLogin: "2024-01-25",
      avatar: null
    },
    {
      id: 2,
      name: "سارة أحمد",
      phone: "+1234567890",
      email: "sara@example.com",
      location: "خارج سوريا",
      status: "نشط",
      joinDate: "2024-01-20",
      coursesCount: 2,
      lastLogin: "2024-01-24",
      avatar: null
    },
    {
      id: 3,
      name: "محمد علي",
      phone: "+963987654321",
      email: "mohamed@example.com",
      location: "داخل سوريا",
      status: "معطل",
      joinDate: "2024-01-10",
      coursesCount: 1,
      lastLogin: "2024-01-15",
      avatar: null
    }
  ])

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.phone.includes(searchTerm) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesLocation = locationFilter === "all" || student.location === locationFilter
    const matchesStatus = statusFilter === "all" || student.status === statusFilter
    
    return matchesSearch && matchesLocation && matchesStatus
  })

  const handleViewStudent = (student) => {
    setSelectedStudent(student)
    setIsViewDialogOpen(true)
  }

  const handleToggleStatus = (studentId) => {
    setStudents(students.map(student => 
      student.id === studentId 
        ? { ...student, status: student.status === "نشط" ? "معطل" : "نشط" }
        : student
    ))
    
    const student = students.find(s => s.id === studentId)
    toast({
      title: "تم تغيير الحالة",
      description: `تم ${student.status === "نشط" ? "تعطيل" : "تفعيل"} حساب ${student.name}`
    })
  }

  const handleDeleteStudent = (studentId) => {
    const student = students.find(s => s.id === studentId)
    setStudents(students.filter(student => student.id !== studentId))
    
    toast({
      title: "تم حذف الطالب",
      description: `تم حذف حساب ${student.name} نهائياً`,
      variant: "destructive"
    })
  }

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getLocationBadgeVariant = (location) => {
    return location === "داخل سوريا" ? "default" : "secondary"
  }

  const getStatusBadgeVariant = (status) => {
    return status === "نشط" ? "default" : "destructive"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة الطلاب</h1>
          <p className="text-muted-foreground mt-1">
            إدارة حسابات الطلاب وعرض إحصائياتهم
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>فلترة البحث</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="البحث بالاسم، الهاتف، أو البريد الإلكتروني..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="الموقع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المواقع</SelectItem>
                  <SelectItem value="داخل سوريا">داخل سوريا</SelectItem>
                  <SelectItem value="خارج سوريا">خارج سوريا</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="نشط">نشط</SelectItem>
                  <SelectItem value="معطل">معطل</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الطلاب</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Filter className="w-4 h-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">داخل سوريا</p>
                <p className="text-2xl font-bold">
                  {students.filter(s => s.location === "داخل سوريا").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">خارج سوريا</p>
                <p className="text-2xl font-bold">
                  {students.filter(s => s.location === "خارج سوريا").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                <MapPin className="w-4 h-4 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">نشط</p>
                <p className="text-2xl font-bold">
                  {students.filter(s => s.status === "نشط").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                <UserX className="w-4 h-4 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة الطلاب</CardTitle>
          <CardDescription>
            عرض جميع الطلاب المسجلين في النظام
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الطالب</TableHead>
                <TableHead>رقم الهاتف</TableHead>
                <TableHead>الموقع</TableHead>
                <TableHead>الدورات</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>تاريخ الانضمام</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      {student.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getLocationBadgeVariant(student.location)}>
                      {student.location}
                    </Badge>
                  </TableCell>
                  <TableCell>{student.coursesCount}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(student.status)}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {student.joinDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewStudent(student)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleStatus(student.id)}
                      >
                        <UserX className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteStudent(student.id)}
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

      {/* Student Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>تفاصيل الطالب</DialogTitle>
            <DialogDescription>
              معلومات مفصلة عن الطالب
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedStudent.avatar} />
                  <AvatarFallback className="text-lg">
                    {getInitials(selectedStudent.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedStudent.name}</h3>
                  <p className="text-muted-foreground">{selectedStudent.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">رقم الهاتف</Label>
                  <p className="text-sm text-muted-foreground">{selectedStudent.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">الموقع</Label>
                  <Badge variant={getLocationBadgeVariant(selectedStudent.location)}>
                    {selectedStudent.location}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">عدد الدورات</Label>
                  <p className="text-sm text-muted-foreground">{selectedStudent.coursesCount}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">الحالة</Label>
                  <Badge variant={getStatusBadgeVariant(selectedStudent.status)}>
                    {selectedStudent.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">تاريخ الانضمام</Label>
                  <p className="text-sm text-muted-foreground">{selectedStudent.joinDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">آخر تسجيل دخول</Label>
                  <p className="text-sm text-muted-foreground">{selectedStudent.lastLogin}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}