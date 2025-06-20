import Collection from '@/components/Collection/Collection'
import React from 'react'

const page = () => {
  const nameCollection = "مجموعة البنات"
  const mainCategories = { id: "68409db77192141aeca28dd0", label: "girls" }
  return (
    <div><Collection nameCollection={nameCollection} mainCategories={mainCategories}/></div>
  )
}

export default page