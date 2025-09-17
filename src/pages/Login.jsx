import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, Phone, Lock, GraduationCap, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+966",
    flag: "🇸🇦",
    name: "السعودية"
  })
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    remember: false
  })
  
  const countries = [
    { code: "+966", flag: "🇸🇦", name: "السعودية" },
    { code: "+971", flag: "🇦🇪", name: "الإمارات" },
    { code: "+965", flag: "🇰🇼", name: "الكويت" },
    { code: "+973", flag: "🇧🇭", name: "البحرين" },
    { code: "+974", flag: "🇶🇦", name: "قطر" },
    { code: "+968", flag: "🇴🇲", name: "عمان" },
    { code: "+20", flag: "🇪🇬", name: "مصر" },
    { code: "+962", flag: "🇯🇴", name: "الأردن" },
    { code: "+961", flag: "🇱🇧", name: "لبنان" },
    { code: "+963", flag: "🇸🇾", name: "سوريا" },
    { code: "+964", flag: "🇮🇶", name: "العراق" },
    { code: "+213", flag: "🇩🇿", name: "الجزائر" },
    { code: "+212", flag: "🇲🇦", name: "المغرب" },
    { code: "+216", flag: "🇹🇳", name: "تونس" },
    { code: "+218", flag: "🇱🇾", name: "ليبيا" },
    { code: "+967", flag: "🇾🇪", name: "اليمن" },
    { code: "+249", flag: "🇸🇩", name: "السودان" },
    { code: "+252", flag: "🇸🇴", name: "الصومال" },
    { code: "+970", flag: "🇵🇸", name: "فلسطين" }
  ]

  const handleSubmit = e => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt:", formData)
  }

  return (
    <div
      className="min-h-screen bg-gradient-hero flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="w-full max-w-md space-y-8">
        {/* Logo & Title */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            مرحباً بك في تعلّم
          </h1>
          <p className="text-white/80">سجل دخولك للوصول إلى لوحة التحكم</p>
        </div>

        {/* Login Form */}
        <Card className="card-elevated backdrop-blur-sm bg-white/95">
          <CardHeader className="text-center pb-6">
            {/* Logo in form header */}
            <div className="flex justify-center mb-4">
              <img 
                src="/tallaam_logo.png" 
                alt="تعلّم" 
                className="w-50 h-50 object-contain"
              />
            </div>
            <CardTitle className="text-2xl text-center">تسجيل الدخول</CardTitle>
            <CardDescription className="text-center">أدخل بياناتك للوصول إلى حسابك</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-right block">رقم الهاتف</Label>
                <div className="relative">
                  <div className="phone-field-container">
                    {/* Phone Input */}
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="5xxxxxxxx"
                      value={formData.phone || ''}
                      onChange={e =>
                        setFormData(prev => ({ ...prev, phone: e.target.value }))
                      }
                      className="input-modern pl-10 text-left"
                      dir="ltr"
                      required
                    />
                    
                    {/* Country Code Selector */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        className="flex items-center  px-3 py-2 bg-muted border border-border hover:bg-muted/80 transition-colors min-w-[100px] justify-center country-selector"
                      >
                        <span className="text-xl font-emoji">{selectedCountry.flag}</span>
                        <span className="text-sm font-medium">{selectedCountry.code}</span>
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      </button>
                      
                      {/* Country Dropdown */}
                      {showCountryDropdown && (
                        <div className="absolute top-full left-0 mt-1 w-72 bg-card border border-border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                          {/* Search Box */}
                          <div className="p-2 border-b border-border">
                            <Input
                              type="text"
                              placeholder="ابحث عن دولة..."
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="text-right"
                              autoFocus
                            />
                          </div>
                          <div className="p-2">
                            {countries
                              .filter(country => 
                                country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                country.code.includes(searchTerm)
                              )
                              .map((country) => (
                                <button
                                  key={country.code}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCountry(country)
                                    setShowCountryDropdown(false)
                                    setSearchTerm("")
                                  }}
                                  className="flex items-center gap-3 w-full px-3 py-2 hover:bg-accent rounded-md transition-colors text-right"
                                >
                                  <span className="text-xl font-emoji">{country.flag}</span>
                                  <span className="text-sm font-medium">{country.code}</span>
                                  <span className="text-sm text-muted-foreground flex-1">{country.name}</span>
                                </button>
                              ))
                            }
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-right block">كلمة المرور</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="أدخل كلمة المرور"
                    value={formData.password}
                    onChange={e =>
                      setFormData(prev => ({
                        ...prev,
                        password: e.target.value
                      }))
                    }
                    className="input-modern pr-10 pl-10"
                    required
                  />
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute left-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="remember"
                    checked={formData.remember}
                    onCheckedChange={checked =>
                      setFormData(prev => ({ ...prev, remember: checked }))
                    }
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm text-muted-foreground cursor-pointer text-right"
                  >
                    تذكرني
                  </Label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-primary-hover transition-colors text-right"
                >
                  نسيت كلمة المرور؟
                </Link>
              </div>

              {/* Login Button */}
              <Button type="submit" className="btn-hero w-full">
                تسجيل الدخول
              </Button>

              {/* Divider */}
              {/* <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">أو</span>
                </div>
              </div> */}

              {/* Social Login */}
              {/* <div className="space-y-3">
                <Button variant="outline" className="w-full">
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  المتابعة بحساب Google
                </Button>

                <Button variant="outline" className="w-full">
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  المتابعة بحساب Facebook
                </Button>
              </div> */}

              {/* Sign Up Link */}
              {/* <div className="text-center">
                <span className="text-muted-foreground">ليس لديك حساب؟ </span>
                <Link
                  to="/signup"
                  className="text-primary hover:text-primary-hover font-medium transition-colors"
                >
                  إنشاء حساب جديد
                </Link>
              </div> */}
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-white/60 text-sm">
          <p>© 2025 تعلّم. جميع الحقوق محفوظة.</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/privacy" className="hover:text-white transition-colors">
              الخصوصية
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              الشروط
            </Link>
            <Link to="/help" className="hover:text-white transition-colors">
              المساعدة
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
