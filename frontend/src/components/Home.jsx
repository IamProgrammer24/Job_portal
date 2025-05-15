import React from "react";
import Navbar from "./ui/shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCrausel from "./CategoryCrausel";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "./hooks/useGetAllJobs";

const Home = () => {
  useGetAllJobs();
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCrausel />
      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
