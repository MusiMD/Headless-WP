import Head from 'next/head'
import { getPostSlugs, getSinglePost } from '../../lib/posts';
import Date from '@/components/Date';


export async function getStaticProps ({params}) {
  const singlePost = await getSinglePost(params.postSlug);

  let FeaturedImageurl = "https://dev-headlessdev.pantheonsite.io/wp-content/uploads/2024/07/closeup-electric-guitar-notepad-concept-musical-creativity.webp";

  // to use blog featured image as a banner background
  
  // if(singlePost.featuredImage.node.mediaDetails.sizes[0].sourceUrl) {
  //   FeaturedImageurl = singlePost.featuredImage.node.mediaDetails.sizes[0].sourceUrl;
  // }

  return {
    props : {
      singlePost,
      FeaturedImageurl : "url(" + FeaturedImageurl + ")",
    }
  }
}


export async function getStaticPaths () {
  const postSlugs = await getPostSlugs();

  return {
    paths : postSlugs.map((p) => (
      {
        params : {
          postSlug : p.slug
        }
      }
    )),
    fallback : 'blocking'
  }
}


const singlePostPage = ({singlePost, FeaturedImageurl}) => {
  
  return (
<>
    <Head>
      <title key={singlePost.title}>{singlePost.title}</title>
      <meta key="singleblog-metadescription" name="description" content={singlePost.excerpt}/>
    </Head>

    <main>

    {/* banner sec */}

    <section className="min-h-[50vh] bg-no-repeat bg-cover bg-center relative flex justify-center" style={{ backgroundImage: FeaturedImageurl }}>
      <div className="bg-black absolute inset-0 opacity-50  z-0"></div> 

      <div className='container max-w-6xl mx-auto flex justify-center items-center'>
      <div className='relative flex flex-col justify-center items-center'>
          <h2 className="text-4xl text-white">{singlePost.title}</h2>
          <div className='mt-8'>
          <p className='text-white'><Date dateString={singlePost.date} /></p>
          </div>
      </div>
      </div>
    </section>

    {/* single blog sec */}

    <div className='container max-w-6xl mx-auto'>

        <section className='p-[6rem]'>

            <div className='post_content' dangerouslySetInnerHTML={{__html : singlePost.content}}></div>
   
        </section>
        
    </div>

    </main>
</>
  )
}

export default singlePostPage