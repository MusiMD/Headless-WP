import { getAllCategory, getAllPosts, getSingleCategory } from '@/lib/posts';
import PostLists from '@/components/PostLists';
import { notFound } from 'next/navigation';


export async function generateStaticParams () {
  const allCategory = await getAllCategory();

  const paths = allCategory.map((c) => (
    {category : c.slug}
  ));

  return paths;
}


export async function generateMetadata({ params }) {
  const singleCategory = await getSingleCategory(params.category);
  
  if (!singleCategory) {
    notFound(); 
  }

  return {
    title: singleCategory.name,
    description: "Category archive page",
  };
}


const Category = async({params}) => {

  const categoryPosts = await getAllPosts(null, {key:"categoryName", value: params.category});
  const singleCategory = await getSingleCategory(params.category);

  if (!singleCategory) {
    notFound(); 
  }
  
  return (
<>

    <main>

    {/* banner sec */}

    <section className="min-h-[50vh] bg-[url('/banner-image.webp')] bg-no-repeat bg-cover bg-center relative flex justify-center">
      <div className="bg-black absolute inset-0 opacity-50  z-0"></div> 

      <div className='container max-w-6xl mx-auto flex justify-center items-center'>
      <div className='relative flex flex-col justify-center items-center'>
          <h2 className="text-4xl text-white">Category : {singleCategory.name}</h2>
          <div className='mt-9'>
          <p className='text-white'>
            {`${singleCategory.count}` > 1 ? `Found ${singleCategory.count} posts under this category` : `${singleCategory.count}` == 1 ? `Found ${singleCategory.count} post under this category` :  "Nothing found"}
          </p>
          </div>
      </div>
      </div>
    </section>

    {/* single blog sec */}

    <div className='container max-w-6xl mx-auto'>

    <PostLists initialPosts={categoryPosts} taxonomy={{ key: "categoryName", value: params.category }} />
        
    </div>

    </main>
</>
  )
}

export default Category