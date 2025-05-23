import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

const Cart = ({cartCount}) => {
    return (
        <Link href="/cart" className="relative hover:text-orange-500">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                </span>
            )}
        </Link>
    )
}

export default Cart