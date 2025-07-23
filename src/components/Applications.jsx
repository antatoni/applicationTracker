import { useEffect } from "react";
import { fetchApplications } from "../apiRequests/fetching.js";
import Application from "./Application.jsx";

const Applications = ({ userInfo, applications, setApplications }) => {
  useEffect(() => {
    const loaderData = async () => {
      const cached = localStorage.getItem("cachedApps");
      if (cached) {
        setApplications(JSON.parse(cached));
        return;
      }
      try {
        const data = await fetchApplications(userInfo);
        setApplications(data);
        localStorage.setItem("cachedApps", JSON.stringify(data));
      } catch (error) {
        console.error(`Failed to load applications: ${error.message}`);
      }
    };
    loaderData();
  }, [userInfo, setApplications]);

  return (
    <>
      <div className="m-15 flex flex-col gap-5 rounded-2xl border-2 bg-[#ADE8F4] p-3">
        {applications.map((application) => (
          <Application
            key={application.id}
            application={application}
          ></Application>
        ))}
      </div>
    </>
  );
};

export default Applications;
