import Link from 'next/link'

export const metadata = {
  title:"Home",
  description:"Home page - headless"
}

const Home = () => {
  return (
<>

    <main>

    {/* banner sec */}

    <section className="min-h-screen bg-[url('/banner-image.webp')] bg-no-repeat bg-cover bg-center relative flex justify-center">
      <div className="bg-black absolute inset-0 opacity-50  z-0"></div> 

      <div className='container max-w-6xl mx-auto flex justify-center items-center'>
      <div className='relative flex flex-col justify-center items-center'>
          <h2 className="text-4xl text-white">Headless Wordpress</h2>
          <div className='mt-9'>
          <Link href="/contact" className='border-2 border-custom-blue text-white px-5 py-1.5 hover:bg-custom-blue hover:text-black'>Contact Us</Link>
          </div>
      </div>
      </div>
    </section>

    </main>
</>
  )
}

export default Home