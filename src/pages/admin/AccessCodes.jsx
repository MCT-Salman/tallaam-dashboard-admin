// src/pages/admin/AccessCodes.jsx
import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Tag, CheckCircle2, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAppSettings } from "@/contexts/AppSettingsContext"
import {
  mockCourses,
  mockAccessCodes,
  mockCoupons,
  mockUsers,
} from "@/services/adminMockData"

export default function AccessCodes() {
  const { toast } = useToast()
  const { usdToSyp } = useAppSettings()
  const [codes, setCodes] = useState(mockAccessCodes)
  const [codeRequests, setCodeRequests] = useState([
    { id: 1, userId: 1, courseId: 1, status: "PENDING", contact: "+963912345678", createdAt: "2024-04-10" },
  ])
  const [newCode, setNewCode] = useState({ courseId: "" })
  const [bulkCount, setBulkCount] = useState(5)
  const [couponInput, setCouponInput] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("")

  const selectedCourseObj = useMemo(() => mockCourses.find(c => c.id === Number(selectedCourse)), [selectedCourse])

  const handleGenerateCode = () => {
    if (!newCode.courseId) {
      toast({ title: "خطأ", description: "اختر الدورة", variant: "destructive" })
      return
    }
    const code = `TAL${newCode.courseId}${Date.now().toString().slice(-6)}`
    const rec = { id: codes.length + 1, code, courseId: Number(newCode.courseId), issuedBy: 0, issuedAt: new Date().toISOString(), usedBy: null, usedAt: null, isActive: true }
    setCodes(prev => [rec, ...prev])
    setNewCode({ courseId: "" })
    toast({ title: "تم", description: `تم توليد الكود ${code}` })
  }

  const handleBulkGenerate = () => {
    if (!selectedCourse || bulkCount < 1) {
      toast({ title: "خطأ", description: "اختر الدورة وعدد الأكواد", variant: "destructive" })
      return
    }
    const list = Array.from({ length: bulkCount }).map((_, idx) => {
      const code = `TAL${selectedCourse}${(Date.now() + idx).toString().slice(-6)}`
      return { id: codes.length + idx + 1, code, courseId: Number(selectedCourse), issuedBy: 0, issuedAt: new Date().toISOString(), usedBy: null, usedAt: null, isActive: true }
    })
    setCodes(prev => [...list, ...prev])
    toast({ title: "تم", description: `تم توليد ${bulkCount} كود` })
  }

  const handleDeleteCode = (id) => {
    setCodes(prev => prev.filter(c => c.id !== id))
    toast({ title: "حذف", description: "تم حذف الكود" })
  }

  const applyCoupon = () => {
    if (!selectedCourseObj) {
      toast({ title: "خطأ", description: "اختر دورة أولاً", variant: "destructive" })
      return
    }
    const coupon = mockCoupons.find(c => c.code.toLowerCase() === couponInput.trim().toLowerCase() && c.isActive)
    if (!coupon) {
      toast({ title: "غير صالح", description: "الكوبون غير موجود أو معطل", variant: "destructive" })
      return
    }
    const priceUSD = selectedCourseObj.priceUSD || 0
    const priceSYP = selectedCourseObj.priceSYP || Math.round(priceUSD * usdToSyp)
    let newUSD = priceUSD
    let newSYP = priceSYP
    if (coupon.isPercent) {
      newUSD = +(priceUSD * (1 - coupon.discount / 100)).toFixed(2)
      newSYP = Math.max(0, Math.round(priceSYP * (1 - coupon.discount / 100)))
    } else {
      newSYP = Math.max(0, priceSYP - coupon.discount)
      newUSD = +(newSYP / usdToSyp).toFixed(2)
    }
    toast({ title: "تم تطبيق الكوبون", description: `السعر بعد الخصم: ${newUSD} USD / ${newSYP.toLocaleString()} SYP` })
  }

  const getCourseTitle = (id) => mockCourses.find(c => c.id === id)?.title || "-"
  const getUserName = (id) => mockUsers.find(u => u.id === id)?.name || "-"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إدارة أكواد الوصول</h1>
          <p className="text-muted-foreground mt-1">توليد وإدارة أكواد الكورسات وطلبات الأكواد</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 ml-2" /> توليد كود
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>توليد كود جديد</DialogTitle>
              <DialogDescription>اختر الدورة لتوليد كود وصول</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>الدورة</Label>
                <Select value={newCode.courseId} onValueChange={(v) => setNewCode({ courseId: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الدورة" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCourses.map(c => (
                      <SelectItem key={c.id} value={String(c.id)}>{c.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">إلغاء</Button>
                <Button onClick={handleGenerateCode}>توليد</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>الأكواد</CardTitle>
            <CardDescription>قائمة الأكواد المتاحة والمستخدمة</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الكود</TableHead>
                  <TableHead>الدورة</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>تاريخ الإصدار</TableHead>
                  <TableHead>إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {codes.map(c => (
                  <TableRow key={c.id}>
                    <TableCell className="font-mono">{c.code}</TableCell>
                    <TableCell>{getCourseTitle(c.courseId)}</TableCell>
                    <TableCell>
                      {c.usedBy ? (
                        <Badge variant="secondary"><XCircle className="w-3 h-3 ml-1" /> مستخدم</Badge>
                      ) : (
                        <Badge><CheckCircle2 className="w-3 h-3 ml-1" /> متاح</Badge>
                      )}
                    </TableCell>
                    <TableCell>{new Date(c.issuedAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteCode(c.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>توليد بالجملة</CardTitle>
            <CardDescription>توليد عدة أكواد دفعة واحدة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label>الدورة</Label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر الدورة" />
                </SelectTrigger>
                <SelectContent>
                  {mockCourses.map(c => (
                    <SelectItem key={c.id} value={String(c.id)}>{c.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>عدد الأكواد</Label>
              <Input type="number" min={1} value={bulkCount} onChange={(e) => setBulkCount(Number(e.target.value))} />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleBulkGenerate}>توليد</Button>
            </div>
            <div className="pt-2 border-t">
              <div className="text-sm text-muted-foreground mb-2">السعر الحالي:</div>
              <div className="text-sm">
                {selectedCourseObj ? (
                  <>
                    <div>USD: <strong>{selectedCourseObj.priceUSD ?? "-"}</strong></div>
                    <div>SYP: <strong>{(selectedCourseObj.priceSYP ?? Math.round((selectedCourseObj.priceUSD||0)*usdToSyp)).toLocaleString()}</strong></div>
                  </>
                ) : (
                  <span>-</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle><Tag className="inline w-5 h-5 ml-1" /> تطبيق كوبون خصم (وهمي)</CardTitle>
          <CardDescription>حساب السعر بعد الخصم وفقاً للكوبونات الوهمية</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>الدورة</Label>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger>
                <SelectValue placeholder="اختر الدورة" />
              </SelectTrigger>
              <SelectContent>
                {mockCourses.map(c => (
                  <SelectItem key={c.id} value={String(c.id)}>{c.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>الكوبون</Label>
            <Input placeholder="WELCOME10" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} />
          </div>
          <div className="flex items-end justify-end">
            <Button onClick={applyCoupon}>تطبيق</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>طلبات الأكواد</CardTitle>
          <CardDescription>طلبات الطلاب عبر واتساب/تلغرام (وهمية)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الطالب</TableHead>
                <TableHead>الدورة</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>التواصل</TableHead>
                <TableHead>تاريخ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {codeRequests.map(r => (
                <TableRow key={r.id}>
                  <TableCell>{getUserName(r.userId)}</TableCell>
                  <TableCell>{getCourseTitle(r.courseId)}</TableCell>
                  <TableCell>
                    <Badge variant={r.status === "PENDING" ? "outline" : r.status === "APPROVED" ? "default" : "secondary"}>{r.status}</Badge>
                  </TableCell>
                  <TableCell className="font-mono">{r.contact}</TableCell>
                  <TableCell>{new Date(r.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
