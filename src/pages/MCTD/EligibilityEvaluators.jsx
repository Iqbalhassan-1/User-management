import { useQuery } from "@tanstack/react-query";
import { getExpertByStageId } from "../../api/mctdService";
import { EvaluatorItem } from "../../features/MCTD";
import { LoadingItemPlaceholder, NoDataAvailable } from "../../components";
import useDataContext from "../../utils/hooks/useDataContext";

const EligibilityEvaluators = () => {
  const { searchText } = useDataContext();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "get-All-Evaluators",
      "Evaluator",
      "Eligibility Screening",
      searchText,
    ],
    queryFn: () =>
      getExpertByStageId("Evaluator", "Eligibility Screening", searchText),
  });

  if (isLoading) {
    return <LoadingItemPlaceholder />;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }
  return (
    <>
      {data?.length > 0 ? (
        data?.map((evaluatorItem, index) => {
          return <EvaluatorItem key={index} data={evaluatorItem} />;
        })
      ) : (
        <NoDataAvailable />
      )}
    </>
  );
};

export default EligibilityEvaluators;
