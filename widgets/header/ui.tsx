import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="container mx-auto h-20 flex justify-between items-center px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            {/* <Image 
              src="/logo.png" 
              alt="BeraFlow Logo" 
              width={32} 
              height={32} 
              className="w-8 h-8"
            /> */}
            <span className="text-h3bold font-display text-white bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              BeraFlowDao
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <NavLink href="/sale">Sale</NavLink>
          <NavLink href="/staking">Staking</NavLink>
          <NavLink href="/swap">Swap</NavLink>
          <NavLink href="/treasury">Treasury</NavLink>
          <NavLink href="https://beraflowdao.gitbook.io/beraflowdao" external>
            Docs
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) => {
  const baseStyles = "relative font-display text-text text-white/80 hover:text-white transition-colors py-2";
  const hoverLineStyles = "after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300";

  if (external) {
    return (
      <Link
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        className={`${baseStyles} ${hoverLineStyles} flex items-center gap-1`}
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
          <path d="M7 7h10v10"/>
          <path d="M7 17 17 7"/>
        </svg>
      </Link>
    );
  }

  return (
    <Link href={href} className={`${baseStyles} ${hoverLineStyles}`}>
      {children}
    </Link>
  );
};
