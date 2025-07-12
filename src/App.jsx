import { useState } from "react";
import PopUp from "./components/PopUp";
import Applications from "./components/Applications";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const openPopUp = () => setIsOpen(true);
  const closePopUp = () => setIsOpen(false);
  return (
    <>
      <div className="">
        <button
          onClick={openPopUp}
          className="transition-all-2ms m-5 content-center rounded-lg border-1 bg-[#708a97] p-1 text-center text-2xl font-semibold duration-300 hover:bg-[#607d8b]"
        >
          Create
        </button>
        <Applications></Applications>

        <PopUp open={isOpen} close={closePopUp}></PopUp>
      </div>
    </>
  );
}

export default App;
