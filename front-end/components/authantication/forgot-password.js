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
});

export default function ForgotPasswordComponent() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (values) => {
        console.log("✅ البيانات:", values);
        // هنا يمكن إرسال الطلب لاستعادة كلمة المرور عبر البريد الإلكتروني
    };

    return (
        <div
            className="w-full min-h-screen bg-[#f3f4f6] flex justify-center items-center p-4"
        >
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
                        >
                            إرسال رابط استعادة
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
