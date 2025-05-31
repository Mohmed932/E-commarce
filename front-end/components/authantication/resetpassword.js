"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

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
import { toast, Toaster } from "sonner";
import { handlecheckLink, handleResetPassword } from "@/redux/slices/auth/resetPassword";


const formSchema = z
    .object({
        password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
        conformPassword: z.string().min(6, "يرجى تأكيد كلمة المرور"),
    })
    .refine((data) => data.password === data.conformPassword, {
        message: "كلمتا المرور غير متطابقتين",
        path: ["conformPassword"],
    });

export default function ResetPassword() {
    const { accountId, checkLink } = useParams();
    const dispatch = useDispatch();
    const router = useRouter();

    const {
        success,
        loading,
        error,
        checkLinkLoading,
        checkLinkError,
        // checkLinkSuccess,
    } = useSelector((state) => state.resetPassword);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            conformPassword: "",
        },
    });

    const onSubmit = (values) => {
        const data = {
            id: accountId,
            token: checkLink,
            values,
        };
        dispatch(handleResetPassword(data));
    };

    useEffect(() => {
        if (success) {
            toast.success("تم تغيير كلمة المرور بنجاح");
            setTimeout(() => {
                router.push("/auth/login");
            }, 1500);
        }
    }, [success, router]);

    useEffect(() => {
        if (error) {
            toast.error(error.message || "حدث خطأ أثناء تغيير كلمة المرور");
        }
    }, [error]);

    useEffect(() => {
        if (accountId && checkLink) {
            dispatch(
                handlecheckLink({
                    id: accountId,
                    token: checkLink,
                })
            );
        }
    }, [accountId, checkLink, dispatch]);

    return (
        <div className="w-full min-h-screen bg-[#f3f4f6] flex justify-center items-center p-4">
            <Toaster />

            <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10" dir="rtl">
                <h1 className="text-4xl font-bold text-[#03071e] mb-6 text-center">
                    إعادة تعيين كلمة المرور
                </h1>

                {/* حالة التحقق من الرابط */}
                {checkLinkLoading && (
                    <div className="flex flex-col items-center justify-center p-6 bg-yellow-100 rounded-lg border border-yellow-300 text-yellow-800 mb-6">
                        <Loader2 className="animate-spin w-8 h-8 mb-3" />
                        <p className="text-lg font-semibold">جارٍ التحقق من الرابط...</p>
                    </div>
                )}

                {/* خطأ في الرابط */}
                {checkLinkError && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        <AlertTitle>الرابط غير صالح أو انتهت صلاحيته</AlertTitle>
                        <AlertDescription>
                            يرجى طلب رابط جديد لإعادة تعيين كلمة المرور.
                        </AlertDescription>
                    </Alert>
                )}

                {/* الفورم يظهر فقط إذا الرابط صحيح */}
                {!checkLinkLoading && !checkLinkError && (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#370617]">كلمة المرور الجديدة</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="password"
                                                placeholder="كلمة المرور الجديدة"
                                                className="text-right border-[#e85d04] focus:ring-[#dc2f02]"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="conformPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[#370617]">تأكيد كلمة المرور</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="password"
                                                placeholder="أعد كتابة كلمة المرور"
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
                                className="w-full bg-[#e85d04] hover:bg-[#dc2f02] text-white text-lg py-4 rounded-xl"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="w-4 h-4 animate-spin" /> جاري تغيير كلمة المرور...
                                    </span>
                                ) : (
                                    "تغيير كلمة المرور"
                                )}
                            </Button>
                        </form>
                    </Form>
                )}

                <p className="mt-4 text-sm text-center">
                    هل تذكرت كلمة المرور؟{" "}
                    <a href="/auth/login" className="text-[#d00000] hover:text-[#9d0208] hover:underline">
                        تسجيل الدخول
                    </a>
                </p>
            </div>
        </div>
    );
}
