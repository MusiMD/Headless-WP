import Head from 'next/head'
import { getPageSlugs, getDynamicPage } from '../lib/pages';


export async function getStaticProps ({params}) {
  const dynamicPage = await getDynamicPage(params.template);

  return {
    props : {
      dynamicPage,
    },
    revalidate: 1,
  }
}

const conflictingPaths = ['/contact', '/about'];

export async function getStaticPaths () {
  const pageSlugs = await getPageSlugs();

  return {
    paths : pageSlugs.map((t) => (
      {
        params : {
          template : t.slug
        }
      }
    )).filter((path) => !conflictingPaths.includes(`/${path.params.template}`)),
    fallback : 'blocking'
  }
}


const Template = ({dynamicPage}) => {
  const descText = "This is " + dynamicPage.title.toLowerCase() + " page"
  return (
    
<>
    <Head>
      <title key={dynamicPage.title}>{dynamicPage.title}</title>
      <meta key="dynamicpage-metadescription" name="description" content={descText}/>
    </Head>

    <main>

    {/* banner sec */}

    <section className="min-h-[50vh] bg-[url('/banner-image.webp')] bg-no-repeat bg-cover bg-center relative flex justify-center">
      <div className="bg-black absolute inset-0 opacity-50  z-0"></div> 

      <div className='container max-w-6xl mx-auto flex justify-center items-center'>
      <div className='relative flex flex-col justify-center items-center'>
          <h2 className="text-4xl text-white">{dynamicPage.title}</h2>
          <div className='mt-8'>
          <p className='text-white'>{descText}</p>
          </div>
      </div>
      </div>
    </section>

    {/* main sec */}

    <div className='container max-w-6xl mx-auto'>

        <section className='py-[6rem]'>

            <div className='post_content' dangerouslySetInnerHTML={{__html : dynamicPage.content}}></div>

        </section>
        
    </div>

    </main>
</>
  )
}

export default Template