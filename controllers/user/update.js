import { User } from "../../models/user.js";
import { addressVaildator } from "../../services/addressVaildator.js";

export const updateAddress = async (req, res) => {
  const { email } = req.user;
  const { id } = req.params;
  const { governorate, center, landmark, primaryPhone, extraPhone, fullName } =
    req.body;

  const { error } = addressVaildator(req.body);
  if (error) {
    return res
      .status(400)
      .json({ message: error.details.map((detail) => detail.message) });
  }
  try {
    // البحث عن المستخدم باستخدام البريد الإلكتروني
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "المستخدم غير موجود." });
    }

    // العثور على العنوان باستخدام المعرّف وتحديثه
    const addressIndex = existingUser.address.findIndex(
      (address) => address._id.toString() === id
    );

    if (addressIndex === -1) {
      return res.status(404).json({ message: "العنوان غير موجود." });
    }

    // تحديث العنوان
    existingUser.address[addressIndex] = {
      ...existingUser.address[addressIndex],
      governorate,
      center,
      landmark,
      primaryPhone,
      extraPhone,
      fullName,
    };

    // حفظ التغييرات
    await existingUser.save();

    return res.json(existingUser.address);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
