// src\pages\admin\CourseManagement.jsx
import { useState } from "react"
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Link as LinkIcon,
  Play,
  Pause,
  Upload
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
import { Textarea } from "@/components/ui/textarea"
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

export default function CourseManagement() {
  const { toast } = useToast()
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "أساسيات البرمجة",
      description: "دورة شاملة لتعلم أساسيات البرمجة",
      instructor: "د. أحمد محمد",
      price: 50,
      status: "نشط",
      studentsCount: 124,
      youtubeLink: "https://youtube.com/watch?v=example1",
      linkStatus: "يعمل",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "تطوير المواقع",
      description: "تعلم تطوير المواقع باستخدام HTML, CSS, JavaScript",
      instructor: "د. سارة أحمد",
      price: 75,
      status: "نشط",
      studentsCount: 89,
      youtubeLink: "https://youtube.com/watch?v=example2",
      linkStatus: "معطل",
      createdAt: "2024-01-20"
    }
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    instructor: "",
    price: "",
    youtubeLink: "",
    category: ""
  })

  const handleAddCourse = () => {
    if (!newCourse.title || !newCourse.description || !newCourse.instructor || !newCourse.price) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      })
      return
    }

    const course = {
      id: courses.length + 1,
      ...newCourse,
      price: parseFloat(newCourse.price),
      status: "نشط",
      studentsCount: 0,
      linkStatus: "لم يتم التحقق",
      createdAt: new Date().toISOString().split('T')[0]
    }

    setCourses([...courses, course])
    setNewCourse({
      title: "",
      description: "",
      instructor: "",
      price: "",
      youtubeLink: "",
      category: ""
    })
    setIsAddDialogOpen(false)
    
    toast({
      title: "نجح",
      description: "تم إضافة الدورة بنجاح"
    })
  }

  const handleEditCourse = (course) => {
    setEditingCourse(course)
    setIsEditDialogOpen(true)
  }

  const handleUpdateCourse = () => {
    if (!editingCourse.title || !editingCourse.description || !editingCourse.instructor || !editingCourse.price) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      })
      return
    }

    setCourses(courses.map(course => 
      course.id === editingCourse.id 
        ? { ...editingCourse, price: parseFloat(editingCourse.price) }
        : course
    ))
    setIsEditDialogOpen(false)
    setEditingCourse(null)
    
    toast({
      title: "نجح",
      description: "تم تحديث الدورة بنجاح"
    })
  }

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId))
    toast({
      title: "نجح",
      description: "تم حذف الدورة بنجاح"
    })
  }

  const handleToggleStatus = (courseId) => {
    setCourses(courses.map(course => 
      course.id === courseId 
        ? { ...course, status: course.status === "نشط" ? "معطل" : "نشط" }
        : course
    ))
  }

  const generatePurchaseCode = (courseId) => {
    const code = `TAL${courseId}${Date.now().toString().slice(-6)}`
    
    toast({
      title: "تم توليد الكود",
      description: `كود الشراء: ${code}`,
      duration: 10000
    })
  }

  const verifyYouTubeLink = async (courseId) => {
    // محاكاة فحص الرابط
    setTimeout(() => {
      const isWorking = Math.random() > 0.3 // 70% احتمال أن يعمل الرابط
      
      setCourses(courses.map(c => 
        c.id === courseId 
          ? { ...c, linkStatus: isWorking ? "يعمل" : "معطل" }
          : c
      ))
      
      toast({
        title: isWorking ? "الرابط يعمل" : "الرابط معطل",
        description: isWorking 
          ? "تم التحقق من الرابط وهو يعمل بشكل صحيح" 
          : "الرابط معطل، يرجى استبداله",
        variant: isWorking ? "default" : "destructive"
      })
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة الدورات</h1>
          <p className="text-muted-foreground mt-1">
            إدارة وإضافة الدورات التعليمية
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-hero">
              <Plus className="w-4 h-4 ml-2" />
              إضافة دورة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إضافة دورة جديدة</DialogTitle>
              <DialogDescription>
                أدخل تفاصيل الدورة الجديدة
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">عنوان الدورة</Label>
                  <Input
                    id="title"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                    placeholder="أدخل عنوان الدورة"
                  />
                </div>
                <div>
                  <Label htmlFor="instructor">اسم المحاضر</Label>
                  <Input
                    id="instructor"
                    value={newCourse.instructor}
                    onChange={(e) => setNewCourse({...newCourse, instructor: e.target.value})}
                    placeholder="أدخل اسم المحاضر"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">وصف الدورة</Label>
                <Textarea
                  id="description"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                  placeholder="أدخل وصف الدورة"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">السعر (USD)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({...newCourse, price: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="category">التصنيف</Label>
                  <Select value={newCourse.category} onValueChange={(value) => setNewCourse({...newCourse, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر التصنيف" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="programming">البرمجة</SelectItem>
                      <SelectItem value="design">التصميم</SelectItem>
                      <SelectItem value="business">الأعمال</SelectItem>
                      <SelectItem value="language">اللغات</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="youtubeLink">رابط YouTube</Label>
                <Input
                  id="youtubeLink"
                  value={newCourse.youtubeLink}
                  onChange={(e) => setNewCourse({...newCourse, youtubeLink: e.target.value})}
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleAddCourse}>
                  إضافة الدورة
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Courses Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة الدورات</CardTitle>
          <CardDescription>
            جميع الدورات المتاحة في النظام
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>العنوان</TableHead>
                <TableHead>المحاضر</TableHead>
                <TableHead>السعر</TableHead>
                <TableHead>الطلاب</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>حالة الرابط</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{course.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {course.description.substring(0, 50)}...
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>${course.price}</TableCell>
                  <TableCell>{course.studentsCount}</TableCell>
                  <TableCell>
                    <Badge variant={course.status === "نشط" ? "default" : "secondary"}>
                      {course.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={course.linkStatus === "يعمل" ? "default" : "destructive"}
                      >
                        {course.linkStatus}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => verifyYouTubeLink(course.id)}
                      >
                        <LinkIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleStatus(course.id)}
                      >
                        {course.status === "نشط" ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditCourse(course)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => generatePurchaseCode(course.id)}
                      >
                        <Upload className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteCourse(course.id)}
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
            <DialogTitle>تعديل الدورة</DialogTitle>
            <DialogDescription>
              تعديل تفاصيل الدورة
            </DialogDescription>
          </DialogHeader>
          {editingCourse && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-title">عنوان الدورة</Label>
                  <Input
                    id="edit-title"
                    value={editingCourse.title}
                    onChange={(e) => setEditingCourse({...editingCourse, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-instructor">اسم المحاضر</Label>
                  <Input
                    id="edit-instructor"
                    value={editingCourse.instructor}
                    onChange={(e) => setEditingCourse({...editingCourse, instructor: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit-description">وصف الدورة</Label>
                <Textarea
                  id="edit-description"
                  value={editingCourse.description}
                  onChange={(e) => setEditingCourse({...editingCourse, description: e.target.value})}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-price">السعر (USD)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={editingCourse.price}
                    onChange={(e) => setEditingCourse({...editingCourse, price: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-youtube">رابط YouTube</Label>
                  <Input
                    id="edit-youtube"
                    value={editingCourse.youtubeLink}
                    onChange={(e) => setEditingCourse({...editingCourse, youtubeLink: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleUpdateCourse}>
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