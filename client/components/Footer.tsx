import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0B3D91] text-white">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Company */}

          <div>

            <div className="flex items-center gap-4 mb-6">

              <Image
                src="/images/logo/logo.jpg"
                alt="Naga Sai New Polymers"
                width={60}
                height={60}
                className="rounded-full bg-white p-1"
              />

              <div>

                <h3 className="text-xl font-bold">
                  Naga Sai
                </h3>

                <p className="text-blue-200 text-sm">
                  New Polymers
                </p>

              </div>

            </div>

            <p className="text-blue-100 leading-7">
              We manufacture high-quality PP woven sacks, BOPP laminated bags, and customized packaging solutions engineered for durability, reliability, and superior performance across agriculture, food, chemicals, fertilizers, cement, and industrial applications.
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-semibold mb-6">
              Quick Links
            </h3>

            <div className="space-y-4">

              <Link href="/" className="block hover:text-orange-400 transition">
                Home
              </Link>

              <Link href="/products" className="block hover:text-orange-400 transition">
                Products
              </Link>

              <Link href="/contact" className="block hover:text-orange-400 transition">
                Contact
              </Link>

              <Link href="/quote" className="block hover:text-orange-400 transition">
                Request Quote
              </Link>

            </div>

          </div>

          {/* Products */}

          <div>

            <h3 className="text-xl font-semibold mb-6">
              Our Products
            </h3>

            <div className="space-y-4 text-blue-100">

              <p>PP Woven Bags</p>

              <p>HDPE Bags</p>

              <p>Leno Bags</p>

              <p>BOPP Bags</p>

              <p>PP Woven Fabric Rolls</p>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-semibold mb-6">
              Contact
            </h3>

            <div className="space-y-5">

              <div className="flex gap-3">

                <Phone className="text-orange-400 mt-1" size={18} />

                <div>

                  <p>+91 9177844081</p>

                  <p>+91 9246523689</p>

                </div>

              </div>

              <div className="flex gap-3">

                <Mail className="text-orange-400 mt-1" size={18} />

                <p className="break-all">
                  nagasainewpolymers@gmail.com
                </p>

              </div>

              <div className="flex gap-3">

                <MapPin className="text-orange-400 mt-1" size={18} />

                <p>
                  Hyderabad,
                  <br />
                  Telangana, India
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-blue-700 mt-14 pt-8 text-center text-blue-200">

          <p>
            © 2026 Naga Sai New Polymers. All Rights Reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}