import Image from "next/image";

export default function Products() {
  const products = [
    {
      name: "PP Woven Bags",
      image: "/images/pp-woven.jpg",
      description:
        "High-strength woven polypropylene bags for industrial, agricultural, and commercial packaging.",
    },
    {
      name: "PP Woven Fabric Rolls",
      image: "/images/pp-fabric-roll.jpg",
      description:
        "Premium woven polypropylene fabric rolls used in manufacturing durable packaging products.",
    },
    {
      name: "HDPE Bags",
      image: "/images/hdpe.jpg",
      description:
        "Durable HDPE bags offering excellent strength and moisture resistance for multiple industries.",
    },
    {
      name: "Leno Bags",
      image: "/images/leno.jpg",
      description:
        "Breathable mesh bags ideal for packaging fruits, vegetables, and agricultural products.",
    },
    {
      name: "BOPP Bags",
      image: "/images/bopp.jpg",
      description:
        "Premium laminated BOPP bags with high-quality printing for attractive product packaging.",
    },
  ];

  return (
    <section className="py-20 px-10 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-4">
        Our Products
      </h2>

      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        We manufacture premium-quality polymer packaging solutions designed
        for durability, reliability, and superior performance across multiple
        industries.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.name}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="relative w-full h-60">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                {product.name}
              </h3>

              <p className="text-gray-600 leading-7">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}