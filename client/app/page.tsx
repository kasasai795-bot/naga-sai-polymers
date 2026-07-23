import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import Products from "./components/Products";
import WhyChooseUs from "./components/WhyChooseUs";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <main>
     <Navbar />
    <Hero />

    <AboutUs />

      <Products />

      <WhyChooseUs />

      <ContactSection />

     <Footer />
    </main>
  );
}