// src/services/adminMockData.js
// Mock datasets aligned with the Prisma schema (simplified)

export const mockDomains = [
  { id: 1, name: "تقنية المعلومات", slug: "it", isActive: true, createdAt: "2024-01-01" },
  { id: 2, name: "الهندسة", slug: "engineering", isActive: true, createdAt: "2024-01-01" },
]

export const mockSpecializations = [
  { id: 1, name: "علوم الحاسوب", slug: "cs", isActive: true, domainId: 1 },
  { id: 2, name: "أمن المعلومات", slug: "sec", isActive: true, domainId: 1 },
  { id: 3, name: "مدني", slug: "civil", isActive: true, domainId: 2 },
]

export const mockSubjects = [
  { id: 1, name: "البرمجة", slug: "programming", isActive: true, specializationId: 1 },
  { id: 2, name: "قواعد البيانات", slug: "db", isActive: true, specializationId: 1 },
  { id: 3, name: "الشبكات", slug: "networks", isActive: true, specializationId: 2 },
]

export const mockInstructors = [
  { id: 1, name: "د. أحمد محمد", bio: "أستاذ علوم الحاسوب", avatarUrl: "", isActive: true },
  { id: 2, name: "د. فاطمة أحمد", bio: "أستاذ أمن المعلومات", avatarUrl: "", isActive: true },
]

export const mockCourses = [
  {
    id: 1,
    title: "أساسيات البرمجة",
    slug: "programming-basics",
    description: "دورة شاملة لتعلم أساسيات البرمجة",
    priceUSD: 50,
    priceSYP: 800000,
    currency: "USD",
    isFree: false,
    subjectId: 1,
    isActive: true,
    instructorIds: [1],
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "أمن المعلومات للمبتدئين",
    slug: "infosec-intro",
    description: "مداخل أساسية في أمن المعلومات",
    priceUSD: 60,
    priceSYP: 960000,
    currency: "USD",
    isFree: false,
    subjectId: 3,
    isActive: true,
    instructorIds: [2],
    createdAt: "2024-02-01",
  },
]

export const mockCourseLevels = [
  { id: 1, name: "المستوى الأول", order: 1, courseId: 1, isActive: true },
  { id: 2, name: "المستوى الثاني", order: 2, courseId: 1, isActive: true },
  { id: 3, name: "Level 1", order: 1, courseId: 2, isActive: true },
]

export const mockLessons = [
  {
    id: 1,
    title: "مقدمة في البرمجة",
    description: "درس تمهيدي",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeId: "dQw4w9WgXcQ",
    durationSec: 600,
    orderIndex: 1,
    isFreePreview: true,
    isActive: true,
    courseId: 1,
    courseLevelId: 1,
  },
  {
    id: 2,
    title: "المتغيرات",
    description: "مفاهيم المتغيرات",
    youtubeUrl: "https://www.youtube.com/watch?v=example",
    youtubeId: "example",
    durationSec: 900,
    orderIndex: 2,
    isFreePreview: false,
    isActive: true,
    courseId: 1,
    courseLevelId: 1,
  },
]

export const mockUsers = [
  { id: 1, phone: "+963912345678", name: "محمد", isActive: true, role: "STUDENT", country: "SY", countryCode: "+963", createdAt: "2024-03-01" },
  { id: 2, phone: "+971501112233", name: "أحمد", isActive: true, role: "STUDENT", country: "AE", countryCode: "+971", createdAt: "2024-03-10" },
]

export const mockCoupons = [
  { id: 1, code: "WELCOME10", discount: 10, isPercent: true, isActive: true },
  { id: 2, code: "SYP5000", discount: 5000, isPercent: false, isActive: true },
]

export const mockAccessCodes = [
  { id: 1, code: "TAL100001", courseId: 1, issuedBy: 999, issuedAt: "2024-03-01", usedBy: null, usedAt: null, isActive: true },
]

export const mockTransactions = [
  { id: 1, userId: 1, courseId: 1, amount: 50.0, currency: "USD", status: "SUCCEEDED", createdAt: "2024-04-01" },
  { id: 2, userId: 2, courseId: 2, amount: 60.0, currency: "USD", status: "PENDING", createdAt: "2024-04-05" },
]

export const mockStories = [
  {
    id: 1,
    title: "دورة البرمجة الجديدة",
    content: "تعلم البرمجة من الصفر مع أفضل المدربين",
    imageUrl: "/tallaam_logo.png",
    link: "https://example.com/course/1",
    category: "دورة",
    expiryDate: "2024-04-15",
    status: "نشط",
    priority: "عادي",
    views: 150,
    createdAt: "2024-04-01"
  },
  {
    id: 2,
    title: "عرض خاص على الدورات",
    content: "خصم 30% على جميع الدورات لفترة محدودة",
    imageUrl: "/tallaam_logo2.png",
    link: "https://example.com/offer",
    category: "عرض خاص",
    expiryDate: "2024-04-10",
    status: "نشط",
    priority: "عاجل",
    views: 300,
    createdAt: "2024-04-02"
  }
]

export const mockAdvertisements = [
  { id: 1, title: "خصم 20%", imageUrl: "/tallaam_logo2.png", link: "#", isActive: true, startsAt: "2024-04-01", endsAt: "2024-04-10" },
]

export const mockSuggestions = [
  { id: 1, userId: 1, message: "أقترح إضافة تمارين أكثر", createdAt: "2024-04-02", courseId: 1, type: "COURSE" },
  { id: 2, userId: 2, message: "يرجى إضافة قسم للأسئلة الشائعة", createdAt: "2024-04-03", type: "GENERAL" },
]

export const mockVideoLinkChecks = [
  { id: 1, url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", lessonId: 1, status: "valid", checkedAt: "2024-04-06" },
]

export const mockAppSettings = [
  { id: 1, key: "usd_to_syp_rate", value: "16000" },
]
