// بيانات أولية
let courses = [
  {
    id: 1,
    title: "كورس تطوير الويب",
    category: "هندسة معلوماتية",
    subject: "برمجة",
    doctor: "د. محمد",
    price: 50,
    youtubeLink: "https://youtube.com/...",
  },
  {
    id: 2,
    title: "أساسيات طب الأسنان",
    category: "طب",
    subject: "أسنان",
    doctor: "د. أحمد",
    price: 70,
    youtubeLink: "https://youtube.com/...",
  },
];

let codes = [];

export const mockApi = {
  getCourses: () => Promise.resolve([...courses]),

  addCourse: (course) => {
    const newCourse = { id: Date.now(), ...course };
    courses.push(newCourse);
    return Promise.resolve(newCourse);
  },

  updateCourse: (id, data) => {
    courses = courses.map(c => c.id === id ? { ...c, ...data } : c);
    return Promise.resolve(courses.find(c => c.id === id));
  },

  deleteCourse: (id) => {
    courses = courses.filter(c => c.id !== id);
    return Promise.resolve(true);
  },

  generateCodes: (courseId, count = 5) => {
    const newCodes = Array.from({ length: count }, () => ({
      id: Date.now() + Math.random(),
      courseId,
      code: Math.random().toString(36).substring(2, 10).toUpperCase(),
    }));
    codes.push(...newCodes);
    return Promise.resolve(newCodes);
  },

  getCodesByCourse: (courseId) => {
    return Promise.resolve(codes.filter(c => c.courseId === courseId));
  },
};
