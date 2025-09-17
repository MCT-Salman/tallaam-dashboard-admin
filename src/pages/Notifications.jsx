import { useState } from "react"
import { Bell, Send, Settings, Trash2, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { StatsCard } from "@/components/dashboard/StatsCard"

const notificationsData = [
  {
    id: 1,
    title: "ترحيب بالطلاب الجدد",
    message: "مرحباً بكم في منصة تعلّم! نتمنى لكم تجربة تعليمية ممتعة ومفيدة.",
    type: "ترحيب",
    recipients: 45,
    status: "مرسلة",
    date: "2024/09/15",
    readCount: 38,
    isRead: false
  },
  {
    id: 2,
    title: "تذكير بموعد الامتحان",
    message:
      "تذكير: امتحان دورة البرمجة سيكون غداً الساعة 2:00 ظهراً. تأكد من مراجعة المادة.",
    type: "تذكير",
    recipients: 125,
    status: "مرسلة",
    date: "2024/09/14",
    readCount: 98,
    isRead: true
  },
  {
    id: 3,
    title: "إعلان عن دورة جديدة",
    message:
      "تم إطلاق دورة جديدة في التسويق الرقمي! سجل الآن واحصل على خصم 20%.",
    type: "إعلان",
    recipients: 500,
    status: "مجدولة",
    date: "2024/09/16",
    readCount: 0,
    isRead: false
  }
]

const notificationTypes = ["الكل", "ترحيب", "تذكير", "إعلان", "تحديث"]
const statusTypes = ["الكل", "مرسلة", "مجدولة", "مسودة"]

export default function Notifications() {
  const [selectedType, setSelectedType] = useState("الكل")
  const [selectedStatus, setSelectedStatus] = useState("الكل")
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "",
    recipients: "all"
  })

  const filteredNotifications = notificationsData.filter(notification => {
    const matchesType =
      selectedType === "الكل" || notification.type === selectedType
    const matchesStatus =
      selectedStatus === "الكل" || notification.status === selectedStatus
    return matchesType && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            إدارة الإشعارات
          </h1>
          <p className="text-muted-foreground mt-2">
            إرسال وإدارة إشعارات المنصة التعليمية
          </p>
        </div>
        <Button className="gap-2">
          <Send className="w-4 h-4" />
          إرسال إشعار جديد
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="إجمالي الإشعارات"
          value="156"
          change="12+"
          changeType="increase"
          icon={Bell}
        />
        <StatsCard
          title="المرسلة اليوم"
          value="23"
          change="5+"
          changeType="increase"
          icon={Send}
        />
        <StatsCard
          title="معدل القراءة"
          value="78%"
          change="3.2%"
          changeType="increase"
          icon={Eye}
        />
        <StatsCard
          title="المجدولة"
          value="8"
          change="2+"
          changeType="increase"
          icon={Settings}
        />
      </div>

      {/* Create New Notification */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>إنشاء إشعار جديد</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                عنوان الإشعار
              </label>
              <Input
                placeholder="أدخل عنوان الإشعار..."
                value={newNotification.title}
                onChange={e =>
                  setNewNotification({
                    ...newNotification,
                    title: e.target.value
                  })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                نوع الإشعار
              </label>
              <Select
                value={newNotification.type}
                onValueChange={value =>
                  setNewNotification({ ...newNotification, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع الإشعار" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ترحيب">ترحيب</SelectItem>
                  <SelectItem value="تذكير">تذكير</SelectItem>
                  <SelectItem value="إعلان">إعلان</SelectItem>
                  <SelectItem value="تحديث">تحديث</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              محتوى الإشعار
            </label>
            <Textarea
              placeholder="اكتب محتوى الإشعار هنا..."
              value={newNotification.message}
              onChange={e =>
                setNewNotification({
                  ...newNotification,
                  message: e.target.value
                })
              }
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                المستقبلون
              </label>
              <Select
                value={newNotification.recipients}
                onValueChange={value =>
                  setNewNotification({ ...newNotification, recipients: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الطلاب</SelectItem>
                  <SelectItem value="active">الطلاب النشطون</SelectItem>
                  <SelectItem value="new">الطلاب الجدد</SelectItem>
                  <SelectItem value="course">طلاب دورة معينة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end gap-2">
              <Button variant="outline" className="flex-1">
                حفظ كمسودة
              </Button>
              <Button className="flex-1">إرسال الآن</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="card-elevated">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex gap-2 flex-wrap">
              <span className="text-sm font-medium self-center">النوع:</span>
              {notificationTypes.map(type => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="text-sm font-medium self-center">الحالة:</span>
              {statusTypes.map(status => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedStatus(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map(notification => (
          <Card
            key={notification.id}
            className={`card-elevated hover:shadow-lg transition-all duration-300 ${
              !notification.isRead ? "border-r-4 border-r-primary" : ""
            }`}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">
                      {notification.title}
                    </h3>
                    <Badge
                      className={`${
                        notification.type === "ترحيب"
                          ? "bg-blue-500"
                          : notification.type === "تذكير"
                          ? "bg-orange-500"
                          : notification.type === "إعلان"
                          ? "bg-green-500"
                          : "bg-purple-500"
                      }`}
                    >
                      {notification.type}
                    </Badge>
                    <Badge
                      variant={
                        notification.status === "مرسلة"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {notification.status}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {notification.message}
                  </p>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span>📅 {notification.date}</span>
                    <span>👥 {notification.recipients} مستقبل</span>
                    {notification.status === "مرسلة" && (
                      <span>👁️ {notification.readCount} قراءة</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {notification.status === "مرسلة" && (
                    <div className="text-center p-2 bg-muted rounded-lg">
                      <p className="text-lg font-bold text-primary">
                        {Math.round(
                          (notification.readCount / notification.recipients) *
                            100
                        )}
                        %
                      </p>
                      <p className="text-xs text-muted-foreground">
                        معدل القراءة
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <Card className="card-elevated">
          <CardContent className="p-12 text-center">
            <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">لا توجد إشعارات</h3>
            <p className="text-muted-foreground">
              لم يتم العثور على إشعارات تطابق المرشحات المحددة
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
