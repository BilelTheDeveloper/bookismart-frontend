import React from "react";
import Hero from "./Hero";
import Categories from "./Categories";
import ServiceShowcase from "./ServiceShowcase";
import WhyBookiSmart from "./WhyBookiSmart";
import Feedback from "./Feedback";

const HomeLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <main className="relative">
        <Hero />
        <Categories />
        <ServiceShowcase />
        <WhyBookiSmart />
        <Feedback />
      </main>
    </div>
  );
};

export default HomeLayout;