// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { Avatar, AvatarImage } from "../ui/avatar";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { Edit2, MoreHorizontal } from "lucide-react";

// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const CompaniesTable = () => {
//   const { companies, searchCompanyByText } = useSelector(
//     (store) => store.company
//   );
//   const [filterCompany, setFilterCompany] = useState(companies);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const filteredCompany =
//       companies.length >= 0 &&
//       companies.filter((company) => {
//         if (!searchCompanyByText) {
//           return true;
//         }
//         return company?.name
//           ?.toLowerCase()
//           .includes(searchCompanyByText.toLowerCase());
//       });
//     setFilterCompany(filteredCompany);
//   }, [companies, searchCompanyByText]);

//   // const filterCompany = [
//   //   {
//   //     _id: "123456",
//   //     logo: "this is usr",
//   //     name: "company name",
//   //     createdAt: "10.2.2005",
//   //   },
//   // ];

//   return (
//     <div>
//       <Table>
//         <TableCaption>A list of your recent registered companies</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Logo</TableHead>
//             <TableHead>Name</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {filterCompany?.map((company) => (
//             <tr>
//               <TableCell>
//                 <Avatar>
//                   {/* <AvatarImage src={company.logo} /> */}
//                   <AvatarImage src={company?.logo} />
//                 </Avatar>
//               </TableCell>
//               <TableCell>{company.name}</TableCell>
//               <TableCell>{company.createdAt.split("T")[0]}</TableCell>
//               <TableCell className="text-right cursor-pointer">
//                 <Popover>
//                   <PopoverTrigger>
//                     <MoreHorizontal />
//                   </PopoverTrigger>
//                   <PopoverContent className="w-32">
//                     <div
//                       onClick={() =>
//                         navigate(`/admin/companies/${company._id}`)
//                       }
//                       className="flex items-center gap-2 w-fit cursor-pointer"
//                     >
//                       <Edit2 className="w-4" />
//                       <span>Edit</span>
//                     </div>
//                   </PopoverContent>
//                 </Popover>
//               </TableCell>
//             </tr>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default CompaniesTable;


import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { MoreHorizontal, Trash2 } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );

  const [filterCompany, setFilterCompany] = useState([]);
  const navigate = useNavigate();

  /* ================= FILTER COMPANY ================= */
  useEffect(() => {
    const filtered =
      companies?.filter((company) => {
        if (!searchCompanyByText) return true;

        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      }) || [];

    setFilterCompany(filtered);
  }, [companies, searchCompanyByText]);

  /* ================= DELETE COMPANY ================= */
  const deleteCompanyHandler = async (companyId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `/api/v1/company/${companyId}`,
        { withCredentials: true }
      );

      toast.success("Company deleted successfully");

      // 👉 ideally refetch companies here
      // dispatch(getAllCompanies())

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Delete failed"
      );
    }
  };

  return (
  <div className="bg-white shadow-xl rounded-2xl p-6 border">

  <Table>
    <TableCaption className="text-gray-500">
      Registered Companies
    </TableCaption>

    {/* ================= HEADER ================= */}
    <TableHeader>
      <TableRow className="bg-gray-50">
        <TableHead>Company</TableHead>
        <TableHead>Created On</TableHead>
        <TableHead className="text-right">
          Delete
        </TableHead>
      </TableRow>
    </TableHeader>

    {/* ================= BODY ================= */}
    <TableBody>
      {filterCompany?.map((company) => (
        <TableRow
          key={company._id}
          onClick={() =>
            navigate(`/admin/companies/${company._id}`)
          }
          className="
            cursor-pointer
            hover:bg-gray-50
            hover:shadow-sm
            transition-all duration-200
            group
          "
        >
          {/* COMPANY INFO */}
          <TableCell>
            <div className="flex items-center gap-4">
              
              {/* Logo */}
              <Avatar className="h-10 w-10 border">
                <AvatarImage
                  src={
                    company?.logo ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJEApBPkYRaZmScBMYKaEu2hX5pvqzJpXEIA&s"
                  }
                />
              </Avatar>

              {/* Name */}
              <div>
                <p className="font-semibold text-gray-800 group-hover:text-purple-700 transition">
                  {company.name}
                </p>
                <p className="text-xs text-gray-500">
                  View company details
                </p>
              </div>

            </div>
          </TableCell>

          {/* DATE */}
          <TableCell className="text-gray-600">
            {company.createdAt?.split("T")[0]}
          </TableCell>

          {/* DELETE BUTTON */}
          <TableCell className="text-right">
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteCompanyHandler(company._id);
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

export default CompaniesTable;