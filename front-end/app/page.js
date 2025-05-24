import BrandsCarousel from '@/components/brands/BrandsCarousel'
import CustomerRate from '@/components/customer/CustomerRate'
import MainBanner from '@/components/mainBanner/MainBanner'
import NewArrivals from '@/components/new-arrival/New-Arrivals'
import Sale from '@/components/sale/Sale'
import BestSelling from '@/components/share/BestSelling'
import Categories from '@/components/share/Categories'
import TrendingNow from '@/components/TrendingNow/TrendingNow'
import WhyChooseUs from '@/components/whyChooseUs/WhyChooseUs'
import React from 'react'

const page = () => {
  return (
    <div>
      <MainBanner />
      <Sale/>
      <Categories />
      <BestSelling />
      <NewArrivals/>
      <TrendingNow />
      <CustomerRate />
      <BrandsCarousel />
      <WhyChooseUs />
    </div>
  )
}

export default page