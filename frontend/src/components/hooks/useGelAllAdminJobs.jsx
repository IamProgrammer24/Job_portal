import { setAllAdminJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "../utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = (filters) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        // ✅ create query params dynamically
        const query = new URLSearchParams(filters).toString();

        const res = await axios.get(
          `${JOB_API_END_POINT}/getadminjobs?${query}`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllAdminJobs();
  }, [filters, dispatch]); // ✅ refetch when filters change
};

export default useGetAllAdminJobs;
