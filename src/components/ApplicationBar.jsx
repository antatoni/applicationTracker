const ApplicationBar = () => {
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
        <div className="transition-all-2ms mr-3 ml-3 content-center rounded-lg border-1 bg-[#0077B6] p-2 text-center text-xl font-bold duration-300 hover:bg-[#023E8A]">
          Sort by
        </div>
      </div>
    </>
  );
};

export default ApplicationBar;
