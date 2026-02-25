import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

// admin post krega job
export const postJob = async (req, res) => {
  try {
    const {
      title,
      department,
      description,
      requirements,
      salary,
      location,
      jobType,
      experienceLevel,
      position,
      companyId,
      screeningQuestions,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !position ||
      !jobType ||
      !department ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Somethin is missing.",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel,
      position,
      department,
      screeningQuestions,
      company: companyId,
      created_by: userId,
    });
    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// student k liye
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      title: { $regex: keyword, $options: "i" },
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
// student
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId)
      .populate({
        path: "applications",
        populate: {
          path: "applicant",   // ⭐ populate user inside application
          select: "fullname email updatedAt profile.profilePhoto", // fields you want
        },
      })
      .populate({
        path: "company", // ⭐ ADD THIS
      });
    if (!job) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.log(error);
  }
};
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;

    // ✅ get filters from query
    const { department, role, date } = req.query;

    // ✅ base filter (VERY IMPORTANT)
    let filter = {
      created_by: adminId,
    };

    // ✅ department filtering
    if (department) {
      filter.department = department;
    }

    // ✅ role/title filtering (case insensitive search)
    if (role) {
      filter.title = {
        $regex: role,
        $options: "i",
      };
    }

    // ✅ date filtering (last N days)
    if (date) {
      const daysAgo = new Date();
      daysAgo.setDate(daysAgo.getDate() - Number(date));

      filter.createdAt = {
        $gte: daysAgo,
      };
    }

    // ✅ fetch jobs
    const jobs = await Job.find(filter)
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getJobsByCompany = async (req,res)=>{
  const jobs = await Job.find({
    company:req.params.companyId
  }).populate("applications");

  res.json({success:true,jobs});
}

export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    
    // check company exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // ✅ find all applications of this job
    await Application.deleteMany({ job: jobId });

    
    // ✅ delete applications related to jobs
    await Job.findByIdAndDelete(jobId);

    return res.status(200).json({
      success: true,
      message:
        "Job and all applications deleted successfully",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
