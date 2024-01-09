import { useQuery } from "@tanstack/react-query";
import ApplicationItem from "../../features/MCTD/ApplicationItem";
import { getApplicationsAgainstProposal } from "../../api/mctdService";
import { useParams } from "react-router-dom";
import useDataContext from "../../utils/hooks/useDataContext";
import { LoadingItemPlaceholder, NoDataAvailable } from "../../components";

const CFPApplications = () => {
  const { updateData } = useDataContext();
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-All-Programmes-Applications", id],
    queryFn: () => getApplicationsAgainstProposal(id),
    onSuccess: (fetchdata) => {
      updateData(fetchdata?.applications);
    },
  });
  // data;
  if (isLoading) {
    return <LoadingItemPlaceholder />;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  return (
    <div className="bg-white divide-y divide-gray-200 rounded-b-lg">
      {data?.applications.length > 0 ? (
        data?.applications.map((appsItem) => (
          <ApplicationItem data={appsItem} key={appsItem?._id} />
        ))
      ) : (
        <NoDataAvailable />
      )}
    </div>
  );
};

export default CFPApplications;
