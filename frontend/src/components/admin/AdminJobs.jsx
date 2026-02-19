import React, { useState } from "react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "../hooks/useGelAllAdminJobs";
import Navbar from "../ui/shared/Navbar";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import AdminJobStats from "./AdminJobStats";
import { Briefcase, CalendarDays, Filter, RotateCcw } from "lucide-react";

const AdminJobs = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    role: "",
    department: "",
    date: "",
  });

  // ✅ fetch jobs based on filters
  useGetAllAdminJobs(filters);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />

      <div className="max-w-6xl mx-auto my-10">
        {/* FILTER SECTION */}
        <div className="bg-white shadow-md rounded-2xl p-5 mb-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter className="text-blue-600" size={20} />
              <h2 className="text-lg font-semibold text-gray-700">
                Filter Jobs
              </h2>
            </div>

            {/* Reset Filters */}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setFilters({
                  role: "",
                  department: "",
                  date: "",
                })
              }
              className="flex items-center gap-2"
            >
              <RotateCcw size={16} />
              Reset
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Role Search */}
            <div className="relative">
              <Briefcase
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <Input
                placeholder="Search role..."
                value={filters.role}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    role: e.target.value,
                  }))
                }
                className="pl-10"
              />
            </div>

            {/* Department */}
            <Select
              value={filters.department}
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  department: value,
                }))
              }
            >
              <SelectTrigger className="w-52">
                <SelectValue placeholder="Department" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Filter */}
            <Select
              value={filters.date}
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  date: value,
                }))
              }
            >
              <SelectTrigger className="w-52">
                <CalendarDays size={16} className="mr-2 text-gray-400" />
                <SelectValue placeholder="Date Posted" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="1">Last 24 hrs</SelectItem>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
              </SelectContent>
            </Select>

            {/* Create Job Button */}
            <Button
              onClick={() => navigate("/admin/jobs/create")}
              className="ml-auto"
            >
              + New Job
            </Button>
          </div>
        </div>

        {/* ✅ JOB STATS */}
        <AdminJobStats />

        {/* JOB TABLE */}
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
