"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Pencil } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { useSelector } from "react-redux"

export default function AccountSettings() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const { profile, profileLoading, profileError } = useSelector((state) => state.profile)

  const [selectedImage, setSelectedImage] = useState(null)
  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (profile && profile.user) {
      setSelectedImage(profile.user.avatar?.img || null)
      setName(profile.user.name || "")
      setUsername(profile.user.username || "")
      setEmail(profile.user.email || "")
    }
  }, [profile])

  function handleFileChange(e) {
    const file = e.target.files && e.target.files[0]
    if (file) {
      setSelectedImage(URL.createObjectURL(file))
    }
  }

  const handleSave = () => {
    setUploading(true)
    setProgress(0)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  if (profileLoading) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-4">تحميل البيانات...</h1>
        <Skeleton className="h-10 mb-2 rounded-md" />
        <Skeleton className="h-10 mb-2 rounded-md" />
        <Skeleton className="h-32 w-32 rounded-md" />
      </div>
    )
  }

  if (profileError) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4 text-red-500">
        <h1 className="text-2xl font-bold mb-4">حدث خطأ أثناء تحميل البيانات</h1>
        <p className="text-sm">{profileError}</p>
      </div>
    )
  }

  return (
    <div dir="rtl" className="max-w-4xl mx-auto py-10 px-4 font-sans">
      <h1 className="text-3xl font-bold">الحساب</h1>
      <p className="text-sm text-muted-foreground">قم بإدارة إعدادات وتفضيلات حسابك.</p>

      <Tabs defaultValue="general" className="mt-6" dir="rtl">
        <TabsList className="mb-6 bg-[#ff6900] flex gap-2 p-1 rounded-lg">
          <TabsTrigger value="general" className="data-[state=active]:bg-white data-[state=active]:text-[#ff6900] transition-all duration-300 px-4 py-2 rounded-md text-white">عام</TabsTrigger>
          <TabsTrigger value="password" className="data-[state=active]:bg-white data-[state=active]:text-[#ff6900] transition-all duration-300 px-4 py-2 rounded-md text-white">كلمة المرور</TabsTrigger>
          <TabsTrigger value="addresses" className="data-[state=active]:bg-white data-[state=active]:text-[#ff6900] transition-all duration-300 px-4 py-2 rounded-md text-white">العناوين</TabsTrigger>
        </TabsList>

        {/* عام */}
        <TabsContent value="general">
          <h2 className="text-xl font-semibold mb-4">الملف الشخصي</h2>
          <div className="flex flex-row-reverse gap-6 items-start" dir="ltr">
            <div className="flex flex-col items-center gap-4">
              <label htmlFor="file-upload" className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform">
                <Pencil className="w-5 h-5" />
                اختر صورة
              </label>

              <input type="file" id="file-upload" accept="image/*" onChange={handleFileChange} className="hidden" />

              {uploading ? (
                <Skeleton className="mt-4 w-32 h-32 rounded-lg" />
              ) : selectedImage ? (
                <img src={selectedImage} alt="معاينة الصورة" className="mt-4 w-32 h-32 object-cover rounded-lg shadow-md border" />
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div>
              <Label className="my-3" htmlFor="name">الاسم</Label>
              {uploading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <Input id="name" className="bg-white" value={name} onChange={(e) => setName(e.target.value)} />
              )}
            </div>
            <div>
              <Label className="my-3" htmlFor="username">اسم المستخدم</Label>
              {uploading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <Input id="username" className="bg-white" value={username} onChange={(e) => setUsername(e.target.value)} />
              )}
            </div>
            <div>
              <Label className="my-3" htmlFor="email">البريد الإلكتروني</Label>
              {uploading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <Input id="email" className="bg-white" value={email} onChange={(e) => setEmail(e.target.value)} />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            {uploading && <Progress value={progress} />}
            <div className="flex gap-2">
              <Button variant="outline" disabled={uploading}>إلغاء</Button>
              <Button className="bg-[#ff6900]" onClick={handleSave} disabled={uploading}>
                {uploading ? "جارٍ الحفظ..." : "حفظ التغييرات"}
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* كلمة المرور */}
        <TabsContent value="password">
          <h2 className="text-xl font-semibold mb-4">كلمة المرور</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {uploading ? (
              <>
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
              </>
            ) : (
              <>
                <div>
                  <Label htmlFor="current-password">كلمة المرور الحالية</Label>
                  <Input id="current-password" type="password" placeholder="أدخل كلمة المرور الحالية" />
                </div>
                <div>
                  <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                  <Input id="new-password" type="password" placeholder="أدخل كلمة المرور الجديدة" />
                </div>
                <div>
                  <Label htmlFor="confirm-password">تأكيد كلمة المرور الجديدة</Label>
                  <Input id="confirm-password" type="password" placeholder="أكد كلمة المرور الجديدة" />
                </div>
              </>
            )}
          </div>
          <Button className="mt-4" disabled={uploading}>تحديث كلمة المرور</Button>
        </TabsContent>

        {/* العناوين */}
        <TabsContent value="addresses">
          <h2 className="text-xl font-semibold mb-4">العناوين</h2>

          {uploading ? (
            <>
              <Skeleton className="h-24 rounded-md mb-4" />
              <Skeleton className="h-24 rounded-md mb-4" />
            </>
          ) : (
            <>
              <Card className="mb-4">
                <CardContent className="p-4 flex justify-between items-start">
                  <div>
                    <p className="font-medium">المنزل</p>
                    <p className="text-sm text-muted-foreground">123 شارع مابل، أي مدينة، كاليفورنيا 91234</p>
                  </div>
                  <Pencil className="w-4 h-4 text-muted-foreground" />
                </CardContent>
              </Card>
              <Card className="mb-4">
                <CardContent className="p-4 flex justify-between items-start">
                  <div>
                    <p className="font-medium">العمل</p>
                    <p className="text-sm text-muted-foreground">456 شارع أوك، أي مدينة، كاليفورنيا 91234</p>
                  </div>
                  <Pencil className="w-4 h-4 text-muted-foreground" />
                </CardContent>
              </Card>
            </>
          )}

          <Button variant="outline" disabled={uploading}>إضافة عنوان جديد</Button>
        </TabsContent>
      </Tabs>

      <Separator className="my-8" />
      <div className="text-destructive text-sm font-medium">منطقة الخطر</div>
      <Button variant="link" className="text-destructive p-0 h-auto" disabled={uploading}>حذف الحساب</Button>
    </div>
  )
}
