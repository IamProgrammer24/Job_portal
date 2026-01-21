// import React, { useEffect, useState } from "react";
// import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
// import { Label } from "./ui/label";
// import { useDispatch } from "react-redux";
// import { setSearchedQuery } from "../redux/jobSlice";

// const fitlerData = [
//   {
//     fitlerType: "Location",
//     array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
//   },
//   {
//     fitlerType: "Industry",
//     array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
//   },
//   {
//     fitlerType: "Salary",
//     array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
//   },
// ];

// const FilterCard = () => {
//   const [selectedValue, setSelectedValue] = useState("");
//   const dispatch = useDispatch();

//   const changeHandler = (value) => {
//     setSelectedValue(value);
//   };

//   useEffect(() => {
//     dispatch(setSearchedQuery(selectedValue));
//   }, [selectedValue]);

//   return (
//     <div className="w-full bg-white p-3 rounded-md">
//       <h1 className="font-bold text-lg">Filter Jobs</h1>
//       <hr className="mt-3" />
//       <RadioGroup value={selectedValue} onValueChange={changeHandler}>
//         {fitlerData.map((data, index) => (
//           <div>
//             <h1 className="font-bold text-lg">{data.fitlerType}</h1>
//             {data.array.map((item, idx) => {
//               const itemId = `id${index}-${idx}`;
//               return (
//                 <div className="flex items-center space-x-2 my-2">
//                   <RadioGroupItem value={item} id={itemId} />
//                   <Label htmlFor={itemId}>{item}</Label>
//                 </div>
//               );
//             })}
//           </div>
//         ))}
//       </RadioGroup>
//     </div>
//   );
// };

// export default FilterCard;


import React from "react";

const FilterCard = ({ filters, setFilters }) => {
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />

      {/* Title Filter */}
      <div className="mt-3">
        <h1 className="font-bold text-lg">Title</h1>
        <input
          className="w-full border p-2 rounded mt-2"
          placeholder="Search by Title"
          value={filters.title}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
        />
      </div>

      {/* Location Filter */}
      <div className="mt-3">
        <h1 className="font-bold text-lg">Location</h1>
        <input
          className="w-full border p-2 rounded mt-2"
          placeholder="Search by Location"
          value={filters.location}
          onChange={(e) =>
            setFilters({ ...filters, location: e.target.value })
          }
        />
      </div>

      {/* Salary Filter */}
      <div className="mt-3">
        <h1 className="font-bold text-lg">Salary</h1>
        <input
          className="w-full border p-2 rounded mt-2"
          placeholder="Minimum Salary"
          value={filters.salary}
          onChange={(e) =>
            setFilters({ ...filters, salary: e.target.value })
          }
        />
      </div>
    </div>
  );
};

export default FilterCard;
