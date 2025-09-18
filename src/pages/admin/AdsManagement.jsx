// src\pages\admin\AdsManagement.jsx
import { useState } from "react"
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Image as ImageIcon,
  Clock,
  Megaphone
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

export default function AdsManagement() {
  const { toast } = useToast()
  const [ads, setAds] = useState([
    {
      id: 1,
      title: "دورة البرمجة الجديدة",
      description: "انضم إلى دورة البرمجة المتقدمة",
      type: "صورة",
      content: "/api/placeholder/300/200",
      duration: 7,
      status: "نشط",
      startDate: "2024-01-20",
      endDate: "2024-01-27",
      views: 1250,
      clicks: 89,
      createdAt: "2024-01-20"
    },
    {
      id: 2,
      title: "عرض خاص - خصم 50%",
      description: "احصل على خصم خاص على جميع الدورات",
      type: "نص",
      content: "عرض خاص لفترة محدودة - خصم 50% على جميع الدورات!",
      duration: 14,
      status: "منتهي",
      startDate: "2024-01-10",
      endDate: "2024-01-24",
      views: 2100,
      clicks: 156,
      createdAt: "2024-01-10"
    }
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingAd, setEditingAd] = useState(null)
  const [newAd, setNewAd] = useState({
    title: "",
    description: "",
    type: "",
    content: "",
    duration: "",
    startDate: ""
  })

  const handleAddAd = () => {
    if (!newAd.title || !newAd.description || !newAd.type || !newAd.duration || !newAd.startDate) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      })
      return
    }

    const startDate = new Date(newAd.startDate)
    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + parseInt(newAd.duration))

    const ad = {
      id: ads.length + 1,
      ...newAd,
      duration: parseInt(newAd.duration),
      status: new Date() >= startDate && new Date() <= endDate ? "نشط" : "منتهي",
      endDate: endDate.toISOString().split('T')[0],
      views: 0,
      clicks: 0,
      createdAt: new Date().toISOString().split('T')[0]
    }

    setAds([...ads, ad])
    setNewAd({
      title: "",
      description: "",
      type: "",
      content: "",
      duration: "",
      startDate: ""
    })
    setIsAddDialogOpen(false)
    
    toast({
      title: "نجح",
      description: "تم إضافة الإعلان بنجاح"
    })
  }

  const handleEditAd = (ad) => {
    setEditingAd(ad)
    setIsEditDialogOpen(true)
  }

  const handleUpdateAd = () => {
    if (!editingAd.title || !editingAd.description || !editingAd.type || !editingAd.duration) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      })
      return
    }

    setAds(ads.map(ad => 
      ad.id === editingAd.id 
        ? { ...editingAd, duration: parseInt(editingAd.duration) }
        : ad
    ))
    setIsEditDialogOpen(false)
    setEditingAd(null)
    
    toast({
      title: "نجح",
      description: "تم تحديث الإعلان بنجاح"
    })
  }

  const handleDeleteAd = (adId) => {
    setAds(ads.filter(ad => ad.id !== adId))
    toast({
      title: "نجح",
      description: "تم حذف الإعلان بنجاح"
    })
  }

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "نشط":
        return "default"
      case "منتهي":
        return "secondary"
      case "مجدول":
        return "outline"
      default:
        return "outline"
    }
  }

  const getTypeBadgeVariant = (type) => {
    return type === "صورة" ? "default" : "secondary"
  }

  const activeAds = ads.filter(ad => ad.status === "نشط").length
  const totalViews = ads.reduce((sum, ad) => sum + ad.views, 0)
  const totalClicks = ads.reduce((sum, ad) => sum + ad.clicks, 0)
  const ctr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(2) : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة الإعلانات</h1>
          <p className="text-muted-foreground mt-1">
            إدارة الإعلانات والقصص في التطبيق
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-hero">
              <Plus className="w-4 h-4 ml-2" />
              إضافة إعلان جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إضافة إعلان جديد</DialogTitle>
              <DialogDescription>
                إنشاء إعلان جديد للعرض في التطبيق
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ad-title">عنوان الإعلان</Label>
                  <Input
                    id="ad-title"
                    value={newAd.title}
                    onChange={(e) => setNewAd({...newAd, title: e.target.value})}
                    placeholder="أدخل عنوان الإعلان"
                  />
                </div>
                <div>
                  <Label htmlFor="ad-type">نوع الإعلان</Label>
                  <Select value={newAd.type} onValueChange={(value) => setNewAd({...newAd, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر النوع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="صورة">صورة</SelectItem>
                      <SelectItem value="نص">نص</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="ad-description">وصف الإعلان</Label>
                <Textarea
                  id="ad-description"
                  value={newAd.description}
                  onChange={(e) => setNewAd({...newAd, description: e.target.value})}
                  placeholder="أدخل وصف الإعلان"
                  rows={3}
                />
              </div>
              {newAd.type === "صورة" ? (
                <div>
                  <Label htmlFor="ad-image">رابط الصورة</Label>
                  <Input
                    id="ad-image"
                    value={newAd.content}
                    onChange={(e) => setNewAd({...newAd, content: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              ) : (
                <div>
                  <Label htmlFor="ad-text">النص</Label>
                  <Textarea
                    id="ad-text"
                    value={newAd.content}
                    onChange={(e) => setNewAd({...newAd, content: e.target.value})}
                    placeholder="أدخل نص الإعلان"
                    rows={4}
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ad-duration">مدة العرض (أيام)</Label>
                  <Input
                    id="ad-duration"
                    type="number"
                    value={newAd.duration}
                    onChange={(e) => setNewAd({...newAd, duration: e.target.value})}
                    placeholder="7"
                    min="1"
                  />
                </div>
                <div>
                  <Label htmlFor="ad-start">تاريخ البداية</Label>
                  <Input
                    id="ad-start"
                    type="date"
                    value={newAd.startDate}
                    onChange={(e) => setNewAd({...newAd, startDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleAddAd}>
                  إضافة الإعلان
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
                <p className="text-sm text-muted-foreground">إجمالي الإعلانات</p>
                <p className="text-2xl font-bold">{ads.length}</p>
                <p className="text-xs text-success">+2 هذا الشهر</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Megaphone className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الإعلانات النشطة</p>
                <p className="text-2xl font-bold">{activeAds}</p>
                <p className="text-xs text-success">نشط حالياً</p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المشاهدات</p>
                <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
                <p className="text-xs text-success">+12% من الشهر الماضي</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">معدل النقر</p>
                <p className="text-2xl font-bold">{ctr}%</p>
                <p className="text-xs text-success">{totalClicks} نقرات</p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ads Table */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة الإعلانات</CardTitle>
          <CardDescription>
            جميع الإعلانات المنشورة في التطبيق
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الإعلان</TableHead>
                <TableHead>النوع</TableHead>
                <TableHead>المدة</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>المشاهدات</TableHead>
                <TableHead>النقرات</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ads.map((ad) => (
                <TableRow key={ad.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{ad.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {ad.description.substring(0, 50)}...
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {ad.startDate} - {ad.endDate}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getTypeBadgeVariant(ad.type)}>
                      {ad.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{ad.duration} أيام</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(ad.status)}>
                      {ad.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{ad.views.toLocaleString()}</TableCell>
                  <TableCell>{ad.clicks.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditAd(ad)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteAd(ad.id)}
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
            <DialogTitle>تعديل الإعلان</DialogTitle>
            <DialogDescription>
              تعديل تفاصيل الإعلان
            </DialogDescription>
          </DialogHeader>
          {editingAd && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-title">عنوان الإعلان</Label>
                  <Input
                    id="edit-title"
                    value={editingAd.title}
                    onChange={(e) => setEditingAd({...editingAd, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-type">نوع الإعلان</Label>
                  <Select value={editingAd.type} onValueChange={(value) => setEditingAd({...editingAd, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="صورة">صورة</SelectItem>
                      <SelectItem value="نص">نص</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="edit-description">وصف الإعلان</Label>
                <Textarea
                  id="edit-description"
                  value={editingAd.description}
                  onChange={(e) => setEditingAd({...editingAd, description: e.target.value})}
                  rows={3}
                />
              </div>
              {editingAd.type === "صورة" ? (
                <div>
                  <Label htmlFor="edit-image">رابط الصورة</Label>
                  <Input
                    id="edit-image"
                    value={editingAd.content}
                    onChange={(e) => setEditingAd({...editingAd, content: e.target.value})}
                  />
                </div>
              ) : (
                <div>
                  <Label htmlFor="edit-text">النص</Label>
                  <Textarea
                    id="edit-text"
                    value={editingAd.content}
                    onChange={(e) => setEditingAd({...editingAd, content: e.target.value})}
                    rows={4}
                  />
                </div>
              )}
              <div>
                <Label htmlFor="edit-duration">مدة العرض (أيام)</Label>
                <Input
                  id="edit-duration"
                  type="number"
                  value={editingAd.duration}
                  onChange={(e) => setEditingAd({...editingAd, duration: e.target.value})}
                  min="1"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleUpdateAd}>
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