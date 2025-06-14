import Collection from '@/components/Collection/Collection'
import React from 'react'

const page = () => {
  const nameCollection = "مجموعة الأطفال"
  return (
    <div><Collection nameCollection={nameCollection} /></div>
  )
}

export default page