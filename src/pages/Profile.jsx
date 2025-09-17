import { useState } from "react"
import {
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Shield,
  Bell,
  Palette
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

export default function Profile() {
  const [profileData, setProfileData] = useState({
    name: "أحمد محمد العلي",
    email: "ahmed@example.com",
    phone: "+966 12 345 6789",
    location: "الرياض، المملكة العربية السعودية",
    bio:
      "مدرب معتمد في مجال البرمجة والتطوير التقني مع خبرة تزيد عن 8 سنوات في تدريس وتطوير التطبيقات.",
    avatar: "/placeholder.svg",
    role: "مدرب",
    joinDate: "2023/01/15"
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    darkMode: false,
    language: "ar"
  })

  const handleProfileUpdate = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  const handlePreferenceUpdate = (field, value) => {
    setPreferences(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">الملف الشخصي</h1>
          <p className="text-muted-foreground mt-2">
            إدارة معلوماتك الشخصية وإعدادات الحساب
          </p>
        </div>
        <Button className="gap-2">
          <Save className="w-4 h-4" />
          حفظ التغييرات
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>المعلومات الأساسية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage
                      src={profileData.avatar}
                      alt={profileData.name}
                    />
                    <AvatarFallback className="text-2xl">
                      {profileData.name
                        .split(" ")
                        .map(n => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{profileData.name}</h3>
                  <p className="text-muted-foreground">{profileData.role}</p>
                  <p className="text-sm text-muted-foreground">
                    عضو منذ {profileData.joinDate}
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    الاسم الكامل
                  </label>
                  <Input
                    value={profileData.name}
                    onChange={e => handleProfileUpdate("name", e.target.value)}
                    className="gap-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    البريد الإلكتروني
                  </label>
                  <Input
                    type="email"
                    value={profileData.email}
                    onChange={e => handleProfileUpdate("email", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    رقم الهاتف
                  </label>
                  <Input
                    value={profileData.phone}
                    onChange={e => handleProfileUpdate("phone", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    الموقع
                  </label>
                  <Input
                    value={profileData.location}
                    onChange={e =>
                      handleProfileUpdate("location", e.target.value)
                    }
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  نبذة شخصية
                </label>
                <Textarea
                  value={profileData.bio}
                  onChange={e => handleProfileUpdate("bio", e.target.value)}
                  rows={4}
                  placeholder="اكتب نبذة مختصرة عنك..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                الأمان والخصوصية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    كلمة المرور الحالية
                  </label>
                  <Input type="password" placeholder="كلمة المرور الحالية" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    كلمة المرور الجديدة
                  </label>
                  <Input type="password" placeholder="كلمة المرور الجديدة" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  تأكيد كلمة المرور
                </label>
                <Input
                  type="password"
                  placeholder="تأكيد كلمة المرور الجديدة"
                />
              </div>
              <Button variant="outline">تحديث كلمة المرور</Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>إحصائيات سريعة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <p className="text-2xl font-bold text-primary">15</p>
                <p className="text-sm text-muted-foreground">دورة تدريبية</p>
              </div>
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <p className="text-2xl font-bold text-success">1,247</p>
                <p className="text-sm text-muted-foreground">طالب</p>
              </div>
              <div className="text-center p-4 bg-warning/10 rounded-lg">
                <p className="text-2xl font-bold text-warning">4.8</p>
                <p className="text-sm text-muted-foreground">تقييم</p>
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                إعدادات الإشعارات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">إشعارات البريد الإلكتروني</span>
                <Switch
                  checked={preferences.emailNotifications}
                  onCheckedChange={checked =>
                    handlePreferenceUpdate("emailNotifications", checked)
                  }
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">إشعارات push</span>
                <Switch
                  checked={preferences.pushNotifications}
                  onCheckedChange={checked =>
                    handlePreferenceUpdate("pushNotifications", checked)
                  }
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">رسائل SMS</span>
                <Switch
                  checked={preferences.smsNotifications}
                  onCheckedChange={checked =>
                    handlePreferenceUpdate("smsNotifications", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                إعدادات المظهر
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">الوضع الليلي</span>
                <Switch
                  checked={preferences.darkMode}
                  onCheckedChange={checked =>
                    handlePreferenceUpdate("darkMode", checked)
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">اللغة</label>
                <Select
                  value={preferences.language}
                  onValueChange={value =>
                    handlePreferenceUpdate("language", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>معلومات الاتصال</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{profileData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{profileData.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>{profileData.location}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
