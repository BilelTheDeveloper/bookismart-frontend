import React from "react";
import Navbar from "../../../components/Navbar";
import Hero from "./Hero";
import Categories from "./Categories";
import ServiceShowcase from "./ServiceShowcase";
import WhyBookiSmart from "./WhyBookiSmart"; // The new dual-benefit section
import Feedback from "./Feedback";
const HomeLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Global Navigation */}
   

      <main>
        {/* 2. Hero: Dark Navy Section (The Hook) */}
        <Hero />

        {/* 3. Categories: The Overlapping Smart Grid 
            z-20 ensures it floats over the hero's bottom gradient
        */}
        <div className="relative z-20">
          <Categories />
        </div>

        {/* 4. Service Showcase: The "Web inside a Web" logic
            Light Gray background (bg-slate-50) for visual separation
        */}
        <ServiceShowcase />

        {/* 5. Why BookiSmart: Dual-Benefit Grid
            Explains the "Win-Win" for both Business Owners and Clients
        */}
        <WhyBookiSmart />

        {/* 6. Upcoming Sections
            Next: <Pricing /> (Flouci + 3-month trial) and <Footer />
        */
        <Feedback />
        }
      </main>
    </div>
  );
};

export default HomeLayout;