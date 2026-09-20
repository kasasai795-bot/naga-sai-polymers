import {
  Factory,
  Truck,
  BadgeCheck,
  Palette,
  Headset,
  Boxes,
} from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Factory,
      title: "Advanced Manufacturing",
      description:
        "Modern production processes ensuring consistent quality and reliable output.",
    },
    {
      icon: BadgeCheck,
      title: "Premium Quality",
      description:
        "High-quality raw materials and strict quality checks for every product.",
    },
    {
      icon: Palette,
      title: "Custom Printing",
      description:
        "Custom sizes, GSM, colors and printing options tailored to your requirements.",
    },
    {
      icon: Truck,
      title: "PAN India Supply",
      description:
        "Reliable delivery network serving customers across India.",
    },
    {
      icon: Boxes,
      title: "Bulk Manufacturing",
      description:
        "Capable of handling large volume orders for industrial and commercial clients.",
    },
    {
      icon: Headset,
      title: "Customer Support",
      description:
        "Dedicated assistance from enquiry to delivery for a smooth experience.",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-16">

          <span className="inline-block bg-blue-100 text-[#0B3D91] px-5 py-2 rounded-full text-sm font-semibold tracking-[2px]">
            WHY CHOOSE US
          </span>

          <h2 className="text-5xl font-bold mt-6 text-gray-900">
            Premium PP Woven Packaging Solutions
            <br />
            You Can Trust
          </h2>

          <p className="text-gray-600 mt-6 max-w-3xl mx-auto leading-8">
            We manufacture high-quality PP woven sacks, BOPP laminated bags, and customized packaging solutions engineered for durability, reliability, and superior performance across agriculture, food, chemicals, fertilizers, cement, and industrial applications.
          </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (

              <div
                key={feature.title}
                className="bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 p-8"
              >

                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6">

                  <Icon
                    size={32}
                    className="text-[#0B3D91]"
                  />

                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {feature.description}
                </p>

              </div>

            );
          })}

        </div>

      </div>

    </section>
  );
}