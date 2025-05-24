import Collection from '@/components/Collection/Collection'
import BestSelling from '@/components/share/BestSelling'
import Categories from '@/components/share/Categories'

const page = () => {
  const nameCollection = "مجموعة الرجال"
  return (
    <div>
      <Collection nameCollection={nameCollection} />
      <Categories />
      <BestSelling />
    </div>
  )
}

export default page