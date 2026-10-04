"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-4"
            onClick={closeMenu}
          >
            <Image
              src="/images/logo/logo.jpg"
              alt="Naga Sai New Polymers"
              width={68}
              height={68}
              className="rounded-full"
            />

            <div>
              <h1 className="text-xl font-extrabold tracking-wide text-[#0B3D91] leading-5">
                NAGA SAI
              </h1>

              <p className="text-sm tracking-[3px] text-gray-700 font-semibold mt-1">
                NEW POLYMERS
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">

            <Link
              href="/"
              className="font-medium text-gray-700 hover:text-[#0B3D91] transition duration-300"
            >
              Home
            </Link>

            <Link
              href="/products"
              className="font-medium text-gray-700 hover:text-[#0B3D91] transition duration-300"
            >
              Products
            </Link>

            <Link
              href="/contact"
              className="font-medium text-gray-700 hover:text-[#0B3D91] transition duration-300"
            >
              Contact
            </Link>

            <Link href="/quote">
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                Request Quote
              </button>
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden relative z-[60]">

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center justify-center w-12 h-12 text-[#0B3D91] rounded-lg hover:bg-blue-50 active:bg-blue-100 transition"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >

              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}

            </button>

          </div>

        </div>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white py-4">

            <div className="flex flex-col gap-2">

              <Link
                href="/"
                onClick={closeMenu}
                className="px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-[#0B3D91] transition"
              >
                Home
              </Link>

              <Link
                href="/products"
                onClick={closeMenu}
                className="px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-[#0B3D91] transition"
              >
                Products
              </Link>

              <Link
                href="/contact"
                onClick={closeMenu}
                className="px-4 py-3 rounded-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-[#0B3D91] transition"
              >
                Contact
              </Link>

              <Link
                href="/quote"
                onClick={closeMenu}
                className="mx-4 mt-2 text-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-300"
              >
                Request Quote
              </Link>

            </div>

          </div>
        )}

      </div>

    </nav>
  );
}