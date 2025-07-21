import { useState, useEffect } from "react";
import PopUp from "./components/PopUp";
import Applications from "./components/Applications";
import Header from "./components/Header";
import { Link } from "react-router";
import { supabase } from "./database/supabase";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
    console.log(session);

    return () => subscription.unsubscribe();
  }, []);

  const openPopUp = () => setIsOpen(true);
  const closePopUp = () => setIsOpen(false);

  const handleLogOut = async () => {
    supabase.auth.signOut();
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
          <Applications userInfo={session.user}></Applications>
        ) : (
          <div>Loading applications!</div>
        )}

        {session && (
          <PopUp
            open={isOpen}
            close={closePopUp}
            userInfo={session.user}
          ></PopUp>
        )}
      </div>
    </>
  );
}

export default App;
