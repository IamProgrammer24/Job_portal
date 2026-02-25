// import React, { useEffect, useState } from "react";
// import Navbar from "../ui/shared/Navbar";
// import { Button } from "../ui/button";
// import { ArrowLeft, Loader2 } from "lucide-react";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import axios from "axios";
// import { COMPANY_API_END_POINT } from "../utils/constant";
// import { useNavigate, useParams } from "react-router-dom";
// import { toast } from "sonner";
// import { useSelector } from "react-redux";
// import useGetCompanyById from "../hooks/useGetCompanyById";

// const CompanySetup = () => {
//   const params = useParams();
//   useGetCompanyById(params.id);
//   const [input, setInput] = useState({
//     name: "",
//     description: "",
//     website: "",
//     location: "",
//     file: null,
//   });
//   const { singleCompany } = useSelector((store) => store.company);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const changeFileHandler = (e) => {
//     const file = e.target.files?.[0];
//     setInput({ ...input, file });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", input.name);
//     formData.append("description", input.description);
//     formData.append("website", input.website);
//     formData.append("location", input.location);
//     if (input.file) {
//       formData.append("file", input.file);
//     }
//     try {
//       setLoading(true);
//       const res = await axios.put(
//         `${COMPANY_API_END_POINT}/update/${params.id}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         toast.success(res.data.message);
//         navigate("/admin/companies");
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     setInput({
//       name: singleCompany.name || "",
//       description: singleCompany.description || "",
//       website: singleCompany.website || "",
//       location: singleCompany.location || "",
//       file: singleCompany.file || null,
//     });
//   }, [singleCompany]);

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-xl mx-auto my-10">
//         <form onSubmit={submitHandler}>
//           <div className="flex items-center gap-5 p-8">
//             <Button
//               onClick={() => navigate("/admin/companies")}
//               variant="outline"
//               className="flex items-center gap-2 text-gray-500 font-semibold"
//             >
//               <ArrowLeft />
//               <span>Back</span>
//             </Button>
//             <h1 className="font-bold text-xl">Company Setup</h1>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <Label>Company Name</Label>
//               <Input
//                 type="text"
//                 name="name"
//                 value={input.name}
//                 onChange={changeEventHandler}
//               />
//             </div>
//             <div>
//               <Label>Description</Label>
//               <Input
//                 type="text"
//                 name="description"
//                 value={input.description}
//                 onChange={changeEventHandler}
//               />
//             </div>
//             <div>
//               <Label>Website</Label>
//               <Input
//                 type="text"
//                 name="website"
//                 value={input.website}
//                 onChange={changeEventHandler}
//               />
//             </div>
//             <div>
//               <Label>Location</Label>
//               <Input
//                 type="text"
//                 name="location"
//                 value={input.location}
//                 onChange={changeEventHandler}
//               />
//             </div>
//             <div>
//               <Label>Logo</Label>
//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={changeFileHandler}
//               />
//             </div>
//           </div>
//           {loading ? (
//             <Button className="w-full my-4">
//               {" "}
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
//             </Button>
//           ) : (
//             <Button type="submit" className="w-full my-4">
//               Update
//             </Button>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CompanySetup;

import React, { useEffect, useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Pencil, Loader2, Globe, MapPin } from "lucide-react";

import axios from "axios";
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from "../utils/constant";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "../hooks/useGetCompanyById";

import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyDetails = () => {
  const { id } = useParams();
  useGetCompanyById(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleCompany } = useSelector((store) => store.company);

  const [jobs, setJobs] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  /* ================= GET COMPANY JOBS ================= */
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/company/${id}`, {
          withCredentials: true,
        });
        setJobs(res.data.jobs);
      } catch (err) {
        console.log(err);
      }
    };

    fetchJobs();
  }, [id]);

  /* ================= PREFILL ================= */
  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null,
      });
    }
  }, [singleCompany]);

  const changeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const fileHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files[0],
    });
  };

  /* ================= UPDATE ================= */
  const updateCompany = async () => {
    const formData = new FormData();

    Object.keys(input).forEach((key) => {
      if (input[key]) formData.append(key, input[key]);
    });

    try {
      setLoading(true);

      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);

        dispatch(setSingleCompany(res.data.company)); // ⭐ IMPORTANT

        setEditMode(false);
      }
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navbar />

      <div className="max-w-6xl mx-auto my-10 space-y-6">
        {/* ================= COMPANY CARD ================= */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <div className="flex justify-between items-start">
            {/* LEFT */}
            <div className="flex gap-5">
              <img
                src={singleCompany?.logo || "https://via.placeholder.com/80"}
                className="w-20 h-20 rounded-xl border"
              />

              <div>
                {editMode ? (
                  <Input
                    name="name"
                    value={input.name}
                    onChange={changeHandler}
                  />
                ) : (
                  <h1 className="text-2xl font-bold">{singleCompany?.name}</h1>
                )}

                <p className="text-gray-600 mt-2">
                  {editMode ? (
                    <Input
                      name="description"
                      value={input.description}
                      onChange={changeHandler}
                    />
                  ) : (
                    singleCompany?.description
                  )}
                </p>

                <div className="flex gap-6 mt-3 text-gray-500 items-center">
                  {/* Website */}
                  <div className="flex items-center gap-2">
                    <Globe size={16} />

                    {editMode ? (
                      <input
                        type="text"
                        name="website"
                        value={input.website}
                        onChange={changeHandler}
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      <span>{singleCompany?.website}</span>
                    )}
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2">
                    <MapPin size={16} />

                    {editMode ? (
                      <input
                        type="text"
                        name="location"
                        value={input.location}
                        onChange={changeHandler}
                        className="border px-2 py-1 rounded"
                      />
                    ) : (
                      <span>{singleCompany?.location}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* EDIT BUTTON */}
            <Button variant="outline" onClick={() => setEditMode(!editMode)}>
              <Pencil size={16} />
            </Button>
          </div>

          {/* UPDATE BUTTON */}
          {editMode && (
            <div className="mt-5">
              <Label>Update Logo</Label>
              <Input type="file" onChange={fileHandler} />

              <Button onClick={updateCompany} className="mt-4">
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          )}
        </div>

        {/* ================= STATS ================= */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Total Jobs</p>
            <h2 className="text-2xl font-bold">{jobs.length}</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-500">Total Applicants</p>
            <h2 className="text-2xl font-bold">
              {jobs.reduce((acc, job) => acc + job.applications.length, 0)}
            </h2>
          </div>
        </div>

        {/* ================= JOB LIST ================= */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="font-semibold text-lg mb-4">Jobs Posted</h2>

          {jobs.map((job) => (
            <div
              key={job._id}
              className="border p-4 rounded-lg mb-3 hover:bg-gray-50"
               onClick={() => navigate(`/admin/jobs/${job._id}`)}
              
            >
              <h3 className="font-semibold">{job.title}</h3>
              <p className="text-sm text-gray-500">{job.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
