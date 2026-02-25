
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Building2, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { JOB_API_END_POINT } from "../utils/constant";
import { setAllAdminJobs } from "../../redux/jobSlice";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";

const AdminJobsTable = () => {
  const { allAdminJobs} = useSelector(
    (store) => store.job
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

 

   /* ================= DELETE Job ================= */
  const deleteJobHandler = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Job?"
    );

    if (!confirmDelete) return;
    console.log(`${JOB_API_END_POINT}/delete/${jobId}`);

    try {
      await axios.delete(
        `${JOB_API_END_POINT}/delete/${jobId}`,
        { withCredentials: true }
      );
      

      toast.success("Job deleted successfully");

      //👉 ideally refetch companies here
       // ✅ remove locally
    const updatedJobs = allAdminJobs.filter(
      (job) => job._id !== jobId
    );

    dispatch(setAllAdminJobs(updatedJobs));

    } catch (error) {
      toast.error(
        error.message || "Delete failed"
      );
    }
  };

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
          {allAdminJobs?.map((job) => (
            <TableRow
              key={job._id}
              className="hover:bg-gray-50 transition duration-200"
                onClick={() => navigate(`/admin/jobs/${job._id}`)}
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
                {new Date(job.createdAt).toLocaleDateString()}
              </TableCell>

              {/* Status */}
              <TableCell>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  Active
                </span>
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right">
                <button
              onClick={(e) => {
                e.stopPropagation();
                deleteJobHandler(job._id);
              }}
              className="
                p-2 rounded-lg
                hover:bg-red-50
                text-gray-500
                hover:text-red-600
                transition
              "
            >
              <Trash2 size={18} />
            </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
