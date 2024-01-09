import React from "react";
import { CallForProposalItem } from "../../features/MCTD";
import { getProposalsByStatus } from "../../api/mctdService";
import { useQuery } from "@tanstack/react-query";
import { LoadingItemPlaceholder, NoDataAvailable } from "../../components";
import useDataContext from "../../utils/hooks/useDataContext";

const ClosedCFPs = () => {
  const { searchText } = useDataContext();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["proposals", "Closed", searchText],
    queryFn: () => getProposalsByStatus("Closed", searchText),
  });

  if (isLoading) {
    return <LoadingItemPlaceholder />;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  return (
    <div className="bg-white divide-y divide-gray-200 rounded-b-lg">
      {data?.length > 0 ? (
        data?.map((cfrItem) => (
          <CallForProposalItem data={cfrItem} key={cfrItem?._id} />
        ))
      ) : (
        <NoDataAvailable />
      )}
    </div>
  );
};

export default ClosedCFPs;
