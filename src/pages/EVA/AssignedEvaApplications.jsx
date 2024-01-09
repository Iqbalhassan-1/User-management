import { useParams } from "react-router-dom";
import EvaApplicationsList from "../../features/EVA/EvaApplicationsList";
import { useQuery } from "@tanstack/react-query";
import { getAllEvaAssignApps } from "../../api/evaService";
import { LoadingItemPlaceholder } from "../../components";

const AssignedEvaApplications = () => {
  const { id } = useParams();
  // get application againt proposals id
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-All-assigned-Applications", id],
    queryFn: () => getAllEvaAssignApps(id),
  });

  if (isLoading) {
    return <LoadingItemPlaceholder />;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  return <EvaApplicationsList data={data} />;
};

export default AssignedEvaApplications;
