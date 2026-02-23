import { useState } from "react";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "../components/utils/constant";
import { toast } from "sonner";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";

const ApplyJobModal = ({ job, close, setIsApplied }) => {
  const [answers, setAnswers] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const handleChange = (index, value) => {
    const updated = [...answers];

    updated[index] = {
      question: job.screeningQuestions[index].question,
      answer: value,
    };

    setAnswers(updated);
  };

  const submitApplication = async () => {
    // ✅ VALIDATION
    for (let i = 0; i < job.screeningQuestions.length; i++) {
      const question = job.screeningQuestions[i];

      if (question.required) {
        const answer = answers[i]?.answer;

        if (!answer || answer.trim() === "") {
          toast.error(`Please answer required question ${i + 1}`);
          return; // 🚨 STOP SUBMIT
        }
      }
    }

    // ✅ API CALL ONLY AFTER VALIDATION
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${job._id}`,
        { answers },
        { withCredentials: true },
      );

      if (res.data.success) {
        toast.success(res.data.message);

        // ✅ update button instantly
        setIsApplied(true);

        // ✅ realtime redux update
        dispatch(
          setSingleJob({
            ...job,
            applications: [...job.applications, { applicant: user._id }],
          }),
        );

        close();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50" onClick={close} 
    >
        <div className="bg-white w-full max-w-lg rounded-xl p-6"  onClick={(e) => e.stopPropagation()}>
          <h2 className="text-xl font-bold mb-4">Screening Questions</h2>

          {job?.screeningQuestions?.map((q, index) => (
            <div key={index} className="mb-4">
              <p className="font-medium">{q.question}</p>

              {q.type === "yesno" ? (
                <select
                  className="border rounded p-2 w-full mt-2"
                  onChange={(e) => handleChange(index, e.target.value)}
                >
                  <option>Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              ) : (
                <input
                  type={q.type === "number" ? "number" : "text"}
                  className="border rounded p-2 w-full mt-2"
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              )}
            </div>
          ))}

          <button
            onClick={submitApplication}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg w-full"
          >
            Submit Application
          </button>
        </div>
    </div>
  );
};

export default ApplyJobModal;
