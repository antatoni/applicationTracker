import { Link } from "react-router";

const Header = ({ children }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Link to={"/"}>
          <div className="m-2 h-24 w-24">
            <img src="siteIcon.png" alt="siteIcon" />
          </div>
        </Link>

        <div className="m-5 flex justify-end gap-6">{children}</div>
      </div>
    </>
  );
};

export default Header;
