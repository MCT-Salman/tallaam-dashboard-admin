
import React, { useState, useEffect } from "react"
import {
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  Upload,
  Link as LinkIcon,
  BookOpen,
  Users,
  Video,
  ChevronDown,
  ChevronRight,
  Settings,
  Search,
  Filter,
  MoreHorizontal,
  CheckSquare,
  Square,
  AlertTriangle,
  Eye,
  EyeOff,
  Copy,
  Download,
  RefreshCw
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { useAppSettings } from "@/contexts/AppSettingsContext"

export default function EnhancedCourseManagement() {
  // Set RTL direction
  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.body.style.fontFamily = 'Arial, sans-serif';
  }, []);

  // Toast functionality
  const [toast, setToast] = useState({ show: false, title: "", description: "", variant: "default" });

  const showToast = (title, description, variant = "default") => {
    setToast({ show: true, title, description, variant });
    setTimeout(() => setToast({ show: false, title: "", description: "", variant: "default" }), 3000);
  };

  // FX rate for displaying SYP/USD conversion from app settings
  const { usdToSyp } = useAppSettings();

  // Initial mock data - New Structure: Specialization → Subject → Instructor → Level → Lessons
  const [specializations, setSpecializations] = useState([
    { id: 1, name: "معلوماتية", isActive: true },
    { id: 2, name: "هندسة", isActive: true },
    { id: 3, name: "طب", isActive: true }
  ])

  const [subjects, setSubjects] = useState([
    { id: 1, name: "لغة C#", specializationId: 1, isActive: true },
    { id: 2, name: "Python", specializationId: 1, isActive: true },
    { id: 3, name: "JavaScript", specializationId: 1, isActive: true },
    { id: 4, name: "هندسة مدنية", specializationId: 2, isActive: true },
    { id: 5, name: "تشريح", specializationId: 3, isActive: true }
  ])

  const [instructors, setInstructors] = useState([
    { id: 1, name: "محمد أحمد", bio: "مطور تطبيقات C#", subjectId: 1, isActive: true },
    { id: 2, name: "فاطمة علي", bio: "مطورة Python", subjectId: 2, isActive: true },
    { id: 3, name: "أحمد محمد", bio: "مطور JavaScript", subjectId: 3, isActive: true },
    { id: 4, name: "سارة حسن", bio: "مهندسة مدنية", subjectId: 4, isActive: true },
    { id: 5, name: "د. خالد", bio: "طبيب", subjectId: 5, isActive: true }
  ])

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "C# للمبتدئين",
      description: "دورة شاملة لتعلم لغة C# من الصفر",
      price: 50000,
      currency: "SYP",
      isFree: false,
      specializationId: 1,
      subjectId: 1,
      instructorId: 1,
      isActive: true,
      createdAt: "2024-01-15"
    }
  ])
  // Toggle active status - Updated for new structure
  const toggleSpecializationStatus = (id) => {
    setSpecializations(specializations.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s))
  }
  const toggleSubjectStatus = (id) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s))
  }
  const toggleInstructorStatus = (id) => {
    setInstructors(instructors.map(i => i.id === id ? { ...i, isActive: !i.isActive } : i))
  }

  // Delete with child checks - Updated for new structure
  const deleteSpecialization = (id) => {
    const hasChildren = subjects.some(s => s.specializationId === id)
    if (hasChildren) {
      showToast("لا يمكن الحذف", "يوجد مواد تابعة لهذا الاختصاص", "destructive")
      return
    }
    setSpecializations(specializations.filter(s => s.id !== id))
    showToast("تم الحذف", "تم حذف الاختصاص")
  }
  const deleteSubject = (id) => {
    const hasInstructors = instructors.some(i => i.subjectId === id)
    if (hasInstructors) {
      showToast("لا يمكن الحذف", "يوجد مدرسين مرتبطين بهذه المادة", "destructive")
      return
    }
    setSubjects(subjects.filter(s => s.id !== id))
    showToast("تم الحذف", "تم حذف المادة")
  }
  const deleteInstructor = (id) => {
    const hasCourses = courses.some(c => c.instructorId === id)
    if (hasCourses) {
      showToast("لا يمكن الحذف", "يوجد دورات مرتبطة بهذا المدرس", "destructive")
      return
    }
    setInstructors(instructors.filter(i => i.id !== id))
    showToast("تم الحذف", "تم حذف المدرس")
  }

  // Open edit dialogs - Updated for new structure
  const openEditSpecialization = (spec) => {
    setEditSpecializationForm({ id: spec.id, name: spec.name })
    setDialogs(prev => ({ ...prev, editSpecialization: true }))
  }
  const openEditSubject = (subj) => {
    setEditSubjectForm({ id: subj.id, name: subj.name, specializationId: subj.specializationId.toString() })
    setDialogs(prev => ({ ...prev, editSubject: true }))
  }
  const openEditInstructor = (instructor) => {
    setInstructorForm({ 
      id: instructor.id,
      name: instructor.name, 
      bio: instructor.bio || "", 
      avatarUrl: instructor.avatarUrl || "",
      subjectId: instructor.subjectId.toString()
    })
    setDialogs(prev => ({ ...prev, editInstructor: true }))
  }

  // Save edits - Updated for new structure
  const handleUpdateSpecialization = () => {
    if (!editSpecializationForm.name.trim()) {
      showToast("خطأ", "يرجى إدخال الاسم", "destructive")
      return
    }
    setSpecializations(specializations.map(s => s.id === editSpecializationForm.id ? { ...s, name: editSpecializationForm.name.trim() } : s))
    setDialogs(prev => ({ ...prev, editSpecialization: false }))
    setEditSpecializationForm({ id: null, name: "" })
    showToast("تم التحديث", "تم تعديل الاختصاص")
  }
  const handleUpdateSubject = () => {
    if (!editSubjectForm.name.trim() || !editSubjectForm.specializationId) {
      showToast("خطأ", "اختر الاختصاص وأدخل الاسم", "destructive")
      return
    }
    setSubjects(subjects.map(s => s.id === editSubjectForm.id ? { ...s, name: editSubjectForm.name.trim(), specializationId: parseInt(editSubjectForm.specializationId) } : s))
    setDialogs(prev => ({ ...prev, editSubject: false }))
    setEditSubjectForm({ id: null, name: "", specializationId: "" })
    showToast("تم التحديث", "تم تعديل المادة")
  }


  const [courseLevels, setCourseLevels] = useState([
    { id: 1, name: "مستوى أول", order: 1, courseId: 1, instructorId: 1, isActive: true },
    { id: 2, name: "مستوى ثاني", order: 2, courseId: 1, instructorId: 1, isActive: true }
  ])

  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: "مقدمة في C#",
      description: "درس تمهيدي عن لغة C#",
      youtubeUrl: "https://youtube.com/watch?v=example1",
      youtubeId: "example1",
      durationSec: 3600,
      orderIndex: 1,
      isFreePreview: true,
      isActive: true,
      courseId: 1,
      courseLevelId: 1,
      instructorId: 1
    },
    {
      id: 2,
      title: "أنواع البيانات في C#",
      description: "تعلم أنواع البيانات الأساسية",
      youtubeUrl: "https://youtube.com/watch?v=example2",
      youtubeId: "example2",
      durationSec: 2700,
      orderIndex: 2,
      isFreePreview: false,
      isActive: true,
      courseId: 1,
      courseLevelId: 1,
      instructorId: 1
    }
  ])

  // Dialog states
  const [activeTab, setActiveTab] = useState("courses")
  const [dialogs, setDialogs] = useState({
    addCourse: false,
    editCourse: false,
    addLevel: false,
    addLesson: false,
    editLesson: false,
    addInstructor: false,
    editInstructor: false,
    addDomain: false,
    addSpecialization: false,
    addSubject: false,
    editDomain: false,
    editSpecialization: false,
    editSubject: false,
    bulkDelete: false,
    bulkToggle: false
  })

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all") // all, active, inactive
  const [filterDomain, setFilterDomain] = useState("all")
  const [selectedItems, setSelectedItems] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  // Bulk operations
  const [bulkAction, setBulkAction] = useState("")
  const [bulkTarget, setBulkTarget] = useState("")

  // Form states - Updated for new structure
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    price: "",
    currency: "SYP",
    isFree: false,
    specializationId: "",
    subjectId: "",
    instructorId: ""
  })

  const [levelForm, setLevelForm] = useState({
    name: "",
    courseId: "",
    order: 1
  })

  const [lessonForm, setLessonForm] = useState({
    title: "",
    description: "",
    youtubeUrl: "",
    durationSec: "",
    isFreePreview: false,
    courseId: "",
    courseLevelId: ""
  })

  const [instructorForm, setInstructorForm] = useState({
    id: null,
    name: "",
    bio: "",
    avatarUrl: "",
    subjectId: ""
  })

  const [specializationForm, setSpecializationForm] = useState({
    name: ""
  })

  const [subjectForm, setSubjectForm] = useState({
    name: "",
    specializationId: ""
  })

  // Edit forms for taxonomy - Updated for new structure
  const [editSpecializationForm, setEditSpecializationForm] = useState({ id: null, name: "" })
  const [editSubjectForm, setEditSubjectForm] = useState({ id: null, name: "", specializationId: "" })

  const [editingItem, setEditingItem] = useState(null)
  const [expandedCourses, setExpandedCourses] = useState({})

  // Helper functions - Updated for new structure
  const getSpecializationName = (id) => specializations.find(s => s.id === id)?.name || ""
  const getSubjectName = (id) => subjects.find(s => s.id === id)?.name || ""
  const getInstructorName = (id) => instructors.find(i => i.id === id)?.name || ""
  const getCourseName = (id) => courses.find(c => c.id === id)?.title || ""
  
  const getFilteredSubjects = (specializationId) => 
    subjects.filter(s => s.specializationId === parseInt(specializationId))
  
  const getInstructorsBySubject = (subjectId) => 
    instructors.filter(i => i.subjectId === parseInt(subjectId))

  const getCourseLevels = (courseId) => 
    courseLevels.filter(l => l.courseId === courseId).sort((a, b) => a.order - b.order)

  const getCourseLessons = (courseId, levelId = null) => 
    lessons.filter(l => l.courseId === courseId && (levelId ? l.courseLevelId === levelId : true))

  // Taxonomy creation handlers - Updated for new structure
  const handleAddSpecialization = () => {
    if (!specializationForm.name.trim()) {
      showToast("خطأ", "يرجى إدخال اسم الاختصاص", "destructive")
      return
    }
    const newSpec = {
      id: specializations.length + 1,
      name: specializationForm.name.trim(),
      isActive: true
    }
    setSpecializations([...specializations, newSpec])
    setSpecializationForm({ name: "" })
    setDialogs(prev => ({ ...prev, addSpecialization: false }))
    showToast("تمت الإضافة", "تم إضافة الاختصاص بنجاح")
  }

  const handleAddSubject = () => {
    if (!subjectForm.specializationId || !subjectForm.name.trim()) {
      showToast("خطأ", "اختر الاختصاص وأدخل اسم المادة", "destructive")
      return
    }
    const newSubject = {
      id: subjects.length + 1,
      name: subjectForm.name.trim(),
      specializationId: parseInt(subjectForm.specializationId),
      isActive: true
    }
    setSubjects([...subjects, newSubject])
    setSubjectForm({ name: "", specializationId: "" })
    setDialogs(prev => ({ ...prev, addSubject: false }))
    showToast("تمت الإضافة", "تم إضافة المادة بنجاح")
  }

  const handleAddInstructor = () => {
    if (!instructorForm.name.trim() || !instructorForm.subjectId) {
      showToast("خطأ", "اختر المادة وأدخل اسم المدرس", "destructive")
      return
    }
    const newInstructor = {
      id: instructors.length + 1,
      name: instructorForm.name.trim(),
      bio: instructorForm.bio,
      avatarUrl: instructorForm.avatarUrl,
      subjectId: parseInt(instructorForm.subjectId),
      isActive: true
    }
    setInstructors([...instructors, newInstructor])
    setInstructorForm({ id: null, name: "", bio: "", avatarUrl: "", subjectId: "" })
    setDialogs(prev => ({ ...prev, addInstructor: false }))
    showToast("تمت الإضافة", "تم إضافة المدرس بنجاح")
  }

  // Course management functions - Updated for new structure
  const handleAddCourse = () => {
    if (!courseForm.title || !courseForm.subjectId || !courseForm.instructorId) {
      showToast("خطأ", "يرجى ملء الحقول المطلوبة", "destructive")
      return
    }

    const newCourse = {
      id: courses.length + 1,
      title: courseForm.title,
      description: courseForm.description,
      price: parseFloat(courseForm.price) || 0,
      currency: "SYP",
      isFree: courseForm.isFree,
      specializationId: parseInt(courseForm.specializationId),
      subjectId: parseInt(courseForm.subjectId),
      instructorId: parseInt(courseForm.instructorId),
      isActive: true,
      createdAt: new Date().toISOString().split("T")[0]
    }

    setCourses([...courses, newCourse])

    // Create default level
    const defaultLevel = {
      id: courseLevels.length + 1,
      name: "مستوى أول",
      order: 1,
      courseId: newCourse.id,
      instructorId: parseInt(courseForm.instructorId),
      isActive: true
    }
    setCourseLevels([...courseLevels, defaultLevel])

    setCourseForm({
      title: "",
      description: "",
      price: "",
      currency: "SYP",
      isFree: false,
      specializationId: "",
      subjectId: "",
      instructorId: ""
    })
    setDialogs(prev => ({ ...prev, addCourse: false }))
    showToast("تمت الإضافة", "تم إضافة الدورة بنجاح مع المستوى الافتراضي")
  }

  const handleAddLevel = () => {
    if (!levelForm.courseId) {
      showToast("خطأ", "اختر الدورة لإضافة المستوى", "destructive")
      return
    }

    const course = courses.find(c => c.id === parseInt(levelForm.courseId))
    if (!course) {
      showToast("خطأ", "الدورة غير موجودة", "destructive")
      return
    }

    const existingLevels = getCourseLevels(parseInt(levelForm.courseId))
    const nextOrder = existingLevels.length + 1
    const newLevel = {
      id: courseLevels.length + 1,
      name: levelForm.name?.trim() ? levelForm.name : `مستوى ${nextOrder}`,
      order: levelForm.order || nextOrder,
      courseId: parseInt(levelForm.courseId),
      instructorId: course.instructorId,
      isActive: true
    }

    setCourseLevels([...courseLevels, newLevel])
    setLevelForm({ name: "", courseId: "", order: 1 })
    setDialogs(prev => ({ ...prev, addLevel: false }))
    showToast("تمت الإضافة", "تم إضافة المستوى بنجاح")
  }

  const ensureDefaultLevelForCourse = (courseId) => {
    const cid = parseInt(courseId)
    const existing = getCourseLevels(cid)
    if (existing.length > 0) return existing[0]
    const newLevel = {
      id: courseLevels.length + 1,
      name: "المستوى الأول",
      order: 1,
      courseId: cid,
      isActive: true
    }
    setCourseLevels(prev => [...prev, newLevel])
    return newLevel
  }

  const handleAddLesson = () => {
    if (!lessonForm.title || !lessonForm.courseId || !lessonForm.courseLevelId) {
      showToast("خطأ", "يرجى ملء الحقول المطلوبة", "destructive")
      return
    }

    const course = courses.find(c => c.id === parseInt(lessonForm.courseId))
    if (!course) {
      showToast("خطأ", "الدورة غير موجودة", "destructive")
      return
    }

    const existingLessons = getCourseLessons(parseInt(lessonForm.courseId), parseInt(lessonForm.courseLevelId))
    let youtubeId = ""
    if (lessonForm.youtubeUrl) {
      const match = lessonForm.youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
      youtubeId = match ? match[1] : ""
    }

    const newLesson = {
      id: lessons.length + 1,
      title: lessonForm.title,
      description: lessonForm.description,
      youtubeUrl: lessonForm.youtubeUrl,
      youtubeId,
      durationSec: parseInt(lessonForm.durationSec) || null,
      orderIndex: existingLessons.length + 1,
      isFreePreview: lessonForm.isFreePreview,
      isActive: true,
      courseId: parseInt(lessonForm.courseId),
      courseLevelId: parseInt(lessonForm.courseLevelId),
      instructorId: course.instructorId
    }

    setLessons([...lessons, newLesson])
    setLessonForm({
      title: "",
      description: "",
      youtubeUrl: "",
      durationSec: "",
      isFreePreview: false,
      courseId: "",
      courseLevelId: ""
    })
    setDialogs(prev => ({ ...prev, addLesson: false }))
    showToast("تمت الإضافة", "تم إضافة الدرس بنجاح")
  }

  const toggleCourseExpansion = (courseId) => {
    setExpandedCourses(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }))
  }

  const verifyYouTubeLink = (url) => {
    setTimeout(() => {
      const isWorking = Math.random() > 0.3
      showToast(
        isWorking ? "الرابط يعمل" : "الرابط معطل",
        isWorking ? "الرابط يعمل بشكل صحيح" : "الرابط غير صالح أو الفيديو غير متاح",
        isWorking ? "default" : "destructive"
      )
    }, 1000)
  }


  const handleEditInstructor = (instructor) => {
    setInstructorForm({
      id: instructor.id,
      name: instructor.name,
      bio: instructor.bio || "",
      avatarUrl: instructor.avatarUrl || "",
      subjectId: instructor.subjectId.toString()
    })
    setEditingItem(instructor)
    setDialogs(prev => ({ ...prev, editInstructor: true }))
  }

  const handleUpdateInstructor = () => {
    setInstructors(
      instructors.map(i =>
        i.id === editingItem.id
          ? {
              ...i,
              name: instructorForm.name,
              bio: instructorForm.bio,
              avatarUrl: instructorForm.avatarUrl,
              subjectId: parseInt(instructorForm.subjectId)
            }
          : i
      )
    )
    setDialogs(prev => ({ ...prev, editInstructor: false }))
    setEditingItem(null)
    setInstructorForm({ id: null, name: "", bio: "", avatarUrl: "", subjectId: "" })
    showToast("تم التحديث", "تم تعديل المدرس بنجاح")
  }

  const handleDeleteInstructor = (id) => {
    if (confirm("هل أنت متأكد من حذف هذا المدرس؟")) {
      deleteInstructor(id)
    }
  }

  const handleToggleInstructorStatus = (id) => {
    toggleInstructorStatus(id)
  }

  // Course management functions - Updated for new structure
  const handleEditCourse = (course) => {
    setCourseForm({
      title: course.title,
      description: course.description || "",
      price: course.price.toString(),
      currency: "SYP",
      isFree: course.isFree,
      specializationId: course.specializationId.toString(),
      subjectId: course.subjectId.toString(),
      instructorId: course.instructorId.toString()
    })
    setEditingItem(course)
    setDialogs(prev => ({ ...prev, editCourse: true }))
  }

  const handleUpdateCourse = () => {
    setCourses(
      courses.map(c =>
        c.id === editingItem.id
          ? {
              ...c,
              title: courseForm.title,
              description: courseForm.description,
              price: parseFloat(courseForm.price) || 0,
              currency: "SYP",
              isFree: courseForm.isFree,
              specializationId: parseInt(courseForm.specializationId),
              subjectId: parseInt(courseForm.subjectId),
              instructorId: parseInt(courseForm.instructorId)
            }
          : c
      )
    )
    setDialogs(prev => ({ ...prev, editCourse: false }))
    setEditingItem(null)
    setCourseForm({
      title: "",
      description: "",
      price: "",
      currency: "SYP",
      isFree: false,
      specializationId: "",
      subjectId: "",
      instructorId: ""
    })
    showToast("تم التحديث", "تم تعديل الدورة بنجاح")
  }

  const handleDeleteCourse = (id) => {
    if (confirm("هل أنت متأكد من حذف هذه الدورة؟")) {
      setCourses(courses.filter(c => c.id !== id))
      // Also delete related levels and lessons
      setCourseLevels(courseLevels.filter(l => l.courseId !== id))
      setLessons(lessons.filter(l => l.courseId !== id))
      showToast("تم الحذف", "تم حذف الدورة بنجاح")
    }
  }

  const handleToggleCourseStatus = (id) => {
    setCourses(
      courses.map(c => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    )
  }

  const handleDeleteLesson = (id) => {
    if (confirm("هل أنت متأكد من حذف هذا الدرس؟")) {
      setLessons(lessons.filter(l => l.id !== id))
      showToast("تم الحذف", "تم حذف الدرس بنجاح")
    }
  }

  const handleEditLesson = (lesson) => {
    setLessonForm({
      title: lesson.title,
      description: lesson.description || "",
      youtubeUrl: lesson.youtubeUrl || "",
      durationSec: lesson.durationSec?.toString() || "",
      isFreePreview: lesson.isFreePreview,
      courseId: lesson.courseId.toString(),
      courseLevelId: lesson.courseLevelId.toString()
    })
    setEditingItem(lesson)
    setDialogs(prev => ({ ...prev, editLesson: true }))
  }

  const handleUpdateLesson = () => {
    let youtubeId = ""
    if (lessonForm.youtubeUrl) {
      const match = lessonForm.youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
      youtubeId = match ? match[1] : ""
    }

    setLessons(
      lessons.map(l =>
        l.id === editingItem.id
          ? {
              ...l,
              title: lessonForm.title,
              description: lessonForm.description,
              youtubeUrl: lessonForm.youtubeUrl,
              youtubeId,
              durationSec: parseInt(lessonForm.durationSec) || null,
              isFreePreview: lessonForm.isFreePreview,
              courseId: parseInt(lessonForm.courseId),
              courseLevelId: parseInt(lessonForm.courseLevelId)
            }
          : l
      )
    )
    setDialogs(prev => ({ ...prev, editLesson: false }))
    setEditingItem(null)
    setLessonForm({
      title: "",
      description: "",
      youtubeUrl: "",
      durationSec: "",
      isFreePreview: false,
      courseId: "",
      courseLevelId: ""
    })
    showToast("تم التحديث", "تم تعديل الدرس بنجاح")
  }

  const generatePurchaseCode = (courseId) => {
    const code = `TAL${courseId}${Date.now().toString().slice(-6)}`
    showToast("كود شراء", `تم توليد الكود: ${code}`, "default")
  }

  // Search and filter functions - Updated for new structure
  const getFilteredCourses = () => {
    let filtered = courses

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getSpecializationName(course.specializationId).toLowerCase().includes(searchTerm.toLowerCase()) ||
        getSubjectName(course.subjectId).toLowerCase().includes(searchTerm.toLowerCase()) ||
        getInstructorName(course.instructorId).toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (filterStatus !== "all") {
      const isActive = filterStatus === "active"
      filtered = filtered.filter(course => course.isActive === isActive)
    }

    // Specialization filter
    if (filterDomain !== "all") {
      const specializationId = parseInt(filterDomain)
      filtered = filtered.filter(course => course.specializationId === specializationId)
    }

    return filtered
  }

  const getFilteredLessons = () => {
    let filtered = lessons

    if (searchTerm) {
      filtered = filtered.filter(lesson => 
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getCourseName(lesson.courseId).toLowerCase().includes(searchTerm.toLowerCase()) ||
        getInstructorName(lesson.instructorId).toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }

  const getFilteredInstructors = () => {
    let filtered = instructors

    if (searchTerm) {
      filtered = filtered.filter(instructor => 
        instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instructor.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getSubjectName(instructor.subjectId).toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }

  // Bulk operations
  const handleSelectAll = (type) => {
    let items = []
    switch (type) {
      case 'courses':
        items = getFilteredCourses().map(c => c.id)
        break
      case 'lessons':
        items = getFilteredLessons().map(l => l.id)
        break
      case 'instructors':
        items = getFilteredInstructors().map(i => i.id)
        break
    }
    setSelectedItems(items)
  }

  const handleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const handleBulkAction = (action, type) => {
    if (selectedItems.length === 0) {
      showToast("خطأ", "يرجى اختيار عناصر للعمل عليها", "destructive")
      return
    }

    setBulkAction(action)
    setBulkTarget(type)
    setDialogs(prev => ({ ...prev, bulkDelete: true }))
  }

  const confirmBulkAction = () => {
    switch (bulkAction) {
      case 'delete':
        if (bulkTarget === 'courses') {
          setCourses(courses.filter(c => !selectedItems.includes(c.id)))
          setCourseLevels(courseLevels.filter(l => !selectedItems.includes(l.courseId)))
          setLessons(lessons.filter(l => !selectedItems.includes(l.courseId)))
        } else if (bulkTarget === 'lessons') {
          setLessons(lessons.filter(l => !selectedItems.includes(l.id)))
        } else if (bulkTarget === 'instructors') {
          selectedItems.forEach(id => deleteInstructor(id))
        }
        showToast("تم الحذف", `تم حذف ${selectedItems.length} عنصر`)
        break
      case 'activate':
        if (bulkTarget === 'courses') {
          setCourses(courses.map(c => 
            selectedItems.includes(c.id) ? { ...c, isActive: true } : c
          ))
        } else if (bulkTarget === 'instructors') {
          selectedItems.forEach(id => {
            const instructor = instructors.find(i => i.id === id)
            if (instructor) {
              setInstructors(instructors.map(i => 
                i.id === id ? { ...i, isActive: true } : i
              ))
            }
          })
        }
        showToast("تم التفعيل", `تم تفعيل ${selectedItems.length} عنصر`)
        break
      case 'deactivate':
        if (bulkTarget === 'courses') {
          setCourses(courses.map(c => 
            selectedItems.includes(c.id) ? { ...c, isActive: false } : c
          ))
        } else if (bulkTarget === 'instructors') {
          selectedItems.forEach(id => {
            const instructor = instructors.find(i => i.id === id)
            if (instructor) {
              setInstructors(instructors.map(i => 
                i.id === id ? { ...i, isActive: false } : i
              ))
            }
          })
        }
        showToast("تم التعطيل", `تم تعطيل ${selectedItems.length} عنصر`)
        break
    }
    setSelectedItems([])
    setDialogs(prev => ({ ...prev, bulkDelete: false }))
  }

  const clearFilters = () => {
    setSearchTerm("")
    setFilterStatus("all")
    setFilterDomain("all")
    setSelectedItems([])
  }

  const exportData = (type) => {
    let data = []
    let filename = ""
    
    switch (type) {
      case 'courses':
        data = getFilteredCourses()
        filename = "courses.csv"
        break
      case 'lessons':
        data = getFilteredLessons()
        filename = "lessons.csv"
        break
      case 'instructors':
        data = getFilteredInstructors()
        filename = "instructors.csv"
        break
    }

    // Simple CSV export
    const csvContent = data.map(item => 
      Object.values(item).join(',')
    ).join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)
    
    showToast("تم التصدير", `تم تصدير ${data.length} عنصر`)
  }

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">إدارة الدورات المحسنة</h1>
          <p className="text-muted-foreground mt-1">
            إدارة شاملة للمجالات والدورات والمستويات والدروس
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="w-4 h-4 ml-2" />
            فلترة
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4 ml-2" />
            تحديث
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="البحث في الدورات والدروس والمدرسين..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
          </div>
          
          {showFilters && (
            <div className="flex gap-2 flex-wrap">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="inactive">معطل</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterDomain} onValueChange={setFilterDomain}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="المجال" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المجالات</SelectItem>
                  {domains.map(domain => (
                    <SelectItem key={domain.id} value={domain.id.toString()}>
                      {domain.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={clearFilters}>
                مسح الفلاتر
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="courses">الدورات والمستويات</TabsTrigger>
          <TabsTrigger value="lessons">الدروس</TabsTrigger>
          <TabsTrigger value="taxonomy">التصنيف الجديد</TabsTrigger>
          <TabsTrigger value="instructors">المدرسين</TabsTrigger>
        </TabsList>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex gap-2">
              <Dialog open={dialogs.addCourse} onOpenChange={(open) => setDialogs(prev => ({ ...prev, addCourse: open }))}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 ml-2" /> إضافة دورة
                  </Button>
                </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>إضافة دورة جديدة</DialogTitle>
                  <DialogDescription>أدخل تفاصيل الدورة</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="عنوان الدورة"
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  />
                  <Textarea
                    placeholder="وصف الدورة"
                    value={courseForm.description}
                    onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  />
                  
                  <div className="grid grid-cols-3 gap-4">
                    <Select value={courseForm.specializationId} onValueChange={(v) => setCourseForm({ ...courseForm, specializationId: v, subjectId: "", instructorId: "" })}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الاختصاص" />
                      </SelectTrigger>
                      <SelectContent>
                        {specializations.map(spec => (
                          <SelectItem key={spec.id} value={spec.id.toString()}>
                            {spec.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select 
                      value={courseForm.subjectId} 
                      onValueChange={(v) => setCourseForm({ ...courseForm, subjectId: v, instructorId: "" })}
                      disabled={!courseForm.specializationId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المادة" />
                      </SelectTrigger>
                      <SelectContent>
                        {getFilteredSubjects(courseForm.specializationId).map(subject => (
                          <SelectItem key={subject.id} value={subject.id.toString()}>
                            {subject.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select 
                      value={courseForm.instructorId} 
                      onValueChange={(v) => setCourseForm({ ...courseForm, instructorId: v })}
                      disabled={!courseForm.subjectId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المدرس" />
                      </SelectTrigger>
                      <SelectContent>
                        {getInstructorsBySubject(courseForm.subjectId).map(instructor => (
                          <SelectItem key={instructor.id} value={instructor.id.toString()}>
                            {instructor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <Input
                      type="number"
                      placeholder="السعر بالليرة السورية (SYP)"
                      value={courseForm.price}
                      onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })}
                    />
                  </div>
                  {/* Converted price helper */}
                  <div className="text-xs text-muted-foreground">
                    {(() => {
                      const p = parseFloat(courseForm.price || "0") || 0;
                      if (!p) return null;
                      const usd = (p / usdToSyp).toFixed(2);
                      return `ما يعادل تقريباً: ${usd} USD`;
                    })()}
                  </div>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={courseForm.isFree}
                      onChange={(e) => setCourseForm({ ...courseForm, isFree: e.target.checked })}
                    />
                    مجاني؟
                  </label>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setDialogs(prev => ({ ...prev, addCourse: false }))}>
                      إلغاء
                    </Button>
                    <Button onClick={handleAddCourse}>إضافة</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

              <Dialog open={dialogs.addLevel} onOpenChange={(open) => setDialogs(prev => ({ ...prev, addLevel: open }))}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 ml-2" /> إضافة مستوى
                  </Button>
                </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>إضافة مستوى جديد</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Select value={levelForm.courseId} onValueChange={(v) => setLevelForm({ ...levelForm, courseId: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الدورة" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map(course => (
                        <SelectItem key={course.id} value={course.id.toString()}>
                          {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="اسم المستوى"
                    value={levelForm.name}
                    onChange={(e) => setLevelForm({ ...levelForm, name: e.target.value })}
                  />
                  <Input
                    type="number"
                    placeholder="ترتيب المستوى"
                    value={levelForm.order}
                    onChange={(e) => setLevelForm({ ...levelForm, order: parseInt(e.target.value) })}
                  />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setDialogs(prev => ({ ...prev, addLevel: false }))}>
                      إلغاء
                    </Button>
                    <Button onClick={handleAddLevel}>إضافة</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            </div>

            {/* Bulk Operations */}
            {selectedItems.length > 0 && (
              <div className="flex gap-2 items-center">
                <span className="text-sm text-gray-600">
                  {selectedItems.length} عنصر محدد
                </span>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleBulkAction('activate', 'courses')}
                >
                  <Play className="w-4 h-4 ml-1" />
                  تفعيل
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleBulkAction('deactivate', 'courses')}
                >
                  <Pause className="w-4 h-4 ml-1" />
                  تعطيل
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => handleBulkAction('delete', 'courses')}
                >
                  <Trash2 className="w-4 h-4 ml-1" />
                  حذف
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => exportData('courses')}
                >
                  <Download className="w-4 h-4 ml-1" />
                  تصدير
                </Button>
              </div>
            )}
          </div>

          {/* Courses List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>قائمة الدورات والمستويات</CardTitle>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedItems.length === getFilteredCourses().length && getFilteredCourses().length > 0}
                    onCheckedChange={() => handleSelectAll('courses')}
                  />
                  <span className="text-sm text-gray-600">اختيار الكل</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getFilteredCourses().map(course => {
                  const courseSpecialization = specializations.find(s => s.id === course.specializationId)
                  const courseSubject = subjects.find(s => s.id === course.subjectId)
                  const courseInstructor = instructors.find(i => i.id === course.instructorId)
                  const courseLevelsData = getCourseLevels(course.id)
                  
                  return (
                    <Collapsible 
                      key={course.id} 
                      open={expandedCourses[course.id]} 
                      onOpenChange={() => toggleCourseExpansion(course.id)}
                    >
                      <Card>
                        <CollapsibleTrigger asChild>
                          <CardHeader className="cursor-pointer hover:bg-gray-50">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Checkbox
                                  checked={selectedItems.includes(course.id)}
                                  onCheckedChange={() => handleSelectItem(course.id)}
                                  onClick={(e) => e.stopPropagation()}
                                />
                                {expandedCourses[course.id] ? 
                                  <ChevronDown className="w-5 h-5" /> : 
                                  <ChevronRight className="w-5 h-5" />
                                }
                                <BookOpen className="w-5 h-5 text-blue-600" />
                                <div>
                                  <CardTitle className="text-lg">{course.title}</CardTitle>
                                  <CardDescription>
                                    {courseSpecialization?.name} → {courseSubject?.name} → {courseInstructor?.name}
                                  </CardDescription>
                                  <div className="flex gap-2 mt-2">
                                    <Badge variant={course.isActive ? "default" : "secondary"}>
                                      {course.isActive ? "نشط" : "معطل"}
                                    </Badge>
                                    {course.isFree && <Badge variant="outline">مجاني</Badge>}
                                    <Badge variant="outline">
                                      {courseLevelsData.length} مستوى
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">
                                  {(() => {
                                    if (course.isFree) return "مجاني";
                                    const syp = course.currency === "USD" ? Math.round(course.price * usdToSyp) : course.price;
                                    const usd = course.currency === "SYP" ? (course.price / usdToSyp).toFixed(2) : course.price.toFixed?.(2) ?? course.price;
                                    return `${syp.toLocaleString()} SYP (~${usd} USD)`
                                  })()}
                                </span>
                                <Button size="sm" variant="outline" onClick={() => handleToggleCourseStatus(course.id)}>
                                  {course.isActive ? <Pause className="w-4 h-4"/> : <Play className="w-4 h-4"/>}
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleEditCourse(course)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => generatePurchaseCode(course.id)}>
                                  <Upload className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => handleDeleteCourse(course.id)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent>
                          <CardContent>
                            <div className="space-y-3 pl-8">
                              {courseLevelsData.map(level => {
                                const levelLessons = getCourseLessons(course.id, level.id)
                                return (
                                  <div key={level.id} className="border-l-2 border-blue-200 pl-4">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <Settings className="w-4 h-4 text-green-600" />
                                        <span className="font-medium">{level.name}</span>
                                        <Badge variant="outline">{levelLessons.length} درس</Badge>
                                      </div>
                                      <Button size="sm" variant="outline">
                                        <Edit className="w-3 h-3" />
                                      </Button>
                                    </div>
                                    {levelLessons.length > 0 && (
                                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                                        {levelLessons.slice(0, 3).map(lesson => (
                                          <div key={lesson.id} className="flex items-center gap-2">
                                            <Video className="w-3 h-3" />
                                            <span>{lesson.title}</span>
                                            {lesson.isFreePreview && <Badge variant="outline" className="text-xs">معاينة</Badge>}
                                          </div>
                                        ))}
                                        {levelLessons.length > 3 && (
                                          <div className="text-xs text-gray-500">
                                            و {levelLessons.length - 3} دروس أخرى...
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                          </CardContent>
                        </CollapsibleContent>
                      </Card>
                    </Collapsible>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lessons Tab */}
        <TabsContent value="lessons" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <Dialog open={dialogs.addLesson} onOpenChange={(open) => setDialogs(prev => ({ ...prev, addLesson: open }))}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 ml-2" /> إضافة درس
                </Button>
              </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>إضافة درس جديد</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Select value={lessonForm.courseId} onValueChange={(v) => {
                  // when selecting a course, preselect first level or create a default one
                  const levels = getCourseLevels(parseInt(v))
                  if (levels.length === 0) {
                    const created = ensureDefaultLevelForCourse(v)
                    setLessonForm({ ...lessonForm, courseId: v, courseLevelId: created.id.toString() })
                  } else {
                    setLessonForm({ ...lessonForm, courseId: v, courseLevelId: levels[0].id.toString() })
                  }
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الدورة" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course.id} value={course.id.toString()}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select 
                  value={lessonForm.courseLevelId} 
                  onValueChange={(v) => setLessonForm({ ...lessonForm, courseLevelId: v })}
                  disabled={!lessonForm.courseId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المستوى" />
                  </SelectTrigger>
                  <SelectContent>
                    {getCourseLevels(parseInt(lessonForm.courseId)).map(level => (
                      <SelectItem key={level.id} value={level.id.toString()}>
                        {level.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  placeholder="عنوان الدرس"
                  value={lessonForm.title}
                  onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                />
                <Textarea
                  placeholder="وصف الدرس"
                  value={lessonForm.description}
                  onChange={(e) => setLessonForm({ ...lessonForm, description: e.target.value })}
                />
                <div className="flex gap-2">
                  <Input
                    placeholder="رابط YouTube"
                    value={lessonForm.youtubeUrl}
                    onChange={(e) => setLessonForm({ ...lessonForm, youtubeUrl: e.target.value })}
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => verifyYouTubeLink(lessonForm.youtubeUrl)}
                    disabled={!lessonForm.youtubeUrl}
                  >
                    <LinkIcon className="w-4 h-4" />
                  </Button>
                </div>
                <Input
                  type="number"
                  placeholder="مدة الدرس (بالثواني)"
                  value={lessonForm.durationSec}
                  onChange={(e) => setLessonForm({ ...lessonForm, durationSec: e.target.value })}
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={lessonForm.isFreePreview}
                    onChange={(e) => setLessonForm({ ...lessonForm, isFreePreview: e.target.checked })}
                  />
                  معاينة مجانية
                </label>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setDialogs(prev => ({ ...prev, addLesson: false }))}>
                    إلغاء
                  </Button>
                  <Button onClick={handleAddLesson}>إضافة</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Bulk Operations for Lessons */}
          {selectedItems.length > 0 && activeTab === 'lessons' && (
            <div className="flex gap-2 items-center">
              <span className="text-sm text-gray-600">
                {selectedItems.length} درس محدد
              </span>
              <Button 
                size="sm" 
                variant="destructive"
                onClick={() => handleBulkAction('delete', 'lessons')}
              >
                <Trash2 className="w-4 h-4 ml-1" />
                حذف
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => exportData('lessons')}
              >
                <Download className="w-4 h-4 ml-1" />
                تصدير
              </Button>
            </div>
          )}
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>قائمة الدروس</CardTitle>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedItems.length === getFilteredLessons().length && getFilteredLessons().length > 0}
                    onCheckedChange={() => handleSelectAll('lessons')}
                  />
                  <span className="text-sm text-gray-600">اختيار الكل</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>العنوان</TableHead>
                    <TableHead>الدورة</TableHead>
                    <TableHead>المستوى</TableHead>
                    <TableHead>الرابط</TableHead>
                    <TableHead>المدة</TableHead>
                    <TableHead>معاينة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredLessons().map(lesson => (
                    <TableRow key={lesson.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedItems.includes(lesson.id)}
                          onCheckedChange={() => handleSelectItem(lesson.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Video className="w-4 h-4 text-blue-600" />
                          <span>{lesson.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getCourseName(lesson.courseId)}</TableCell>
                      <TableCell>
                        {courseLevels.find(l => l.id === lesson.courseLevelId)?.name || "غير محدد"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {lesson.youtubeUrl ? (
                            <Badge variant="default">متوفر</Badge>
                          ) : (
                            <Badge variant="secondary">غير متوفر</Badge>
                          )}
                          {lesson.youtubeUrl && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => verifyYouTubeLink(lesson.youtubeUrl)}
                            >
                              <LinkIcon className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {lesson.durationSec ? `${Math.floor(lesson.durationSec / 60)} دقيقة` : "غير محدد"}
                      </TableCell>
                      <TableCell>
                        {lesson.isFreePreview && <Badge variant="outline">معاينة</Badge>}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditLesson(lesson)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteLesson(lesson.id)}>
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
        </TabsContent>

        {/* Taxonomy Tab - Updated for new structure */}
        <TabsContent value="taxonomy" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Specializations */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <CardTitle>الاختصاصات</CardTitle>
                </div>
                <Dialog open={dialogs.addSpecialization} onOpenChange={(open)=>setDialogs(prev=>({...prev, addSpecialization: open}))}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="w-4 h-4 ml-1"/> إضافة اختصاص
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>إضافة اختصاص</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3">
                      <Label>اسم الاختصاص</Label>
                      <Input value={specializationForm.name} onChange={(e)=>setSpecializationForm({name: e.target.value})} placeholder="مثال: معلوماتية" />
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={()=>setDialogs(prev=>({...prev, addSpecialization:false}))}>إلغاء</Button>
                        <Button onClick={handleAddSpecialization}>إضافة</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {specializations.map(spec => (
                    <div key={spec.id} className="flex items-center justify-between p-3 border rounded">
                      <span>{spec.name}</span>
                      <div className="flex gap-1">
                        <Badge variant={spec.isActive ? "default" : "secondary"}>
                          {spec.isActive ? "نشط" : "معطل"}
                        </Badge>
                        <Button size="sm" variant="outline" onClick={() => toggleSpecializationStatus(spec.id)}>
                          {spec.isActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => openEditSpecialization(spec)}>
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteSpecialization(spec.id)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Subjects */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  <CardTitle>المواد</CardTitle>
                </div>
                <Dialog open={dialogs.addSubject} onOpenChange={(open)=>setDialogs(prev=>({...prev, addSubject: open}))}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="w-4 h-4 ml-1"/> إضافة مادة
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>إضافة مادة</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3">
                      <Label>الاختصاص</Label>
                      <Select value={subjectForm.specializationId} onValueChange={(v)=>setSubjectForm(prev=>({...prev, specializationId: v}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الاختصاص" />
                        </SelectTrigger>
                        <SelectContent>
                          {specializations.map(s=> (
                            <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Label>اسم المادة</Label>
                      <Input value={subjectForm.name} onChange={(e)=>setSubjectForm(prev=>({...prev, name: e.target.value}))} placeholder="مثال: لغة C#" />
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={()=>setDialogs(prev=>({...prev, addSubject:false}))}>إلغاء</Button>
                        <Button onClick={handleAddSubject}>إضافة</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {subjects.map(subject => (
                    <div key={subject.id} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">{subject.name}</div>
                        <div className="text-sm text-gray-500">
                          {getSpecializationName(subject.specializationId)}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Badge variant={subject.isActive ? "default" : "secondary"}>
                          {subject.isActive ? "نشط" : "معطل"}
                        </Badge>
                        <Button size="sm" variant="outline" onClick={() => toggleSubjectStatus(subject.id)}>
                          {subject.isActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => openEditSubject(subject)}>
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteSubject(subject.id)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Instructors */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <CardTitle>المدرسين</CardTitle>
                </div>
                <Dialog open={dialogs.addInstructor} onOpenChange={(open)=>setDialogs(prev=>({...prev, addInstructor: open}))}>
                  <DialogTrigger asChild>
                    <Button size="sm">
                      <Plus className="w-4 h-4 ml-1"/> إضافة مدرس
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>إضافة مدرس</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3">
                      <Label>المادة</Label>
                      <Select value={instructorForm.subjectId} onValueChange={(v)=>setInstructorForm(prev=>({...prev, subjectId: v}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المادة" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map(s=> (
                            <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Label>اسم المدرس</Label>
                      <Input value={instructorForm.name} onChange={(e)=>setInstructorForm(prev=>({...prev, name: e.target.value}))} placeholder="مثال: محمد أحمد" />
                      <Label>السيرة الذاتية</Label>
                      <Textarea value={instructorForm.bio} onChange={(e)=>setInstructorForm(prev=>({...prev, bio: e.target.value}))} placeholder="نبذة عن المدرس" />
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={()=>setDialogs(prev=>({...prev, addInstructor:false}))}>إلغاء</Button>
                        <Button onClick={handleAddInstructor}>إضافة</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {instructors.map(instructor => (
                    <div key={instructor.id} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">{instructor.name}</div>
                        <div className="text-sm text-gray-500">
                          {getSubjectName(instructor.subjectId)}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Badge variant={instructor.isActive ? "default" : "secondary"}>
                          {instructor.isActive ? "نشط" : "معطل"}
                        </Badge>
                        <Button size="sm" variant="outline" onClick={() => toggleInstructorStatus(instructor.id)}>
                          {instructor.isActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => openEditInstructor(instructor)}>
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteInstructor(instructor.id)}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Edit dialogs for taxonomy - Updated for new structure */}
          <Dialog open={dialogs.editSpecialization} onOpenChange={(open)=>setDialogs(prev=>({...prev, editSpecialization: open}))}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>تعديل اختصاص</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Label>اسم الاختصاص</Label>
                <Input value={editSpecializationForm.name} onChange={(e)=>setEditSpecializationForm(prev=>({...prev, name: e.target.value}))} />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={()=>setDialogs(prev=>({...prev, editSpecialization:false}))}>إلغاء</Button>
                  <Button onClick={handleUpdateSpecialization}>حفظ</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={dialogs.editSubject} onOpenChange={(open)=>setDialogs(prev=>({...prev, editSubject: open}))}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>تعديل مادة</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Label>الاختصاص</Label>
                <Select value={editSubjectForm.specializationId} onValueChange={(v)=>setEditSubjectForm(prev=>({...prev, specializationId: v}))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {specializations.map(s=> (
                      <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Label>اسم المادة</Label>
                <Input value={editSubjectForm.name} onChange={(e)=>setEditSubjectForm(prev=>({...prev, name: e.target.value}))} />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={()=>setDialogs(prev=>({...prev, editSubject:false}))}>إلغاء</Button>
                  <Button onClick={handleUpdateSubject}>حفظ</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={dialogs.editInstructor} onOpenChange={(open)=>setDialogs(prev=>({...prev, editInstructor: open}))}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>تعديل مدرس</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Label>المادة</Label>
                <Select value={instructorForm.subjectId} onValueChange={(v)=>setInstructorForm(prev=>({...prev, subjectId: v}))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(s=> (
                      <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Label>اسم المدرس</Label>
                <Input value={instructorForm.name} onChange={(e)=>setInstructorForm(prev=>({...prev, name: e.target.value}))} />
                <Label>السيرة الذاتية</Label>
                <Textarea value={instructorForm.bio} onChange={(e)=>setInstructorForm(prev=>({...prev, bio: e.target.value}))} />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={()=>setDialogs(prev=>({...prev, editInstructor:false}))}>إلغاء</Button>
                  <Button onClick={handleUpdateInstructor}>حفظ</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>

        {/* Instructors Tab */}
        <TabsContent value="instructors" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <Dialog open={dialogs.addInstructor} onOpenChange={(open) => setDialogs(prev => ({ ...prev, addInstructor: open }))}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 ml-2" /> إضافة مدرس
                </Button>
              </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>إضافة مدرس جديد</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Select value={instructorForm.subjectId} onValueChange={(v) => setInstructorForm({ ...instructorForm, subjectId: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المادة" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(subject => (
                      <SelectItem key={subject.id} value={subject.id.toString()}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="اسم المدرس"
                  value={instructorForm.name}
                  onChange={(e) => setInstructorForm({ ...instructorForm, name: e.target.value })}
                />
                <Textarea
                  placeholder="السيرة الذاتية"
                  value={instructorForm.bio}
                  onChange={(e) => setInstructorForm({ ...instructorForm, bio: e.target.value })}
                />
                <Input
                  placeholder="رابط الصورة الشخصية (اختياري)"
                  value={instructorForm.avatarUrl}
                  onChange={(e) => setInstructorForm({ ...instructorForm, avatarUrl: e.target.value })}
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setDialogs(prev => ({ ...prev, addInstructor: false }))}>
                    إلغاء
                  </Button>
                  <Button onClick={handleAddInstructor}>إضافة</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Bulk Operations for Instructors */}
          {selectedItems.length > 0 && activeTab === 'instructors' && (
            <div className="flex gap-2 items-center">
              <span className="text-sm text-gray-600">
                {selectedItems.length} مدرس محدد
              </span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleBulkAction('activate', 'instructors')}
              >
                <Play className="w-4 h-4 ml-1" />
                تفعيل
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleBulkAction('deactivate', 'instructors')}
              >
                <Pause className="w-4 h-4 ml-1" />
                تعطيل
              </Button>
              <Button 
                size="sm" 
                variant="destructive"
                onClick={() => handleBulkAction('delete', 'instructors')}
              >
                <Trash2 className="w-4 h-4 ml-1" />
                حذف
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => exportData('instructors')}
              >
                <Download className="w-4 h-4 ml-1" />
                تصدير
              </Button>
            </div>
          )}
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>قائمة المدرسين</CardTitle>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedItems.length === getFilteredInstructors().length && getFilteredInstructors().length > 0}
                    onCheckedChange={() => handleSelectAll('instructors')}
                  />
                  <span className="text-sm text-gray-600">اختيار الكل</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getFilteredInstructors().map(instructor => (
                  <Card key={instructor.id} className={selectedItems.includes(instructor.id) ? 'ring-2 ring-blue-500' : ''}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={selectedItems.includes(instructor.id)}
                          onCheckedChange={() => handleSelectItem(instructor.id)}
                        />
                        <Users className="w-8 h-8 text-blue-600" />
                        <div>
                          <CardTitle className="text-lg">{instructor.name}</CardTitle>
                          <CardDescription>{instructor.bio}</CardDescription>
                          <div className="text-sm text-gray-500 mt-1">
                            {getSubjectName(instructor.subjectId)}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant={instructor.isActive ? "default" : "secondary"}>
                          {instructor.isActive ? "نشط" : "معطل"}
                        </Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleToggleInstructorStatus(instructor.id)}>
                            {instructor.isActive ? <Pause className="w-4 h-4"/> : <Play className="w-4 h-4"/>}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleEditInstructor(instructor)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteInstructor(instructor.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-gray-600">
                        الدورات: {courses.filter(c => c.instructorId === instructor.id).length}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الدورات</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
            <p className="text-xs text-muted-foreground">
              {courses.filter(c => c.isActive).length} نشط
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المستويات</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courseLevels.length}</div>
            <p className="text-xs text-muted-foreground">
              عبر جميع الدورات
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الدروس</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lessons.length}</div>
            <p className="text-xs text-muted-foreground">
              {lessons.filter(l => l.isFreePreview).length} معاينة مجانية
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المدرسين</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{instructors.length}</div>
            <p className="text-xs text-muted-foreground">
              {instructors.filter(i => i.isActive).length} نشط
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bulk Action Confirmation Dialog */}
      <AlertDialog open={dialogs.bulkDelete} onOpenChange={(open) => setDialogs(prev => ({ ...prev, bulkDelete: open }))}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد العملية</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من {bulkAction === 'delete' ? 'حذف' : bulkAction === 'activate' ? 'تفعيل' : 'تعطيل'} {selectedItems.length} عنصر؟
              {bulkAction === 'delete' && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-700">
                  <AlertTriangle className="w-4 h-4 inline ml-1" />
                  تحذير: لا يمكن التراجع عن عملية الحذف
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmBulkAction}
              className={bulkAction === 'delete' ? 'bg-red-600 hover:bg-red-700' : ''}
            >
              تأكيد
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
          toast.variant === 'destructive' 
            ? 'bg-red-100 border border-red-200 text-red-800' 
            : 'bg-green-100 border border-green-200 text-green-800'
        }`}>
          <div className="font-medium">{toast.title}</div>
          <div className="text-sm">{toast.description}</div>
        </div>
      )}
    </div>
  )
}