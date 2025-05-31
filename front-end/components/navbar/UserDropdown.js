import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { LogIn, LogOut, UserIcon } from "lucide-react"
import Link from "next/link"
import { useSelector } from "react-redux"
import Cookies from 'js-cookie';

const UserDropdown = () => {
    const {
        profile,
        profileLoading,
        profileError,
    } = useSelector((state) => state.profile);
    const handleLogout = () => {
        Cookies.remove('token');
        window.location.reload();
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:text-orange-500">
                    <UserIcon className="w-5 h-5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 rounded-lg shadow-lg bg-white text-right border text-gray-800">
                {profileLoading ? (
                    <div className="p-4 text-center text-sm text-gray-500">جاري التحميل...</div>
                ) : profileError ? (
                    <div className="p-4 text-center text-sm text-red-500">حدث خطأ، حاول لاحقاً</div>
                ) : profile ? (
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/account" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                                <UserIcon className="w-4 h-4" />
                                <span>حسابي</span>
                            </Link>
                        </li>
                        <hr className="border-gray-200" />
                        <li>
                            <button className="w-full flex items-center gap-2 hover:text-orange-500 transition-colors">
                                <LogOut className="w-4 h-4" />
                                <span onClick={handleLogout}>تسجيل الخروج</span>
                            </button>
                        </li>
                    </ul>
                ) : (
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/auth/login" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                                <LogIn className="w-4 h-4" />
                                <span>تسجيل الدخول</span>
                            </Link>
                        </li>
                    </ul>
                )}
            </PopoverContent>
        </Popover>
    )
}

export default UserDropdown
