import { useParams } from "react-router-dom";
import EvaApplicationsList from "../../features/EVA/EvaApplicationsList";
import { useQuery } from "@tanstack/react-query";
import { getAllEvaCompletedApps } from "../../api/evaService";
import { LoadingItemPlaceholder } from "../../components";
import CompletedAppsList from "../../features/EVA/CompletedAppsList";

const CompletedEvaApplications = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-All-Completed-Applications", id],
    queryFn: () => getAllEvaCompletedApps(id),
  });

  if (isLoading) {
    return <LoadingItemPlaceholder />;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  return <CompletedAppsList data={data?.applications} />;
};

export default CompletedEvaApplications;
