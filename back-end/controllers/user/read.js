import { User } from "../../models/user.js";

export const readProfile = async (req, res) => {
  const { email } = req.user;
  try {
    // البحث عن المستخدم باستخدام البريد الإلكتروني
    const existingUser = await User.findOne({ email }).select("-password ");

    if (!existingUser) {
      return res.status(404).json({ message: "المستخدم غير موجود." });
    }
    return res.json({ user: existingUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const checkUser = async (req, res) => {
  const { email } = req.user;
  try {
    // البحث عن المستخدم باستخدام البريد الإلكتروني
    const existingUser = await User.findOne({ email }).select("-password ");

    if (!existingUser) {
      return res.status(404).json({ message: "المستخدم غير موجود." });
    }
    return res.json({ user: existingUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
