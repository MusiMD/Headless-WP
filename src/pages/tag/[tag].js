import Head from 'next/head'
import Link from 'next/link'
import { getAllPosts, getAllTags, getSingleTag } from '../../lib/posts';
import FeaturedImage from '@/components/FeaturedImage';
import Date from '@/components/Date';
import LoadMore from '@/components/LoadMore';
import { useState } from 'react';


export async function getStaticProps ({params}) {
  const tagPosts = await getAllPosts(null, {key:"tag", value: params.tag});

  const singleTag = await getSingleTag(params.tag);

  return {
    props : {
      tagPosts,
      singleTag,
    },
    revalidate: 0,
  }
}


export async function getStaticPaths () {
  const allTags = await getAllTags();

  return {
    paths : allTags.map((s) => (
      {
        params : {
          tag : s.slug
        }
      }
    )),
    fallback : 'blocking'
  }
}


const Tag = ({tagPosts, singleTag}) => {
  const [posts, setPosts] = useState(tagPosts)
  
  return (
<>
    <Head>
      <title key={singleTag.name}>{singleTag.name}</title>
      <meta key="singletag-metadescription" name="description" content={singleTag.name}/>
    </Head>

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

    <section className='py-[6rem] flex flex-col items-center'>
          <ul className='mb-7'>
              {
              posts.nodes.map((post) => (
                <li key={post.slug} className='grid grid-cols-5 gap-4 mb-8'>

                  <div className='col-span-2 justify-self-center'>
                    <FeaturedImage post={post}/>
                  </div>

                  <div className='col-span-3'>
                    <h2 className='text-custom-blue text-[23px] mb-4'>
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>

                    <p className='mb-2 text-sm'>Posted On : <Date dateString={post.date}/></p>

                    <div className='' dangerouslySetInnerHTML={{__html : post.excerpt}}></div>

                    <div className='mt-4 '><span>Category : </span>
                    {
                      post.categories.nodes.map((category, index) => ( 
                          <span className='text-custom-blue' key={category.slug}>
                          <Link href={`/category/${category.slug}`} key={category.slug}>
                            {category.name}
                          </Link>
                          {index < post.categories.nodes.length - 1 && ' | '}
                          </span>
                      ))
                    }
                    </div>

                  </div>

                </li>
              ))
              }
          </ul>
          <LoadMore posts={posts} setPosts={setPosts} taxonomy={{key:"tag", value: singleTag.slug}}/>
        </section>
        
    </div>

    </main>
</>
  )
}

export default Tag