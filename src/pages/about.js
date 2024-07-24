import Head from 'next/head'
import { getDynamicPage } from '../lib/pages';


export async function getStaticProps () {
  const slug = 'about';
  const singlePage = await getDynamicPage(slug);

  return {
    props : {
      singlePage,
    }
  }
}


const About = ({singlePage}) => {
  const descText = "This is " + singlePage.title.toLowerCase() + " page"
  return (
    
<>
    <Head>
      <title key={singlePage.title}>{singlePage.title}</title>
      <meta key="about-metadescription" name="description" content={descText}/>
    </Head>

    <main>

    {/* banner sec */}

    <section className="min-h-[50vh] bg-[url('/banner-image.webp')] bg-no-repeat bg-cover bg-center relative flex justify-center">
      <div className="bg-black absolute inset-0 opacity-50  z-0"></div> 

      <div className='container max-w-6xl mx-auto flex justify-center items-center'>
      <div className='relative flex flex-col justify-center items-center'>
          <h2 className="text-4xl text-white">{singlePage.title}</h2>
          <div className='mt-8'>
          <p className='text-white'>{descText}</p>
          </div>
      </div>
      </div>
    </section>

    {/* main sec */}

    <div className='container max-w-6xl mx-auto'>

        <section className='py-[6rem]'>

            <div className='post_content' dangerouslySetInnerHTML={{__html : singlePage.content}}></div>

        </section>
        
    </div>

    </main>
</>
  )
}

export default About