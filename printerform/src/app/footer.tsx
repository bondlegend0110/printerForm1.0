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
    <div className="flex items-center justify-end px-[24px] bg-[#ffffff] w-full min-h-40 text-black ">
      {/* <img src="logo.png" className="w-[100px] shadow-none" alt="" /> */}
      <div>
        <a href="mailto:printerform1@gmail.com" target="_blank">
          printerform1@gmail.com
        </a>{" "}
        |{" "}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScCbfCI4AGwUjoJ6NzdIvLrkpYKWgth8RgtbY9oTs-fHyMbQw/viewform"
          target="_blank"
        >
          Feedback Form
        </a>
      </div>
    </div>
  );
};

export default Footer;
