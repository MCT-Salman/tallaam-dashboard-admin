// بسيط: دو مستخدمين
const users = [
  { id: 1, phone: "+963900000001", name: "Admin", role: "ADMIN" },
  { id: 2, phone: "+963900000002", name: "SubAdmin", role: "SUBADMIN" }
];

export const authMock = {
  loginAs(phone) {
    const u = users.find(x => x.phone === phone);
    if (!u) return Promise.reject(new Error("User not found"));
    // إصدار token مزيف
    const token = btoa(JSON.stringify({ userId: u.id, role: u.role, exp: Date.now() + (1000*60*60) }));
    localStorage.setItem("mock_token", token);
    localStorage.setItem("mock_user", JSON.stringify(u));
    return Promise.resolve({ token, user: u });
  },
  logout() {
    localStorage.removeItem("mock_token");
    localStorage.removeItem("mock_user");
    return Promise.resolve();
  },
  currentUser() {
    const u = localStorage.getItem("mock_user");
    return u ? JSON.parse(u) : null;
  }
};
