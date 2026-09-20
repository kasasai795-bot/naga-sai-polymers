"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-20">

          {/* Logo */}

          <Link
            href="/"
            className="flex items-center gap-4"
          >

            <Image
              src="/images/logo/logo.jpg"
              alt="Naga Sai New Polymers"
              width={68}
              height={8}
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

          {/* Navigation */}

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

            <Link
              href="/quote"
            >
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                                Request Quote
              </button>
            </Link>

          </div>

          {/* Mobile Menu Button (Placeholder) */}

          <div className="md:hidden">

            <button className="text-[#0B3D91]">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
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

            </button>

          </div>

        </div>

      </div>

    </nav>
  );
}