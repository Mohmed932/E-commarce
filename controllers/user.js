import { User } from "../models/user.js";
import { VerifyAny } from "../models/verify.js";
import { loginVaildator, signUpVaildator } from "../services/uservalidator.js";
import { comparePassword } from "../utils/comparePassword.js";
import { hashPassword } from "../utils/hasePassword.js";
import { createToken } from "../utils/token.js";
import { randomToken } from "../utils/randomToken.js";
import mongoose from "mongoose";
import { SendEmail } from "../utils/emailActive.js";
import { deleteImage, uploadAvatat } from "../utils/cloudinary.js";
import fs from "fs/promises";

export const createAccount = async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    // التحقق من صحة البيانات المدخلة
    const { error } = signUpVaildator.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        status: "error",
        message: errorMessages,
      });
    }

    // التحقق من وجود مستخدم بنفس البريد الإلكتروني أو اسم المستخدم
    const existingUser = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "البريد الإلكتروني مستخدم بالفعل" });
    }

    if (existingUsername) {
      return res.status(400).json({ message: "اسم المستخدم مستخدم بالفعل" });
    }

    // تجزئة كلمة المرور
    const passwordHashed = await hashPassword(password);

    // إنشاء المستخدم الجديد
    const newUser = new User({
      name,
      username,
      email,
      password: passwordHashed,
    });

    await newUser.save();

    // إنشاء رمز التحقق من الحساب
    const token = await randomToken(32);
    const activeUser = new VerifyAny({
      user_id: newUser._id,
      user_token: token,
    });

    await activeUser.save();

    // إنشاء رابط التفعيل
    const activeLink = `${process.env.DOMAIN}:${process.env.PORT}/account_id/${newUser._id}/active_account/${token}`;

    // إرسال رابط التفعيل إلى البريد الإلكتروني
    await SendEmail(email, activeLink);

    return res.status(201).json({
      message: "تم إرسال رابط تفعيل الحساب إلى بريدك الإلكتروني",
    });
  } catch (error) {
    console.error("Error during account creation:", error.message);
    return res.status(500).json({ message: "حدث خطأ أثناء إنشاء الحساب" });
  }
};

export const loginAccount = async (req, res) => {
  const { email, password } = req.body;

  try {
    // التحقق من صحة البيانات المدخلة
    const { error } = loginVaildator.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        status: "error",
        message: errorMessages,
      });
    }

    // التحقق من وجود المستخدم بالبريد الإلكتروني
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "لم يتم إنشاء حساب بهذا البريد الإلكتروني بعد",
      });
    }

    // التحقق من أن الحساب مفعل
    if (!user.isActive) {
      // إنشاء رمز التحقق من الحساب
      const token = await randomToken(32);
      const activeUser = new VerifyAny({
        user_id: user._id, // تم تصحيح newUser إلى user
        user_token: token,
      });

      await activeUser.save();

      // إنشاء رابط التفعيل
      const activeLink = `${process.env.DOMAIN}:${process.env.PORT}/account_id/${user._id}/active_account/${token}`;
      // إرسال رابط التفعيل إلى البريد الإلكتروني
      await SendEmail(email, activeLink);

      return res.json({
        message: "تم إرسال رابط تفعيل الحساب إلى بريدك الإلكتروني",
      });
    }

    // مقارنة كلمة المرور المدخلة مع كلمة المرور المخزنة
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "كلمة المرور غير صحيحة" });
    }

    // إنشاء التوكن للمستخدم
    const token = await createToken(user);

    // إرسال التوكن في الكوكيز
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 10 * 24 * 60 * 60 * 1000, // 10 أيام
        httpOnly: true, // منع الوصول إلى الكوكيز من JavaScript
      })
      .json({ message: "تم تسجيل الدخول بنجاح", token });
  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({ message: "حدث خطأ أثناء تسجيل الدخول" });
  }
};

export const activeAccount = async (req, res) => {
  const { token, id } = req.params; // لا تحتاج إلى await هنا

  try {
    // التحقق من وجود البيانات المطلوبة
    if (!token || !id) {
      return res.status(400).json({ message: "الطلب غير صالح" });
    }

    // التحقق من صحة معرف المستخدم
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "معرف المستخدم غير صالح" });
    }

    // البحث عن سجل التحقق
    const verificationRecord = await VerifyAny.findOne({
      user_id: id,
      user_token: token,
    });

    if (!verificationRecord) {
      return res
        .status(400)
        .json({ message: "رمز التحقق منتهي الصلاحية أو غير صالح" });
    }

    // تحديث حالة الحساب إلى نشط
    const updatedUser = await User.findByIdAndUpdate(
      verificationRecord.user_id,
      { isActive: true },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }

    // حذف سجل التحقق بعد التنشيط
    await VerifyAny.deleteOne({ user_id: id, user_token: token });

    return res.json({ message: "تم تفعيل حسابك بنجاح" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "حدث خطأ داخلي في الخادم", error: error.message });
  }
};
export const sendEmailForgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }
    const token = await randomToken(32);
    const resetPassword = new VerifyAny({
      user_id: existingUser._id,
      user_token: token,
    });

    await resetPassword.save();

    // إنشاء رابط التفعيل
    const activeLink = `${process.env.DOMAIN}:${process.env.PORT}/resetPassword/account_id/${existingUser._id}/token/${token}`;

    // إرسال رابط التفعيل إلى البريد الإلكتروني
    await SendEmail(email, activeLink);

    return res.json({
      message: "تم إرسال رابط الي البريد الالكتروني لاعاده تفعيل كلمه المرور",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "حدث خطأ داخلي في الخادم", error: error.message });
  }
};

export const checkLinkForgetPassword = async (req, res) => {
  const { token, id } = req.params;
  try {
    // التحقق من وجود البيانات المطلوبة
    if (!token || !id) {
      return res.status(400).json({ message: "الطلب غير صالح" });
    }

    // التحقق من صحة معرف المستخدم
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "معرف المستخدم غير صالح" });
    }
    // البحث عن سجل التحقق
    const verificationRecord = await VerifyAny.findOne({
      user_id: id,
      user_token: token,
    });

    if (!verificationRecord) {
      return res
        .status(400)
        .json({ message: "رمز التحقق منتهي الصلاحية أو غير صالح" });
    }
    return res.json({ message: "يمكنك الان اعاده تععين كلمه المرور" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "حدث خطأ داخلي في الخادم", error: error.message });
  }
};
export const resetPassword = async (req, res) => {
  const { password, conformPassword, user_id, token } = req.body;
  try {
    if (!password || !conformPassword || !user_id || !token) {
      return res.status(400).json({ message: "الطلب غير صالح" });
    }

    // التحقق من صحة معرف المستخدم
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ message: "معرف المستخدم غير صالح" });
    }
    const check = await VerifyAny.findOne({ user_id, user_token: token });
    if (!check) {
      return res
        .status(400)
        .json({ message: "رمز التحقق منتهي الصلاحيه أو غير صالح" });
    }
    if (password !== conformPassword) {
      return res.status(400).json({ message: "كلمة المرور غير متطابقة" });
    }
    const newPassword = await hashPassword(password);
    await User.findByIdAndUpdate(
      user_id,
      {
        password: newPassword,
      },
      { new: true }
    );
    return res.json({ message: "تم تحديث كلمه المرور" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "حدث خطأ داخلي في الخادم", error: error.message });
  }
};

export const createAvatar = async (req, res) => {
  const { email } = req.user;

  // التحقق من وجود الملف في الطلب أو وجود خطأ في الملف
  if (!req.file) {
    return res
      .status(400)
      .json({ message: "يرجى تحميل صورة شخصية أو هناك خطأ في الملف." });
  }
  try {
    // محاولة إيجاد المستخدم وتحديث الصورة
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "المستخدم غير موجود." });
    }

    // التحقق من وجود الصورة القديمة وحذفها
    if (existingUser.avatar && existingUser.avatar.idOfImage) {
      await deleteImage(existingUser.avatar.idOfImage);
    }

    // رفع الصورة الجديدة
    const { public_id, secure_url } = await uploadAvatat(req.file.path);
    existingUser.avatar = {
      img: secure_url,
      idOfImage: public_id,
    };
    await existingUser.save();
    await fs.unlink(req.file.path);
    return res.json({
      message: "تم تحديث الصورة الشخصية بنجاح.",
      avatar: existingUser.avatar,
    });
  } catch (error) {
    return res.status(500).json({
      message: "حدث خطأ داخلي في الخادم. الرجاء المحاولة لاحقًا.",
      error: error.message,
    });
  }
};
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
