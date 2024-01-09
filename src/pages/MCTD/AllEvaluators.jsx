import { useQuery } from "@tanstack/react-query";
import { getExpertByStageId } from "../../api/mctdService";
import { EvaluatorItem } from "../../features/MCTD";
import useDataContext from "../../utils/hooks/useDataContext";
import { LoadingItemPlaceholder } from "../../components";
import { useTranslation } from "react-i18next";
const AllEvaluators = () => {
  const { updateData, searchText } = useDataContext();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-All-Evaluators", "Evaluator", searchText],
    queryFn: () => getExpertByStageId("Evaluator", "", searchText),
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
    <>
      {data?.length > 0
        ? data?.map((evaluatorItem, index) => {
            return <EvaluatorItem key={index} data={evaluatorItem} />;
          })
        : null}
    </>
  );
};

export default AllEvaluators;
