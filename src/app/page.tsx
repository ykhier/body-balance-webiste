// src/app/page.tsx
// Main page — assembles all sections in order

import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TargetAudience from "@/components/sections/TargetAudience";
import Services from "@/components/sections/Services";
import Payment from "@/components/sections/Payment";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      {/* ── Fixed top navigation ── */}
      <Navbar />

      <main>
        {/* 1. Hero */}
        <Hero />

        {/* 2. About */}
        <About />

        {/* 3. Target Audience */}
        <TargetAudience />

        {/* 4. Services */}
        <Services />

        {/* 6. Payment (UI only) */}
        <Payment />

        {/* 6. Contact */}
        <Contact />
      </main>

      {/* ── Footer ── */}
      <Footer />
    </>
  );
}
