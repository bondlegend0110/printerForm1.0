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
    <div className="w-full fixed flex items-center justify-between px-12 py-8 z-50 text-black">
      <Link href="/">
        <p>Printer Form (Logo here eventually)</p>
      </Link>
      <div className="flex items-center space-x-10">
        {pathname !== "/" && <NavbarItem text="Home" href="/" />}
        <NavbarItem text="How To" href="how-to" />
        <NavbarItem text="Resources" href="resources" />
        <NavbarItem text="About" href="about" />
        <NavbarItem text="Upload" href="upload" />
      </div>
    </div>
  );
};
