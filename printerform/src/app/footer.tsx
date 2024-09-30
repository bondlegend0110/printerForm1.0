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
    <div className="flex items-center justify-between px-[24px] bg-[#eeeeee] w-full min-h-48 text-black">
      <div>logo</div>
      <div>right side</div>
    </div>
  );
};

export default Footer;
