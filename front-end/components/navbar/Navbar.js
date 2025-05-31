'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {Menu, X,} from 'lucide-react'
import { Button } from "@/components/ui/button"
import Logo from './Logo'
import DesktopNav from './DesktopNav'
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

  const navItems = [
    { name: 'رجالي', href: '/men' },
    { name: 'نسائي', href: '/women' },
    { name: 'وصل حديثًا', href: '/new-arrivals' },
    { name: 'تخفيضات', href: '/sale' },
    { name: 'أطفال', href: '/kids' },
    // { name: 'اتصل بنا', href: '/contact' },
  ]
    useEffect(() => {
      dispatch(readProfile());
    }, [dispatch]);

  return (
    <nav className="bg-white text-gray-900 p-4 shadow-md sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold hover:text-orange-500">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <DesktopNav navItems={navItems} />

        {/* Search & Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <SearchNav />
          {/* Wishlist */}
          <Wishlist wishlistCount={wishlistCount} />

          {/* Cart */}
          <Cart cartCount={cartCount} />

          {/* User Dropdown */}
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
      <MobileMenu navItems={navItems} open={open} wishlistCount={wishlistCount} cartCount={cartCount}/>
    </nav>
  )
}
