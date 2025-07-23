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
              To Dashboard
            </button>
          </div>
        )}
      </Header>
      <div>some kind of landing page</div>
    </>
  );
}

export default App;
