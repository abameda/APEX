import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Demo from "@/components/Demo";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0B]">
      <Navbar />
      <Hero />
      <Features />
      <Demo />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
