import { useState } from "react";

const ApplicationBar = () => {
    const [option , setOption] = useState('')
  return (
    <>
      <div className="align-center m-3 grid grid-cols-[1.2fr_0.8fr_1fr_2fr_auto] gap-8 rounded-2xl border-1 bg-[#0096C7] p-5 sm:gap-4 md:gap-6 lg:gap-8">
        <div className="content-center text-center text-xl font-bold italic">
          Company Name
        </div>
        <div className="content-center text-center text-xl font-bold italic">
          Applied on
        </div>
        <div className="content-center text-center text-xl font-bold italic">
          Application Stage
        </div>
        <div className="content-center overflow-hidden text-center text-xl font-bold italic hover:overflow-x-auto">
          Application URL
        </div>
        <select
          name="Sort by"
          value={`Sort by`}
          className="text-md mr-5 ml-5 border-2 bg-[#0077B6] text-center font-semibold"
        >
          <option
            value=""
            className="text-md mr-5 ml-5 border-2 bg-[#0077B6] text-center font-semibold"
          >
            Sort by
          </option>
          <option
            value="date"
            className="text-md mr-5 ml-5 border-2 bg-[#0077B6] text-center font-semibold"
          >
            Sort by date
          </option>
          <option
            value="stage"
            className="text-md mr-5 ml-5 border-2 bg-[#0077B6] text-center font-semibold"
          >
            Sort by company
          </option>
        </select>
      </div>
    </>
  );
};

export default ApplicationBar;
