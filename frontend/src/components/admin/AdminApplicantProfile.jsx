import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import {
  Mail,
  Phone,
  FileText,
  Briefcase,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import Navbar from "../ui/shared/Navbar";
import { APPLICATION_API_END_POINT } from "../utils/constant";

const AdminApplicantProfile = () => {
  const { id } = useParams();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateApplicationStatus = async (status) => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${application._id}/update`,
        { status },
        { withCredentials: true },
      );

      if (res.data.success) {
        // instant UI update
        setApplication((prev) => ({
          ...prev,
          status: status,
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchApplication = async () => {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/${id}`);
      setApplication(res.data.application);
    };

    fetchApplication();
  }, [id]);
  

  if (!application || loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  const { applicant, job, answers, status } = application;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />

      <div className="max-w-6xl mx-auto py-10 px-4 space-y-6">
        {/* ================= HEADER ================= */}
        <div className="bg-white shadow rounded-2xl p-6 flex justify-between items-center">
          <div className="flex items-center gap-5">
            <img
              src={
                applicant.profile.profilePhoto ||
                `https://ui-avatars.com/api/?name=${applicant.fullname}`
              }
              className="w-20 h-20 rounded-full"
            />

            <div>
              <h1 className="text-2xl font-bold">{applicant.fullname}</h1>

              <div className="flex gap-4 text-gray-600 mt-2">
                <span className="flex items-center gap-1">
                  <Mail size={16} />
                  {applicant.email}
                </span>

                <span className="flex items-center gap-1">
                  <Phone size={16} />
                  {applicant.phoneNumber || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* STATUS */}
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium
            ${
              status === "accepted"
                ? "bg-green-100 text-green-700"
                : status === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {status || "Pending"}
          </span>
        </div>
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-3">About Candidate</h2>

          <p className="text-gray-700 leading-relaxed">
            {applicant.profile?.bio || "No bio added"}
          </p>
        </div>
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Skills</h2>

          <div className="flex flex-wrap gap-3">
            {applicant.profile?.skills?.length ? (
              applicant.profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-100 transition"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p>No skills added</p>
            )}
          </div>
        </div>

        {/* ================= JOB INFO ================= */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Briefcase size={18} />
            Applied For
          </h2>

          <p className="text-gray-700">
            {job.title} — {job.company?.name}
          </p>
        </div>

        {/* ================= RESUME ================= */}
        <div className="bg-white shadow rounded-2xl p-6">
  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
    <FileText size={18} />
    Resume
  </h2>

  {applicant?.profile?.resume ? (
    <a
      href={applicant.profile.resume}
      target="_blank"
      rel="noopener noreferrer"
      className="text-indigo-600 font-medium hover:underline"
    >
      {applicant.profile.resumeOriginalName}
    </a>
  ) : (
    <p className="text-gray-500">No Resume Uploaded</p>
  )}
</div>
        {/* ================= SCREENING ANSWERS ================= */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Screening Answers</h2>

          <div className="space-y-4">
            {answers?.map((ans, index) => (
              <div key={index} className="border rounded-lg p-4">
                <p className="font-medium text-gray-800">Q: {ans.question}</p>

                <p className="text-gray-600 mt-2">A: {ans.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= ACTION BUTTONS ================= */}
        <div className="bg-white shadow rounded-2xl p-6 flex gap-4">
          {/* ACCEPT */}
          <button
            disabled={application.status !== "pending" || loading}
            onClick={() => updateApplicationStatus("accepted")}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-white transition
    ${
      application.status === "pending"
        ? "bg-green-600 hover:bg-green-700"
        : "bg-gray-400 cursor-not-allowed"
    }`}
          >
            <CheckCircle size={18} />
            Accept
          </button>

          {/* REJECT */}
          <button
            disabled={application.status !== "pending" || loading}
            onClick={() => updateApplicationStatus("rejected")}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-white transition
    ${
      application.status === "pending"
        ? "bg-red-600 hover:bg-red-700"
        : "bg-gray-400 cursor-not-allowed"
    }`}
          >
            <XCircle size={18} />
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminApplicantProfile;
