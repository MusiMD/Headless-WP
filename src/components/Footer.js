import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer>
      <div className='bg-black py-8'>
        <div className='container max-w-6xl mx-auto flex flex-col items-center'>
          <Link href="/">
            <Image src="/logo.webp" alt="logo image" width="100" height="100" />
          </Link>
          
          <nav className='my-8'>
            <ul className='flex justify-between [&>li>a]:pl-4 [&>li>a]:text-white [&>li>a:hover]:text-custom-blue'>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
          </nav>
          <p className='text-white'>  Copyright &copy; 2024 Headless Wordpress. All Rights Reserved.</p>
        </div>
      </div>

    </footer>
  )
}

export default Footer