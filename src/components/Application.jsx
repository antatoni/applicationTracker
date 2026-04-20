import { stages } from "../constants/stage.js";
import { useState } from "react";
import { applicationsService } from "../services/applicationsService.js";

const Application = ({ application, handleDelete, handleUpdate }) => {
  const [localApplication, setLocalApplication] = useState(application);
  const [editing, setEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleStageChange = async (e) => {
    setLocalApplication((prev) => ({ ...prev, stage: e.target.value }));
  };
  const handleCompanyChange = async (e) => {
    setLocalApplication((prev) => ({ ...prev, company: e.target.value }));
  };
  const handleURLChange = async (e) => {
    setLocalApplication((prev) => ({ ...prev, url: e.target.value }));
  };
  const checkURL = (url) => url !== "Not given";

  const toggleEdit = async () => {
    if (editing) {
      setIsSaving(true);
      try {
        await handleUpdate(localApplication);
        setEditing(false);
      } catch (error) {
        alert(`Error saving :${error.message}`);
      } finally {
        setIsSaving(false);
      }
    } else {
      setEditing(true);
    }
  };

  const onDelete = () => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      handleDelete(localApplication.id);
    }
  };

  return (
    <div className="align-center m-3 grid grid-cols-[1.2fr_0.8fr_1fr_1.5fr_1fr] gap-8 rounded-2xl border-1 bg-[#48CAE4] p-5 sm:gap-4 md:gap-6 lg:gap-8">
      {/* Company Column */}
      {editing ? (
        <input
          type="text"
          value={localApplication.company}
          className="text-md mr-5 ml-5 content-center overflow-auto rounded-2xl border-2 bg-gray-300 text-center font-semibold"
          onChange={handleCompanyChange}
        />
      ) : (
        <div className="content-center text-center font-bold italic">
          {localApplication.company}
        </div>
      )}

      {/* Applied On Column */}
      <div className="content-center text-center font-bold italic">
        {new Date(localApplication.appliedOn).toLocaleDateString()}
      </div>

      {/* Stage Column */}
      {editing ? (
        <select
          name="stage"
          value={localApplication.stage}
          onChange={handleStageChange}
          className="text-md mr-5 ml-5 border-2 bg-gray-300 text-center font-semibold"
        >
          {stages.map((stage, index) => (
            <option key={index} value={stage}>
              {stage}
            </option>
          ))}
        </select>
      ) : (
        <div className="content-center overflow-auto text-center font-bold italic">
          {localApplication.stage}
        </div>
      )}

      {/* URL Column */}
      {editing ? (
        <input
          type="url"
          value={localApplication.url}
          className="text-md mr-5 ml-5 content-center overflow-auto rounded-2xl border-2 bg-gray-300 text-center font-semibold"
          onChange={handleURLChange}
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

      {/* Buttons Column */}
      <div className="flex items-center justify-center gap-2">
        <button
          disabled={isSaving}
          className="transition-all-2ms content-center rounded-lg border-1 bg-[#0077B6] px-3 py-2 text-center text-lg font-bold whitespace-nowrap duration-300 hover:bg-[#023E8A] disabled:opacity-50"
          onClick={toggleEdit}
        >
          {editing ? (isSaving ? "Saving..." : "Save") : "Edit"}
        </button>
        {!editing && (
          <button
            className="transition-all-2ms content-center rounded-lg border-1 bg-red-600 px-3 py-2 text-center text-lg font-bold whitespace-nowrap duration-300 hover:bg-red-800"
            onClick={onDelete}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Application;
