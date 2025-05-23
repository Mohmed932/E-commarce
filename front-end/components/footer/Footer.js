import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();
  return (
    <footer className=" text-neutral-600 text-sm py-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6">
        <div className="flex flex-wrap justify-center gap-6">
          <a href="#" className="hover:underline">الأسئلة الشائعة</a>
          <a href="#" className="hover:underline">الاسترجاع والاستبدال</a>
          <a href="#" className="hover:underline">اتصل بنا</a>
          <a href="#" className="hover:underline">وصل حديثاً</a>
          <a href="#" className="hover:underline">تخفيضات</a>
          <a href="#" className="hover:underline">العلامات التجارية</a>
        </div>
        <div className="flex gap-4">
          <a href="#" aria-label="Instagram" className="hover:text-neutral-800"><Instagram size={20} /></a>
          <a href="#" aria-label="Facebook" className="hover:text-neutral-800"><Facebook size={20} /></a>
          <a href="#" aria-label="Twitter" className="hover:text-neutral-800"><Twitter size={20} /></a>
        </div>
        <p className="text-xs text-neutral-500 text-center">
          © {currentYear} ستايل هب. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
