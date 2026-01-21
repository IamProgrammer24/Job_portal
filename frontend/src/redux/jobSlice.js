import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    singleJob: null,
    searchJobByText: "",
    allAdminJobs: [],
    allAppliedJobs: [],
    searchedQuery: "",
    filters: {
    title: "",
    location: "",
    salary: "",
  },
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    resetSearchedQuery: (state) => {
      state.searchedQuery = "";
    },
     setFilters: (state, action) => {
    state.filters = { ...state.filters, ...action.payload };
  },
  clearFilters: (state) => {
    state.filters = { title: "", location: "", salary: "" };
  },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
  resetSearchedQuery,
  setFilters,
  clearFilters
} = jobSlice.actions;
export default jobSlice.reducer;
