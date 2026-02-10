import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";

// Lazy load below-the-fold components
const Features = dynamic(() => import("@/components/Features"), {
  loading: () => <div className="min-h-[50vh]" />,
});
const Demo = dynamic(() => import("@/components/Demo"), {
  loading: () => <div className="min-h-[50vh]" />,
});
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="min-h-[50vh]" />,
});
const Pricing = dynamic(() => import("@/components/Pricing"), {
  loading: () => <div className="min-h-[50vh]" />,
});
const FAQ = dynamic(() => import("@/components/FAQ"), {
  loading: () => <div className="min-h-[50vh]" />,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="min-h-[20vh]" />,
});

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
