import { useQuery } from "@tanstack/react-query";
import { EvaluatorItem } from "../../features/MCTD";
import { getExpertByStageId } from "../../api/mctdService";
import { LoadingItemPlaceholder, NoDataAvailable } from "../../components";
import useDataContext from "../../utils/hooks/useDataContext";

const FinancialCreditEVAs = () => {
  const { searchText } = useDataContext();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "get-All-Evaluators",
      "Evaluator",
      "Creditworthiness Assessment",
      searchText,
    ],
    queryFn: () =>
      getExpertByStageId(
        "Evaluator",
        "Creditworthiness Assessment",
        searchText
      ),
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
        data?.map((evaluatorItem) => {
          return (
            <EvaluatorItem data={evaluatorItem} key={evaluatorItem?._id} />
          );
        })
      ) : (
        <NoDataAvailable />
      )}
    </>
  );
};

export default FinancialCreditEVAs;
