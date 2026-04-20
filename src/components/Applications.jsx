import { useEffect, useState } from "react";
import Application from "./Application.jsx";
import ApplicationBar from "./ApplicationBar.jsx";
import { applicationsService } from "../services/applicationsService.js";

const Applications = ({ userInfo, applications, setApplications }) => {
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const UserUid = userInfo?.userUid;

  useEffect(() => {
    const loaderData = async () => {
      const cached = localStorage.getItem("cachedApps");
      if (cached) {
        setApplications(JSON.parse(cached));
        return;
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

  const handleUpdate = async (updatedApp) => {
    try {
      const updated = await applicationsService.updateApplication(
        updatedApp.id,
        {
          company: updatedApp.company,
          stage: updatedApp.stage,
          url: updatedApp.url,
          UserUid: UserUid,
        },
      );

      setApplications((prev) =>
        prev.map((app) => (app.id === updated.id ? updated : app)),
      );
      const cached = JSON.parse(localStorage.getItem("cachedApps") || "[]");
      const updatedCache = cached.map((app) =>
        app.id === updated.id ? updated : app,
      );
      localStorage.setItem("cachedApps", JSON.stringify(updatedCache));
    } catch (error) {
      alert(`Error updating : ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await applicationsService.deleteApplication(id, UserUid);
      setApplications((prev) => prev.filter((app) => app.id !== id));
      const cached = JSON.parse(localStorage.getItem("cachedApps") || "[]");
      const updatedCache = cached.filter((app) => app.id !== id);
      localStorage.setItem("cachedApps", JSON.stringify(updatedCache));
    } catch (error) {
      alert(`Error deleting :${error.message}`);
    }
  };

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
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          ></Application>
        ))}
      </div>
    </>
  );
};

export default Applications;
