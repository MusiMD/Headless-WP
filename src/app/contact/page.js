import { getDynamicPage } from '@/lib/pages'; 
import ContactFormHandler from './ContactForm'; 
import { getSeo } from '@/lib/seo';


export async function generateMetadata ({params}) {
  const seoData = await getSeo('page', 'contact')

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

const Contact = async () => {
  const singlePage = await getDynamicPage('contact');
  const descText = `This is ${singlePage.title.toLowerCase()} page`;

  return (
    <>
      <main>

        {/* banner sec */}

        <section className="min-h-[50vh] bg-[url('/banner-image.webp')] bg-no-repeat bg-cover bg-center relative flex justify-center">
          <div className="bg-black absolute inset-0 opacity-50 z-0"></div>

          <div className="container max-w-6xl mx-auto flex justify-center items-center">
            <div className="relative flex flex-col justify-center items-center top_head">
              <h2 className="text-4xl text-white">{singlePage.title}</h2>
              <div className="mt-8">
                <p className="text-white">{descText}</p>
              </div>
            </div>
          </div>
        </section>

        {/* main sec */}

        <div className="container max-w-6xl mx-auto">

          <section className="py-[6rem]">

            <div className="post_content flex flex-col items-center text-center" dangerouslySetInnerHTML={{ __html: singlePage.content }}></div>

            <ContactFormHandler formId="111" />

          </section>

        </div>

      </main>
    </>
  );
};

export default Contact;
