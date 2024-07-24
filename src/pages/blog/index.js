import Head from 'next/head'
import Link from 'next/link'
import { getAllPosts } from '../../lib/posts';
import FeaturedImage from '@/components/FeaturedImage';
import Date from '@/components/Date';
import LoadMore from '@/components/LoadMore';
import { useState } from 'react';


export async function getStaticProps () {
  const allPosts = await getAllPosts();

  return {
    props : {
      allPosts,
    }
  }
}


const Blog = ({allPosts}) => {
  const [posts, setPosts] = useState(allPosts)

  return (
<>
    <Head>
      <title key="blog-title">Blog</title>
      <meta key="blog-metadescription" name="description" content="blog page - headless"/>
    </Head>

    <main>

    {/* banner sec */}

    <section className="min-h-[50vh] bg-[url('/banner-image.webp')] bg-no-repeat bg-cover bg-center relative flex justify-center">
      <div className="bg-black absolute inset-0 opacity-50  z-0"></div> 

      <div className='container max-w-6xl mx-auto flex justify-center items-center'>
      <div className='relative flex flex-col justify-center items-center'>
          <h2 className="text-4xl text-white">Blogs</h2>
          <div className='mt-8'>
          <p className='text-white'>Read our latest blogs</p>
          </div>
      </div>
      </div>
    </section>

    {/* blog sec */}

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
          <LoadMore posts={posts} setPosts={setPosts}/>
        </section>
        
    </div>

    </main>
</>
  )
}

export default Blog