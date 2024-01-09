import { useParams } from "react-router-dom";
import EvaApplicationsList from "../../features/EVA/EvaApplicationsList";
import { useQuery } from "@tanstack/react-query";
import { getAllEvaRejectedApps } from "../../api/evaService";
import { LoadingItemPlaceholder } from "../../components";
import RejectedAppsList from "../../features/EVA/RejectedAppsList";

const RejectedEvaApplications = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-All-Rejected-Applications", id],
    queryFn: () => getAllEvaRejectedApps(id),
  });

  if (isLoading) {
    return <LoadingItemPlaceholder />;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  return <RejectedAppsList data={data?.applications} />;
};

export default RejectedEvaApplications;
