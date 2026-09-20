"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919177844081?text=Hello%20Naga%20Sai%20New%20Polymers,%20I%20would%20like%20to%20know%20more%20about%20your%20packaging%20products."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-5 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105">

        <MessageCircle size={28} />

        <span className="hidden md:block font-semibold">
          Chat on WhatsApp
        </span>

      </div>
    </a>
  );
}