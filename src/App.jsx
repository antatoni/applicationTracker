import { useState } from 'react';
import PopUp from './components/PopUp';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const openPopUp = () => setIsOpen(true);
  const closePopUp = () => setIsOpen(false);
  return (
    <>
      <div className="">
        <button
          onClick={openPopUp}
          className="m-5 p-1 border-1 rounded-lg bg-blue-400 text-2xl font-semibold text-center content-center hover:bg-blue-600 duration-300 transition-all-2ms"
        >
          Create
        </button>

        <PopUp open={isOpen} close={closePopUp}></PopUp>
      </div>
    </>
  );
}

export default App;
