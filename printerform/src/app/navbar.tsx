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
    <nav className="w-full fixed flex items-center justify-between px-12 pb-8 pt-4 z-50 text-black  bg-white">
      <Link href="/">
        <img
          src="https://printerform1.github.io/printerForm1.0/_next/static/media/logo.png"
          className="w-[80px] shadow-none transform transition-all duration-300 ease-in-out hover:scale-110"
          alt=""
        />
      </Link>
      <div className="flex items-center space-x-10 ">
        <NavbarItem text="Instructions" href="how-to" />
        <NavbarItem text="Resources" href="resources" />
        <NavbarItem text="About" href="about" />
        <a
          href="upload"
          className="rounded-xl px-[8px] py-[12px] text-white drop-shadow transform transition-all duration-300 ease-in-out hover:bg-red-500 hover:scale-105"
          style={{ backgroundColor: "#D80029" }}
        >
          Upload
        </a>
      </div>
    </nav>
  );
};
