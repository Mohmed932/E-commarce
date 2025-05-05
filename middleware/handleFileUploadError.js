import multer from "multer";

export const handleFileUploadError = (err, req, res, next) => {
  if (err) {
    // 1. أخطاء multer
    if (err instanceof multer.MulterError) {
      switch (err.code) {
        case "LIMIT_FILE_SIZE":
          return res
            .status(400)
            .json({ message: "الملف أكبر من الحجم المسموح به (مثلاً 2MB)" });

        case "LIMIT_FILE_COUNT":
          return res
            .status(400)
            .json({ message: "عدد الملفات المرفوعة أكثر من الحد المسموح به" });

        case "LIMIT_UNEXPECTED_FILE":
          return res
            .status(400)
            .json({ message: "تم رفع ملف غير متوقع. تحقق من أسماء الحقول" });

        default:
          return res
            .status(400)
            .json({ message: `خطأ في الرفع: ${err.message}` });
      }
    }

    // 2. خطأ مخصص من عندك (مثل نوع الملف)
    if (err.message === "فقط الصور بصيغ jpeg, jpg, png, gif مسموح بها") {
      return res.status(400).json({ message: err.message });
    }

    // 3. خطأ عام
    return res.status(500).json({
      message: "حدث خطأ أثناء رفع الملف. يرجى المحاولة لاحقاً.",
      error: err.message, // اختياري لعرض تفاصيل الخطأ في التطوير
    });
  }

  next();
};
