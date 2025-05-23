import { Search } from 'lucide-react'

const SearchNav = () => {
    return (
        <div className="relative">
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <Search className="w-4 h-4" />
            </span>
            <input
                type="text"
                placeholder="بحث"
                className="bg-gray-100 text-gray-900 pr-10 pl-3 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
        </div>
    )
}

export default SearchNav