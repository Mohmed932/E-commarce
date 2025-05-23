"use client";

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

// ✅ مخطط zod للتحقق
const formSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

export default function LoginComponent() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    console.log("✅ البيانات:", values);
  };

  return (
    <div
      className="w-full min-h-screen bg-[#f3f4f6] flex justify-center items-center p-4"
    >
      <div className="w-full max-w-lg bg-white backdrop-blur-md rounded-3xl shadow-2xl p-10" dir="rtl">
        <h1 className="text-4xl font-bold text-[#03071e] mb-8 text-center">تسجيل الدخول</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#370617]">البريد الإلكتروني</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="البريد الإلكتروني" className="text-right border-[#e85d04] focus:ring-[#dc2f02]" />
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
              className="cursor-pointer w-full bg-[#e85d04] hover:bg-[#dc2f02] text-white text-lg py-4 rounded-xl hover:shadow-lg hover:shadow-white"
            >
              تسجيل الدخول
            </Button>

          </form>
        </Form>

        <p className="mt-6 text-xs text-[#6a040f] text-center leading-relaxed">
          لا تملك حسابًا؟{" "}
          <Link href="/auth/signup" className="text-[#d00000] hover:text-[#9d0208] hover:underline">إنشاء حساب</Link>
        </p>

        <p className="mt-4 text-xs text-center">
          <Link href="/auth/forgot_password" className="text-[#d00000] hover:text-[#9d0208] hover:underline">نسيت كلمة المرور؟</Link>
        </p>
      </div>
    </div>
  );
}
