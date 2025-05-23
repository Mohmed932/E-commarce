import multer from "multer";
import path from "path";
import fs from "fs";

// ✅ تأكد من وجود مجلد images
if (!fs.existsSync("images")) {
  fs.mkdirSync("images");
}

// ✅ تنسيقات الصور المسموح بها
const allowedExtensions = [".jpeg", ".jpg", ".png", ".gif", ".webp", ".avif"];
const allowedMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/avif",
];

// ✅ إعداد التخزين
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


const fileFilterImages = (req, files, cb) => {
  // إذا كانت الملفات متعددة
  if (Array.isArray(files)) {
    // تحقق من كل ملف على حدة
    for (let file of files) {
      const ext = path.extname(file.originalname).toLowerCase();
      const mime = file.mimetype.toLowerCase();

      // تحقق من امتداد MIME type
      if (!allowedExtensions.includes(ext) || !allowedMimeTypes.includes(mime)) {
        req.fileValidationError = "فقط الصور بصيغ jpeg, jpg, png, gif, webp, avif مسموح بها";
        return cb(new Error(req.fileValidationError), false); // إذا كان أحد الملفات غير صحيح
      }
    }
    // جميع الملفات صالحة
    return cb(null, true);
  } else {
    // في حال كان `files` ليس مصفوفة، تعامل مع الخطأ
    req.fileValidationError = "يجب رفع ملفات متعددة";
    return cb(new Error(req.fileValidationError), false);
  }
}

// ✅ التحقق من نوع الملف وصيغته
const fileFilter = (req, files, cb) => {

  // إذا كان الملف واحدًا (للرفع باستخدام single())
  const file = files;  // تعديل هنا ليكون file بدلاً من files
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype.toLowerCase();

  if (allowedExtensions.includes(ext) && allowedMimeTypes.includes(mime)) {
    return cb(null, true);
  } else {
    req.fileValidationError = "فقط الصور بصيغ jpeg, jpg, png, gif, webp, avif مسموح بها";
    return cb(new Error(req.fileValidationError), false);
  }
};

// ✅ رفع صورة واحدة باسم "avatar"
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1 ميجابايت
}).single("avatar");

// ✅ رفع صورة واحدة باسم "image"
export const uploadImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1 ميجابايت
}).single("image");

// ✅ رفع عدة صور باسم "images"
export const uploadImagesMiddleware = multer({
  storage,
  fileFilterImages,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 ميجابايت
}).array("images", 20);
