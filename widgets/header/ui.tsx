'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import Image from 'next/image';
import { DOCS_LINK } from '@/config/links';
import { useState } from 'react';

export const Logo = () => {
  return (
    <div className="relative group-hover/link:scale-105 transition-transform duration-300">
      <div className="absolute -inset-[1px] bg-gradient-to-r from-primary-default to-primary-default rounded-lg blur-sm group-hover/link:blur-md transition-all duration-500" />
      <div className="relative bg-black p-0.5 rounded-lg border border-white/20 backdrop-blur-sm group-hover/link:border-primary-default/40 transition-all duration-500">
        <div className="relative w-6 h-6 md:w-9 md:h-9">
          <Image src="/images/logo_bear.png" alt="BeraFlow Logo" fill className="object-contain transition-transform duration-300" />
        </div>
      </div>
      {/* Glow effect */}
      <div className="absolute -inset-2 bg-primary-default/30 rounded-xl blur-xl opacity-0 group-hover/link:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isConnected } = useAccount();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent scrolling when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <>
      <header className="backdrop-blur-md bg-black/30 border-b border-white/10 relative z-50">
        <div className="mx-auto h-14 md:h-20 flex justify-between items-center px-3 md:px-8 px-2">
          <div className="flex items-center">
            <Link href="/" className="group/link flex items-center gap-2 md:gap-4 transition-all duration-300">
              <Logo />

              <span className="text-xl md:text-h3bold font-display">
                <span className="bg-gradient-to-r from-white via-primary-default to-primary-hover bg-clip-text text-transparent group-hover/link:from-primary-default group-hover/link:to-white transition-all duration-300">
                  BeraFlowDao
                </span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="/sale">Sale</NavLink>
            <NavLink href="/staking">Staking</NavLink>
            <NavLink href="/swap">Swap</NavLink>
            <NavLink href="/treasury">Treasury</NavLink>
            <NavLink href={DOCS_LINK} external>
              Docs
            </NavLink>
          </nav>

          <div className="flex items-center gap-1.5 md:gap-4">
            <div className={`scale-[0.85] md:scale-100 origin-right ${isConnected ? 'hidden md:block' : ''}`}>
              <ConnectButton />
            </div>
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-1 -mr-1 text-white/80 hover:text-primary-default transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <>
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        className={`fixed z-[9999] inset-0 min-h-[100dvh] transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMobileMenu}
      >
        {/* Background layers */}
        <div className="absolute inset-0 bg-black/90" />
        
        {/* Animated gradient background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Top-right gradient blob */}
          <div className="absolute -top-1/2 -right-1/2 w-full h-full">
            <div className="absolute w-full h-full bg-gradient-to-b from-primary-default/30 to-transparent rounded-full blur-3xl animate-spin-slow" />
          </div>
          
          {/* Bottom-left gradient blob */}
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full">
            <div className="absolute w-full h-full bg-gradient-to-t from-primary-default/20 to-transparent rounded-full blur-3xl animate-spin-slow-reverse" />
          </div>
        </div>

        {/* Blur overlay */}
        <div className="absolute inset-0 backdrop-blur-2xl" />

        {/* Content Container */}
        <div className="relative h-full flex flex-col" onClick={e => e.stopPropagation()}>
          {/* Top bar with logo and close button */}
          <div className="container mx-auto px-3 h-14 flex justify-between items-center border-b border-white/10">
            <Link href="/" className="group/link flex items-center gap-2" onClick={toggleMobileMenu}>
              <Logo />
              <span className="text-xl font-display">
                <span className="bg-gradient-to-r from-white via-primary-default to-primary-hover bg-clip-text text-transparent">
                  BeraFlowDao
                </span>
              </span>
            </Link>
            
            <button
              className="p-1 -mr-1 text-white/80 hover:text-primary-default transition-colors absolute right-4 top-3"
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Navigation Links Container */}
          <div className="flex-1 container mx-auto px-3 flex flex-col justify-center items-center -mt-14">
            <nav className="flex flex-col items-center gap-6">
              <MobileNavLink href="/sale" onClick={toggleMobileMenu}>Sale</MobileNavLink>
              <MobileNavLink href="/staking" onClick={toggleMobileMenu}>Staking</MobileNavLink>
              <MobileNavLink href="/swap" onClick={toggleMobileMenu}>Swap</MobileNavLink>
              <MobileNavLink href="/treasury" onClick={toggleMobileMenu}>Treasury</MobileNavLink>
              <MobileNavLink href={DOCS_LINK} external onClick={toggleMobileMenu}>
                Docs
              </MobileNavLink>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

const NavLink = ({ 
  href, 
  children, 
  external,
  onClick 
}: { 
  href: string; 
  children: React.ReactNode; 
  external?: boolean;
  onClick?: () => void;
}) => {
  const baseStyles = 'relative font-display text-text text-white/80 hover:text-primary-default transition-colors py-2';

  if (external) {
    return (
      <Link 
        href={href} 
        rel="noopener noreferrer" 
        target="_blank" 
        className={`${baseStyles} flex items-center gap-1`}
        onClick={onClick}
      >
        {children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-60"
        >
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      </Link>
    );
  }

  return (
    <Link href={href} className={baseStyles} onClick={onClick}>
      {children}
    </Link>
  );
};

const MobileNavLink = ({ 
  href, 
  children, 
  external,
  onClick 
}: { 
  href: string; 
  children: React.ReactNode; 
  external?: boolean;
  onClick?: () => void;
}) => {
  const baseStyles = 'relative font-display text-[32px] text-white hover:text-primary-default transition-all duration-300 py-3 group';

  if (external) {
    return (
      <Link 
        href={href} 
        rel="noopener noreferrer" 
        target="_blank" 
        className={`${baseStyles} flex items-center gap-2`}
        onClick={onClick}
      >
        <span className="relative">
          {children}
          <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gradient-to-r from-primary-default to-primary-hover group-hover:w-full transition-all duration-300" />
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-60"
        >
          <path d="M7 7h10v10" />
          <path d="M7 17 17 7" />
        </svg>
      </Link>
    );
  }

  return (
    <Link 
      href={href} 
      className={baseStyles}
      onClick={onClick}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-gradient-to-r from-primary-default to-primary-hover group-hover:w-full transition-all duration-300" />
      </span>
    </Link>
  );
};
