import { useState } from "react";
import PopUp from "./components/PopUp";
import Applications from "./components/Applications";
import Header from "./components/Header";
import { Link } from "react-router";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const openPopUp = () => setIsOpen(true);
  const closePopUp = () => setIsOpen(false);

  return (
    <>
      <div className="relative flex-col">
        <Header>
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

          <button
            onClick={openPopUp}
            className="transition-all-2ms content-center rounded-lg border-2 border-black bg-[#1146a8] p-2 text-center text-2xl font-semibold text-white duration-300 hover:bg-[#2c68ff]"
          >
            Create
          </button>
        </Header>

        <Applications></Applications>

        <PopUp open={isOpen} close={closePopUp}></PopUp>
      </div>
    </>
  );
}

export default App;
