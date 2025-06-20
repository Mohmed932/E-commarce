'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"

import Logo from './Logo'
import SearchNav from './Search'
import Wishlist from './Wishlist'
import Cart from './Cart'
import UserDropdown from './UserDropdown'
import MobileMenu from './MobileMenu'
import { readProfile } from '@/redux/slices/auth/readProfile'
import { useDispatch } from 'react-redux'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const toggleMenu = () => setOpen(!open)
  const dispatch = useDispatch()

  // عداد مؤقت - ممكن تربطه بـ Zustand أو Context لاحقًا
  const cartCount = 3
  const wishlistCount = 2

  // عناصر الدروب داون
  const categoryItems = [
    { name: 'رجالي', href: '/men' },
    { name: 'نسائي', href: '/women' },
    { name: 'اولاد', href: '/boys' },
    { name: 'بنات', href: '/girls' }
  ]

  // عناصر عادية بجانب الدروب داون
  const mainItems = [
    { name: 'وصل حديثًا', href: '/new-arrivals' },
    { name: 'تخفيضات', href: '/sale' }
  ]

  useEffect(() => {
    dispatch(readProfile())
  }, [dispatch])

  return (
    <nav className="bg-white text-gray-900 p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold hover:text-orange-500">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Dropdown for categories */}
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-medium hover:text-orange-500 cursor-pointer">
              فئات
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categoryItems.map((item) => (
                <DropdownMenuItem key={item.href}>
                  <Link href={item.href} className="w-full">
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* باقي العناصر */}
          {mainItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium hover:text-orange-500"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Search & Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <SearchNav />
          <Wishlist wishlistCount={wishlistCount} />
          <Cart cartCount={cartCount} />
          <UserDropdown />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        navItems={[...categoryItems, ...mainItems]}
        open={open}
        wishlistCount={wishlistCount}
        cartCount={cartCount}
      />
    </nav>
  )
}
