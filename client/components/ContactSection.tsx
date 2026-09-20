"use client";

import {
  MapPin,
  Phone,
  Mail,
  Factory,
  Navigation,
} from "lucide-react";

export default function ContactSection() {
  return (
    <section className="bg-gray-50">

      {/* ================= HERO ================= */}

      <div className="bg-gradient-to-r from-[#0B3D91] via-[#1456C2] to-[#0B3D91]">

        <div className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">

          <p className="uppercase tracking-[6px] text-blue-200 font-semibold">
            CONTACT
          </p>

          <h2 className="text-5xl md:text-6xl font-bold text-white mt-5">
            Get In Touch
          </h2>

          <div className="w-24 h-1 bg-white mx-auto rounded-full mt-7"></div>

          <p className="text-blue-100 max-w-3xl mx-auto mt-8 text-lg leading-8">
            Let's discuss your packaging requirements.
            Whether you're looking for premium packaging
            solutions, bulk manufacturing or product enquiries,
            our team is always ready to help.
          </p>

        </div>

      </div>

      {/* ============ FLOATING CONTAINER ============ */}

      <div className="max-w-7xl mx-auto px-6">

        <div className="-mt-20 bg-white rounded-[32px] shadow-2xl overflow-hidden">

          {/* ================= TOP STRIP ================= */}

          <div className="grid lg:grid-cols-4 md:grid-cols-2">

            {/* Factory */}

            <div className="border-r border-b lg:border-b-0 border-gray-200 p-8 hover:bg-blue-50 transition-all">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">

                  <MapPin
                    className="text-blue-700"
                    size={26}
                  />

                </div>

                <div>

                  <h3 className="font-bold text-xl">
                    Factory
                  </h3>

                  <p className="text-gray-600 text-sm mt-1">
                    Hyderabad, Telangana
                  </p>

                </div>

              </div>

            </div>

            {/* Sales */}

            <div className="border-r border-b lg:border-b-0 border-gray-200 p-8 hover:bg-blue-50 transition-all">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">

                  <Phone
                    className="text-blue-700"
                    size={26}
                  />

                </div>

                <div>

                  <h3 className="font-bold text-xl">
                    Sales
                  </h3>

                  <a
                    href="tel:+919177844081"
                    className="block text-blue-700 hover:underline text-sm mt-1"
                  >
                    +91 9177844081
                  </a>

                  <a
                    href="tel:+919246523689"
                    className="block text-blue-700 hover:underline text-sm"
                  >
                    +91 9246523689
                  </a>

                </div>

              </div>

            </div>
                        {/* Email */}

            <div className="border-r border-b lg:border-b-0 border-gray-200 p-8 hover:bg-blue-50 transition-all">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">

                  <Mail
                    className="text-blue-700"
                    size={26}
                  />

                </div>

                <div>

                  <h3 className="font-bold text-xl">
                    Email
                  </h3>

                  <a
                    href="mailto:nagasainewpolymers@gmail.com"
                    className="block text-blue-700 hover:underline text-sm mt-1 break-all"
                  >
                    nagasainewpolymers@gmail.com
                  </a>

                </div>

              </div>

            </div>

            {/* Manufacturing */}

            <div className="p-8 hover:bg-blue-50 transition-all">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">

                  <Factory
                    className="text-blue-700"
                    size={26}
                  />

                </div>

                <div>

                  <h3 className="font-bold text-xl">
                    Manufacturing
                  </h3>

                  <p className="text-gray-600 text-sm mt-1">
                    24×7 Production
                  </p>

                  <p className="text-gray-600 text-sm">
                    PAN India Supply
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* ================= CONTENT ================= */}

          <div className="grid lg:grid-cols-2">

            {/* LEFT */}

            <div className="p-12">

              <span className="uppercase tracking-[5px] text-blue-700 font-semibold">

                Factory Information

              </span>

              <h2 className="text-4xl font-bold text-gray-900 mt-4">

                Naga Sai New Polymers

              </h2>

              <p className="mt-6 text-gray-600 leading-8">

                We manufacture high-quality PP woven sacks, BOPP laminated bags, and customized packaging solutions engineered for durability, reliability, and superior performance across agriculture, food, chemicals, fertilizers, cement, and industrial applications.

                <br /><br />

                Our commitment is to deliver
                quality products with dependable service
                and long-term customer relationships.

              </p>

              <div className="mt-10 space-y-8">

                {/* Address */}

                <div className="flex gap-5">

                  <MapPin
                    className="text-blue-700 mt-1"
                    size={22}
                  />

                  <div>

                    <h4 className="font-semibold text-lg">

                      Factory Address

                    </h4>

                    <p className="text-gray-600 mt-2">

                      Hyderabad,
                      Telangana,
                      India

                    </p>

                  </div>

                </div>

                {/* Phone */}

                <div className="flex gap-5">

                  <Phone
                    className="text-blue-700 mt-1"
                    size={22}
                  />

                  <div>

                    <h4 className="font-semibold text-lg">

                      Sales Team

                    </h4>

                    <p className="text-gray-600 mt-2">

                      +91 9177844081

                      <br />

                      +91 9246523689

                    </p>

                  </div>

                </div>

                {/* Email */}

                <div className="flex gap-5">

                  <Mail
                    className="text-blue-700 mt-1"
                    size={22}
                  />

                  <div>

                    <h4 className="font-semibold text-lg">

                      Business Email

                    </h4>

                    <p className="text-gray-600 mt-2 break-all">

                      nagasainewpolymers@gmail.com

                    </p>

                  </div>

                </div>

              </div>

              <a
                href="https://maps.google.com/?q=Naga+Sai+New+Polymers"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 mt-12 bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl transition-all duration-300"
              >

                <Navigation size={20} />

                Get Directions

              </a>

            </div>

            {/* RIGHT */}
                        <div className="border-l border-gray-200 bg-gray-50">

              <div className="p-8 border-b border-gray-200 bg-white">

                <span className="uppercase tracking-[5px] text-blue-700 font-semibold">
                  Location
                </span>

                <h2 className="text-3xl font-bold text-gray-900 mt-3">
                  Find Our Factory
                </h2>

                <p className="text-gray-500 mt-3">
                  Visit our manufacturing facility or get directions instantly using Google Maps.
                </p>

              </div>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.599649320396!2d78.42119227462898!3d17.47886580016444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91bac138eff7%3A0x52d7122b63fda506!2sNaga%20Sai%20New%20Polymers!5e0!3m2!1sen!2sin!4v1785701817170!5m2!1sen!2sin"
                width="100%"
                height="620"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />

            </div>

          </div>

        </div>

      </div>

      {/* Bottom Branding */}

      <div className="mt-24 bg-[#0B3D91]">

        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">

          <div>

            <h3 className="text-3xl font-bold text-white">
              Naga Sai New Polymers
            </h3>

            <p className="text-blue-100 mt-2">
              Trusted Manufacturer of Premium Packaging Solutions.
            </p>

          </div>

          <div className="text-center md:text-right">

            <p className="text-blue-100 leading-7">
              Delivering quality, reliability and customer satisfaction
              through innovative packaging products.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}