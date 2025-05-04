export const handleFileUploadError = (err, req, res, next) => {
  if (err) {
    // إذا كانت الأخطاء تتعلق بحجم الملف أو نوعه
    if (err instanceof multer.MulterError) {
      // عرض رسالة خطأ محددة لحجم الملف
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ message: "الملف أكبر من الحد المسموح به" });
      }
    } else if (err.message === "فقط الصور بصيغ jpeg, jpg, png, gif مسموح بها") {
      return res.status(400).json({ message: err.message });
    }

    // في حال كانت هناك أخطاء أخرى
    return res
      .status(500)
      .json({ message: "حدث خطأ أثناء رفع الملف. يرجى المحاولة مرة أخرى." });
  }
  next();
};
