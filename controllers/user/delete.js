import { User } from "../../models/user.js";
import { deleteImage } from "../../utils/cloudinary.js";

export const deleteAvatar = async (req, res) => {
  const { email } = req.user;

  try {
    // البحث عن المستخدم باستخدام البريد الإلكتروني
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "المستخدم غير موجود." });
    }

    // التحقق من وجود الصورة القديمة وحذفها
    if (existingUser.avatar && existingUser.avatar.idOfImage) {
      // استدعاء دالة حذف الصورة
      await deleteImage(existingUser.avatar.idOfImage);
      existingUser.avatar = {
        img: "https://th.bing.com/th/id/OIP.Zvs5IHgOO5kip7A32UwZJgHaHa?rs=1&pid=ImgDetMain",
        idOfImage: null,
      };
      await existingUser.save();
      return res.status(200).json({ message: "تم حذف الصورة بنجاح." });
    } else {
      return res.status(404).json({ message: "لا يوجد صورة لحذفها." });
    }
  } catch (error) {
    return res.status(500).json({ message: "حدث خطأ غير متوقع." });
  }
};

export const remevoAddress = async (req, res) => {
  const { email } = req.user;
  const { id } = req.params;

  try {
    // البحث عن المستخدم باستخدام البريد الإلكتروني
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "المستخدم غير موجود." });
    }
    existingUser.adress.pull({ _id: id });
    await existingUser.save();
    return res.json(existingUser);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
