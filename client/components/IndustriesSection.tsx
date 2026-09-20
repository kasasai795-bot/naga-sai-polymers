import {
  Wheat,
  Factory,
  Building2,
  Truck,
  Package,
  ShoppingBag,
} from "lucide-react";

export default function IndustriesSection() {
  const industries = [
    {
      icon: Wheat,
      title: "Agriculture",
      desc: "Packaging solutions for seeds, grains, fertilizers and agricultural products.",
    },
    {
      icon: Package,
      title: "Food Processing",
      desc: "Safe and durable bags for rice, flour, sugar and food products.",
    },
    {
      icon: Building2,
      title: "Cement Industry",
      desc: "Strong woven bags designed for heavy-duty cement packaging.",
    },
    {
      icon: Factory,
      title: "Industrial Packaging",
      desc: "Reliable packaging for chemicals, minerals and industrial materials.",
    },
    {
      icon: ShoppingBag,
      title: "Retail Packaging",
      desc: "High-quality printed bags that enhance product presentation.",
    },
    {
      icon: Truck,
      title: "Bulk Supply",
      desc: "Large-scale manufacturing with reliable PAN India delivery.",
    },
  ];

  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="inline-block bg-blue-100 text-[#0B3D91] px-5 py-2 rounded-full text-sm font-semibold tracking-[2px]">
            INDUSTRIES WE SERVE
          </span>

          <h2 className="text-5xl font-bold mt-6 text-gray-900">
            Packaging Solutions
            <br />
            For Every Industry
          </h2>

          <p className="text-gray-600 mt-6 max-w-3xl mx-auto leading-8">
            Our products are trusted across agriculture, food processing,
            industrial manufacturing and commercial packaging applications.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {industries.map((industry) => {
            const Icon = industry.icon;

            return (
              <div
                key={industry.title}
                className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#0B3D91] text-white flex items-center justify-center mb-6">
                  <Icon size={30} />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {industry.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {industry.desc}
                </p>
              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}