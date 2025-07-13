import { useState } from "react";
import { stages } from "../constants/stage.js";
import { supabase } from "../database/supabase.js";

const PopUp = ({ open, close }) => {
  const [stage, setStage] = useState(stages[0]);
  const [company, setCompany] = useState("");
  const [url, setUrl] = useState("");
  const [appliedOn, setAppliedOn] = useState("");
  const [objectData, setObjectData] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  if (!open) return null;

  const handleStageChange = (e) => {
    setStage(e.target.value);
  };
  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };
  const handleDateChange = (e) => {
    setAppliedOn(e.target.value);
  };
  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };
  const handleSubmit = async () => {
    console.log(`form data:`, { company, appliedOn, url, stage });
    if (!company) {
      alert(`Please provide company name!`);
      return;
    }

    if (!appliedOn) {
      alert(`Please provide application date!`);
      return;
    }

    setIsSubmitting(true);

    try {
      const { _, error } = await supabase.from("applications").insert([
        {
          company: company,
          url: url || "Not Given",
          applied_on: appliedOn,
          stage: stage,
        },
      ]);
      if (error) throw error;

      alert("Application saved successfulyl!");
      setCompany("");
      setUrl("");
      setAppliedOn("");
      setStage(stages[0]);
      close();
    } catch (error) {
      alert(`Error saving application : ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }

    setObjectData({
      company: company,
      url: url ? url : `Not Given`,
      appliedOn: appliedOn,
      stage: stage,
    });
    console.log(objectData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs">
      <div className="relative mx-4 mr-5 ml-5 flex w-full max-w-md flex-col gap-5 rounded-lg bg-white p-6 shadow-lg">
        <input
          type="text"
          placeholder="Company Name..."
          value={company}
          className="text-md mr-5 ml-5 overflow-auto rounded-2xl border-2 bg-gray-300 text-center font-semibold"
          onChange={(e) => handleCompanyChange(e)}
        />
        <select
          name="stage"
          value={stage}
          onChange={(event) => handleStageChange(event)}
          className="text-md mr-5 ml-5 border-2 bg-gray-300 text-center font-semibold"
        >
          {stages.map((stage, index) => (
            <option
              key={index}
              value={stage}
              className="text-md mr-5 ml-5 overflow-auto rounded-2xl border-2 bg-gray-300 text-center font-semibold"
            >
              {stage}
            </option>
          ))}
        </select>
        <input
          type="URL"
          placeholder="Job URL ... (Optional)"
          className="text-md mr-5 ml-5 overflow-auto rounded-2xl border-2 bg-gray-300 text-center font-semibold"
          onChange={(e) => handleUrlChange(e)}
          value={url}
        />
        <input
          type="text"
          placeholder="Applied on..."
          onFocus={(e) => (e.target.type = "date")}
          value={appliedOn}
          onChange={(e) => handleDateChange(e)}
          className="text-md mr-5 ml-5 overflow-auto rounded-2xl border-2 bg-gray-300 text-center font-semibold"
        />
        <button
          className="mr-5 ml-5 rounded-xl border-2 bg-[#f70d1a] font-bold text-black"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Submit"}
        </button>
        <button
          onClick={close}
          className="text-md absolute top-0 right-0 m-3 rounded-2xl border-2 bg-gray-500 p-0.5 font-bold text-black hover:text-gray-700"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default PopUp;
