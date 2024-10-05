"use client";

import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  const EXCLUDED_PATHNAMES = ["/upload", "/export"];
  if (
    EXCLUDED_PATHNAMES.some((excludedPathname) => pathname === excludedPathname)
  ) {
    return null;
  }

  return (
    <div className="flex items-center justify-between px-[24px] bg-[#ffffff] w-full min-h-40 text-black ">
      <div>logo</div>
      <div>right side</div>
    </div>
  );
};

export default Footer;
