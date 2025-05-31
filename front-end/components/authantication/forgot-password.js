"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { sendEmailForgetPassword } from "@/redux/slices/auth/resetPassword";

import { toast, Toaster } from "sonner"; // <-- استيراد sonner

// ✅ مخطط zod للتحقق
const formSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
});

export default function ForgotPasswordComponent() {
  const {
    sendEmailLoading,
    sendEmailError,
    sendEmailSuccess,
  } = useSelector((state) => state.resetPassword);
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { reset } = form;

  const onSubmit = (values) => {
    dispatch(sendEmailForgetPassword(values.email));
  };

  // لإظهار التنبيهات باستخدام toast من sonner
  useEffect(() => {
    if (sendEmailLoading) {
      toast.dismiss(); // إغلاق كل التنبيهات السابقة
      toast.loading("جارٍ إرسال الرابط، يرجى الانتظار...");
    } else {
      toast.dismiss(); // إزالة التنبيه عند انتهاء التحميل
    }
  }, [sendEmailLoading]);

  useEffect(() => {
    if (sendEmailError) {
      toast.dismiss();
      toast.error(`حدث خطأ: ${sendEmailError}`);
    }
  }, [sendEmailError]);

  useEffect(() => {
    if (sendEmailSuccess) {
      toast.dismiss();
      toast.success("تم إرسال رابط استعادة كلمة المرور بنجاح. تحقق من بريدك الإلكتروني.");
      reset();
    }
  }, [sendEmailSuccess, reset]);

  return (
    <div
      className="w-full min-h-screen bg-[#f3f4f6] flex justify-center items-center p-4"
    >
      {/* Toaster يجب أن يكون في مكان ظاهر في الصفحة */}
      <Toaster position="top-center" richColors />

      <div className="w-full max-w-lg bg-white backdrop-blur-md rounded-3xl shadow-2xl p-10" dir="rtl">
        <h1 className="text-4xl font-bold text-[#03071e] mb-8 text-center">استعادة كلمة المرور</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#370617]">البريد الإلكتروني</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="أدخل بريدك الإلكتروني" className="text-right border-[#e85d04] focus:ring-[#dc2f02]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="cursor-pointer w-full bg-[#e85d04] hover:bg-[#dc2f02] text-white text-lg py-4 rounded-xl hover:shadow-lg hover:shadow-white"
              disabled={sendEmailLoading}
            >
              {sendEmailLoading ? "جاري الإرسال..." : "إرسال رابط استعادة"}
            </Button>
          </form>
        </Form>

        <p className="mt-6 text-xs text-[#6a040f] text-center leading-relaxed">
          تذكر كلمة المرور؟{" "}
          <Link href="/auth/login" className="text-[#d00000] hover:text-[#9d0208] hover:underline">تسجيل الدخول</Link>
        </p>
      </div>
    </div>
  );
}
