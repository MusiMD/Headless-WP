'use client';
import Link from 'next/link'
import FeaturedImage from '@/components/FeaturedImage';
import Date from '@/components/Date';
import LoadMore from '@/components/LoadMore';
import { useState } from 'react';

const PostList = ({initialPosts, taxonomy}) => {

  const [posts, setPosts] = useState(initialPosts);

  return (
    <section className='py-[6rem] flex flex-col items-center'>
          <ul className='mb-7'>
              {
              posts.nodes.map((post) => (
                <li key={post.slug} className='md:grid grid-cols-5 gap-4 mb-8'>

                  <div className='max-md:mb-7 col-span-2 justify-self-center'>
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
          <LoadMore posts={posts} setPosts={setPosts} taxonomy={taxonomy}/>
        </section>
  )
}

export default PostList