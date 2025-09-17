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
      className="max-h-screen bg-gradient-hero flex items-center justify-center "
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
                      placeholder="0000000000"
                      value={formData.phone || ''}
                      onChange={e =>
                        setFormData(prev => ({ ...prev, phone: e.target.value }))
                      }
                      className="input-modern pr-10 text-left"
                      dir="ltr"
                      required
                    />
                    
                    {/* Country Code Selector */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                        className="flex items-center px-4 py-2 bg-muted input-modern border border-border hover:bg-muted/80 transition-colors min-w-[100px] justify-center country-selector"
                      >
                        {/* <span className="text-xl font-emoji">{selectedCountry.flag}</span> */}
                        <span className="text-sm font-medium" dir="ltr">{selectedCountry.code}</span>
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
                  <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
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
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
