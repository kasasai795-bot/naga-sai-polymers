export default function AboutUs() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

        {/* Left Side */}
        <div>
          <p className="text-blue-700 font-semibold uppercase tracking-widest mb-3">
            About Us
          </p>

          <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
            Delivering Quality Polymer Packaging Solutions Since Day One
          </h2>

          <p className="text-gray-600 leading-8 mb-6">
            Naga Sai New Polymers is a trusted manufacturer of premium-quality
            polymer packaging products. We specialize in producing PP Woven Bags,
            PP Woven Fabric Rolls, HDPE Bags, Leno Bags, and BOPP Bags for
            industries across India.
          </p>

          <p className="text-gray-600 leading-8 mb-8">
            Our commitment to quality, advanced manufacturing processes, timely
            delivery, and customer satisfaction has helped us build long-term
            relationships with clients from agriculture, food processing,
            chemicals, fertilizers, and industrial sectors.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-100 rounded-xl p-5">
              <h3 className="text-3xl font-bold text-blue-700">5+</h3>
              <p className="text-gray-600 mt-2">Product Categories</p>
            </div>

            <div className="bg-gray-100 rounded-xl p-5">
              <h3 className="text-3xl font-bold text-blue-700">100%</h3>
              <p className="text-gray-600 mt-2">Quality Commitment</p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-blue-900 rounded-3xl p-10 text-white shadow-2xl">
          <h3 className="text-3xl font-bold mb-6">
            Why Businesses Choose Us
          </h3>

          <ul className="space-y-5">
            <li>✔ Premium Raw Materials</li>
            <li>✔ Modern Manufacturing</li>
            <li>✔ Custom Sizes & Printing</li>
            <li>✔ Timely Delivery</li>
            <li>✔ Competitive Pricing</li>
            <li>✔ Dedicated Customer Support</li>
          </ul>
        </div>

      </div>
    </section>
  );
}