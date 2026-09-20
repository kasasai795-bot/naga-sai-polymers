import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function Products() {
  const products = [
    {
      name: "PP Woven Bags",
      image: "/images/pp-woven.jpg",
      description:
        "High-strength woven polypropylene bags for industrial, agricultural and commercial packaging.",
      uses: ["Agriculture", "Fertilizer", "Cement"],
    },
    {
      name: "PP Woven Fabric Rolls",
      image: "/images/pp-fabric-roll.jpg",
      description:
        "Premium woven polypropylene fabric rolls used for manufacturing durable packaging products.",
      uses: ["Bag Making", "Industrial", "Packaging"],
    },
    {
      name: "HDPE Bags",
      image: "/images/hdpe.jpg",
      description:
        "Durable HDPE bags offering excellent strength and moisture resistance.",
      uses: ["Food", "Chemicals", "Industrial"],
    },
    {
      name: "Leno Bags",
      image: "/images/leno.jpg",
      description:
        "Breathable mesh bags for vegetables, fruits and agricultural products.",
      uses: ["Onions", "Potatoes", "Vegetables"],
    },
    {
      name: "BOPP Bags",
      image: "/images/bopp.jpg",
      description:
        "Premium laminated BOPP bags with attractive printing and excellent durability.",
      uses: ["Rice", "Seeds", "Animal Feed"],
    },
  ];

  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-16">

          <span className="inline-block bg-blue-100 text-[#0B3D91] px-5 py-2 rounded-full text-sm font-semibold tracking-[2px]">
            PRODUCT RANGE
          </span>

          <h2 className="text-5xl font-bold mt-6 text-gray-900">
            Premium Packaging Solutions
          </h2>

          <p className="text-gray-600 mt-6 max-w-3xl mx-auto leading-8">
           We manufacture high-quality PP woven sacks, BOPP laminated bags, and customized packaging solutions engineered for durability, reliability, and superior performance across agriculture, food, chemicals, fertilizers, cement, and industrial application
          </p>

        </div>

        {/* Products */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {products.map((product) => (

            <div
              key={product.name}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3 border border-gray-100"
            >

              <div className="relative h-72 overflow-hidden bg-gray-50">

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-6 hover:scale-110 transition-all duration-500"
                />

              </div>

              <div className="p-8">

                <h3 className="text-2xl font-bold text-gray-900">
                  {product.name}
                </h3>

                <p className="text-gray-600 mt-4 leading-7">
                  {product.description}
                </p>

                {/* Applications */}

                <div className="mt-6 space-y-3">

                  {product.uses.map((use) => (

                    <div
                      key={use}
                      className="flex items-center gap-3"
                    >

                      <CheckCircle
                        size={18}
                        className="text-green-600"
                      />

                      <span className="text-gray-700">
                        {use}
                      </span>

                    </div>

                  ))}

                </div>

                {/* Divider */}

<div className="border-t border-gray-200 my-6"></div>

{/* Custom Sizes */}

<div className="bg-blue-50 rounded-xl p-4 border border-blue-100">

  <h4 className="font-semibold text-[#0B3D91]">
    Available in Custom Sizes
  </h4>

  <p className="text-sm text-gray-600 mt-2 leading-6">
    We manufacture bags according to your required size,
    capacity, GSM, color and printing specifications.
  </p>

</div>

<Link href="/quote">

  <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">

    Request Quote

    <ArrowRight size={18} />

  </button>

</Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}