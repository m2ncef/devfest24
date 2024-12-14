import React from "react";
import Hero from "../components/hero";
import Services from "../components/Services";
import Lasthero from "../components/lasthero";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-white">
      <Hero />
      <Services />
      <Lasthero />
    </div>
  );
};
export default Home;
