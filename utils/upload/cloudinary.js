import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
config(); // Load environment variables from .env file
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET, // تأكد من أن هذه القيم سرية ولا يتم نشرها
});

export const uploadAvatat = async (url) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(url); // إزالة public_id

    // Optimize delivery by resizing and applying auto-format and auto-quality
    cloudinary.url(uploadResult.public_id, {
      fetch_format: "auto",
      quality: "auto",
    });

    // Transform the image: auto-crop to square aspect_ratio
    cloudinary.url(uploadResult.public_id, {
      crop: "auto",
      gravity: "auto",
      width: 500,
      height: 500,
    });
    return uploadResult;
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

export const uploadMultipleImages = async (files) => {
  try {
    const timeStamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 1000);
    // رفع كل صورة باستخدام Promise.all
    const uploadPromises = files.map((file) =>
      cloudinary.uploader.upload(file.path, {
        public_id: `products/${timeStamp}_${randomSuffix}_${file.original_filename}`,
        use_filename: true,
        unique_filename: false,
      })
    );

    // انتظر رفع جميع الصور
    const uploadResults = await Promise.all(uploadPromises);

    // console.log("تم رفع الصور بنجاح:", uploadResults);
    return uploadResults;
  } catch (error) {
    console.error("حدث خطأ أثناء رفع الصور:", error);
  }
};

export const deleteImage = async (publicId) => {
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          reject("حدث خطأ أثناء حذف الصورة: " + error);
        } else {
          resolve(result);
        }
      });
    });

    if (result.result === "ok") {
      console.log("تم حذف الصورة بنجاح.");
    } else {
      console.log("لم تتمكن Cloudinary من حذف الصورة: ", result);
    }
    return result;
  } catch (error) {
    console.error("حدث خطأ في عملية الحذف:", error);
    throw error; // إرسال الخطأ مرة أخرى لتتم معالجته في الكود الرئيسي
  }
};

export const deleteImages = async (publicIds) => {
  try {
    const results = await Promise.all(
      publicIds.map((publicId) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) {
              reject(`خطأ في حذف الصورة (${publicId}): ${error}`);
            } else {
              resolve({ publicId, result });
            }
          });
        });
      })
    );

    results.forEach(({ publicId, result }) => {
      if (result.result === "ok") {
        console.log(`✅ تم حذف الصورة (${publicId}) بنجاح.`);
      } else {
        console.warn(`⚠️ لم يتم حذف الصورة (${publicId}):`, result);
      }
    });

    return results;
  } catch (error) {
    console.error("❌ حدث خطأ أثناء حذف الصور:", error);
    throw error;
  }
};
