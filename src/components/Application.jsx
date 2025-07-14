import { stages } from "../constants/stage.js";
import { updateStage, updateCompany } from "../apiRequests/updaters.js";
import { useState } from "react";

const Application = ({ application }) => {
  const [localApplication, setLocalApplication] = useState(application);
  const [editing, setEditing] = useState(false);
  const handleStageChange = async (e) => {
    const newStage = e.target.value;
    try {
      await updateStage(newStage, localApplication);

      setLocalApplication((prev) => ({ ...prev, stage: newStage }));
    } catch (error) {
      console.error(`Failed to update stage: ${error.message}`);
      alert(`Failed to update stage`);
    }
  };
  const handleCompanyChange = async (e) => {
    const newCompany = e.target.value;
    try {
      await updateCompany(newCompany, localApplication);
      setLocalApplication((prev) => ({ ...prev, company: newCompany }));
    } catch (error) {
      console.error(`Failed to update company ${error.message}`);
      alert(`Failed to update company!`);
    }
  };
  return (
    <div className="align-center m-3 flex justify-around gap-15 rounded-2xl border-1 bg-[#48CAE4] p-5">
      {editing ? (
        <input
          type="text"
          value={localApplication.company}
          className="text-md mr-5 ml-5 overflow-auto rounded-2xl border-2 bg-gray-300 text-center font-semibold"
          onChange={(event) => handleCompanyChange(event)}
        />
      ) : (
        <div className="content-center">{localApplication.company}</div>
      )}
      <div className="content-center">{localApplication.applied_on}</div>
      {editing ? (
        <select
          name="stage"
          value={localApplication.stage}
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
      ) : (
        <div className="content-center">{localApplication.stage}</div>
      )}
      <div className="content-center">{localApplication.url}</div>
      <button
        className="transition-all-2ms content-center rounded-lg border-1 bg-[#0077B6] p-2 text-center text-xl font-medium duration-300 hover:bg-[#023E8A]"
        onClick={() => setEditing(!editing)}
      >
        Edit
      </button>
    </div>
  );
};

export default Application;
