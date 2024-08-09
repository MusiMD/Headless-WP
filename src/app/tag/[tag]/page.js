import { getAllPosts, getAllTags, getSingleTag } from '@/lib/posts';
import PostLists from '@/components/PostLists';


export async function generateStaticParams () {
  const allTags = await getAllTags();

  const paths = allTags.map((t) => (
    {tag : t.slug}
  ));

  return paths;
}


export async function generateMetadata({ params }) {
  const singleTag = await getSingleTag(params.tag);

  return {
    title: singleTag.name,
    description: "Tag archive page",
  };
}


const Tag = async({params}) => {

  const tagPosts = await getAllPosts(null, {key:"tag", value: params.tag});
  const singleTag = await getSingleTag(params.tag);
  
  return (
<>

    <main>

    {/* banner sec */}

    <section className="min-h-[50vh] bg-[url('/banner-image.webp')] bg-no-repeat bg-cover bg-center relative flex justify-center">
      <div className="bg-black absolute inset-0 opacity-50  z-0"></div> 

      <div className='container max-w-6xl mx-auto flex justify-center items-center'>
      <div className='relative flex flex-col justify-center items-center'>
          <h2 className="text-4xl text-white">Tag : {singleTag.name}</h2>
          <div className='mt-9'>
          <p className='text-white'>
            {`${singleTag.count}` > 1 ? `Found ${singleTag.count} posts under this tag` : `${singleTag.count}` == 1 ? `Found ${singleTag.count} post under this tag` :  "Nothing found"}
          </p>
          </div>
      </div>
      </div>
    </section>

    {/* single blog sec */}

    <div className='container max-w-6xl mx-auto'>

      <PostLists initialPosts={tagPosts} taxonomy={{ key: "tag", value: params.tag }}/>
        
    </div>

    </main>
</>
  )
}

export default Tag