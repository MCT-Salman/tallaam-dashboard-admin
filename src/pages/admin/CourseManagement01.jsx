import React, { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Play, Pause, Upload, Link as LinkIcon, BookOpen, Users, Video, ChevronDown, ChevronRight, Settings, Search, Filter, MoreHorizontal, CheckSquare, Square, AlertTriangle, Eye, EyeOff, Copy, Download, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { useAppSettings } from "@/contexts/AppSettingsContext"
import { useToast } from "@/hooks/use-toast"

const CourseManagement = () => {

    // Set RTL direction
    useEffect(() => {
        document.documentElement.dir = 'rtl';
        document.body.style.fontFamily = 'Arial, sans-serif';
    }, []);

    // Toast functionality
    const { toast } = useToast()

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

    const [courseLevels, setCourseLevels] = useState([
        { id: 1, name: "مستوى أول", order: 1, courseId: 1, instructorId: 1, subjectId: 1, isActive: true },
    ]);

    const [lessons, setLessons] = useState([
        { id: 1, title: "مقدمة في C#", description: "درس تمهيدي", youtubeUrl: "https://youtube.com/watch?v=example1", googleDriveUrl: "https://drive.google.com/file/d/example1", durationSec: 3600, isFreePreview: true, isActive: true, courseId: 1, courseLevelId: 1 },
    ]);




    // --- State Management ---
    const [activeTab, setActiveTab] = useState("courses");
    const [dialogs, setDialogs] = useState({
        addLevel: false,
        editLevel: false,
        addLesson: false,
        editLesson: false,
        addInstructor: false,
        editInstructor: false,
        addCourse: false,
        editCourse: false,
        addSubject: false,
        editSubject: false
    });
    const [editingItem, setEditingItem] = useState(null);
    // --- Form States ---
    const [form, setForm] = useState({
        subject: { name: "", isActive: true },
        instructor: { name: "", bio: "", subjectId: "",avatarUrl: "", isActive: true },
        course: { title: "", description: "", subjectId: "", isActive: true },
        level: { name: "", courseId: "", instructorId: "", subjectId: "", order: 1,priceUSD:"",priceSAR:"",isFree:false, isActive: true, },
        lesson: { title: "", description: "", youtubeUrl: "", googleDriveUrl: "", durationSec: "", isFreePreview: false, courseId: "", courseLevelId: "" },
    });











    return (
        <div className='space-y-6 p-6 max-w-7xl mx-auto'>
            {/* --- HEADER --- */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">إدارة الدورات</h1>
                {/* <Button variant="outline" onClick={() => window.location.reload()}><RefreshCw className="w-4 h-4 ml-2" /> تحديث الصفحة</Button> */}
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
        </div>
    )
}

export default CourseManagement