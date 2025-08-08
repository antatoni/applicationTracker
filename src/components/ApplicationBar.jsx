import { useState } from "react";

const ApplicationBar = ({ onSort, onFilter }) => {
  const [sortOption, setSortOption] = useState("");
  const [stageOption, setStageOption] = useState("");
  const handleSortChange = (event) => {
    const newSort = event.target.value;
    setSortOption(newSort);
    onSort(newSort);
  };
  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setStageOption(newFilter);
    onFilter(newFilter);
  };
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
        <div className="flex flex-col gap-2">
          <select
            name="Sort by"
            value={sortOption}
            onChange={(e) => handleSortChange(e)}
            className="text-md mr-5 ml-5 border-2 bg-[#0077B6] text-center font-semibold"
          >
            <option
              value=""
              className="text-md mr-5 ml-5 border-2 bg-[#0077B6] text-center font-semibold"
            >
              Sort by
            </option>

            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="a-b">Company A-Z</option>
            <option value="b-a">Company Z-A</option>
          </select>
          <select
            name="Filter by"
            value={stageOption}
            onChange={(e) => handleFilterChange(e)}
            className="text-md mr-5 ml-5 border-2 bg-[#0077B6] text-center font-semibold"
          >
            <option
              value=""
              className="text-md mr-5 ml-5 border-2 bg-[#0077B6] text-center font-semibold"
            >
              Filter by
            </option>
            <option value="Applied">Applied</option>
            <option value="Rejected">Rejected</option>
            <option value="Homework">Homework</option>
            <option value="First interview">First interview</option>
            <option value="Second interview">Second interview</option>
            <option value="Got the job!">Got the job!</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default ApplicationBar;
