const SummaryHeader = ({ children }) => {
  return <header className="flex items-center flex-wrap">{children}</header>;
};

SummaryHeader.BlueTab = function BlueTab({ value, title }) {
  return (
    <div className="bg-sky-50 p-4 border-b-2 border-sky-600 space-y-2 flex-grow">
      <div className="text-sky-600 font-semibold text-xl lg:text-2xl">
        {value}
      </div>
      <p className="uppercase text-sm lg:text-base text-gray-500 font-medium">
        {title}
      </p>
    </div>
  );
};

SummaryHeader.YellowTab = function YellowTab({ value, title }) {
  return (
    <div className="bg-yellow-50 p-4 border-b-2 border-yellow-600 space-y-2 flex-grow">
      <div className="text-yellow-600 font-semibold text-xl lg:text-2xl">
        {value}
      </div>
      <p className="uppercase text-sm lg:text-base text-gray-500 font-medium">
        {title}
      </p>
    </div>
  );
};

SummaryHeader.GreenTab = function GreenTab({ value, title }) {
  return (
    <div className="bg-green-50 p-4 border-b-2 border-green-600 space-y-2 flex-grow">
      <div className="text-green-600 font-semibold text-xl lg:text-2xl">
        {value}
      </div>
      <p className="uppercase text-sm lg:text-base text-gray-500 font-medium">
        {title}
      </p>
    </div>
  );
};

SummaryHeader.RejectedTab = function RejectedTab({ value }) {
  return (
    <div className="bg-red-50 p-4 border-b-2 border-red-500 space-y-2 flex-grow">
      <div className="text-red-500 font-semibold text-xl lg:text-2xl">
        {value}
      </div>
      <p className="uppercase text-sm lg:text-base text-gray-500 font-medium">
        REJECTED
      </p>
    </div>
  );
};

SummaryHeader.BuildingTab = function BuildingTab({ value }) {
  return (
    <div className="bg-yellow-50 p-4 border-b-2 border-yellow-900 space-y-2 flex-grow">
      <div className="text-yellow-500 font-semibold text-xl lg:text-2xl">
        {value}
      </div>
      <p className="uppercase text-sm lg:text-base text-gray-500 font-medium">
        Buildings
      </p>
    </div>
  );
};

export default SummaryHeader;
