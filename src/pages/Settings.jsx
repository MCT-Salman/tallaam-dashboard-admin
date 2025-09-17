import { useState } from "react"
import {
  Settings as SettingsIcon,
  Database,
  Users,
  Bell,
  Shield,
  Palette,
  Globe,
  Download
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Settings() {
  const [systemSettings, setSystemSettings] = useState({
    platformName: "تعلّم",
    maxStudentsPerCourse: "100",
    courseDuration: "12",
    autoBackup: true,
    maintenanceMode: false,
    emailVerification: true,
    twoFactorAuth: false
  })

  const [notificationSettings, setNotificationSettings] = useState({
    newEnrollmentEmail: true,
    courseCompletionEmail: true,
    weeklyReports: true,
    systemAlerts: true,
    marketingEmails: false
  })

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "light",
    language: "ar",
    currency: "SAR",
    dateFormat: "dd/mm/yyyy",
    timezone: "Asia/Riyadh"
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إعدادات النظام</h1>
          <p className="text-muted-foreground mt-2">
            إدارة إعدادات المنصة والتفضيلات العامة
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            تصدير الإعدادات
          </Button>
          <Button className="gap-2">
            <SettingsIcon className="w-4 h-4" />
            حفظ الإعدادات
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">عام</TabsTrigger>
          <TabsTrigger value="users">المستخدمون</TabsTrigger>
          <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
          <TabsTrigger value="security">الأمان</TabsTrigger>
          <TabsTrigger value="appearance">المظهر</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                إعدادات المنصة الأساسية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    اسم المنصة
                  </label>
                  <Input
                    value={systemSettings.platformName}
                    onChange={e =>
                      setSystemSettings({
                        ...systemSettings,
                        platformName: e.target.value
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    الحد الأقصى للطلاب في الدورة
                  </label>
                  <Input
                    type="number"
                    value={systemSettings.maxStudentsPerCourse}
                    onChange={e =>
                      setSystemSettings({
                        ...systemSettings,
                        maxStudentsPerCourse: e.target.value
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    مدة الدورة الافتراضية (أسابيع)
                  </label>
                  <Input
                    type="number"
                    value={systemSettings.courseDuration}
                    onChange={e =>
                      setSystemSettings({
                        ...systemSettings,
                        courseDuration: e.target.value
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    المنطقة الزمنية
                  </label>
                  <Select
                    value={appearanceSettings.timezone}
                    onValueChange={value =>
                      setAppearanceSettings({
                        ...appearanceSettings,
                        timezone: value
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Riyadh">
                        الرياض (GMT+3)
                      </SelectItem>
                      <SelectItem value="Asia/Dubai">دبي (GMT+4)</SelectItem>
                      <SelectItem value="Africa/Cairo">
                        القاهرة (GMT+2)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">
                      النسخ الاحتياطي التلقائي
                    </span>
                    <p className="text-sm text-muted-foreground">
                      إنشاء نسخة احتياطية يومياً
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.autoBackup}
                    onCheckedChange={checked =>
                      setSystemSettings({
                        ...systemSettings,
                        autoBackup: checked
                      })
                    }
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">وضع الصيانة</span>
                    <p className="text-sm text-muted-foreground">
                      إيقاف المنصة مؤقتاً للصيانة
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={checked =>
                      setSystemSettings({
                        ...systemSettings,
                        maintenanceMode: checked
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>معلومات إضافية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  وصف المنصة
                </label>
                <Textarea
                  placeholder="اكتب وصفاً مختصراً عن المنصة التعليمية..."
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  شروط الاستخدام
                </label>
                <Textarea placeholder="أدخل شروط الاستخدام..." rows={4} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Settings */}
        <TabsContent value="users" className="space-y-6">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                إعدادات المستخدمين
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">
                      التحقق من البريد الإلكتروني
                    </span>
                    <p className="text-sm text-muted-foreground">
                      يتطلب تأكيد البريد الإلكتروني عند التسجيل
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.emailVerification}
                    onCheckedChange={checked =>
                      setSystemSettings({
                        ...systemSettings,
                        emailVerification: checked
                      })
                    }
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">المصادقة الثنائية</span>
                    <p className="text-sm text-muted-foreground">
                      تفعيل المصادقة الثنائية للمدربين
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.twoFactorAuth}
                    onCheckedChange={checked =>
                      setSystemSettings({
                        ...systemSettings,
                        twoFactorAuth: checked
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    الحد الأدنى لطول كلمة المرور
                  </label>
                  <Input type="number" defaultValue="8" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    فترة انتهاء الجلسة (دقائق)
                  </label>
                  <Input type="number" defaultValue="60" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>أدوار المستخدمين</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  role: "مدير النظام",
                  permissions: "جميع الصلاحيات",
                  users: 2
                },
                {
                  role: "مدرب",
                  permissions: "إدارة الدورات والطلاب",
                  users: 15
                },
                { role: "طالب", permissions: "الوصول للدورات", users: 1247 }
              ].map((role, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-muted/50 rounded-lg"
                >
                  <div>
                    <h4 className="font-medium">{role.role}</h4>
                    <p className="text-sm text-muted-foreground">
                      {role.permissions}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-primary">{role.users}</p>
                    <p className="text-xs text-muted-foreground">مستخدم</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                إعدادات الإشعارات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">إشعار التسجيل الجديد</span>
                    <p className="text-sm text-muted-foreground">
                      إرسال إيميل عند تسجيل طالب جديد
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.newEnrollmentEmail}
                    onCheckedChange={checked =>
                      setNotificationSettings({
                        ...notificationSettings,
                        newEnrollmentEmail: checked
                      })
                    }
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">إشعار إكمال الدورة</span>
                    <p className="text-sm text-muted-foreground">
                      إرسال إيميل عند إكمال الطالب للدورة
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.courseCompletionEmail}
                    onCheckedChange={checked =>
                      setNotificationSettings({
                        ...notificationSettings,
                        courseCompletionEmail: checked
                      })
                    }
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">التقارير الأسبوعية</span>
                    <p className="text-sm text-muted-foreground">
                      إرسال تقرير أسبوعي للمدراء
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.weeklyReports}
                    onCheckedChange={checked =>
                      setNotificationSettings({
                        ...notificationSettings,
                        weeklyReports: checked
                      })
                    }
                  />
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">تنبيهات النظام</span>
                    <p className="text-sm text-muted-foreground">
                      إشعارات الأخطاء والتحديثات
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.systemAlerts}
                    onCheckedChange={checked =>
                      setNotificationSettings({
                        ...notificationSettings,
                        systemAlerts: checked
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium">إعدادات البريد الإلكتروني</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      خادم SMTP
                    </label>
                    <Input placeholder="smtp.example.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      المنفذ
                    </label>
                    <Input placeholder="587" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                إعدادات الأمان
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    مدة انتهاء كلمة المرور (أيام)
                  </label>
                  <Input type="number" defaultValue="90" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    عدد محاولات تسجيل الدخول
                  </label>
                  <Input type="number" defaultValue="5" />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">سجل الأنشطة</h4>
                <div className="space-y-2">
                  {[
                    {
                      action: "تسجيل دخول جديد",
                      user: "أحمد محمد",
                      time: "منذ 5 دقائق",
                      status: "نجح"
                    },
                    {
                      action: "إنشاء دورة جديدة",
                      user: "فاطمة أحمد",
                      time: "منذ 15 دقيقة",
                      status: "نجح"
                    },
                    {
                      action: "محاولة تسجيل دخول فاشلة",
                      user: "مجهول",
                      time: "منذ ساعة",
                      status: "فشل"
                    }
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">
                          بواسطة: {activity.user}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{activity.time}</p>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            activity.status === "نجح"
                              ? "bg-success/10 text-success"
                              : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                إعدادات المظهر
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    المظهر
                  </label>
                  <Select
                    value={appearanceSettings.theme}
                    onValueChange={value =>
                      setAppearanceSettings({
                        ...appearanceSettings,
                        theme: value
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">فاتح</SelectItem>
                      <SelectItem value="dark">داكن</SelectItem>
                      <SelectItem value="auto">تلقائي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    اللغة الافتراضية
                  </label>
                  <Select
                    value={appearanceSettings.language}
                    onValueChange={value =>
                      setAppearanceSettings({
                        ...appearanceSettings,
                        language: value
                      })
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    العملة
                  </label>
                  <Select
                    value={appearanceSettings.currency}
                    onValueChange={value =>
                      setAppearanceSettings({
                        ...appearanceSettings,
                        currency: value
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SAR">ريال سعودي</SelectItem>
                      <SelectItem value="AED">درهم إماراتي</SelectItem>
                      <SelectItem value="USD">دولار أمريكي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    تنسيق التاريخ
                  </label>
                  <Select
                    value={appearanceSettings.dateFormat}
                    onValueChange={value =>
                      setAppearanceSettings({
                        ...appearanceSettings,
                        dateFormat: value
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd/mm/yyyy">يوم/شهر/سنة</SelectItem>
                      <SelectItem value="mm/dd/yyyy">شهر/يوم/سنة</SelectItem>
                      <SelectItem value="yyyy-mm-dd">سنة-شهر-يوم</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>التخصيص المتقدم</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  شعار المنصة
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                    <Globe className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <Button variant="outline">تغيير الشعار</Button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  اللون الأساسي
                </label>
                <div className="flex gap-2">
                  {["#0066cc", "#009900", "#cc6600", "#cc0066"].map(
                    (color, index) => (
                      <div
                        key={index}
                        className="w-10 h-10 rounded-lg cursor-pointer border-2 border-transparent hover:border-border"
                        style={{ backgroundColor: color }}
                      />
                    )
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
