import { useQuery } from "@tanstack/react-query";
import ApplicationItem from "../../features/MCTD/ApplicationItem";
import { getApplicationByStatus } from "../../api/muniService";
import useDataContext from "../../utils/hooks/useDataContext";
import { LoadingItemPlaceholder, NoDataAvailable } from "../../components";

const AllApplications = () => {
  const { updateData } = useDataContext();
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["get-all-applications"],
    queryFn: () => getApplicationByStatus("all"),
    onSuccess: (fetchdata) => {
      updateData(fetchdata);
    },
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
        data?.map((appsItem) => (
          <ApplicationItem data={appsItem} key={appsItem?._id} />
        ))
      ) : (
        <NoDataAvailable />
      )}
    </div>
  );
};

export default AllApplications;
