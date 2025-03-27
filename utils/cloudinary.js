import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dbqujitb1",
  api_key: "779544461378864",
  api_secret: "ihXY4qCJvOjHtCR7kGIhwiV28Qc", // تأكد من أن هذه القيم سرية ولا يتم نشرها
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
