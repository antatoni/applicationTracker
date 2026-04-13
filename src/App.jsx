import { useContext } from "react";
import Header from "./components/Header";
import { Link, useNavigate } from "react-router";
import Dashboard from "./components/Dashboard";
import { SessionContext } from "./contexts/SessionStorage";

function App() {
  const { session } = useContext(SessionContext);

  const router = useNavigate();

  const handleLogOut = async () => {
    localStorage.removeItem("cachedApps");
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
        <h1 className="mb-6 text-center text-4xl leading-tight font-bold text-black md:text-5xl lg:text-6xl">
          Transform Your
          <span className="block text-yellow-400">Job Hunt</span>
        </h1>
        <p className="mx-auto max-w-2xl p-3 text-center text-xl text-gray-500">
          From email chaos to organized success
        </p>
        <div className="flex justify-center">
          <img
            src="landing-lg-white.png"
            loading="lazy"
            alt="Showing many emails"
            className="hidden max-h-1/3 max-w-4/5 rounded-2xl lg:flex"
          />
          <img
            src="landing-small-white.jpg"
            loading="lazy"
            alt="Showing many emails"
            className="flex max-h-1/3 max-w-3/5 rounded-2xl lg:hidden"
          />
        </div>
        <p className="text-center text-lg font-medium text-white">
          ✨ Track application stages
        </p>
        <p className="text-center text-lg font-medium text-white">
          🔗 Save job posting URLs
        </p>
        <p className="text-center text-lg font-medium text-white">
          📊 Filter and organize everything
        </p>
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
