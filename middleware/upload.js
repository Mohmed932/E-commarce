import multer from "multer";
import path from "path";

// تحديد تنسيقات الصور المسموح بها
const fileTypes = /jpeg|jpg|png|gif|avif/;

// إعداد التخزين
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const timeStamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 1000);
    const extname = path.extname(file.originalname);
    cb(null, `${timeStamp}-${randomSuffix}${extname}`);
  },
});

// التحقق من نوع الملف وحجمه
const fileFilter = (req, file, cb) => {
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    req.fileValidationError =
      "فقط الصور بصيغ jpeg, jpg, png, gif, avif مسموح بها";
    return cb(
      new Error("فقط الصور بصيغ jpeg, jpg, png, gif, avif مسموح بها"),
      false
    );
  }
};



// تحديد أقصى حجم للملف
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // الحد الأقصى للحجم 5 ميجابايت
}).single("avatar");

export const uploadMultipleImages = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 },
}).array('images', 10); 

// معالجة الأخطاء في التطبيق
export const handleFileUploadError = (err, req, res, next) => {
  if (err) {
    // إذا كانت الأخطاء تتعلق بحجم الملف أو نوعه
    if (err instanceof multer.MulterError) {
      // عرض رسالة خطأ محددة لحجم الملف
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ message: "الملف أكبر من الحد المسموح به (5 ميجابايت)" });
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
