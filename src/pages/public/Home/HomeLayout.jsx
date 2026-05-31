import React from "react";
import Hero from "./Hero";
import FeaturedSection from "./FeaturedSection";
import Categories from "./Categories";
import ServiceShowcase from "./ServiceShowcase";
import WhyBookiSmart from "./WhyBookiSmart";
import Feedback from "./Feedback";
import StatsSection from "./StatsSection";
import PricingSection from "./PricingSection";
import FinalCTA from "./FinalCTA";

const HomeLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <main className="relative">
        <Hero />
        <FeaturedSection />
        <Categories />
        <ServiceShowcase />
        <WhyBookiSmart />
        <Feedback />
        <StatsSection />
        <PricingSection />
        <FinalCTA />
      </main>
    </div>
  );
};

export default HomeLayout;