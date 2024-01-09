import { useQuery } from "@tanstack/react-query";
import { CallForProposalItem } from "../../features/MCTD";
import { getProposalsByStatus } from "../../api/mctdService";
import { LoadingItemPlaceholder, NoDataAvailable } from "../../components";
import useDataContext from "../../utils/hooks/useDataContext";
import { useTranslation } from "react-i18next";

const OpenCFPs = () => {
  //translation hook
  const { t } = useTranslation();
  const { searchText } = useDataContext();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["proposals", "Open", searchText],
    queryFn: () => getProposalsByStatus("Open", searchText),
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
        data?.map((cfpItem) => (
          <CallForProposalItem data={cfpItem} key={cfpItem?._id} />
        ))
      ) : (
        <NoDataAvailable />
      )}
    </div>
  );
};

export default OpenCFPs;
