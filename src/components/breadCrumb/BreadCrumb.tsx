import { Link } from "react-router-dom";
import "./breadCrumb.css";
import { IoHomeOutline } from "react-icons/io5";

interface BreadCrumbProps {
  home?: boolean;
  lastPage?: string;
  lastPageLink?: string;
  currentPage: string;
}

const BreadCrumb = ({
  home,
  lastPage,
  lastPageLink,
  currentPage,
}: BreadCrumbProps) => {
  return (
    <div className="breadCrumb">
      {home && (
        <>
          <Link to={"/home"}>
            <div className="breadCrumb-nav">
              <IoHomeOutline size={"24px"} />
              <p>Home</p>
            </div>
          </Link>
          /
        </>
      )}
      {lastPage && lastPageLink && (
        <>
          <Link to={lastPageLink}>
            <div className="breadCrumb-nav">
              <p>{lastPage}</p>
            </div>
          </Link>
          /
        </>
      )}

      <div className="breadCrumb-nav current">
        <p>{currentPage}</p>
      </div>
    </div>
  );
};

export default BreadCrumb;
