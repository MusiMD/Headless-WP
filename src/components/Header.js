'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Header = ({ logo }) => {
  const pathname = usePathname();

  const isActive = (href) => {
    return pathname === href ? 'text-custom-blue' : 'text-white';
  };

  return (
    <header>
      <div className='bg-black py-3'>
        <div className='container max-w-6xl mx-auto flex justify-between items-center'>
          <Link href="/">
            <Image src={logo.src} alt="site logo" width={logo.width} height={logo.height} />
          </Link>
          <nav>
            <ul className='flex justify-between [&>li>a]:pl-4 [&>li>a:hover]:text-custom-blue'>
              <li className={`${isActive('/')}`}>
                <Link href="/">Home</Link>
              </li>
              <li className={`${isActive('/about')}`}>
                <Link href="/about">About</Link>
              </li>
              <li className={`${isActive('/blog')}`}>
                <Link href="/blog">Blog</Link>
              </li>
              <li className={`${isActive('/contact')}`}>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
