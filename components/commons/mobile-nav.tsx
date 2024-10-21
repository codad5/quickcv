"use client";

import { CloseSquare, HambergerMenu } from "iconsax-react";
import { useState } from "react";
import { NavLink } from "@/components/types";
import { Link } from "nextjs13-progress";

interface MobileNavProps {
  navLinks: NavLink[];
}

export default function MobileNav({ navLinks }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid place-items-center items-center md:hidden z-50">
      <HambergerMenu
        onClick={() => setIsOpen(true)}
        className="cursor-pointer"
      />
      <div
        className={`fixed top-0 right-0 h-full w-dvw bg-deep-blue-opacity-2 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="w-full h-full py-5 px-12 flex flex-col justify-between place-items-end">
          <div className="h-[100px] w-full flex justify-end place-items-center">
            <CloseSquare
              onClick={() => setIsOpen(false)}
              className="text-white"
            />
          </div>
          <nav className="flex flex-col w-full flex-grow place-items-end space-y-1">
            {navLinks.map((navLink, index) => (
              <Link
                key={index}
                href={navLink.url}
                className="text-white text-xl py-2 border-r-2 border-r-white px-4 after:bg-white after:rounded-full after:w-3 after:h-3 relative after:absolute after:-right-1.5 after:top-1/2 after:-translate-y-1/2"
                onClick={() => setIsOpen(false)}
              >
                {navLink.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
