import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getApplicationByStatus } from "../../api/muniService";
import { LoadingItemPlaceholder, NoDataAvailable } from "../../components";
import EvaApplicationsList from "../../features/EVA/EvaApplicationsList";
import { useParams } from "react-router-dom";
import { getAllEvaApplications, selfAssignApps } from "../../api/evaService";
import toast from "react-hot-toast";
import SelfAssignAppItem from "../../features/EVA/SelfAssignAppItem";

const ApplicationsEvaluation = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-All-Programmes-Applications", id],
    queryFn: () => getAllEvaApplications(id),
  });

  const queryClient = useQueryClient();
  const assignAppsMutation = useMutation(selfAssignApps, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-All-Programmes-Applications");
      toast.success("Application Assign");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleAssignApps = (id) => {
    const apiBody = {
      applicationId: id,
    };
    assignAppsMutation.mutate(apiBody);
  };

  if (isLoading) {
    return <LoadingItemPlaceholder />;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  return (
    <div className="bg-white divide-y divide-gray-200 rounded-b-lg">
      {data?.applications?.length > 0 ? (
        data?.applications?.map((appsItem) => (
          <SelfAssignAppItem
            data={appsItem}
            key={appsItem?._id}
            handleAssignApps={handleAssignApps}
          />
        ))
      ) : (
        <NoDataAvailable />
      )}
    </div>
  );
};

export default ApplicationsEvaluation;
