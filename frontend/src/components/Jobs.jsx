import React, { useEffect, useState } from "react";
import Navbar from "./ui/shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import useGetAllJobs from "./hooks/useGetAllJobs";

const Jobs = () => {
  useGetAllJobs();

  const allJobs = useSelector((store) => store.job.allJobs || []);

  // LOCAL filters
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    salary: "",
  });

  // filtered jobs local
  const filteredJobs = allJobs.filter((job) => {
    if (!job || !job.title) return false;

    const matchTitle = filters.title
      ? job.title.toLowerCase().includes(filters.title.toLowerCase())
      : true;

    const matchLocation = filters.location
      ? job.location?.toLowerCase().includes(filters.location.toLowerCase())
      : true;

    const salaryValue = Number(filters.salary);
    const matchSalary =
      filters.salary && !isNaN(salaryValue)
        ? job.salary >= salaryValue
        : true;

    return matchTitle && matchLocation && matchSalary;
  });

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-1/5">
            {/* Pass local filters to FilterCard */}
            <FilterCard filters={filters} setFilters={setFilters} />
          </div>

          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            {filteredJobs.length === 0 ? (
              <span>Job not Found</span>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {filteredJobs.map((job) => (
                  <div key={job._id}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;


