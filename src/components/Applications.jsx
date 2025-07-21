import { useEffect, useState } from "react";
import { fetchApplications } from "../apiRequests/fetching.js";
import Application from "./Application.jsx";

const Applications = ({ userInfo }) => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const loaderData = async () => {
      try {
        const data = await fetchApplications(userInfo);
        setApplications(data);
      } catch (error) {
        console.error(`Failed to load applications: ${error.message}`);
      }
    };
    loaderData();
  }, [userInfo]);
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
