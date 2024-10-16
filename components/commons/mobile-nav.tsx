"use client";

import { CloseSquare, HambergerMenu } from "iconsax-react";
import { useState } from "react";
import Link from "next/link";
import { NavLink } from "@/components/types";

interface MobileNavProps {
  navLinks: NavLink[];
}

export default function MobileNav({ navLinks }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid place-items-center items-center md:hidden">
      <HambergerMenu
        onClick={() => setIsOpen(true)}
        className="cursor-pointer"
      />
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-deep-blue-opacity transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5">
          <CloseSquare 
            onClick={() => setIsOpen(false)}
            className="text-white text-2xl mb-5"
          />
          <nav className="flex flex-col">
            {navLinks.map((navLink, index) => (
              <Link
                key={index}
                href={navLink.url}
                className="text-white text-xl py-2"
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
