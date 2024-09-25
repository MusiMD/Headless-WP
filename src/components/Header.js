'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Header = ({ logo }) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const isActive = (href) => {
    return pathname === href ? 'text-custom-blue' : 'text-white';
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);


  return (
    <header>
      <div className='bg-black py-3'>
        <div className='container max-w-6xl mx-auto flex justify-between items-center'>
          
          <Link href="/">
            <Image src={logo.src} alt="site logo" width={logo.width} height={logo.height} />
          </Link>

          {/* Navigation for desktop */}

          <nav className="hidden md:flex">
            <ul className='flex justify-between [&>li>a]:pl-4 [&>li>a:hover]:text-custom-blue'>
              <li className={isActive('/')}>
                <Link href="/">Home</Link>
              </li>
              <li className={isActive('/about')}>
                <Link href="/about">About</Link>
              </li>
              <li className={isActive('/blog')}>
                <Link href="/blog">Blog</Link>
              </li>
              <li className={isActive('/contact')}>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </nav>

          {/* Hamburger for mobile */}

          <div className='md:hidden'>
            <button onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}

          {isMobileMenuOpen && (
            <nav ref={menuRef} className='md:hidden fixed top-0 left-0 w-80 bg-black z-20 h-[100%] px-5 py-5'>
              
              <div className="flex justify-between items-center">
                <Link href="/">
                  <Image src={logo.src} alt="site logo" width={logo.width} height={logo.height} />
                </Link>

                {/* Close Button */}

                <button onClick={toggleMobileMenu} aria-label="Close mobile menu">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <ul className='flex flex-col space-y-4 py-5 pl-2'>
                <li onClick={toggleMobileMenu} className={isActive('/')}>
                  <Link href="/">Home</Link>
                </li>
                <li onClick={toggleMobileMenu} className={isActive('/about')}>
                  <Link href="/about">About</Link>
                </li>
                <li onClick={toggleMobileMenu} className={isActive('/blog')}>
                  <Link href="/blog">Blog</Link>
                </li>
                <li onClick={toggleMobileMenu} className={isActive('/contact')}>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
