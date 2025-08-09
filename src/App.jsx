import { useContext } from "react";
import Header from "./components/Header";
import { Link, useNavigate } from "react-router";
import { supabase } from "./database/supabase";
import Dashboard from "./components/Dashboard";
import { SessionContext } from "./contexts/SessionStorage";

function App() {
  const { session } = useContext(SessionContext);

  const router = useNavigate();

  const handleLogOut = async () => {
    localStorage.removeItem("cachedApps");
    supabase.auth.signOut();
  };

  return (
    <>
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
          <div className="flex gap-6">
            <button
              onClick={() => handleLogOut()}
              className="transition-all-2ms content-center rounded-lg border-2 border-black bg-[#1146a8] p-2 text-center text-2xl font-semibold text-white duration-300 hover:bg-[#2c68ff]"
            >
              Logout
            </button>
            <button
              onClick={() => router("/dashboard")}
              className="transition-all-2ms content-center rounded-lg border-2 border-black bg-[#1146a8] p-2 text-center text-2xl font-semibold text-white duration-300 hover:bg-[#2c68ff]"
            >
              Dashboard
            </button>
          </div>
        )}
      </Header>
      <div className="flex flex-col">
        <span className="p-4 text-center text-5xl font-bold italic text-shadow-gray-800 text-shadow-md">
          Tired of going through emails ?
        </span>
        <div className="flex justify-center">
          <img
            src="landing-lg-white.png"
            alt="Showing many emails"
            className="hidden max-h-1/3 max-w-4/5 rounded-2xl lg:flex"
          />
          <img
            src="landing-small-white.jpg"
            alt="Showing many emails"
            className="flex max-h-1/3 max-w-3/5 rounded-2xl lg:hidden"
          />
        </div>
        <span className="p-4 text-center text-2xl font-bold italic text-shadow-gray-700 text-shadow-md">
          Be able to configure on what stage you are , the URL and much more !
        </span>
        <span className="p-4 text-center text-2xl font-bold italic text-shadow-gray-700 text-shadow-md">
          If that is the case Register/Login and go to the dashboard !
        </span>
        <div className="flex justify-center p-4">
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
            <div className="flex gap-6">
              <button
                onClick={() => router("/dashboard")}
                className="transition-all-2ms content-center rounded-lg border-2 border-black bg-[#1146a8] p-2 text-center text-2xl font-semibold text-white duration-300 hover:bg-[#2c68ff]"
              >
                Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
