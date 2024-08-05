import Head from 'next/head';
import Link from 'next/link';
import { getPostSlugs, getSinglePost } from '../../lib/posts';
import { getSeo } from '@/lib/seo';
import Date from '@/components/Date';


export async function getStaticProps ({params}) {
  const singlePost = await getSinglePost(params.postSlug);
  const seoData = await getSeo('post', params.postSlug)

  let FeaturedImageurl = "https://dev-headlessdev.pantheonsite.io/wp-content/uploads/2024/07/closeup-electric-guitar-notepad-concept-musical-creativity.webp";

  // to use blog featured image as a banner background
  
  // if(singlePost.featuredImage) {
  //   FeaturedImageurl = singlePost.featuredImage.node.mediaDetails.sizes[0].sourceUrl;
  // }

  return {
    props : {
      singlePost,
      FeaturedImageurl : "url(" + FeaturedImageurl + ")",
      seoData,
    },
    revalidate: 1,
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


const singlePostPage = ({singlePost, FeaturedImageurl, seoData}) => {

  let jsonSchema = seoData.schema.raw.replace(/https:\/\/dev-headlessdev.pantheonsite.io(?!\/wp-content\/uploads)/g, 'https://headless-wp-fawn.vercel.app/blog');


  
  return (
<>
    <Head>
      <title key={seoData.title}>{seoData.title}</title>
      <meta key="singleblog-metadescription" name="description" content={seoData.metaDesc}/>

      <script type='application/ld+json' dangerouslySetInnerHTML={{__html:jsonSchema}}></script>
    </Head>

    <main>

    <article>

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

            {singlePost.tags.nodes.length > 0 && (
              <div className='mt-4 '><span>Tag : </span>
                {singlePost.tags.nodes.map((tag, index) => ( 
                    <span className='text-custom-blue' key={tag.slug}>
                    <Link href={`/tag/${tag.slug}`} key={tag.slug}>
                      {tag.name}
                    </Link>
                    {index < singlePost.tags.nodes.length - 1 && ' | '}
                    </span>
                ))}
              </div>
            )}
   
        </section>
        
    </div>

    </article>

    </main>
</>
  )
}

export default singlePostPage