import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-900 text-white px-10 py-5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo / Company Name */}
        <h1 className="text-2xl font-bold">
          Naga Sai New Polymers
        </h1>

        {/* Navigation */}
        <div className="flex items-center gap-8">

          <Link href="/" className="hover:text-yellow-300">
            Home
          </Link>

          <Link href="/products" className="hover:text-yellow-300">
            Products
          </Link>

          <Link href="/contact" className="hover:text-yellow-300">
            Contact
          </Link>

          <Link href="/admin" className="hover:text-yellow-300">
            Admin
          </Link>

          <Link href="/quote">
            <button className="bg-white text-blue-900 px-5 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">
              Request Quote
            </button>
          </Link>

        </div>
      </div>
    </nav>
  );
}