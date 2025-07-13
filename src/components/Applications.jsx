import { useEffect, useState } from "react";
import { fetchApplications } from "../apiRequests/fetching.js";
import { stages } from "../constants/stage.js";
import { updateStage, updateCompany } from "../apiRequests/updaters.js";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [editing, setEditing] = useState(false);
  const handleStageChange = async (e, application) => {
    const newStage = e.target.value;

    try {
      await updateStage(newStage, application);

      setApplications((prev) =>
        prev.map((app) =>
          app.id === application.id ? { ...app, stage: newStage } : app,
        ),
      );
    } catch (error) {
      console.error(`Failed to update stage: ${error.message}`);
      alert(`Failed to update stage`);
    }
  };
  const handleCompanyChange = async (e, application) => {
    const newCompany = e.target.value;
    console.log(newCompany);
    try {
      await updateCompany(newCompany, application);
      setApplications((prev) =>
        prev.map((app) =>
          app.id === application.id ? { ...app, company: newCompany } : app,
        ),
      );
    } catch (error) {
      console.error(`Failed to update company ${error.message}`);
      alert(`Failed to update company!`);
    }
  };
  useEffect(() => {
    const loaderData = async () => {
      try {
        const data = await fetchApplications();
        setApplications(data);
        console.log(data);
      } catch (error) {
        console.error(`Failed to load applications: ${error.message}`);
      }
    };
    loaderData();
  }, []);
  return (
    <>
      <div className="m-15 flex flex-col gap-5 rounded-2xl border-2 bg-[#ADE8F4] p-3">
        {applications.map((application) => (
          <div
            key={application.id}
            className="align-center m-3 flex justify-around gap-15 rounded-2xl border-1 bg-[#48CAE4] p-5"
          >
            {editing ? (
              <input
                type="text"
                value={application.company}
                className="text-md mr-5 ml-5 overflow-auto rounded-2xl border-2 bg-gray-300 text-center font-semibold"
                onChange={(e) => handleCompanyChange(e, application)}
              />
            ) : (
              <div className="content-center">{application.company}</div>
            )}
            <div className="content-center">{application.applied_on}</div>
            {editing ? (
              <select
                name="stage"
                value={application.stage}
                onChange={(event) => handleStageChange(event, application)}
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
              <div className="content-center">{application.stage}</div>
            )}
            <div className="content-center">{application.url}</div>
            <button
              className="transition-all-2ms content-center rounded-lg border-1 bg-[#0077B6] p-2 text-center text-xl font-medium duration-300 hover:bg-[#023E8A]"
              onClick={() => setEditing(!editing)}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Applications;
