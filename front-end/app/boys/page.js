import Collection from '@/components/Collection/Collection'
import React from 'react'

const page = () => {
  const nameCollection = "مجموعة الاولاد"
  const mainCategories = { id: "68409d7a7192141aeca28dcd", label: "boys" }
  return (
    <div><Collection nameCollection={nameCollection} mainCategories={mainCategories}/></div>
  )
}

export default page