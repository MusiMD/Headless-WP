import { getAllPosts } from '@/lib/posts';
import PostLists from '@/components/PostLists';


export const metadata = {
  title:"Blogs",
  description:"Blog page - headless"
}

const Blog = async({params}) => {

  const initialPosts = await getAllPosts();

  return (
<>

    <main>

    {/* banner sec */}

    <section className="min-h-[50vh] bg-[url('/banner-image.webp')] bg-no-repeat bg-cover bg-center relative flex justify-center">
      <div className="bg-black absolute inset-0 opacity-50  z-0"></div> 

      <div className='container max-w-6xl mx-auto flex justify-center items-center'>
      <div className='relative flex flex-col justify-center items-center top_head'>
          <h2 className="text-4xl text-white">Blogs</h2>
          <div className='mt-8'>
          <p className='text-white'>Read our latest blogs</p>
          </div>
      </div>
      </div>
    </section>

    {/* blog sec */}

    <div className='container max-w-6xl mx-auto'>

      <PostLists initialPosts={initialPosts}/>
        
    </div>

    </main>
</>
  )
}

export default Blog