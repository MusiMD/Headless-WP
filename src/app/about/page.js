import { getDynamicPage } from '@/lib/pages';
import { getSeo } from '@/lib/seo';
import RenderBlocks from '@/components/RenderBlocks';


export async function generateMetadata ({params}) {
  const seoData = await getSeo('page', 'about')

  return{
    title: seoData?.title,
    description:seoData?.metaDesc,
    openGraph: {
      title: seoData?.opengraphTitle,
      description:seoData?.opengraphDescription,
      siteName: seoData?.opengraphSiteName,
    }
  }
}


const About = async({params}) => {

  const singlePage = await getDynamicPage('about');

  const descText = "This is " + singlePage.title.toLowerCase() + " page"
  return (
    
<>

    <main>

    {/* banner sec */}

    <section className="min-h-[50vh] bg-[url('/banner-image.webp')] bg-no-repeat bg-cover bg-center relative flex justify-center">
      <div className="bg-black absolute inset-0 opacity-50  z-0"></div> 

      <div className='container max-w-6xl mx-auto flex justify-center items-center'>
      <div className='relative flex flex-col justify-center items-center top_head'>
          <h2 className="text-4xl text-white">{singlePage.title}</h2>
          <div className='mt-8'>
          <p className='text-white'>{descText}</p>
          </div>
      </div>
      </div>
    </section>

    {/* main sec */}

    <div className='container max-w-6xl mx-auto'>

        <section className='py-[6rem] post_content'>

            <RenderBlocks blocks={singlePage.blocks}/>

        </section>
        
    </div>

    </main>
</>
  )
}

export default About