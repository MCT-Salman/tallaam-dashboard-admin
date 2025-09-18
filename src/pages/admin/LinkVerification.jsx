// src\pages\admin\LinkVerification.jsx
import { useState } from "react"
import {
  Link as LinkIcon,
  CheckCircle,
  XCircle,
  RefreshCw,
  AlertTriangle,
  ExternalLink,
  Calendar,
  BookOpen,
  Play
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

export default function LinkVerification() {
  const { toast } = useToast()
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationProgress, setVerificationProgress] = useState(0)

  const [links, setLinks] = useState([
    {
      id: 1,
      courseTitle: "أساسيات البرمجة",
      courseId: 1,
      youtubeLink: "https://youtube.com/watch?v=example1",
      status: "يعمل",
      lastChecked: "2024-01-25",
      checkCount: 15,
      errorMessage: null,
      responseTime: 245,
      courseStatus: "نشط"
    },
    {
      id: 2,
      courseTitle: "تطوير المواقع",
      courseId: 2,
      youtubeLink: "https://youtube.com/watch?v=example2",
      status: "معطل",
      lastChecked: "2024-01-25",
      checkCount: 8,
      errorMessage: "Video unavailable",
      responseTime: 0,
      courseStatus: "نشط"
    },
    {
      id: 3,
      courseTitle: "الذكاء الاصطناعي",
      courseId: 3,
      youtubeLink: "https://youtube.com/watch?v=example3",
      status: "لم يتم التحقق",
      lastChecked: null,
      checkCount: 0,
      errorMessage: null,
      responseTime: 0,
      courseStatus: "معطل"
    }
  ])

  const verifyAllLinks = async () => {
    setIsVerifying(true)
    setVerificationProgress(0)
    
    for (let i = 0; i < links.length; i++) {
      // محاكاة فحص الرابط
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const isWorking = Math.random() > 0.3 // 70% احتمال أن يعمل الرابط
      const responseTime = Math.floor(Math.random() * 500) + 100
      
      setLinks(prevLinks => prevLinks.map(link => 
        link.id === links[i].id 
          ? {
              ...link,
              status: isWorking ? "يعمل" : "معطل",
              lastChecked: new Date().toISOString().split('T')[0],
              checkCount: link.checkCount + 1,
              errorMessage: isWorking ? null : "Video unavailable or private",
              responseTime: isWorking ? responseTime : 0
            }
          : link
      ))
      
      setVerificationProgress(((i + 1) / links.length) * 100)
    }
    
    setIsVerifying(false)
    
    const workingLinks = links.filter(link => link.status === "يعمل").length
    const brokenLinks = links.length - workingLinks
    
    toast({
      title: "تم الانتهاء من الفحص",
      description: `${workingLinks} روابط تعمل، ${brokenLinks} روابط معطلة`,
      variant: brokenLinks > 0 ? "destructive" : "default"
    })
  }

  const verifySingleLink = async (linkId) => {
    const link = links.find(l => l.id === linkId)
    
    setLinks(prevLinks => prevLinks.map(l => 
      l.id === linkId 
        ? { ...l, status: "جاري الفحص..." }
        : l
    ))
    
    // محاكاة فحص الرابط
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const isWorking = Math.random() > 0.3 // 70% احتمال أن يعمل الرابط
    const responseTime = Math.floor(Math.random() * 500) + 100
    
    setLinks(prevLinks => prevLinks.map(l => 
      l.id === linkId 
        ? {
            ...l,
            status: isWorking ? "يعمل" : "معطل",
            lastChecked: new Date().toISOString().split('T')[0],
            checkCount: l.checkCount + 1,
            errorMessage: isWorking ? null : "Video unavailable or private",
            responseTime: isWorking ? responseTime : 0
          }
        : l
    ))
    
    toast({
      title: isWorking ? "الرابط يعمل" : "الرابط معطل",
      description: isWorking 
        ? `تم التحقق من رابط ${link.courseTitle} وهو يعمل بشكل صحيح` 
        : `رابط ${link.courseTitle} معطل: ${isWorking ? "" : "Video unavailable or private"}`,
      variant: isWorking ? "default" : "destructive"
    })
  }

  const openLink = (url) => {
    window.open(url, '_blank')
  }

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "يعمل":
        return "default"
      case "معطل":
        return "destructive"
      case "لم يتم التحقق":
        return "secondary"
      case "جاري الفحص...":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "يعمل":
        return <CheckCircle className="w-4 h-4 text-success" />
      case "معطل":
        return <XCircle className="w-4 h-4 text-destructive" />
      case "لم يتم التحقق":
        return <AlertTriangle className="w-4 h-4 text-warning" />
      case "جاري الفحص...":
        return <RefreshCw className="w-4 h-4 text-primary animate-spin" />
      default:
        return <AlertTriangle className="w-4 h-4 text-muted-foreground" />
    }
  }

  const workingLinks = links.filter(link => link.status === "يعمل").length
  const brokenLinks = links.filter(link => link.status === "معطل").length
  const uncheckedLinks = links.filter(link => link.status === "لم يتم التحقق").length
  const totalLinks = links.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">التحقق من روابط YouTube</h1>
          <p className="text-muted-foreground mt-1">
            فحص ومراقبة حالة روابط الفيديوهات التعليمية
          </p>
        </div>
        <Button 
          onClick={verifyAllLinks} 
          disabled={isVerifying}
          className="btn-hero"
        >
          <RefreshCw className={`w-4 h-4 ml-2 ${isVerifying ? 'animate-spin' : ''}`} />
          {isVerifying ? 'جاري الفحص...' : 'فحص جميع الروابط'}
        </Button>
      </div>

      {/* Verification Progress */}
      {isVerifying && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">جاري فحص الروابط...</span>
                <span className="text-sm text-muted-foreground">{Math.round(verificationProgress)}%</span>
              </div>
              <Progress value={verificationProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الروابط</p>
                <p className="text-2xl font-bold">{totalLinks}</p>
                <p className="text-xs text-info">جميع الدورات</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <LinkIcon className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الروابط العاملة</p>
                <p className="text-2xl font-bold text-success">{workingLinks}</p>
                <p className="text-xs text-success">{totalLinks > 0 ? Math.round((workingLinks / totalLinks) * 100) : 0}% من الإجمالي</p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الروابط المعطلة</p>
                <p className="text-2xl font-bold text-destructive">{brokenLinks}</p>
                <p className="text-xs text-destructive">تحتاج إصلاح</p>
              </div>
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                <XCircle className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">لم يتم الفحص</p>
                <p className="text-2xl font-bold text-warning">{uncheckedLinks}</p>
                <p className="text-xs text-warning">تحتاج فحص</p>
              </div>
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Health Overview */}
      <Card>
        <CardHeader>
          <CardTitle>نظرة عامة على صحة الروابط</CardTitle>
          <CardDescription>معدل عمل الروابط عبر جميع الدورات</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">معدل عمل الروابط</span>
              <span className="text-sm font-bold">
                {totalLinks > 0 ? Math.round((workingLinks / totalLinks) * 100) : 0}%
              </span>
            </div>
            <Progress 
              value={totalLinks > 0 ? (workingLinks / totalLinks) * 100 : 0} 
              className="h-3" 
            />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-success">{workingLinks}</div>
                <div className="text-xs text-muted-foreground">تعمل</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-destructive">{brokenLinks}</div>
                <div className="text-xs text-muted-foreground">معطلة</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">{uncheckedLinks}</div>
                <div className="text-xs text-muted-foreground">لم يتم فحصها</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Links Table */}
      <Card>
        <CardHeader>
          <CardTitle>تفاصيل الروابط</CardTitle>
          <CardDescription>
            حالة جميع روابط YouTube للدورات التعليمية
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الدورة</TableHead>
                <TableHead>الرابط</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>آخر فحص</TableHead>
                <TableHead>عدد الفحوصات</TableHead>
                <TableHead>وقت الاستجابة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {links.map((link) => (
                <TableRow key={link.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{link.courseTitle}</div>
                        <Badge 
                          variant={link.courseStatus === "نشط" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {link.courseStatus}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-muted px-2 py-1 rounded font-mono max-w-xs truncate">
                        {link.youtubeLink}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openLink(link.youtubeLink)}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(link.status)}
                      <Badge variant={getStatusBadgeVariant(link.status)}>
                        {link.status}
                      </Badge>
                    </div>
                    {link.errorMessage && (
                      <div className="text-xs text-destructive mt-1">
                        {link.errorMessage}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {link.lastChecked ? (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs">{link.lastChecked}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">لم يتم الفحص</span>
                    )}
                  </TableCell>
                  <TableCell>{link.checkCount}</TableCell>
                  <TableCell>
                    {link.responseTime > 0 ? (
                      <span className="text-xs">{link.responseTime}ms</span>
                    ) : (
                      <span className="text-xs text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => verifySingleLink(link.id)}
                      disabled={link.status === "جاري الفحص..."}
                    >
                      {link.status === "جاري الفحص..." ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {brokenLinks > 0 && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">تحذير: روابط معطلة</CardTitle>
            <CardDescription>
              يوجد {brokenLinks} رابط معطل يحتاج إلى إصلاح فوري
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                يوصى بالتحقق من الروابط المعطلة وتحديثها لضمان استمرارية الخدمة للطلاب.
              </p>
              <div className="flex gap-2">
                <Button variant="destructive" size="sm">
                  عرض الروابط المعطلة
                </Button>
                <Button variant="outline" size="sm">
                  تصدير التقرير
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}