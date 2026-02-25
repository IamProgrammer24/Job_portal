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

import { MoreHorizontal, Trash2 } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { COMPANY_API_END_POINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setCompanies } from "../../redux/companySlice";

const CompaniesTable = () => {
  const dispatch = useDispatch();
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
        `${COMPANY_API_END_POINT}/delete/${companyId}`,
        { withCredentials: true }
      );

      toast.success("Company deleted successfully");

      //👉 ideally refetch companies here
       // ✅ remove locally
    const updatedCompanies = companies.filter(
      (company) => company._id !== companyId
    );

    dispatch(setCompanies(updatedCompanies));

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