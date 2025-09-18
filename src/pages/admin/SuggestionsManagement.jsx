// src\pages\admin\SuggestionsManagement.jsx
import { useState } from "react"
import {
  MessageSquare,
  Filter,
  Eye,
  Trash2,
  Check,
  Calendar,
  User,
  Mail,
  Phone,
  BookOpen,
  Star
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

export default function SuggestionsManagement() {
  const { toast } = useToast()
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedSuggestion, setSelectedSuggestion] = useState(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  const [suggestions, setSuggestions] = useState([
    {
      id: 1,
      studentName: "أحمد محمد",
      studentEmail: "ahmed@example.com",
      studentPhone: "+963912345678",
      type: "عام",
      title: "اقتراح لتحسين التطبيق",
      content: "أود اقتراح إضافة ميزة التنبيهات اليومية للدورات، وأيضاً إمكانية تحميل المحتوى للاستخدام بدون إنترنت.",
      rating: null,
      courseId: null,
      courseName: null,
      status: "غير مقروء",
      submissionDate: "2024-01-25",
      readDate: null,
      avatar: null
    },
    {
      id: 2,
      studentName: "سارة أحمد",
      studentEmail: "sara@example.com", 
      studentPhone: "+1234567890",
      type: "دورة",
      title: "تقييم دورة البرمجة",
      content: "الدورة ممتازة جداً، ولكن أتمنى لو كان هناك المزيد من التمارين العملية. المحاضر شرح ممتاز.",
      rating: 4,
      courseId: 1,
      courseName: "أساسيات البرمجة",
      status: "مقروء",
      submissionDate: "2024-01-24",
      readDate: "2024-01-25",
      avatar: null
    },
    {
      id: 3,
      studentName: "محمد علي",
      studentEmail: "mohamed@example.com",
      studentPhone: "+963987654321",
      type: "عام",
      title: "اقتراح للمحتوى",
      content: "هل يمكن إضافة دورات في الذكاء الاصطناعي؟ أعتقد أن هناك طلب كبير على هذا الموضوع.",
      rating: null,
      courseId: null,
      courseName: null,
      status: "غير مقروء",
      submissionDate: "2024-01-23",
      readDate: null,
      avatar: null
    }
  ])

  const filteredSuggestions = suggestions.filter(suggestion => {
    const matchesType = filterType === "all" || suggestion.type === filterType
    const matchesStatus = filterStatus === "all" || suggestion.status === filterStatus
    return matchesType && matchesStatus
  })

  const handleViewSuggestion = (suggestion) => {
    setSelectedSuggestion(suggestion)
    setIsViewDialogOpen(true)
    
    // تحديث حالة الاقتراح إلى مقروء
    if (suggestion.status === "غير مقروء") {
      setSuggestions(suggestions.map(s => 
        s.id === suggestion.id 
          ? { ...s, status: "مقروء", readDate: new Date().toISOString().split('T')[0] }
          : s
      ))
    }
  }

  const handleMarkAsRead = (suggestionId) => {
    setSuggestions(suggestions.map(s => 
      s.id === suggestionId 
        ? { ...s, status: "مقروء", readDate: new Date().toISOString().split('T')[0] }
        : s
    ))
    
    toast({
      title: "تم التحديث",
      description: "تم تحديد الاقتراح كمقروء"
    })
  }

  const handleDeleteSuggestion = (suggestionId) => {
    setSuggestions(suggestions.filter(s => s.id !== suggestionId))
    toast({
      title: "تم الحذف",
      description: "تم حذف الاقتراح بنجاح"
    })
  }

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getStatusBadgeVariant = (status) => {
    return status === "مقروء" ? "default" : "secondary"
  }

  const getTypeBadgeVariant = (type) => {
    return type === "عام" ? "default" : "secondary"
  }

  const renderStars = (rating) => {
    if (!rating) return null
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
        <span className="text-sm text-muted-foreground mr-2">({rating})</span>
      </div>
    )
  }

  const totalSuggestions = suggestions.length
  const unreadSuggestions = suggestions.filter(s => s.status === "غير مقروء").length
  const courseSuggestions = suggestions.filter(s => s.type === "دورة").length
  const generalSuggestions = suggestions.filter(s => s.type === "عام").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة المقترحات</h1>
          <p className="text-muted-foreground mt-1">
            مراجعة وإدارة المقترحات من الطلاب
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>فلترة المقترحات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="نوع الاقتراح" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="عام">اقتراحات عامة</SelectItem>
                <SelectItem value="دورة">اقتراحات الدورات</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="غير مقروء">غير مقروء</SelectItem>
                <SelectItem value="مقروء">مقروء</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المقترحات</p>
                <p className="text-2xl font-bold">{totalSuggestions}</p>
                <p className="text-xs text-success">+5 هذا الشهر</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">غير مقروء</p>
                <p className="text-2xl font-bold">{unreadSuggestions}</p>
                <p className="text-xs text-warning">يحتاج مراجعة</p>
              </div>
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                <Filter className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">اقتراحات الدورات</p>
                <p className="text-2xl font-bold">{courseSuggestions}</p>
                <p className="text-xs text-success">تقييمات ومقترحات</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">اقتراحات عامة</p>
                <p className="text-2xl font-bold">{generalSuggestions}</p>
                <p className="text-xs text-info">تحسينات مقترحة</p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Suggestions Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة المقترحات</CardTitle>
          <CardDescription>
            جميع المقترحات والتقييمات المرسلة من الطلاب
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الطالب</TableHead>
                <TableHead>نوع الاقتراح</TableHead>
                <TableHead>العنوان</TableHead>
                <TableHead>التقييم</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSuggestions.map((suggestion) => (
                <TableRow key={suggestion.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={suggestion.avatar} />
                        <AvatarFallback>{getInitials(suggestion.studentName)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{suggestion.studentName}</div>
                        <div className="text-sm text-muted-foreground">{suggestion.studentEmail}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Badge variant={getTypeBadgeVariant(suggestion.type)}>
                        {suggestion.type}
                      </Badge>
                      {suggestion.courseName && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {suggestion.courseName}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <div className="font-medium truncate">{suggestion.title}</div>
                      <div className="text-sm text-muted-foreground truncate">
                        {suggestion.content.substring(0, 50)}...
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {renderStars(suggestion.rating)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(suggestion.status)}>
                      {suggestion.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs">{suggestion.submissionDate}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewSuggestion(suggestion)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {suggestion.status === "غير مقروء" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkAsRead(suggestion.id)}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteSuggestion(suggestion.id)}
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

      {/* Suggestion Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>تفاصيل الاقتراح</DialogTitle>
            <DialogDescription>
              معلومات مفصلة عن الاقتراح والتقييم
            </DialogDescription>
          </DialogHeader>
          {selectedSuggestion && (
            <div className="space-y-6">
              {/* Student Info */}
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={selectedSuggestion.avatar} />
                  <AvatarFallback className="text-lg">
                    {getInitials(selectedSuggestion.studentName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{selectedSuggestion.studentName}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {selectedSuggestion.studentEmail}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {selectedSuggestion.studentPhone}
                    </div>
                  </div>
                </div>
                <Badge variant={getTypeBadgeVariant(selectedSuggestion.type)}>
                  {selectedSuggestion.type}
                </Badge>
              </div>

              {/* Suggestion Content */}
              <div>
                <h4 className="font-semibold mb-2">{selectedSuggestion.title}</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedSuggestion.content}
                </p>
              </div>

              {/* Course Info */}
              {selectedSuggestion.courseName && (
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span className="font-medium">الدورة المقترحة</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedSuggestion.courseName}</p>
                  {selectedSuggestion.rating && (
                    <div className="mt-2">
                      <span className="text-sm font-medium">التقييم: </span>
                      {renderStars(selectedSuggestion.rating)}
                    </div>
                  )}
                </div>
              )}

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <Label className="text-sm font-medium">تاريخ الإرسال</Label>
                  <p className="text-sm text-muted-foreground">{selectedSuggestion.submissionDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">تاريخ القراءة</Label>
                  <p className="text-sm text-muted-foreground">
                    {selectedSuggestion.readDate || "لم يتم القراءة بعد"}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">الحالة</Label>
                  <Badge variant={getStatusBadgeVariant(selectedSuggestion.status)}>
                    {selectedSuggestion.status}
                  </Badge>
                </div>
                {selectedSuggestion.rating && (
                  <div>
                    <Label className="text-sm font-medium">التقييم العام</Label>
                    {renderStars(selectedSuggestion.rating)}
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}