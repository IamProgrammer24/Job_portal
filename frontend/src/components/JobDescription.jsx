import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import axios from "axios";
import {
  JOB_API_END_POINT,
  APPLICATION_API_END_POINT,
} from "../components/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import ApplyJobModal from "./ApplyJobModal";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id,
    ) || false;

  const [isApplied, setIsApplied] = useState(isIntiallyApplied);
  const [openApply, setOpenApply] = useState(false);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const handleApplyClick = async () => {
  // ✅ If no screening questions → Direct Apply
  if (!singleJob?.screeningQuestions?.length) {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${singleJob._id}`,
        { answers: [] }, // empty answers
        { withCredentials: true }
      );

      toast.success(res.data.message);
      setIsApplied(true);

    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to apply"
      );
    }
  } 
  // ✅ Otherwise open modal
  else {
    setOpenApply(true);
  }
};

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          console.log(res.data);
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id,
            ),
          ); // Ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      {/* ================= HEADER ================= */}
      <div className="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* ================= JOB + COMPANY HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* COMPANY LOGO */}
          <div className="flex-shrink-0">
            <img
              src={singleJob?.company?.logo || "https://via.placeholder.com/80"}
              alt="company logo"
              className="w-20 h-20 rounded-xl object-cover border shadow-sm"
            />
          </div>

          {/* JOB DETAILS */}
          <div className="flex-1">
            {/* Job Title */}
            <h1 className="text-3xl font-bold text-gray-900">
              {singleJob?.title}
            </h1>

            {/* Company + Location */}
            <div className="flex flex-wrap items-center gap-2 mt-1 text-gray-600">
              <span className="font-semibold text-lg text-gray-800">
                {singleJob?.company?.name}
              </span>

              <span className="text-gray-400">•</span>

              <span>{singleJob?.location}</span>
            </div>

            {/* JOB TAGS */}
            <div className="flex flex-wrap gap-3 mt-4">
              <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                👥 {singleJob?.position} Positions
              </span>

              <span className="px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-sm font-medium">
                💼 {singleJob?.jobType}
              </span>

              <span className="px-4 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                💰 {singleJob?.salary} LPA
              </span>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApplyClick}
          disabled={isApplied}
          className={`px-6 py-3 rounded-lg font-semibold transition duration-300
      ${
        isApplied
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-[#7209b7] hover:bg-[#5f32ad]"
      } text-white`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </button>
      </div>

      {/* ================= JOB DETAILS ================= */}
      <div className="bg-white shadow-md rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold border-b pb-3 mb-4">
          Job Description
        </h2>

        <p className="text-gray-700 leading-relaxed">
          {singleJob?.description}
        </p>

        {/* Grid Info */}
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div>
            <p className="font-semibold text-gray-700">Experience</p>
            <p className="text-gray-600">{singleJob?.experienceLevel} Years</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Salary</p>
            <p className="text-gray-600">{singleJob?.salary} LPA</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Location</p>
            <p className="text-gray-600">{singleJob?.location}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Total Applicants</p>
            <p className="text-gray-600">{singleJob?.applications?.length}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Posted Date</p>
            <p className="text-gray-600">
              {singleJob?.createdAt?.split("T")[0]}
            </p>
          </div>
        </div>
      </div>

      {/* ================= REQUIREMENTS ================= */}
      <div className="bg-white shadow-md rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold border-b pb-3 mb-4">
          Requirements
        </h2>

        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {singleJob?.requirements?.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>

      {/* Open Apply modal */}
      {openApply && (
  <ApplyJobModal
    job={singleJob}
    close={() => setOpenApply(false)}
    setIsApplied={setIsApplied}
  />
)}
    </div>
  );
};

export default JobDescription;
