import Link from 'next/link'

const DesktopNav = ({navItems}) => {
  return (
    <div className="hidden md:flex space-x-6">
      {navItems.map((item) => (
        <Link key={item.name} href={item.href} className="hover:text-orange-500 font-extrabold">
          {item.name}
        </Link>
      ))}
    </div>
  )
}

export default DesktopNav