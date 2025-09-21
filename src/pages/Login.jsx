import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
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
import heroImg from "/tallaam_logo.png"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+963",
    flag: "🇸🇾",
    name: "سوريا"
  })
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    phone: "",
    password: ""
  })

  const countries = [
    { code: "+963", flag: "🇸🇾", name: "سوريا" },
    { code: "+966", flag: "🇸🇦", name: "السعودية" },
    { code: "+971", flag: "🇦🇪", name: "الإمارات" },
    { code: "+965", flag: "🇰🇼", name: "الكويت" },
    { code: "+973", flag: "🇧🇭", name: "البحرين" },
    { code: "+974", flag: "🇶🇦", name: "قطر" },
    { code: "+968", flag: "🇴🇲", name: "عمان" },
    { code: "+20", flag: "🇪🇬", name: "مصر" },
    { code: "+962", flag: "🇯🇴", name: "الأردن" },
    { code: "+961", flag: "🇱🇧", name: "لبنان" },
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
      navigate('/dashboard')
    console.log("Login attempt:", formData)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary/20 via-background to-secondary/20" dir="rtl">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />

      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
       

        {/* Right form panel */}
        <div className="flex items-center justify-center p-6 md:p-10">
          <Card className="w-full max-w-md bg-card/80 backdrop-blur-xl border-border/60 shadow-xl">
            <CardHeader className="text-center space-y-2">
              <div className="flex justify-center">
                <img src="/tallaam_logo2.png" alt="تعلّم" className="h-16 object-contain" />
              </div>
              <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
              <CardDescription>أدخل بياناتك للوصول إلى حسابك</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Phone Field */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-right block">رقم الهاتف</Label>
                  <div className="relative">
                    <div className="flex gap-2">
                      {/* Phone Input */}
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="0000000000"
                        value={formData.phone || ''}
                        onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="pr-10 text-left"
                        dir="ltr"
                        required
                      />
                      {/* Country Code Selector */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                          className="flex items-center gap-2 px-3 py-2 h-10 rounded-md bg-secondary text-white border border-border hover:bg-secondary/80 transition-colors min-w-[90px] justify-center"
                        >
                          <span className="text-sm font-medium" dir="ltr">{selectedCountry.code}</span>
                          <ChevronDown className="w-4 h-4 text-white" />
                        </button>
                        {showCountryDropdown && (
                          <div className="absolute top-full left-0 mt-1 w-72 bg-card border border-border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
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
                                ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
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
                      onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      className="pr-10 pl-10"
                      required
                    />
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute left-1 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {/* Forgot */}
                <div className="flex items-center justify-between gap-4">
                  <Link to="/forgot-password" className="text-sm text-primary hover:text-primary-hover transition-colors">
                    نسيت كلمة المرور؟
                  </Link>
                </div>

                {/* Login Button */}
                <Button type="submit" className="w-full cursor-pointer">تسجيل الدخول</Button>
              </form>
            </CardContent>
          </Card>
        </div>

         {/* Left hero panel */}
        <div className="relative bg-primary hidden md:block">
          <div
            className="absolute inset-0 bg-center bg-no-repeat -top-90"
            style={{ backgroundImage: `url(${heroImg})`}}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000]/70 to-background/20" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-12">
            {/* <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl mb-6 border border-white/20">
              <GraduationCap className="w-10 h-10 text-white" />
            </div> */}
            <h1 className="text-3xl font-bold text-white mb-3">مرحباً بك في منصة تعلّم</h1>
            <p className="text-white/80 max-w-md">سجل دخولك للوصول إلى لوحة التحكم وإدارة المنصة بسهولة.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
