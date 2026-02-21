import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [
      {
        type: String,
      },
    ],
    salary: {
      type: Number,
      required: true,
    },
    experienceLevel: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    jobType: {
        type: String,
        required: true
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
    department: {
      type: String,
      enum: ["Engineering", "HR", "Marketing", "Finance", "Sales"],
      required: true,
      index: true,
    },
    screeningQuestions: [
  {
    question: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["text", "yesno", "number"],
      default: "text",
    },
    required: {
      type: Boolean,
      default: true,
    },
  },
],

  },
  { timestamps: true },
);
export const Job = mongoose.model("Job", jobSchema);
