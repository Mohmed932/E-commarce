import BestSelling from '@/components/share/BestSelling'
import Brand from '@/components/share/Brand'
import Categories from '@/components/share/Categories'
import React from 'react'

const page = () => {
    return (
        <div className='my-14 flex items-center justify-start flex-col h-screen'>
            <div className='w-3/5 m-5 shadow-md max-lg:w-3/4 max-md:w-11/12'>
                <Categories />
            </div>
            <div className='w-3/5 m-5'>
                <BestSelling />
            </div>
            <div className='w-3/5 m-5 mb-14'>
                <Brand />
            </div>
        </div>
    )
}

export default page