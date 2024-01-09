import { Link, useLocation, useParams } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { Fragment } from "react";
import Card from "./Card";

const Breadcrumb = ({ children }) => {
  const location = useLocation();
  const params = useParams();

  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  const breadcrumbs = pathSegments.map((segment, index) => {
    // Check if the segment is equal to params or if linkTo ends with params

    if (segment === params?.id || segment === params?.applicationId) {
      return null;
    }

    const linkTo = `/${pathSegments.slice(0, index + 1).join("/")}`;

    return (
      <Fragment key={index}>
        {index !== 0 && <FaChevronRight className="text-gray-400" />}
        <Link
          to={linkTo}
          className={`font-medium capitalize ${
            index === pathSegments.length - 1 ? "text-sky-600" : "text-gray-700"
          }`}
        >
          {segment.replace(/-/g, " ")}
        </Link>
      </Fragment>
    );
  });

  return (
    <Card HC className="space-y-1">
      <div className="flex items-center gap-2">{breadcrumbs}</div>
      {children}
    </Card>
  );
};

export default Breadcrumb;
