import Collection from '@/components/Collection/Collection'
import BestSelling from '@/components/share/BestSelling'
import Categories from '@/components/share/Categories'

const page = () => {
  const nameCollection = "مجموعة الرجال"
    const mainCategories = { id: "68407b897192141aeca28d81", label: "man" }
  return (
    <div>
      <Collection nameCollection={nameCollection} mainCategories={mainCategories}/>
      {/* <Categories />
      <BestSelling /> */}
    </div>
  )
}

export default page