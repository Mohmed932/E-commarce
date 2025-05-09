import rateLimit from "express-rate-limit";

export const apiLimiterAuth = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 15, // السماح بـ 5 طلبات فقط خلال 15 دقيقة
  message: {
    status: 429,
    message:
      "عدد الطلبات المسموح بها قد تم تجاوزه. حاول مرة أخرى بعد 15 دقيقة.",
  },
});

export const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 دقيقة
  max: 50, // السماح بـ 5 طلبات فقط خلال 15 دقيقة
  message: {
    status: 429,
    message:
      "عدد الطلبات المسموح بها قد تم تجاوزه. حاول مرة أخرى بعد 15 دقيقة.",
  },
});
