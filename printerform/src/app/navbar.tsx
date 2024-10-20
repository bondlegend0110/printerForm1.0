"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavbarItemProps = {
  text: string;
  href: string;
};

const NavbarItem = ({ text, href }: NavbarItemProps) => {
  return (
    <Link href={href} className="hover:text-gray-300 transition duration-200">
      <p className="text-lg">{text}</p>
    </Link>
  );
};

export const Navbar = () => {
  const pathname = usePathname();

  const EXCLUDED_PATHNAMES = ["/upload", "/export"];
  if (
    EXCLUDED_PATHNAMES.some((excludedPathname) => pathname === excludedPathname)
  ) {
    return null;
  }

  return (
    <nav className="w-full fixed flex items-center justify-between px-12 pb-12 pt-8 z-50 text-black  bg-white">
      <Link href="/">
        <img src="/logo.png" className="w-[100px] shadow-none" alt="" />
      </Link>
      <div className="flex items-center space-x-10 ">
        <NavbarItem text="Instructions" href="how-to" />
        <NavbarItem text="Resources" href="resources" />
        <NavbarItem text="About" href="about" />
        <a
          href="/upload"
          className="bg-red-600 rounded-xl px-[8px] py-[12px] text-white drop-shadow "
        >
          Upload
        </a>
      </div>
    </nav>
  );
};
