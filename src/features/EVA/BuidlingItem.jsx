import React from "react";
const BuildingItem = ({ data }) => {
  return (
    <div className="p-2 space-y-2 border-b">
      <p className="text-gray-800 font-semibold">{data?.title}</p>
      <p className="">{data?.description}</p>
    </div>
  );
};
export default BuildingItem;
