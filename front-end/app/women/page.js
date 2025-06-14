import Collection from '@/components/Collection/Collection'
import React from 'react'

const page = () => {
  const nameCollection = "مجموعة النساء"
  const mainCategories = { id: "68407b787192141aeca28d7e", label: "woman" }
  return (
    <div><Collection nameCollection={nameCollection} mainCategories={mainCategories}/></div>
  )
}

export default page