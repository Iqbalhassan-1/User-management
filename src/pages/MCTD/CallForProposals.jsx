import { CallForProposalItem } from "../../features/MCTD";
import { useQuery } from "@tanstack/react-query";
import { getProposalsByStatus } from "../../api/mctdService";
import useDataContext from "../../utils/hooks/useDataContext";
import { LoadingItemPlaceholder, NoDataAvailable } from "../../components";

const CallForProposals = () => {
  const { updateData, searchText } = useDataContext();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["proposals", "all", searchText],
    queryFn: () => getProposalsByStatus("all", searchText),
    // enabled: searchText,
    onSuccess: (fetchdata) => {
      updateData(fetchdata);
    },
  });

  // console.log(searchText);

  if (isLoading) {
    return <LoadingItemPlaceholder />;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  return (
    <div className="bg-white divide-y divide-gray-200 rounded-b-lg">
      {data?.length > 0 ? (
        data?.map((cfpItem) => (
          <CallForProposalItem data={cfpItem} key={cfpItem?._id} />
        ))
      ) : (
        <NoDataAvailable />
      )}
    </div>
  );
};

export default CallForProposals;
