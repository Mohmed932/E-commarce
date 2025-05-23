import BrandsCarousel from '@/components/brands/BrandsCarousel'
import CustomerRate from '@/components/customer/CustomerRate'
import MainBanner from '@/components/mainBanner/MainBanner'
import ShopByCategory from '@/components/shopByCategory/ShopByCategory'
import TrendingNow from '@/components/TrendingNow/TrendingNow'
import WhyChooseUs from '@/components/whyChooseUs/WhyChooseUs'
import React from 'react'

const page = () => {
  return (
    <div>
      <MainBanner/>
      <ShopByCategory/>
      <TrendingNow/>
      <CustomerRate/>
      <BrandsCarousel/>
      <WhyChooseUs/>
    </div>
  )
}

export default page