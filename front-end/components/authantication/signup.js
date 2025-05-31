"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { handleregister } from "@/redux/slices/auth/register";

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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertTriangle } from "lucide-react";
import { toast, Toaster } from "sonner"; // ✅ صححنا الاستيراد

const formSchema = z.object({
  name: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
  username: z.string().min(3, "اسم المستخدم يجب أن يكون 3 أحرف على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

export default function SignUpComponents() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { newUser, loading, error } = useSelector((state) => state.register);
  const { profile, loading: profileLoading, error: profileError } = useSelector(
    (state) => state.profile
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    dispatch(handleregister(values));
  };


  useEffect(() => {
    if (newUser || profile) {
      toast.success("تم إرسال رابط تفعيل الحساب إلى بريدك الإلكتروني");
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    }
  }, [newUser, profile, router]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "حدث خطأ غير متوقع");
    }
  }, [error]);

  return (
    <div className="w-full min-h-screen bg-[#f3f4f6] flex justify-center items-center p-4">
      {/* إضافة مكون Toaster هنا لكي تظهر التنبيهات */}
      <Toaster />

      <div
        className="w-full max-w-lg bg-white backdrop-blur-md rounded-3xl shadow-2xl p-10"
        dir="rtl"
      >
        <h1 className="text-4xl font-bold text-[#03071e] mb-4 text-center">
          إنشاء حساب
        </h1>

        {/* تحميل البروفايل */}
        {profileLoading && (
          <Alert className="mb-6 flex items-center gap-4 border-[#e85d04]/50">
            <Loader2 className="w-5 h-5 animate-spin text-[#e85d04]" />
            <AlertDescription className="text-[#e85d04]">
              جاري تحميل بيانات الحساب...
            </AlertDescription>
          </Alert>
        )}

        {/* خطأ في تحميل البروفايل */}
        {profileError && (
        <Alert variant="destructive" className="mb-6 flex items-start gap-4">
          <AlertTriangle className="h-5 w-5 mt-1 text-red-600" />
          <div>
            <AlertTitle>خطأ</AlertTitle>
            <AlertDescription>
              {profileError.message || "تعذر تحميل بيانات الحساب"}
            </AlertDescription>
          </div>
        </Alert>

        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#370617]">الاسم الكامل</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="الاسم الكامل"
                      className="text-right border-[#e85d04] focus:ring-[#dc2f02]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#370617]">اسم المستخدم</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="اسم المستخدم"
                      className="text-right border-[#e85d04] focus:ring-[#dc2f02]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#370617]">البريد الإلكتروني</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="البريد الإلكتروني"
                      className="text-right border-[#e85d04] focus:ring-[#dc2f02]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#370617]">كلمة المرور</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="كلمة المرور"
                      className="text-right border-[#e85d04] focus:ring-[#dc2f02]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={loading}
              className="cursor-pointer w-full bg-[#e85d04] hover:bg-[#dc2f02] text-white text-lg py-4 rounded-xl hover:shadow-lg hover:shadow-white"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> جاري إنشاء الحساب...
                </span>
              ) : (
                "إنشاء حساب"
              )}
            </Button>
          </form>
        </Form>

        <p className="mt-6 text-xs text-[#6a040f] text-center leading-relaxed">
          بالموافقة، أنت تقر بـ{" "}
          <a
            href="#"
            className="text-[#d00000] hover:text-[#9d0208] hover:underline"
          >
            شروط الاستخدام
          </a>{" "}
          و{" "}
          <a
            href="#"
            className="text-[#d00000] hover:text-[#9d0208] hover:underline"
          >
            سياسة الخصوصية
          </a>
          .
        </p>

        <p className="mt-4 text-sm text-center">
          لديك حساب؟{" "}
          <Link
            href="/auth/login"
            className="text-[#d00000] hover:text-[#9d0208] hover:underline"
          >
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}
