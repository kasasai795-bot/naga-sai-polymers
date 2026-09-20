import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Products from "../components/Products";
import WhyChooseUs from "../components/WhyChooseUs";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import IndustriesSection from "@/components/IndustriesSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import TopBar from "@/components/TopBar";

export default function Home() {
  return (
    <>
     <TopBar />
      <Navbar />

      <Hero />

      <TrustStrip />

      <WhyChooseUs />

      <Products />

      <IndustriesSection />

      <ContactSection />

      <Footer />
        <WhatsAppButton />
    </>
  );
}