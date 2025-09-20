// src/pages/admin/AdminSettings.jsx
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useAppSettings } from "@/contexts/AppSettingsContext"
import { useToast } from "@/hooks/use-toast"

export default function AdminSettings() {
  const { usdToSyp, setUsdToSyp } = useAppSettings()
  const { toast } = useToast()
  const [rate, setRate] = useState(String(usdToSyp))

  const save = () => {
    const v = parseFloat(rate)
    if (!isFinite(v) || v <= 0) {
      toast({ title: "قيمة غير صالحة", description: "يرجى إدخال رقم أكبر من الصفر", variant: "destructive" })
      return
    }
    setUsdToSyp(v)
    toast({ title: "تم الحفظ", description: `تم تحديث سعر الصرف إلى ${v.toLocaleString()} SYP لكل 1 USD` })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">إعدادات الإدارة</h1>
        <p className="text-muted-foreground mt-1">تعديل إعدادات التطبيق العامة</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>سعر الصرف</CardTitle>
          <CardDescription>تحديد قيمة 1 USD بالليرة السورية SYP</CardDescription>
        </CardHeader>
        <CardContent className="max-w-md space-y-3">
          <div>
            <Label>1 USD =</Label>
            <Input type="number" min={1} value={rate} onChange={(e) => setRate(e.target.value)} />
            <div className="text-xs text-muted-foreground mt-1">SYP</div>
          </div>
          <div className="flex justify-end">
            <Button onClick={save}>حفظ</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
