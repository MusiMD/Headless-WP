import Link from 'next/link'
import Image from 'next/image';

const Footer = ({ logo }) => {
  return (
    <footer>
      <div className='bg-black py-8'>
        <div className='container max-w-6xl mx-auto flex flex-col items-center'>
          <Link href="/">
            <Image src={logo.src} alt="site logo" width={logo.width} height={logo.height} />
          </Link>
          
          <nav className='my-6'>
            <ul className='flex flex-wrap justify-center [&>li]:p-2 [&>li>a]:text-white [&>li>a:hover]:text-custom-blue'>
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
          <p className='text-white text-center'>  Copyright &copy; 2024 Headless Wordpress. All Rights Reserved.</p>
        </div>
      </div>

    </footer>
  )
}

export default Footer