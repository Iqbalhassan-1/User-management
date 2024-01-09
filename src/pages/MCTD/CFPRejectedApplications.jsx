import { useQuery } from "@tanstack/react-query";
import ApplicationItem from "../../features/MCTD/ApplicationItem";
import { getApplicationsAgainstProposal } from "../../api/mctdService";
import { useParams } from "react-router-dom";
import { LoadingItemPlaceholder, NoDataAvailable } from "../../components";

const CFPRejectedApplications = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-All-Programmes-Applications", id],
    queryFn: () => getApplicationsAgainstProposal(id),
  });

  const filterData = data?.applications.filter(
    (item) => item?.status === "Rejected"
  );

  if (isLoading) {
    return <LoadingItemPlaceholder />;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  return (
    <div className="bg-white divide-y divide-gray-200 rounded-b-lg">
      {filterData?.length > 0 ? (
        filterData?.map((appsItem) => (
          <ApplicationItem data={appsItem} key={appsItem?._id} />
        ))
      ) : (
        <NoDataAvailable />
      )}
    </div>
  );
};

export default CFPRejectedApplications;
