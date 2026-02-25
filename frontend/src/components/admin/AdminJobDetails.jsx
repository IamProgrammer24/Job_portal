import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../ui/shared/Navbar";
import { Building2, MapPin, Briefcase, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { JOB_API_END_POINT } from "../utils/constant";

const AdminJobDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Job By ID
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setJob(res.data.job);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-medium">
        Loading Job Details...
      </div>
    );
  }

  if (!job)
    return (
      <div className="flex justify-center items-center h-screen">
        Job not found
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-8">
        {/* ================= JOB HEADER ================= */}
        <div className="bg-white shadow-sm rounded-2xl p-8">
          <div className="flex flex-col md:flex-row md:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>

              <div className="flex flex-wrap gap-6 mt-4 text-gray-600">
                <span className="flex items-center gap-2">
                  <Building2 size={18} />
                  {job.company?.name}
                </span>

                <span className="flex items-center gap-2">
                  <MapPin size={18} />
                  {job.location}
                </span>

                <span className="flex items-center gap-2">
                  <Briefcase size={18} />
                  {job.jobType}
                </span>

                <span className="flex items-center gap-2">
                  <Calendar size={18} />
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <span className="bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-medium h-fit">
              Active
            </span>
          </div>
        </div>

        {/* ================= ANALYTICS ================= */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-500 text-sm">Total Applicants</p>
            <h3 className="text-2xl font-bold mt-2">
              {job.applications?.length || 0}
            </h3>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-500 text-sm">Positions Open</p>
            <h3 className="text-2xl font-bold mt-2">{job.position}</h3>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-500 text-sm">Salary</p>
            <h3 className="text-2xl font-bold mt-2">
              ₹{job.salary?.toLocaleString()} LPA
            </h3>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-500 text-sm">Department</p>
            <h3 className="text-lg font-semibold mt-2">{job.department}</h3>
          </div>
        </div>

        {/* ================= DESCRIPTION ================= */}
        <div className="bg-white shadow-sm rounded-2xl p-8">
          <h2 className="text-xl font-semibold mb-4">Job Description</h2>

          <p className="text-gray-700 leading-7">{job.description}</p>
        </div>

        {/* ================= REQUIREMENTS ================= */}
        <div className="bg-white shadow-sm rounded-2xl p-8">
          <h2 className="text-xl font-semibold mb-5">Requirements</h2>

          <div className="flex flex-wrap gap-3">
            {(Array.isArray(job.requirements)
              ? job.requirements
              : job.requirements?.split(",") || []
            ).map((req, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-100 hover:scale-105 transition-all"
              >
                {req.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* ================= SCREENING QUESTIONS ================= */}
        <div className="bg-white shadow-sm rounded-2xl p-8">
          <h2 className="text-xl font-semibold mb-6">Screening Questions</h2>

          <div className="space-y-4">
            {job.screeningQuestions?.map((q, index) => (
              <div
                key={q._id}
                className="border rounded-xl p-5 hover:shadow-sm transition"
              >
                <p className="font-medium text-gray-800">
                  {index + 1}. {q.question}
                </p>

                <div className="flex gap-6 mt-3 text-sm text-gray-500">
                  <span>Type: {q.type}</span>
                  <span>{q.required ? "Required" : "Optional"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= APPLICANTS ================= */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-5">
            Applicants ({job.applications.length})
          </h2>

          <div className="space-y-4">
            {job.applications.map((application) => (
              <div
                key={application._id}
                className="border rounded-xl p-5 flex justify-between items-center hover:shadow-md transition"
              >
                {/* LEFT SIDE */}
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <img
                    src={
                      application.applicant?.profile?.profilePhoto ||
                      "https://ui-avatars.com/api/?name=" +
                        application.applicant?.fullname
                    }
                    alt="profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  {/* Applicant Info */}
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {application.applicant?.fullname}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {application.applicant?.email}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      Applied on {application.createdAt.split("T")[0]}
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-3">
                  {/* Status Badge */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
            ${
              application.status === "accepted"
                ? "bg-green-100 text-green-700"
                : application.status === "rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
            }`}
                  >
                    {application.status || "Pending"}
                  </span>

                  {/* View Button */}
                  <button
                    onClick={() =>
                      navigate(`/admin/application/${application._id}`)
                    }
                    className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminJobDetails;
