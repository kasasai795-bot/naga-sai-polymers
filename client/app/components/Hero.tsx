import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Welcome Text */}
        <p className="text-blue-700 font-semibold uppercase tracking-[4px] mb-4">
          Welcome to
        </p>

        {/* Company Name */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
          Naga Sai New Polymers
        </h1>

        {/* Highlight Tagline */}
        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
          Your Trusted Partner for
          <br />
          <span className="text-orange-500">
            High-Quality Polymer Packaging Solutions
          </span>
        </h2>

        {/* Description */}
        <p className="max-w-4xl mx-auto text-lg text-gray-600 leading-8 mb-12">
          We specialize in manufacturing premium-quality{" "}
          <strong>PP Woven Bags</strong>,{" "}
          <strong>HDPE Bags</strong>,{" "}
          <strong>Leno Bags</strong>, and{" "}
          <strong>BOPP Bags</strong> designed to meet the packaging needs of
          various industries. Our commitment to quality, durability,
          customization, and timely delivery has made us a trusted packaging
          partner for businesses across India.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <Link href="/quote">
            <button className="bg-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition duration-300">
              Request a Quote
            </button>
          </Link>

          <Link href="/products">
            <button className="border-2 border-blue-900 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 hover:text-white transition duration-300">
              View Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}