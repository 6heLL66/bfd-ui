import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
    <div className="relative group-hover/link:scale-105 transition-transform duration-300">
      <div className="absolute -inset-[1px] bg-gradient-to-r from-primary-default to-primary-default rounded-lg blur-sm group-hover/link:blur-md transition-all duration-500" />
      <div className="relative bg-black rounded-lg border border-white/20 p-1 backdrop-blur-sm group-hover/link:border-primary-default/40 transition-all duration-500">
        <div className="relative w-9 h-9">
          <Image
            src="/images/logo_bear.png"
            alt="BeraFlow Logo"
            fill
            className="object-contain transition-transform duration-300"
          />
        </div>
      </div>
      {/* Glow effect */}
      <div className="absolute -inset-2 bg-primary-default/30 rounded-xl blur-xl opacity-0 group-hover/link:opacity-100 transition-opacity duration-500" />
    </div>
  );
};

export const Header = () => {
  return (
    <header className="backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="container mx-auto h-20 flex justify-between items-center px-4">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="group/link flex items-center gap-4 transition-all duration-300"
          >
            <Logo />

            <span className="text-h3bold font-display">
              <span className="bg-gradient-to-r from-white via-primary-default to-primary-hover bg-clip-text text-transparent group-hover/link:from-primary-default group-hover/link:to-white transition-all duration-300">
                BeraFlowDao
              </span>
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

const NavLink = ({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) => {
  const baseStyles =
    "relative font-display text-text text-white/80 hover:text-primary-default transition-colors py-2";

  if (external) {
    return (
      <Link
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        className={`${baseStyles} flex items-center gap-1`}
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
    <Link href={href} className={baseStyles}>
      {children}
    </Link>
  );
};
