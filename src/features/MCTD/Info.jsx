import { twMerge } from "tailwind-merge";
import { Status } from "../../components";

const Info = ({ children, className }) => {
  return (
    <div className={twMerge("flex items-center gap-3", className)}>
      {children}
    </div>
  );
};

Info.Type = function InfoType({ children }) {
  return <span className="text-gray-500 w-[8rem]">{children}</span>;
};

Info.Value = function InfoValue({ children }) {
  return <span className="text-gray-900">{children}</span>;
};

Info.ValueAsStatus = function ValueAsStatus({ status }) {
  return <Status status={status} />;
};

export default Info;
