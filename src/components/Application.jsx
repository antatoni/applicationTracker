import { stages } from "../constants/stage.js";
import {
  updateStage,
  updateCompany,
  updateURL,
  updateLocalStorageField,
} from "../apiRequests/updaters.js";
import { useState } from "react";

const Application = ({ application, updateApplication }) => {
  const [localApplication, setLocalApplication] = useState(application);
  const [editing, setEditing] = useState(false);
  const handleStageChange = async (e) => {
    const newStage = e.target.value;
    const field = "stage";
    updateLocalStorageField(field, newStage, localApplication.id);

    try {
      await updateStage(newStage, localApplication);
      setLocalApplication((prev) => ({ ...prev, stage: newStage }));
      updateApplication(localApplication);
    } catch (error) {
      console.error(`Failed to update stage: ${error.message}`);
      alert(`Failed to update stage`);
    }
  };
  const handleCompanyChange = async (e) => {
    const newCompany = e.target.value;
    setLocalApplication((prev) => ({ ...prev, company: newCompany }));
    updateApplication(localApplication);
  };
  const handleURLChange = async (e) => {
    const newURL = e.target.value;
    setLocalApplication((prev) => ({ ...prev, url: newURL }));
    updateApplication(localApplication);
  };
  const checkURL = (url) => {
    if (url === "Not Given") return null;
    else return true;
  };

  const toggleEdit = async () => {
    if (editing) {
      try {
        await Promise.all([
          updateCompany(localApplication.company, localApplication),
          updateURL(localApplication.url, localApplication),
        ]);

        updateLocalStorageField(
          "company",
          localApplication.company,
          localApplication.id,
        );
        updateLocalStorageField(
          "url",
          localApplication.url,
          localApplication.id,
        );

        updateApplication(localApplication);
      } catch (error) {
        console.error(`Problem with updating company/url ${error.message}`);
        return;
      }
    }
    setEditing(!editing);
  };

  return (
    <div className="align-center m-3 grid grid-cols-[1.2fr_0.8fr_1fr_2fr_auto] gap-8 rounded-2xl border-1 bg-[#48CAE4] p-5 sm:gap-4 md:gap-6 lg:gap-8">
      {editing ? (
        <input
          type="text"
          value={localApplication.company}
          className="text-md mr-5 ml-5 content-center overflow-auto rounded-2xl border-2 bg-gray-300 text-center font-semibold"
          onChange={(event) => handleCompanyChange(event)}
        />
      ) : (
        <div className="content-center text-center font-bold italic">
          {localApplication.company}
        </div>
      )}
      <div className="content-center text-center font-bold italic">
        {localApplication.applied_on}
      </div>
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
        <div className="content-center overflow-auto text-center font-bold italic">
          {localApplication.stage}
        </div>
      )}
      {editing ? (
        <input
          type="url"
          value={localApplication.url}
          className="text-md mr-5 ml-5 content-center overflow-auto rounded-2xl border-2 bg-gray-300 text-center font-semibold"
          onChange={(event) => handleURLChange(event)}
        />
      ) : checkURL(localApplication.url) ? (
        <a
          href={localApplication.url}
          rel="noopener noreferrer"
          target="_blank"
          className="inline-block max-w-full content-center overflow-hidden text-center font-bold italic underline hover:overflow-x-auto hover:text-blue-900"
        >
          {localApplication.url}
        </a>
      ) : (
        <div className="content-center overflow-hidden text-center font-bold italic hover:overflow-x-auto">
          {localApplication.url}
        </div>
      )}

      <button
        className="transition-all-2ms mr-3 ml-3 content-center rounded-lg border-1 bg-[#0077B6] p-2 text-center text-xl font-bold duration-300 hover:bg-[#023E8A]"
        onClick={toggleEdit}
      >
        {editing ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default Application;
