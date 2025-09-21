// src\pages\admin\StoriesManagement.jsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { ar } from "date-fns/locale"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mockStories } from "@/services/adminMockData"
import { PlusCircle, Pencil, Trash2, Eye } from "lucide-react"

export default function StoriesManagement() {
  const [stories, setStories] = useState(mockStories)
  const [editingStory, setEditingStory] = useState(null)
  const [newStory, setNewStory] = useState({
    title: "",
    content: "",
    imageUrl: "",
    link: "",
    category: "",
    expiryDate: new Date(),
    status: "نشط",
    priority: "عادي"
  })

  const handleAddStory = () => {
    if (!newStory.title || !newStory.content || !newStory.imageUrl) {
      alert("يرجى ملء جميع الحقول المطلوبة")
      return
    }

    const story = {
      id: stories.length + 1,
      ...newStory,
      createdAt: new Date().toISOString(),
      views: 0,
    }

    setStories([...stories, story])
    setNewStory({
      title: "",
      content: "",
      imageUrl: "",
      link: "",
      expiryDate: new Date(),
      status: "نشط",
    })
  }

  const handleEditStory = (story) => {
    setEditingStory(story)
  }

  const handleUpdateStory = () => {
    if (!editingStory.title || !editingStory.content || !editingStory.imageUrl) {
      alert("يرجى ملء جميع الحقول المطلوبة")
      return
    }

    setStories(stories.map(story =>
      story.id === editingStory.id
        ? editingStory
        : story
    ))
    setEditingStory(null)
  }

  const handleDeleteStory = (storyId) => {
    if (confirm("هل أنت متأكد من حذف هذه القصة؟")) {
      setStories(stories.filter(story => story.id !== storyId))
    }
  }

  const handleToggleStatus = (storyId) => {
    setStories(stories.map(story =>
      story.id === storyId
        ? { ...story, status: story.status === "نشط" ? "معطل" : "نشط" }
        : story
    ))
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-foreground">إدارة القصص</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-card text-card-foreground rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">إجمالي القصص</h3>
          <p className="text-2xl font-bold">{stories.length}</p>
          <p className="text-sm text-muted-foreground">منها {stories.filter(story => story.status === "نشط").length} نشطة</p>
        </div>
        <div className="bg-card text-card-foreground rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">القصص العاجلة</h3>
          <p className="text-2xl font-bold">
            {stories.filter(story => story.priority === "عاجل").length}
          </p>
          <p className="text-sm text-muted-foreground">من إجمالي {stories.length} قصة</p>
        </div>
        <div className="bg-card text-card-foreground rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">إجمالي المشاهدات</h3>
          <p className="text-2xl font-bold">
            {stories.reduce((sum, story) => sum + story.views, 0)}
          </p>
          <p className="text-sm text-muted-foreground">لجميع القصص</p>
        </div>
        <div className="bg-card text-card-foreground rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">متوسط المشاهدات</h3>
          <p className="text-2xl font-bold">
            {stories.length > 0 ? Math.round(stories.reduce((sum, story) => sum + story.views, 0) / stories.length) : 0}
          </p>
          <p className="text-sm text-muted-foreground">لكل قصة</p>
        </div>
      </div>

      {/* Add New Story Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-6">
            <PlusCircle className="w-4 h-4 ml-2" />
            إضافة قصة جديدة
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>إضافة قصة جديدة</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="story-title">عنوان القصة</Label>
              <Input
                id="story-title"
                value={newStory.title}
                onChange={(e) => setNewStory({...newStory, title: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="story-content">محتوى القصة</Label>
              <Textarea
                id="story-content"
                value={newStory.content}
                onChange={(e) => setNewStory({...newStory, content: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="story-image">رابط الصورة</Label>
              <Input
                id="story-image"
                value={newStory.imageUrl}
                onChange={(e) => setNewStory({...newStory, imageUrl: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="story-link">رابط القصة (اختياري)</Label>
              <Input
                id="story-link"
                value={newStory.link}
                onChange={(e) => setNewStory({...newStory, link: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="story-category">تصنيف القصة</Label>
              <Select
                value={newStory.category}
                onValueChange={(value) => setNewStory({...newStory, category: value})}
              >
                <SelectTrigger id="story-category">
                  <SelectValue placeholder="اختر تصنيف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="عام">عام</SelectItem>
                  <SelectItem value="إعلان">إعلان</SelectItem>
                  <SelectItem value="تحديث">تحديث</SelectItem>
                  <SelectItem value="عرض خاص">عرض خاص</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="story-priority">أولوية القصة</Label>
              <Select
                value={newStory.priority}
                onValueChange={(value) => setNewStory({...newStory, priority: value})}
              >
                <SelectTrigger id="story-priority">
                  <SelectValue placeholder="اختر الأولوية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="عادي">عادي</SelectItem>
                  <SelectItem value="عاجل">عاجل</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>تاريخ انتهاء الصلاحية</Label>
              <Calendar
                mode="single"
                selected={new Date(newStory.expiryDate)}
                onSelect={(date) => setNewStory({...newStory, expiryDate: date})}
                locale={ar}
              />
            </div>
          </div>
          <Button onClick={handleAddStory}>
            إضافة القصة
          </Button>
        </DialogContent>
      </Dialog>

      {/* Stories Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>العنوان</TableHead>
            <TableHead>الصورة</TableHead>
            <TableHead>التصنيف</TableHead>
            <TableHead>المشاهدات</TableHead>
            <TableHead>الأولوية</TableHead>
            <TableHead>تاريخ الانتهاء</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stories.map((story) => (
            <TableRow key={story.id}>
              <TableCell>
                <div className="font-medium">{story.title}</div>
                <div className="text-sm text-muted-foreground truncate">
                  {story.content.substring(0, 50)}...
                </div>
              </TableCell>
              <TableCell>
                <img
                  src={story.imageUrl}
                  alt={story.title}
                  className="w-16 h-16 object-cover rounded"
                />
              </TableCell>
              <TableCell>{story.category || "غير مصنف"}</TableCell>
              <TableCell>{story.views}</TableCell>
              <TableCell>
                <Badge variant={story.priority === "عاجل" ? "destructive" : "default"}>
                  {story.priority}
                </Badge>
              </TableCell>
              <TableCell>
                {format(new Date(story.expiryDate), "dd/MM/yyyy", { locale: ar })}
              </TableCell>
              <TableCell>
                <Badge
                  variant={story.status === "نشط" ? "success" : "secondary"}
                >
                  {story.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2 space-x-reverse">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditStory(story)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggleStatus(story.id)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteStory(story.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Story Dialog */}
      {editingStory && (
        <Dialog open={!!editingStory} onOpenChange={() => setEditingStory(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>تعديل القصة</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-story-title">عنوان القصة</Label>
                <Input
                  id="edit-story-title"
                  value={editingStory.title}
                  onChange={(e) => setEditingStory({...editingStory, title: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-story-content">محتوى القصة</Label>
                <Textarea
                  id="edit-story-content"
                  value={editingStory.content}
                  onChange={(e) => setEditingStory({...editingStory, content: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-story-image">رابط الصورة</Label>
                <Input
                  id="edit-story-image"
                  value={editingStory.imageUrl}
                  onChange={(e) => setEditingStory({...editingStory, imageUrl: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-story-link">رابط القصة (اختياري)</Label>
                <Input
                  id="edit-story-link"
                  value={editingStory.link}
                  onChange={(e) => setEditingStory({...editingStory, link: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label>تاريخ انتهاء الصلاحية</Label>
                <Calendar
                  mode="single"
                  selected={new Date(editingStory.expiryDate)}
                  onSelect={(date) => setEditingStory({...editingStory, expiryDate: date})}
                  locale={ar}
                />
              </div>
            </div>
            <Button onClick={handleUpdateStory}>
              حفظ التغييرات
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}