"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  const heroImages = [
    {
      src: "/images/pp-woven.jpg",
      alt: "PP Woven Bags",
    },
    {
      src: "/images/pp-fabric-roll.jpg",
      alt: "PP Woven Fabric Rolls",
    },
    {
      src: "/images/bopp.jpg",
      alt: "BOPP Bags",
    },
    {
      src: "/images/hdpe.jpg",
      alt: "HDPE Bags",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(
        (prev) => (prev + 1) % heroImages.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-blue-100">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <div>

            <span className="inline-block bg-blue-100 text-[#0B3D91] px-5 py-2 rounded-full text-sm font-semibold tracking-[2px]">
              TRUSTED PACKAGING MANUFACTURER
            </span>

            <h1 className="text-6xl font-extrabold leading-tight text-gray-900 mt-8">

              Reliable Packaging

              <br />

              <span className="text-[#0B3D91]">
                Solutions
              </span>

              <br />

              for Every Industry

            </h1>

            <p className="mt-8 text-gray-600 text-lg leading-9 max-w-xl">
              We manufacture high-quality PP woven sacks, BOPP laminated
              bags, and customized packaging solutions engineered for
              durability, reliability, and superior performance across
              agriculture, food, chemicals, fertilizers, cement, and
              industrial applications.
            </p>

            {/* Trust Points */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">

              <div className="flex items-center gap-3">

                <CheckCircle
                  className="text-green-600"
                  size={22}
                />

                <span className="font-medium">
                  Premium Quality
                </span>

              </div>

              <div className="flex items-center gap-3">

                <CheckCircle
                  className="text-green-600"
                  size={22}
                />

                <span className="font-medium">
                  Bulk Manufacturing
                </span>

              </div>

              <div className="flex items-center gap-3">

                <CheckCircle
                  className="text-green-600"
                  size={22}
                />

                <span className="font-medium">
                  Custom Sizes Available
                </span>

              </div>

              <div className="flex items-center gap-3">

                <CheckCircle
                  className="text-green-600"
                  size={22}
                />

                <span className="font-medium">
                  PAN India Supply
                </span>

              </div>

            </div>

            {/* Buttons */}

            <div className="flex flex-wrap gap-5 mt-12">

              <Link href="/quote">

                <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">

                  Request Quote

                  <ArrowRight size={20} />

                </button>

              </Link>

              <Link href="/products">

                <button className="border-2 border-[#0B3D91] text-[#0B3D91] hover:bg-[#0B3D91] hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300">

                  View Products

                </button>

              </Link>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-3 gap-6 mt-16">

              <div>

                <h2 className="text-4xl font-bold text-[#0B3D91]">
                  100%
                </h2>

                <p className="text-gray-500 mt-2">
                  Quality Focus
                </p>

              </div>

              <div>

                <h2 className="text-4xl font-bold text-[#0B3D91]">
                  24×7
                </h2>

                <p className="text-gray-500 mt-2">
                  Production
                </p>

              </div>

              <div>

                <h2 className="text-4xl font-bold text-[#0B3D91]">
                  PAN
                </h2>

                <p className="text-gray-500 mt-2">
                  India Supply
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative flex justify-center items-center">

            {/* Background Circle */}

            <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-100 blur-2xl opacity-80"></div>

            {/* Decorative Circle */}

            <div className="absolute w-[430px] h-[430px] rounded-full border-[25px] border-blue-200"></div>

            {/* Product Image Slider */}

            <div className="relative z-10 w-[500px] h-[500px]">

              {heroImages.map((image, index) => (

                <Image
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  width={500}
                  height={500}
                  priority={index === 0}
                  className={`absolute inset-0 w-full h-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.25)] transition-all duration-700 ${
                    currentImage === index
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                  }`}
                />

              ))}

              {/* Floating Badge */}

              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl px-6 py-4 border border-gray-100">

                <p className="text-[#0B3D91] font-bold text-lg">
                  Premium Quality
                </p>

                <p className="text-gray-500 text-sm mt-1">
                  Industrial Packaging
                </p>

              </div>

              {/* Bottom Badge */}

              <div className="absolute -bottom-6 -left-8 bg-orange-500 text-white px-6 py-4 rounded-2xl shadow-xl">

                <h3 className="text-2xl font-bold">
                  24×7
                </h3>

                <p className="text-sm">
                  Manufacturing
                </p>

              </div>

              {/* Slider Dots */}

              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">

                {heroImages.map((_, index) => (

                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      currentImage === index
                        ? "bg-[#0B3D91] w-6"
                        : "bg-gray-300 w-2.5"
                    }`}
                    aria-label={`Show image ${index + 1}`}
                  />

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}