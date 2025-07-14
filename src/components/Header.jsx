const Header = ({ children }) => {
  return (
    <>
      <div className="relative flex justify-end">
        <img
          src="siteIcon.png"
          alt="siteIcon"
          className="m-2 max-h-1/12 max-w-1/12"
        />
        {children}
      </div>
    </>
  );
};

export default Header;
