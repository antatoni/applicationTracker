import { useEffect, useState } from "react";
import { fetchApplications } from "../apiRequests/fetching.js";
import Application from "./Application.jsx";
import ApplicationBar from "./ApplicationBar.jsx";

const Applications = ({
  userInfo,
  applications,
  setApplications,
  updateApplication,
}) => {
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");

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

  const handleSort = (sortType) => {
    setSortBy(sortType);
  };

  const handleFilter = (filterType) => {
    setFilterBy(filterType);
  };

  const processedApplications = applications
    .filter((app) => {
      if (!filterBy) return true;
      return app.stage === filterBy;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.applied_on) - new Date(a.applied_on);
        case "oldest":
          return new Date(a.applied_on) - new Date(b.applied_on);
        case "a-b":
          return a.company.localeCompare(b.company);
        case "b-a":
          return b.company.localeCompare(a.company);
        default:
          return 0;
      }
    });

  return (
    <>
      <div className="m-15 flex flex-col gap-5 rounded-2xl border-2 bg-[#ADE8F4] p-3">
        <ApplicationBar
          onSort={handleSort}
          onFilter={handleFilter}
        ></ApplicationBar>
        {processedApplications.map((application) => (
          <Application
            key={application.id}
            application={application}
            updateApplication={updateApplication}
          ></Application>
        ))}
      </div>
    </>
  );
};

export default Applications;
