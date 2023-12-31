import Logo from "@/app/images/logo.svg";
import GitHubLogo from "@/app/images/github.svg";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="flex justify-center border-b-2 border-slate-800 bg-slate-900 px-8 py-4">
      <nav className="flex w-full max-w-5xl flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-3">
          <Image src={Logo} alt="Street Exchange Logo" width={32} height={32} />
          <div className="text-xl">Street Exchange</div>
        </div>
        <div>
          <a
            href="https://github.com/sayamsamal/street-exchange"
            rel="noreferrer"
            target="_blank"
          >
            <Image src={GitHubLogo} alt="GitHub Logo" width={32} height={32} />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
