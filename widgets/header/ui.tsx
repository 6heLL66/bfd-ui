'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import Image from 'next/image';
import { DOCS_LINK } from '@/config/links';
import { useState, useRef, useEffect } from 'react';

export const Logo = () => {
  return (
    <div className="relative group-hover/link:scale-[1.02] transition-all duration-300">
      <div className="absolute -inset-[1px] bg-gradient-to-r from-primary-default/40 to-primary-default/40 rounded-lg opacity-0 group-hover/link:opacity-100 blur-sm transition-all duration-300" />
      <div className="relative bg-black/50 p-0 rounded-[10px] backdrop-blur-sm group-hover/link:border-primary-default/30 transition-all duration-300">
        <div className="relative w-6 h-6 md:w-10 md:h-10">
          <Image src="/images/logo.jpg" alt="BeraFlow Logo" fill className="object-contain brightness-110 saturate-[0.9] transition-all duration-300" />
        </div>
      </div>
    </div>
  );
};

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSaleDropdown, setActiveSaleDropdown] = useState(false);
  const [activeStakingDropdown, setActiveStakingDropdown] = useState(false);
  const saleDropdownRef = useRef<HTMLDivElement>(null);
  const stakingDropdownRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        saleDropdownRef.current && 
        !saleDropdownRef.current.contains(event.target as Node)
      ) {
        setActiveSaleDropdown(false);
      }
      if (
        stakingDropdownRef.current && 
        !stakingDropdownRef.current.contains(event.target as Node)
      ) {
        setActiveStakingDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="backdrop-blur-md bg-black/30 border-b border-white/10 relative z-50">
        <div className="mx-auto h-14 md:h-20 flex justify-between items-center px-3 md:px-8 px-2">
          <div className="flex items-center">
            <Link href="/" className="group/link flex items-center gap-2 md:gap-4 transition-all duration-300">
              <Logo />

              <span className="text-xl md:text-h3bold font-display">
                <span className="">
                  BeraFlow DAO
                </span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <div ref={saleDropdownRef} className="relative">
              <button 
                onClick={() => setActiveSaleDropdown(!activeSaleDropdown)}
                className="relative font-display text-text text-white/80 hover:text-primary-default transition-colors py-2 flex items-center gap-1"
              >
                Gathering
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 ${activeSaleDropdown ? 'rotate-180' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              
              {activeSaleDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-black/90 backdrop-blur-md border border-white/10 rounded-md overflow-hidden shadow-lg z-50 min-w-[140px]">
                  <Link 
                    href="/sale" 
                    className="block px-4 py-2 text-white/80 hover:text-primary-default hover:bg-white/5 transition-colors"
                    onClick={() => setActiveSaleDropdown(false)}
                  >
                    Sale
                  </Link>
                  <Link 
                    href="/gathering" 
                    className="block px-4 py-2 text-white/80 hover:text-primary-default hover:bg-white/5 transition-colors"
                    onClick={() => setActiveSaleDropdown(false)}
                  >
                    Gathering
                  </Link>
                </div>
              )}
            </div>
            
            {process.env.NEXT_PUBLIC_V2 === 'true' && (
              <div ref={stakingDropdownRef} className="relative">
                <button 
                  onClick={() => setActiveStakingDropdown(!activeStakingDropdown)}
                  className="relative font-display text-text text-white/80 hover:text-primary-default transition-colors py-2 flex items-center gap-1"
                >
                  Liquidity
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className={`transition-transform duration-200 ${activeStakingDropdown ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                
                {activeStakingDropdown && (
                  <div className="absolute top-full left-0 mt-1 bg-black/90 backdrop-blur-md border border-white/10 rounded-md overflow-hidden shadow-lg z-50 min-w-[140px]">
                    <Link 
                      href="/pool" 
                      className="block px-4 py-2 text-white/80 hover:text-primary-default hover:bg-white/5 transition-colors"
                      onClick={() => setActiveStakingDropdown(false)}
                    >
                      Pool
                    </Link>
                    <Link 
                      href="/staking/bfd" 
                      className="block px-4 py-2 text-white/80 hover:text-primary-default hover:bg-white/5 transition-colors"
                      onClick={() => setActiveStakingDropdown(false)}
                    >
                      Staking
                    </Link>
                  </div>
                )}
              </div>
            )}

            {process.env.NEXT_PUBLIC_V2 === 'true' && <NavLink href="/swap">
              <span className="flex items-center gap-1">
                Swap
              </span>
            </NavLink>}
            
            {process.env.NEXT_PUBLIC_V2 === 'true' && <NavLink href="/validator">
              <span className="flex items-center gap-1">
                Validator
              </span>
            </NavLink>}
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
                  BeraFlow DAO
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

          {/* Mobile Navigation Links Container */}
          <div className="flex-1 container mx-auto px-3 flex flex-col justify-center items-center -mt-14">
            <nav className="flex flex-col items-center gap-6">
              <div className="flex flex-col items-center">
                <MobileNavLink href="#" onClick={(e?: React.MouseEvent<HTMLAnchorElement>) => {
                  if (e) e.preventDefault();
                  document.getElementById('mobile-sale-dropdown')?.classList.toggle('hidden');
                }}>
                  <span className="flex items-center gap-2">
                    Gathering
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
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </MobileNavLink>
                <div id="mobile-sale-dropdown" className="hidden flex flex-col items-center mt-2 mb-2 space-y-4">
                  <Link 
                    href="/sale" 
                    className="text-[22px] text-white/70 hover:text-primary-default transition-all duration-300"
                    onClick={toggleMobileMenu}
                  >
                    Sale
                  </Link>
                  <Link 
                    href="/gathering" 
                    className="text-[22px] text-white/70 hover:text-primary-default transition-all duration-300"
                    onClick={toggleMobileMenu}
                  >
                    Gathering
                  </Link>
                </div>
              </div>

              {process.env.NEXT_PUBLIC_V2 === 'true' && <MobileNavLink href="/swap" onClick={toggleMobileMenu}>
                <span className="flex items-center gap-2">
                  Swap
                </span>
              </MobileNavLink>}

              {process.env.NEXT_PUBLIC_V2 === 'true' && (
                <div className="flex flex-col items-center">
                  <MobileNavLink href="#" onClick={(e?: React.MouseEvent<HTMLAnchorElement>) => {
                    if (e) e.preventDefault();
                    document.getElementById('mobile-staking-dropdown')?.classList.toggle('hidden');
                  }}>
                    <span className="flex items-center gap-2">
                      Staking & Liquidity
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
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </span>
                  </MobileNavLink>
                  <div id="mobile-staking-dropdown" className="hidden flex flex-col items-center mt-2 mb-2 space-y-4">
                    <Link 
                      href="/staking/bfd" 
                      className="text-[22px] text-white/70 hover:text-primary-default transition-all duration-300"
                      onClick={toggleMobileMenu}
                    >
                      Staking
                    </Link>
                    <Link 
                      href="/pool" 
                      className="text-[22px] text-white/70 hover:text-primary-default transition-all duration-300"
                      onClick={toggleMobileMenu}
                    >
                      Liquidity
                    </Link>
                  </div>
                </div>
              )}

              {process.env.NEXT_PUBLIC_V2 === 'true' && <MobileNavLink href="/validator" onClick={toggleMobileMenu}>
                <span className="flex items-center gap-2">
                  Validator
                </span>
              </MobileNavLink>}
                
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
  onClick,
  disabled
}: { 
  href: string; 
  children: React.ReactNode; 
  external?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  const baseStyles = 'relative font-display text-text text-white/80 hover:text-primary-default transition-colors py-2';
  const disabledStyles = 'cursor-not-allowed opacity-70 hover:text-white/80';

  if (disabled) {
    return (
      <span className={`${baseStyles} ${disabledStyles} flex items-center gap-1`}>
        {children}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="14" 
          height="14" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="opacity-70"
        >
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      </span>
    );
  }

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
  onClick,
  disabled
}: { 
  href: string; 
  children: React.ReactNode; 
  external?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLAnchorElement>) => void;
  disabled?: boolean;
}) => {
  const baseStyles = 'relative font-display text-[32px] text-white hover:text-primary-default transition-all duration-300 py-3 group';
  const disabledStyles = 'cursor-not-allowed opacity-70 hover:text-white';

  if (disabled) {
    return (
      <span className={`${baseStyles} ${disabledStyles}`}>
        <span className="relative flex items-center gap-2">
          {children}
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
            className="opacity-70"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </span>
      </span>
    );
  }

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