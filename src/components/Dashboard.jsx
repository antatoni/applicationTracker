import { useContext, useEffect, useState } from "react";
import PopUp from "./PopUp";
import Applications from "./Applications";
import Header from "./Header";
import { Link, useNavigate } from "react-router";
import { supabase } from "../database/supabase";
import { SessionContext } from "../contexts/SessionStorage";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const { session } = useContext(SessionContext);
  const openPopUp = () => setIsOpen(true);
  const closePopUp = () => setIsOpen(false);
  const [applications, setApplications] = useState([]);

  const router = useNavigate();

  useEffect(() => {
    if (!session) {
      router("/login");
    }
  }, [session, router]);

  const handleLogOut = async () => {
    localStorage.removeItem("cachedApps");
    supabase.auth.signOut();
    router("/");
  };

  const updateApplication = (updatedApplication) => {
    setApplications((prevApps) => {
      const updated = prevApps.map((app) =>
        app.id === updatedApplication.id ? updatedApplication : app,
      );
      localStorage.setItem("cachedApps", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <>
      <div className="relative flex-col">
        <Header>
          {!session ? (
            <div className="flex gap-6">
              <Link to={"/register"}>
                <button className="transition-all-2ms content-center rounded-lg border-2 border-black bg-[#1146a8] p-2 text-center text-2xl font-semibold text-white duration-300 hover:bg-[#2c68ff]">
                  Register
                </button>
              </Link>

              <Link to={"/login"}>
                <button className="transition-all-2ms content-center rounded-lg border-2 border-black bg-[#1146a8] p-2 text-center text-2xl font-semibold text-white duration-300 hover:bg-[#2c68ff]">
                  LogIn
                </button>
              </Link>
            </div>
          ) : (
            <div>
              <button
                onClick={() => handleLogOut()}
                className="transition-all-2ms content-center rounded-lg border-2 border-black bg-[#1146a8] p-2 text-center text-2xl font-semibold text-white duration-300 hover:bg-[#2c68ff]"
              >
                Logout
              </button>
            </div>
          )}

          <button
            onClick={openPopUp}
            className="transition-all-2ms content-center rounded-lg border-2 border-black bg-[#1146a8] p-2 text-center text-2xl font-semibold text-white duration-300 hover:bg-[#2c68ff]"
          >
            Create
          </button>
        </Header>

        {session ? (
          <Applications
            userInfo={session.user}
            applications={applications}
            setApplications={setApplications}
            updateApplication={updateApplication}
          ></Applications>
        ) : (
          <div>Loading applications!</div>
        )}

        {session && (
          <PopUp
            open={isOpen}
            close={closePopUp}
            userInfo={session.user}
            setApplications={setApplications}
          ></PopUp>
        )}
      </div>
    </>
  );
}

export default Dashboard;
