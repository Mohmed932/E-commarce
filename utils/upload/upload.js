import multer from "multer";
import path from "path";

// تحديد تنسيقات الصور المسموح بها
const fileTypes = /jpeg|jpg|png|gif|webp|avif/;

// إعداد التخزين
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const timeStamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 1000);
    const extname = path.extname(file.originalname);
    const name = path.basename(file.originalname, extname);
    cb(null, `${name}-${timeStamp}-${randomSuffix}${extname}`);
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
  limits: { fileSize: 1 * 1024 * 1024 }, // الحد الأقصى للحجم 1 ميجابايت
}).single("avatar");

// تحديد أقصى حجم للملف
export const uploadImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 }, // الحد الأقصى للحجم 1 ميجابايت
}).single("image");

export const uploadMultipleImages = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
}).array("images", 20);
