import React from "react";
import { useSelector } from "react-redux";
import { Briefcase, Building2, CheckCircle, Clock } from "lucide-react";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 flex items-center justify-between hover:shadow-lg transition">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold mt-1">{value}</h2>
      </div>

      <div className="bg-blue-100 p-3 rounded-full">
        {icon}
      </div>
    </div>
  );
};

const AdminJobStats = () => {
  const { allAdminJobs } = useSelector((store) => store.job);

  const totalJobs = allAdminJobs.length;

  const activeJobs = allAdminJobs.filter(
    (job) => job?.status !== "closed"
  ).length;

  const companies = new Set(
    allAdminJobs.map((job) => job?.company?.name)
  ).size;

  const todayJobs = allAdminJobs.filter((job) => {
    const today = new Date().toISOString().split("T")[0];
    return job.createdAt.split("T")[0] === today;
  }).length;

  return (
    <div className="grid md:grid-cols-4 gap-5 mb-8">
      <StatCard
        title="Total Jobs"
        value={totalJobs}
        icon={<Briefcase size={22} />}
      />

      <StatCard
        title="Active Jobs"
        value={activeJobs}
        icon={<CheckCircle size={22} />}
      />

      <StatCard
        title="Companies"
        value={companies}
        icon={<Building2 size={22} />}
      />

      <StatCard
        title="Posted Today"
        value={todayJobs}
        icon={<Clock size={22} />}
      />
    </div>
  );
};

export default AdminJobStats;
