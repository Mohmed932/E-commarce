import { Heart } from 'lucide-react'
import Link from 'next/link'

const Wishlist = ({wishlistCount}) => {
    return (
        <Link href="/wishlist" className="relative hover:text-orange-500">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                </span>
            )}
        </Link>
    )
}

export default Wishlist