const Header = ({ children }) => {
  return (
    <>
      <div className="flex justify-between">
        <img
          src="siteIcon.png"
          alt="siteIcon"
          className="m-2 max-h-1/12 max-w-1/12"
        />

        <div className="relative flex justify-end">{children}</div>
      </div>
    </>
  );
};

export default Header;
