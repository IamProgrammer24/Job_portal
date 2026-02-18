import React, { useState } from "react";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "../utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Navbar from "../ui/shared/Navbar";
import {
  Briefcase,
  MapPin,
  IndianRupee,
  Layers,
  Users,
  Building2,
  FileText,
  ListChecks,
  Clock,
} from "lucide-react";

const companyArray = [];

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
   experienceLevel: 0,
    jobType: "",
    position: 0,
    companyId: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value,
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />

      <div className="flex items-center justify-center py-12 px-4">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-5xl bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-gray-100"
        >
          {/* Header */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Create New Job</h2>
            <p className="text-gray-500 mt-2">
              Post a new opportunity for candidates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Job Title */}
            <div>
              <Label>Job Title</Label>
              <div className="relative mt-2">
                <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  name="title"
                  value={input.title}
                  onChange={changeEventHandler}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Salary */}
            <div>
              <Label>Salary</Label>
              <div className="relative mt-2">
                <IndianRupee className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="number"
                  name="salary"
                  value={input.salary}
                  onChange={changeEventHandler}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <Label>Location</Label>
              <div className="relative mt-2">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  name="location"
                  value={input.location}
                  onChange={changeEventHandler}
                  className="pl-10"
                />
              </div>
            </div>
            {/* Experience */}
            <div>
              <Label>Experience Level</Label>
              <div className="relative mt-2">
                <Layers className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="number"
                  name="experienceLevel"
                  value={input.experienceLevel}
                  onChange={changeEventHandler}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Positions */}
            <div>
              <Label>No. of Positions</Label>
              <div className="relative mt-2">
                <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="number"
                  name="position"
                  value={input.position}
                  onChange={changeEventHandler}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Department */}
            <div>
              <Label>Department</Label>
              <div className="relative mt-2">
                <Building2 className="absolute left-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                <Select
                  onValueChange={(value) =>
                    setInput({ ...input, department: value })
                  }
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Job Type */}
            <div>
              <Label>Job Type</Label>
              <div className="relative mt-2">
                <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                <Select
                  onValueChange={(value) =>
                    setInput({ ...input, jobType: value })
                  }
                >
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Select Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Company */}
            {companies.length > 0 && (
              <div>
                <Label>Company</Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company?.name?.toLowerCase()}
                        >
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mt-8">
            <Label>Description</Label>
            <div className="relative mt-2">
              <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <textarea
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                rows={4}
                className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Requirements */}
          <div className="mt-6">
            <Label>Requirements</Label>
            <div className="relative mt-2">
              <ListChecks className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <textarea
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                rows={3}
                className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Button */}
          <div className="mt-10">
            {loading ? (
              <Button className="w-full py-6 text-lg font-semibold">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting Job...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full py-6 text-lg font-semibold bg-gray-700 hover:bg-gray-800"
              >
                Post New Job
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
