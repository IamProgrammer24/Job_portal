import React, { useEffect } from "react";
import Navbar from "./ui/shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCrausel from "./CategoryCrausel";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "./hooks/useGetAllJobs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetSearchedQuery } from "../redux/jobSlice";

const Home = () => {
   const dispatch = useDispatch();
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);
   useEffect(() => {
    dispatch(resetSearchedQuery());
  }, [dispatch]);

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
