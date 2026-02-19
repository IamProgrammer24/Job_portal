import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal, Building2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(
    (store) => store.job
  );

  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;

      return (
        job?.title
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase()) ||
        job?.company?.name
          ?.toLowerCase()
          .includes(searchJobByText.toLowerCase())
      );
    });

    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      
      <h2 className="text-xl font-semibold mb-4">
        Posted Jobs
      </h2>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Company</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs?.map((job) => (
            <TableRow
              key={job._id}
              className="hover:bg-gray-50 transition duration-200"
            >
              {/* Company */}
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Building2 size={18} />
                  </div>
                  <span className="font-medium">
                    {job?.company?.name}
                  </span>
                </div>
              </TableCell>

              {/* Role */}
              <TableCell className="font-semibold text-gray-700">
                {job?.title}
              </TableCell>

              {/* Date */}
              <TableCell>
                {job?.createdAt.split("T")[0]}
              </TableCell>

              {/* Status */}
              <TableCell>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  Active
                </span>
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="cursor-pointer" />
                  </PopoverTrigger>

                  <PopoverContent className="w-36">
                    <div
                      onClick={() =>
                        navigate(
                          `/admin/jobs/${job._id}/applicants`
                        )
                      }
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                    >
                      <Eye size={16} />
                      Applicants
                    </div>

                    <div
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                    >
                      <Edit2 size={16} />
                      Edit
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
