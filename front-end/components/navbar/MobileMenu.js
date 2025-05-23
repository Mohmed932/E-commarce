import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Heart, LogIn, LogOut, ShoppingCart, UserIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"

const MobileMenu = ({ navItems, open,wishlistCount,cartCount }) => {
    return (
        <div>
            {open && (
                <div className="md:hidden mt-2 space-y-3 px-4">
                    {navItems.map((item) => (
                        <Link key={item.name} href={item.href} className="block py-1 border-b border-gray-300 hover:text-orange-500">
                            {item.name}
                        </Link>
                    ))}

                    <input
                        type="text"
                        placeholder="بحث"
                        className="bg-gray-100 text-gray-900 px-3 py-2 w-full rounded-md"
                    />

                    <div className="flex justify-around py-2 text-gray-700">
                        <Link href="/wishlist" className="flex flex-col items-center hover:text-orange-500 relative">
                            <Heart className="w-5 h-5" />
                            <span className="text-xs">المفضلة</span>
                            {wishlistCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>
                        <Link href="/cart" className="flex flex-col items-center hover:text-orange-500 relative">
                            <ShoppingCart className="w-5 h-5" />
                            <span className="text-xs">السلة</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon" className="flex flex-col items-center hover:text-orange-500">
                                    <UserIcon className="w-5 h-5" />
                                    <span className="text-xs">الحساب</span>
                                </Button>
                            </PopoverTrigger>
            <PopoverContent className="w-48 rounded-lg shadow-lg bg-white text-right border text-gray-800">
                <ul className="space-y-2 text-sm">
                    <li>
                        <Link href="/account" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                            <UserIcon className="w-4 h-4" />
                            <span>حسابي</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/login" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
                            <LogIn className="w-4 h-4" />
                            <span>تسجيل الدخول</span>
                        </Link>
                    </li>
                    <hr className="border-gray-200" />
                    <li>
                        <button className="w-full flex items-center gap-2 hover:text-orange-500 transition-colors">
                            <LogOut className="w-4 h-4" />
                            <span>تسجيل الخروج</span>
                        </button>
                    </li>
                </ul>
            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            )}</div>
    )
}

export default MobileMenu