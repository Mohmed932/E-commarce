import jwt from "jsonwebtoken";
export const verifyUser = (req, res, next) => {
  // جلب الـ Token من الـ Cookies
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  // التحقق من الـ Token باستخدام المفتاح السري
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // إضافة البيانات المستخرجة من الـ Token إلى الـ Request
    req.user = decoded;

    // المضي قدمًا في معالجة الطلب
    next();
  });
};
