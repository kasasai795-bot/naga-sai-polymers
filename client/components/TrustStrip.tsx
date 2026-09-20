import {
  Factory,
  PackageCheck,
  Palette,
  Truck,
  ShieldCheck,
} from "lucide-react";

export default function TrustStrip() {
  const items = [
    {
      icon: Factory,
      title: "Manufacturer",
    },
    {
      icon: PackageCheck,
      title: "Bulk Orders",
    },
    {
      icon: Palette,
      title: "Custom Printing",
    },
    {
      icon: Truck,
      title: "PAN India Supply",
    },
    {
      icon: ShieldCheck,
      title: "Premium Quality",
    },
  ];

  return (
    <section className="bg-[#0B3D91] py-8">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex flex-col items-center text-center text-white"
              >
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4">

                  <Icon size={30} />

                </div>

                <h3 className="font-semibold">
                  {item.title}
                </h3>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}