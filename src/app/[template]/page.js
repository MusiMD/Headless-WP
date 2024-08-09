import { getPageSlugs, getDynamicPage } from '@/lib/pages';
import { getSeo } from '@/lib/seo';


const conflictingPaths = ['/contact', '/about'];

export async function generateStaticParams () {
  const pageSlugs = await getPageSlugs();

  const paths = pageSlugs.map((t) => (
    {template : t.slug}
  )).filter((path) => !conflictingPaths.includes(`/${path.template}`));

  return paths;
}


export async function generateMetadata ({params}) {
  const pageSeoData = await getSeo('page', params.template)

  return{
    title: pageSeoData?.title,
    description:pageSeoData?.metaDesc,
    openGraph: {
      title: pageSeoData?.opengraphTitle,
      description:pageSeoData?.opengraphDescription,
      siteName: pageSeoData?.opengraphSiteName,
    }
  }
}


const Template = async({params}) => {

  const dynamicPage = await getDynamicPage(params.template);

  const descText = "This is " + dynamicPage.title.toLowerCase() + " page"
  return (
    
<>

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