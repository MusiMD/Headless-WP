import Link from 'next/link'


export const metadata = {
  title:"Page not found",
  description:"Error - Page not found"
}

const NotFound = () => {
  return (
    <>

    <main>

    {/* banner sec */}

    <section className="min-h-96 bg-[url('/banner-image.webp')] bg-no-repeat bg-cover bg-center relative flex justify-center">
      <div className="bg-black absolute inset-0 opacity-50  z-0"></div> 

      <div className='container max-w-6xl mx-auto flex justify-center items-center'>
      <div className='relative flex flex-col justify-center items-center top_head'>
          <h2 className="text-4xl text-white">Page not found</h2>
          <div className='mt-9'>
          <Link href="/" className='border-2 border-custom-blue text-white px-5 py-1.5 hover:bg-custom-blue hover:text-black'>Back to home</Link>
          </div>
      </div>
      </div>
    </section>

    </main>
</>
  )
}

export default NotFound