import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import CaseStudies from "@/components/CaseStudies";
import TechStack from "@/components/TechStack";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main id="main" className="min-h-screen">
        <Hero />
        <About />
        <Services />
        <Process />
        <CaseStudies />
        <TechStack />
        <Testimonials />
        <WhyChooseUs />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
