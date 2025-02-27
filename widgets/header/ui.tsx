import Link from "next/link";

export const Header = () => {
  return (
    <header className="h-24 flex justify-center items-center px-8">
      <div className="flex items-center justify-between gap-4 w-full">
        <div>
          <span className="text-h3bold font-display absolute rotate-[-6deg]">BeraFlowDao</span>
        </div>
        <div className="flex items-center gap-10">
          {/* <Link href="/#" className="text-body font-display">
            Staking
          </Link>
          <Link href="/#" className="text-body font-display">
            Swap
          </Link>
          <Link href="/treasury" className="text-body font-display">
            Treasury
          </Link> */}
          <Link
            href="https://beraflowdao.gitbook.io/beraflowdao"
            rel="noopener noreferrer"
            target="_blank"
            className="text-body font-display flex"
          >
            Documentation 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
          </Link>
        </div>
        {/* <div>
          <ConnectButton />
        </div> */}
      </div>
    </header>
  );
};
