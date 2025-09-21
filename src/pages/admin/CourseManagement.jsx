// https://documenter.getpostman.com/view/44536088/2sB3HtFc79#b06cfeb7-8e40-44b0-9911-b9050f999bff
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

  const { usdToSyp } = useAppSettings();

  // --- NEW DATA STRUCTURE: Specialization → Instructor → Subject → Course → Level → Lesson ---
  const [specializations, setSpecializations] = useState([
    { id: 1, name: "معلوماتية", isActive: true },
    { id: 2, name: "هندسة", isActive: true },
  ]);

  const [instructors, setInstructors] = useState([
    { id: 1, name: "محمد أحمد", bio: "خبير برمجيات", specializationId: 1, isActive: true },
    { id: 2, name: "سارة حسن", bio: "مهندسة مدنية", specializationId: 2, isActive: true },
  ]);

  const [subjects, setSubjects] = useState([
    { id: 1, name: "لغة C#", specializationId: 1, instructorId: 1, isActive: true },
    { id: 2, name: "Python", specializationId: 1, instructorId: 1, isActive: true },
    { id: 3, name: "هندسة مدنية", specializationId: 2, instructorId: 2, isActive: true },
  ]);

  const [courses, setCourses] = useState([
    { id: 1, title: "C# للمبتدئين", description: "دورة شاملة", price: 50000, isFree: false, specializationId: 1, instructorId: 1, subjectId: 1, isActive: true, createdAt: "2024-01-15" }
  ]);

  const [courseLevels, setCourseLevels] = useState([
    { id: 1, name: "مستوى أول", order: 1, courseId: 1, instructorId: 1, subjectId: 1, isActive: true },
  ]);

  const [lessons, setLessons] = useState([
    { id: 1, title: "مقدمة في C#", description: "درس تمهيدي", youtubeUrl: "https://youtube.com/watch?v=example1", googleDriveUrl: "https://drive.google.com/file/d/example1", durationSec: 3600, isFreePreview: true, isActive: true, courseId: 1, courseLevelId: 1 },
  ] );

  // --- State Management ---
  const [activeTab, setActiveTab] = useState("courses");
  const [dialogs, setDialogs] = useState({ addCourse: false, editCourse: false, addLevel: false, addLesson: false, editLesson: false, addInstructor: false, editInstructor: false, addSpecialization: false, editSpecialization: false, addSubject: false, editSubject: false });
  const [editingItem, setEditingItem] = useState(null);
  const [expandedCourses, setExpandedCourses] = useState({});

  // --- Form States ---
  const [form, setForm] = useState({
    specialization: { name: "" },
    instructor: { name: "", bio: "", specializationId: "" },
    subject: { name: "", specializationId: "", instructorId: "" },
    course: { title: "", description: "", price: "", isFree: false, specializationId: "", instructorId: "", subjectId: "" },
    level: { name: "", courseId: "", instructorId: "", subjectId: "", order: 1 },
    lesson: { title: "", description: "", youtubeUrl: "", googleDriveUrl: "", durationSec: "", isFreePreview: false, courseId: "", courseLevelId: "" },
  });

  // --- Helper Functions (Updated for new structure) ---
  const getSpecializationName = (id) => specializations.find(s => s.id === id)?.name || "غير محدد";
  const getInstructorName = (id) => instructors.find(i => i.id === id)?.name || "غير محدد";
  const getSubjectName = (id) => subjects.find(s => s.id === id)?.name || "غير محدد";
  const getCourseName = (id) => courses.find(c => c.id === id)?.title || "غير محدد";
  const getLevelName = (id) => courseLevels.find(l => l.id === id)?.name || "غير محدد";

  const getInstructorsBySpecialization = (specializationId) => instructors.filter(i => i.specializationId === parseInt(specializationId));
  const getSubjectsBySpecialization = (specializationId) => subjects.filter(s => s.specializationId === parseInt(specializationId));
  const getSubjectsByInstructor = (instructorId) => subjects.filter(s => s.instructorId === parseInt(instructorId));
  const getCourseLevels = (courseId) => courseLevels.filter(l => l.courseId === courseId).sort((a, b) => a.order - b.order);
  const getCourseLevelsByInstructor = (instructorId) => courseLevels.filter(l => l.instructorId === instructorId);
  const getCourseLevelsBySubject = (subjectId) => courseLevels.filter(l => l.subjectId === subjectId);
  const getCourseLessons = (courseId, levelId) => lessons.filter(l => l.courseId === courseId && l.courseLevelId === levelId);

  // --- Generic Handlers ---
  const handleAdd = (type) => {
    const data = form[type];
    // Validation
    if ((type === 'specialization' && !data.name) ||
        (type === 'instructor' && (!data.name || !data.specializationId)) ||
        (type === 'subject' && (!data.name || !data.specializationId || !data.instructorId))) {
      return showToast("خطأ", "يرجى ملء الحقول المطلوبة", "destructive");
    }
    const newItem = { id: Date.now(), ...data, isActive: true };
    if (type === 'specialization') setSpecializations(prev => [...prev, newItem]);
    if (type === 'instructor') setInstructors(prev => [...prev, { ...newItem, specializationId: parseInt(data.specializationId) }]);
    if (type === 'subject') setSubjects(prev => [...prev, { ...newItem, specializationId: parseInt(data.specializationId), instructorId: parseInt(data.instructorId) }]);
    
    setForm(prev => ({ ...prev, [type]: {} }));
    setDialogs(prev => ({ ...prev, [`add${type.charAt(0).toUpperCase() + type.slice(1)}`]: false }));
    showToast("تمت الإضافة", `تمت إضافة ${type} بنجاح`);
  };

  const handleUpdate = (type) => {
    const data = form[type];
    if (!editingItem) return;

    const updater = (item) => (item.id === editingItem.id ? { ...item, ...data } : item);

    if (type === 'specialization') setSpecializations(updater);
    if (type === 'instructor') setInstructors(updater);
    if (type === 'subject') setSubjects(updater);
    if (type === 'course') setCourses(updater);
    if (type === 'level') setCourseLevels(updater);
    if (type === 'lesson') setLessons(updater);

    setEditingItem(null);
    setDialogs(prev => ({ ...prev, [`edit${type.charAt(0).toUpperCase() + type.slice(1)}`]: false }));
    showToast("تم التحديث", `تم تحديث ${type} بنجاح`);
  };

  const handleDelete = (type, id) => {
    if (!window.confirm("هل أنت متأكد من الحذف؟ لا يمكن التراجع عن هذا الإجراء.")) return;

    // Cascade delete checks
    if (type === 'specialization') {
      if (instructors.some(i => i.specializationId === id)) return showToast("لا يمكن الحذف", "يوجد مدرسون تابعون لهذا الاختصاص", "destructive");
      if (subjects.some(s => s.specializationId === id)) return showToast("لا يمكن الحذف", "يوجد مواد تابعة لهذا الاختصاص", "destructive");
      if (courses.some(c => c.specializationId === id)) return showToast("لا يمكن الحذف", "يوجد دورات تابعة لهذا الاختصاص", "destructive");
    }
    if (type === 'instructor') {
      if (subjects.some(s => s.instructorId === id)) return showToast("لا يمكن الحذف", "يوجد مواد تابعة لهذا المدرس", "destructive");
      if (courses.some(c => c.instructorId === id)) return showToast("لا يمكن الحذف", "يوجد دورات تابعة لهذا المدرس", "destructive");
      if (courseLevels.some(l => l.instructorId === id)) return showToast("لا يمكن الحذف", "يوجد مستويات تابعة لهذا المدرس", "destructive");
    }
    if (type === 'subject') {
      if (courses.some(c => c.subjectId === id)) return showToast("لا يمكن الحذف", "يوجد دورات مرتبطة بهذه المادة", "destructive");
      if (courseLevels.some(l => l.subjectId === id)) return showToast("لا يمكن الحذف", "يوجد مستويات مرتبطة بهذه المادة", "destructive");
    }
    if (type === 'course') {
        setCourses(prev => prev.filter(c => c.id !== id));
        setCourseLevels(prev => prev.filter(l => l.courseId !== id));
        setLessons(prev => prev.filter(l => l.courseId !== id));
    }
    if (type === 'level') {
      if (lessons.some(l => l.courseLevelId === id)) return showToast("لا يمكن الحذف", "يوجد دروس تابعة لهذا المستوى", "destructive");
      setCourseLevels(prev => prev.filter(l => l.id !== id));
    }
    if (type === 'lesson') setLessons(prev => prev.filter(l => l.id !== id));
    if (type === 'specialization') setSpecializations(prev => prev.filter(item => item.id !== id));
    if (type === 'instructor') setInstructors(prev => prev.filter(item => item.id !== id));
    if (type === 'subject') setSubjects(prev => prev.filter(item => item.id !== id));

    showToast("تم الحذف", `تم حذف العنصر بنجاح`);
  };

  const handleToggleActive = (type, id) => {
    const updater = (item) => (item.id === id ? { ...item, isActive: !item.isActive } : item);
    if (type === 'specialization') setSpecializations(updater);
    if (type === 'instructor') setInstructors(updater);
    if (type === 'subject') setSubjects(updater);
    if (type === 'course') setCourses(updater);
    if (type === 'level') setCourseLevels(updater);
    if (type === 'lesson') setLessons(updater);
  };

  const openEditDialog = (type, item) => {
    setEditingItem(item);
    setForm(prev => ({ ...prev, [type]: item }));
    setDialogs(prev => ({ ...prev, [`edit${type.charAt(0).toUpperCase() + type.slice(1)}`]: true }));
  };

  const handleFormChange = (type, field, value) => {
    setForm(prev => ({
      ...prev,
      [type]: { ...prev[type], [field]: value }
    }));
  };
  
  const handleCourseFormChange = (field, value) => {
    const newForm = { ...form.course, [field]: value };
    if (field === 'specializationId') {
        newForm.instructorId = "";
        newForm.subjectId = "";
    }
    if (field === 'instructorId') {
        newForm.subjectId = "";
    }
    setForm(prev => ({ ...prev, course: newForm }));
  };

  const handleLevelFormChange = (field, value) => {
    const newForm = { ...form.level, [field]: value };
    if (field === 'courseId') {
        const course = courses.find(c => c.id === parseInt(value));
        if (course) {
            newForm.instructorId = course.instructorId;
            newForm.subjectId = course.subjectId;
        }
    }
    setForm(prev => ({ ...prev, level: newForm }));
  };

  const handleAddCourse = () => {
    const data = form.course;
    if (!data.title || !data.specializationId || !data.instructorId || !data.subjectId) {
      return showToast("خطأ", "يرجى ملء جميع الحقول المطلوبة", "destructive");
    }
    const newCourse = {
      id: Date.now(),
      ...data,
      price: parseFloat(data.price) || 0,
      specializationId: parseInt(data.specializationId),
      instructorId: parseInt(data.instructorId),
      subjectId: parseInt(data.subjectId),
      isActive: true,
      createdAt: new Date().toISOString().split("T")[0]
    };
    setCourses(prev => [...prev, newCourse]);
    // Add default level
    setCourseLevels(prev => [...prev, { 
      id: Date.now() + 1, 
      name: "مستوى أول", 
      order: 1, 
      courseId: newCourse.id, 
      instructorId: newCourse.instructorId,
      subjectId: newCourse.subjectId,
      isActive: true 
    }]);
    setForm(prev => ({ ...prev, course: { title: "", description: "", price: "", isFree: false, specializationId: "", instructorId: "", subjectId: "" } }));
    setDialogs(prev => ({ ...prev, addCourse: false }));
    showToast("تمت الإضافة", "تمت إضافة الدورة ومستوى افتراضي لها");
  };

  const handleAddLevel = () => {
    const data = form.level;
    if (!data.name || !data.courseId || !data.instructorId || !data.subjectId) {
      return showToast("خطأ", "يرجى ملء جميع الحقول المطلوبة", "destructive");
    }
    const newLevel = {
      id: Date.now(),
      ...data,
      courseId: parseInt(data.courseId),
      instructorId: parseInt(data.instructorId),
      subjectId: parseInt(data.subjectId),
      isActive: true,
    };
    setCourseLevels(prev => [...prev, newLevel]);
    setForm(prev => ({ ...prev, level: { name: "", courseId: "", instructorId: "", subjectId: "", order: 1 } }));
    setDialogs(prev => ({ ...prev, addLevel: false }));
    showToast("تمت الإضافة", "تمت إضافة المستوى بنجاح");
  };

  const handleAddLesson = () => {
    const data = form.lesson;
    if (!data.title || !data.courseId || !data.courseLevelId) {
      return showToast("خطأ", "يرجى اختيار الدورة والمستوى وإدخال العنوان", "destructive");
    }
    const newLesson = {
      id: Date.now(),
      ...data,
      durationSec: parseInt(data.durationSec) || 0,
      courseId: parseInt(data.courseId),
      courseLevelId: parseInt(data.courseLevelId),
      isActive: true,
    };
    setLessons(prev => [...prev, newLesson]);
    setForm(prev => ({ ...prev, lesson: { title: "", description: "", youtubeUrl: "", googleDriveUrl: "", durationSec: "", isFreePreview: false, courseId: "", courseLevelId: "" } }));
    setDialogs(prev => ({ ...prev, addLesson: false }));
    showToast("تمت الإضافة", "تمت إضافة الدرس بنجاح");
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">إدارة الدورات</h1>
        <Button variant="outline" onClick={() => window.location.reload()}><RefreshCw className="w-4 h-4 ml-2" /> تحديث الصفحة</Button>
      </div>

      {/* --- TABS --- */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" dir="rtl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="taxonomy">التصنيف (الاختصاص، المدرس، المادة)</TabsTrigger>
          <TabsTrigger value="courses">الدورات والدروس</TabsTrigger>
        </TabsList>

        {/* --- TAXONOMY TAB --- */}
        <TabsContent value="taxonomy" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Specializations */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>1. الاختصاصات</CardTitle>
                <Dialog open={dialogs.addSpecialization} onOpenChange={(open) => setDialogs(p => ({ ...p, addSpecialization: open }))}>
                  <DialogTrigger asChild><Button size="sm"><Plus className="w-4 h-4 ml-1" /> إضافة</Button></DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>إضافة اختصاص جديد</DialogTitle></DialogHeader>
                    <Input placeholder="اسم الاختصاص" value={form.specialization.name || ''} onChange={(e) => handleFormChange('specialization', 'name', e.target.value)} />
                    <Button onClick={() => handleAdd('specialization')}>حفظ</Button>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="space-y-2">
                {specializations.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-2 border rounded">
                    <span>{item.name}</span>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => handleToggleActive('specialization', item.id)}>{item.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}</Button>
                      <Button size="icon" variant="ghost" onClick={() => openEditDialog('specialization', item)}><Edit className="w-4 h-4" /></Button>
                      <Button size="icon" variant="destructive" onClick={() => handleDelete('specialization', item.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Instructors */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>2. المدرسون</CardTitle>
                <Dialog open={dialogs.addInstructor} onOpenChange={(open) => setDialogs(p => ({ ...p, addInstructor: open }))}>
                  <DialogTrigger asChild><Button size="sm"><Plus className="w-4 h-4 ml-1" /> إضافة</Button></DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>إضافة مدرس جديد</DialogTitle></DialogHeader>
                    <Select value={form.instructor.specializationId || ''} onValueChange={(v) => handleFormChange('instructor', 'specializationId', v)}>
                      <SelectTrigger><SelectValue placeholder="اختر الاختصاص" /></SelectTrigger>
                      <SelectContent>{specializations.map(s => <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>)}</SelectContent>
                    </Select>
                    <Input placeholder="اسم المدرس" value={form.instructor.name || ''} onChange={(e) => handleFormChange('instructor', 'name', e.target.value)} />
                    <Textarea placeholder="نبذة عن المدرس" value={form.instructor.bio || ''} onChange={(e) => handleFormChange('instructor', 'bio', e.target.value)} />
                    <Button onClick={() => handleAdd('instructor')}>حفظ</Button>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="space-y-2">
                {instructors.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p>{item.name}</p>
                      <p className="text-sm text-muted-foreground">{getSpecializationName(item.specializationId)}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => handleToggleActive('instructor', item.id)}>{item.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}</Button>
                      <Button size="icon" variant="ghost" onClick={() => openEditDialog('instructor', item)}><Edit className="w-4 h-4" /></Button>
                      <Button size="icon" variant="destructive" onClick={() => handleDelete('instructor', item.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Subjects */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>3. المواد</CardTitle>
                <Dialog open={dialogs.addSubject} onOpenChange={(open) => setDialogs(p => ({ ...p, addSubject: open }))}>
                  <DialogTrigger asChild><Button size="sm"><Plus className="w-4 h-4 ml-1" /> إضافة</Button></DialogTrigger>
                  <DialogContent>
                    <DialogHeader><DialogTitle>إضافة مادة جديدة</DialogTitle></DialogHeader>
                    <Select value={form.subject.specializationId || ''} onValueChange={(v) => handleFormChange('subject', 'specializationId', v)}>
                      <SelectTrigger><SelectValue placeholder="اختر الاختصاص" /></SelectTrigger>
                      <SelectContent>{specializations.map(s => <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>)}</SelectContent>
                    </Select>
                    <Select value={form.subject.instructorId || ''} onValueChange={(v) => handleFormChange('subject', 'instructorId', v)} disabled={!form.subject.specializationId}>
                      <SelectTrigger><SelectValue placeholder="اختر المدرس" /></SelectTrigger>
                      <SelectContent>{getInstructorsBySpecialization(form.subject.specializationId).map(i => <SelectItem key={i.id} value={i.id.toString()}>{i.name}</SelectItem>)}</SelectContent>
                    </Select>
                    <Input placeholder="اسم المادة" value={form.subject.name || ''} onChange={(e) => handleFormChange('subject', 'name', e.target.value)} />
                    <Button onClick={() => handleAdd('subject')}>حفظ</Button>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="space-y-2">
                {subjects.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p>{item.name}</p>
                      <p className="text-sm text-muted-foreground">{getSpecializationName(item.specializationId)} - {getInstructorName(item.instructorId)}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => handleToggleActive('subject', item.id)}>{item.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}</Button>
                      <Button size="icon" variant="ghost" onClick={() => openEditDialog('subject', item)}><Edit className="w-4 h-4" /></Button>
                      <Button size="icon" variant="destructive" onClick={() => handleDelete('subject', item.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* --- COURSES & LESSONS TAB --- */}
        <TabsContent value="courses" className="space-y-4">
          <div className="flex gap-2">
            {/* Add Course Dialog */}
            <Dialog open={dialogs.addCourse} onOpenChange={(open) => setDialogs(p => ({ ...p, addCourse: open }))}>
              <DialogTrigger asChild><Button><Plus className="w-4 h-4 ml-2" /> إضافة دورة</Button></DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader><DialogTitle>إضافة دورة جديدة</DialogTitle></DialogHeader>
                <div className="space-y-4 py-4">
                  <Input placeholder="عنوان الدورة" value={form.course.title || ''} onChange={(e) => handleCourseFormChange('title', e.target.value)} />
                  <Textarea placeholder="وصف الدورة" value={form.course.description || ''} onChange={(e) => handleCourseFormChange('description', e.target.value)} />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Select value={form.course.specializationId || ''} onValueChange={(v) => handleCourseFormChange('specializationId', v)}>
                      <SelectTrigger><SelectValue placeholder="1. اختر الاختصاص" /></SelectTrigger>
                      <SelectContent>{specializations.map(s => <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>)}</SelectContent>
                    </Select>
                    <Select value={form.course.instructorId || ''} onValueChange={(v) => handleCourseFormChange('instructorId', v)} disabled={!form.course.specializationId}>
                      <SelectTrigger><SelectValue placeholder="2. اختر المدرس" /></SelectTrigger>
                      <SelectContent>{getInstructorsBySpecialization(form.course.specializationId).map(i => <SelectItem key={i.id} value={i.id.toString()}>{i.name}</SelectItem>)}</SelectContent>
                    </Select>
                    <Select value={form.course.subjectId || ''} onValueChange={(v) => handleCourseFormChange('subjectId', v)} disabled={!form.course.instructorId}>
                      <SelectTrigger><SelectValue placeholder="3. اختر المادة" /></SelectTrigger>
                      <SelectContent>{getSubjectsByInstructor(form.course.instructorId).map(s => <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <Input type="number" placeholder="السعر (ل.س)" value={form.course.price || ''} onChange={(e) => handleCourseFormChange('price', e.target.value)} />
                  <div className="flex items-center space-x-2">
                    <Checkbox id="isFree" checked={form.course.isFree} onCheckedChange={(checked) => handleCourseFormChange('isFree', checked)} />
                    <label htmlFor="isFree">دورة مجانية</label>
                  </div>
                  <Button onClick={handleAddCourse}>إضافة الدورة</Button>
                </div>
              </DialogContent>
            </Dialog>
            {/* Add Level Dialog */}
            <Dialog open={dialogs.addLevel} onOpenChange={(open) => setDialogs(p => ({ ...p, addLevel: open }))}>
              <DialogTrigger asChild><Button variant="outline"><Plus className="w-4 h-4 ml-2" /> إضافة مستوى</Button></DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader><DialogTitle>إضافة مستوى جديد</DialogTitle></DialogHeader>
                <div className="space-y-4 py-4">
                  <Select value={form.level.courseId || ''} onValueChange={(v) => handleLevelFormChange('courseId', v)}>
                    <SelectTrigger><SelectValue placeholder="اختر الدورة" /></SelectTrigger>
                    <SelectContent>{courses.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.title}</SelectItem>)}</SelectContent>
                  </Select>
                  <Input placeholder="اسم المستوى" value={form.level.name || ''} onChange={(e) => handleFormChange('level', 'name', e.target.value)} />
                  <Input type="number" placeholder="ترتيب المستوى" value={form.level.order || ''} onChange={(e) => handleFormChange('level', 'order', e.target.value)} />
                  <Select value={form.level.instructorId || ''} onValueChange={(v) => handleFormChange('level', 'instructorId', v)}>
                    <SelectTrigger><SelectValue placeholder="اختر المدرس" /></SelectTrigger>
                    <SelectContent>{instructors.map(i => <SelectItem key={i.id} value={i.id.toString()}>{i.name}</SelectItem>)}</SelectContent>
                  </Select>
                  <Select value={form.level.subjectId || ''} onValueChange={(v) => handleFormChange('level', 'subjectId', v)}>
                    <SelectTrigger><SelectValue placeholder="اختر المادة" /></SelectTrigger>
                    <SelectContent>{subjects.map(s => <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>)}</SelectContent>
                  </Select>
                  <Button onClick={handleAddLevel}>إضافة المستوى</Button>
                </div>
              </DialogContent>
            </Dialog>
            {/* Add Lesson Dialog */}
            <Dialog open={dialogs.addLesson} onOpenChange={(open) => setDialogs(p => ({ ...p, addLesson: open }))}>
              <DialogTrigger asChild><Button variant="outline"><Plus className="w-4 h-4 ml-2" /> إضافة درس</Button></DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader><DialogTitle>إضافة درس جديد</DialogTitle></DialogHeader>
                <div className="space-y-4 py-4">
                  <Select value={form.lesson.courseId || ''} onValueChange={(v) => handleFormChange('lesson', 'courseId', v)}>
                    <SelectTrigger><SelectValue placeholder="اختر الدورة" /></SelectTrigger>
                    <SelectContent>{courses.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.title}</SelectItem>)}</SelectContent>
                  </Select>
                  <Select value={form.lesson.courseLevelId || ''} onValueChange={(v) => handleFormChange('lesson', 'courseLevelId', v)} disabled={!form.lesson.courseId}>
                    <SelectTrigger><SelectValue placeholder="اختر المستوى" /></SelectTrigger>
                    <SelectContent>{getCourseLevels(parseInt(form.lesson.courseId)).map(l => <SelectItem key={l.id} value={l.id.toString()}>{l.name}</SelectItem>)}</SelectContent>
                  </Select>
                  <Input placeholder="عنوان الدرس" value={form.lesson.title || ''} onChange={(e) => handleFormChange('lesson', 'title', e.target.value)} />
                  <Input placeholder="رابط يوتيوب" value={form.lesson.youtubeUrl || ''} onChange={(e) => handleFormChange('lesson', 'youtubeUrl', e.target.value)} />
                  <Input placeholder="رابط جوجل درايف" value={form.lesson.googleDriveUrl || ''} onChange={(e) => handleFormChange('lesson', 'googleDriveUrl', e.target.value)} />
                  <Input type="number" placeholder="مدة الدرس (بالثواني)" value={form.lesson.durationSec || ''} onChange={(e) => handleFormChange('lesson', 'durationSec', e.target.value)} />
                  <div className="flex items-center space-x-2">
                    <Checkbox id="isFreePreview" checked={form.lesson.isFreePreview} onCheckedChange={(checked) => handleFormChange('lesson', 'isFreePreview', checked)} />
                    <label htmlFor="isFreePreview">معاينة مجانية</label>
                  </div>
                  <Button onClick={handleAddLesson}>إضافة الدرس</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          {/* Courses List */}
          <div className="space-y-4">
            {courses.map(course => (
              <Card key={course.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription>{getSpecializationName(course.specializationId)} → {getInstructorName(course.instructorId)} → {getSubjectName(course.subjectId)}</CardDescription>
                      <div className="flex gap-2 mt-2">
                        <Badge variant={course.isActive ? "default" : "secondary"}>{course.isActive ? "نشط" : "معطل"}</Badge>
                        {course.isFree && <Badge variant="outline">مجاني</Badge>}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" onClick={() => handleToggleActive('course', course.id)}>{course.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}</Button>
                      <Button size="icon" variant="ghost" onClick={() => openEditDialog('course', course)}><Edit className="w-4 h-4" /></Button>
                      <Button size="icon" variant="destructive" onClick={() => handleDelete('course', course.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-2">المستويات:</h4>
                  {getCourseLevels(course.id).map(level => (
                    <div key={level.id} className="mb-4 p-3 border rounded">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h5 className="font-medium">{level.name}</h5>
                          <p className="text-sm text-muted-foreground">المدرس: {getInstructorName(level.instructorId)} | المادة: {getSubjectName(level.subjectId)}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" onClick={() => openEditDialog('level', level)}><Edit className="w-4 h-4" /></Button>
                          <Button size="icon" variant="destructive" onClick={() => handleDelete('level', level.id)}><Trash2 className="w-4 h-4" /></Button>
                        </div>
                      </div>
                      <h6 className="font-medium mb-2">الدروس:</h6>
                      <Table>
                        <TableHeader><TableRow><TableHead>العنوان</TableHead><TableHead>الروابط</TableHead><TableHead>الإجراءات</TableHead></TableRow></TableHeader>
                        <TableBody>
                          {lessons.filter(l => l.courseLevelId === level.id).map(lesson => (
                            <TableRow key={lesson.id}>
                              <TableCell>{lesson.title}</TableCell>
                              <TableCell className="flex gap-2">
                                {lesson.youtubeUrl && <a href={lesson.youtubeUrl} target="_blank" rel="noopener noreferrer"><Badge>YouTube</Badge></a>}
                                {lesson.googleDriveUrl && <a href={lesson.googleDriveUrl} target="_blank" rel="noopener noreferrer"><Badge variant="secondary">Drive</Badge></a>}
                              </TableCell>
                              <TableCell className="flex gap-1">
                                <Button size="icon" variant="ghost" onClick={() => openEditDialog('lesson', lesson)}><Edit className="w-4 h-4" /></Button>
                                <Button size="icon" variant="destructive" onClick={() => handleDelete('lesson', lesson.id)}><Trash2 className="w-4 h-4" /></Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* --- EDIT DIALOGS (Generic) --- */}
      {/* Edit Specialization */}
      <Dialog open={dialogs.editSpecialization} onOpenChange={(open) => setDialogs(p => ({ ...p, editSpecialization: open }))}>
        <DialogContent>
          <DialogHeader><DialogTitle>تعديل الاختصاص</DialogTitle></DialogHeader>
          <Input value={form.specialization.name || ''} onChange={(e) => handleFormChange('specialization', 'name', e.target.value)} />
          <Button onClick={() => handleUpdate('specialization')}>حفظ التعديلات</Button>
        </DialogContent>
      </Dialog>

      {/* Edit Instructor Dialog */}
      <Dialog open={dialogs.editInstructor} onOpenChange={(open) => setDialogs(p => ({ ...p, editInstructor: open }))}>
        <DialogContent>
          <DialogHeader><DialogTitle>تعديل المدرس</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <Select value={form.instructor.specializationId?.toString() || ''} onValueChange={(v) => handleFormChange('instructor', 'specializationId', v)}>
              <SelectTrigger><SelectValue placeholder="اختر الاختصاص" /></SelectTrigger>
              <SelectContent>{specializations.map(s => <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>)}</SelectContent>
            </Select>
            <Input placeholder="اسم المدرس" value={form.instructor.name || ''} onChange={(e) => handleFormChange('instructor', 'name', e.target.value)} />
            <Textarea placeholder="نبذة عن المدرس" value={form.instructor.bio || ''} onChange={(e) => handleFormChange('instructor', 'bio', e.target.value)} />
            <Button onClick={() => handleUpdate('instructor')}>حفظ التعديلات</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Subject Dialog */}
      <Dialog open={dialogs.editSubject} onOpenChange={(open) => setDialogs(p => ({ ...p, editSubject: open }))}>
        <DialogContent>
          <DialogHeader><DialogTitle>تعديل المادة</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <Select value={form.subject.specializationId?.toString() || ''} onValueChange={(v) => handleFormChange('subject', 'specializationId', v)}>
              <SelectTrigger><SelectValue placeholder="اختر الاختصاص" /></SelectTrigger>
              <SelectContent>{specializations.map(s => <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={form.subject.instructorId?.toString() || ''} onValueChange={(v) => handleFormChange('subject', 'instructorId', v)}>
              <SelectTrigger><SelectValue placeholder="اختر المدرس" /></SelectTrigger>
              <SelectContent>{instructors.map(i => <SelectItem key={i.id} value={i.id.toString()}>{i.name}</SelectItem>)}</SelectContent>
            </Select>
            <Input placeholder="اسم المادة" value={form.subject.name || ''} onChange={(e) => handleFormChange('subject', 'name', e.target.value)} />
            <Button onClick={() => handleUpdate('subject')}>حفظ التعديلات</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Course Dialog */}
      <Dialog open={dialogs.editCourse} onOpenChange={(open) => setDialogs(p => ({ ...p, editCourse: open }))}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>تعديل الدورة</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <Input placeholder="عنوان الدورة" value={form.course.title || ''} onChange={(e) => handleCourseFormChange('title', e.target.value)} />
            <Textarea placeholder="وصف الدورة" value={form.course.description || ''} onChange={(e) => handleCourseFormChange('description', e.target.value)} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={form.course.specializationId?.toString() || ''} onValueChange={(v) => handleCourseFormChange('specializationId', v)}>
                <SelectTrigger><SelectValue placeholder="1. اختر الاختصاص" /></SelectTrigger>
                <SelectContent>{specializations.map(s => <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={form.course.instructorId?.toString() || ''} onValueChange={(v) => handleCourseFormChange('instructorId', v)} disabled={!form.course.specializationId}>
                <SelectTrigger><SelectValue placeholder="2. اختر المدرس" /></SelectTrigger>
                <SelectContent>{getInstructorsBySpecialization(form.course.specializationId).map(i => <SelectItem key={i.id} value={i.id.toString()}>{i.name}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={form.course.subjectId?.toString() || ''} onValueChange={(v) => handleCourseFormChange('subjectId', v)} disabled={!form.course.instructorId}>
                <SelectTrigger><SelectValue placeholder="3. اختر المادة" /></SelectTrigger>
                <SelectContent>{getSubjectsByInstructor(form.course.instructorId).map(s => <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <Input type="number" placeholder="السعر (ل.س)" value={form.course.price || ''} onChange={(e) => handleCourseFormChange('price', e.target.value)} />
            <div className="flex items-center space-x-2">
              <Checkbox id="editIsFree" checked={form.course.isFree} onCheckedChange={(checked) => handleCourseFormChange('isFree', checked)} />
              <label htmlFor="editIsFree">دورة مجانية</label>
            </div>
            <Button onClick={() => handleUpdate('course')}>حفظ التعديلات</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Level Dialog */}
      <Dialog open={dialogs.editLevel} onOpenChange={(open) => setDialogs(p => ({ ...p, editLevel: open }))}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>تعديل المستوى</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <Select value={form.level.courseId?.toString() || ''} onValueChange={(v) => handleLevelFormChange('courseId', v)}>
              <SelectTrigger><SelectValue placeholder="اختر الدورة" /></SelectTrigger>
              <SelectContent>{courses.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.title}</SelectItem>)}</SelectContent>
            </Select>
            <Input placeholder="اسم المستوى" value={form.level.name || ''} onChange={(e) => handleFormChange('level', 'name', e.target.value)} />
            <Input type="number" placeholder="ترتيب المستوى" value={form.level.order || ''} onChange={(e) => handleFormChange('level', 'order', e.target.value)} />
            <Select value={form.level.instructorId?.toString() || ''} onValueChange={(v) => handleFormChange('level', 'instructorId', v)}>
              <SelectTrigger><SelectValue placeholder="اختر المدرس" /></SelectTrigger>
              <SelectContent>{instructors.map(i => <SelectItem key={i.id} value={i.id.toString()}>{i.name}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={form.level.subjectId?.toString() || ''} onValueChange={(v) => handleFormChange('level', 'subjectId', v)}>
              <SelectTrigger><SelectValue placeholder="اختر المادة" /></SelectTrigger>
              <SelectContent>{subjects.map(s => <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>)}</SelectContent>
            </Select>
            <Button onClick={() => handleUpdate('level')}>حفظ التعديلات</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Lesson Dialog */}
      <Dialog open={dialogs.editLesson} onOpenChange={(open) => setDialogs(p => ({ ...p, editLesson: open }))}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>تعديل الدرس</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <Select value={form.lesson.courseId?.toString() || ''} onValueChange={(v) => handleFormChange('lesson', 'courseId', v)}>
              <SelectTrigger><SelectValue placeholder="اختر الدورة" /></SelectTrigger>
              <SelectContent>{courses.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.title}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={form.lesson.courseLevelId?.toString() || ''} onValueChange={(v) => handleFormChange('lesson', 'courseLevelId', v)} disabled={!form.lesson.courseId}>
              <SelectTrigger><SelectValue placeholder="اختر المستوى" /></SelectTrigger>
              <SelectContent>{getCourseLevels(parseInt(form.lesson.courseId)).map(l => <SelectItem key={l.id} value={l.id.toString()}>{l.name}</SelectItem>)}</SelectContent>
            </Select>
            <Input placeholder="عنوان الدرس" value={form.lesson.title || ''} onChange={(e) => handleFormChange('lesson', 'title', e.target.value)} />
            <Input placeholder="رابط يوتيوب" value={form.lesson.youtubeUrl || ''} onChange={(e) => handleFormChange('lesson', 'youtubeUrl', e.target.value)} />
            <Input placeholder="رابط جوجل درايف" value={form.lesson.googleDriveUrl || ''} onChange={(e) => handleFormChange('lesson', 'googleDriveUrl', e.target.value)} />
            <Input type="number" placeholder="مدة الدرس (بالثواني)" value={form.lesson.durationSec || ''} onChange={(e) => handleFormChange('lesson', 'durationSec', e.target.value)} />
            <div className="flex items-center space-x-2">
              <Checkbox id="editIsFreePreview" checked={form.lesson.isFreePreview} onCheckedChange={(checked) => handleFormChange('lesson', 'isFreePreview', checked)} />
              <label htmlFor="editIsFreePreview">معاينة مجانية</label>
            </div>
            <Button onClick={() => handleUpdate('lesson')}>حفظ التعديلات</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* --- TOAST NOTIFICATION --- */}
      {toast.show && (
        <div className={`fixed top-5 right-5 z-50 p-4 rounded-md shadow-lg text-white ${toast.variant === 'destructive' ? 'bg-red-600' : 'bg-green-600'}`}>
          <div className="font-bold">{toast.title}</div>
          <div>{toast.description}</div>
        </div>
      )}
    </div>
  );
}