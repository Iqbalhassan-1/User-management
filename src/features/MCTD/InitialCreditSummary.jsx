import { useTranslation } from "react-i18next";
import {
  LoadingItemPlaceholder,
  Status,
  SummaryHeader,
} from "../../components";
import { FaRegQuestionCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { summaryAgainstApplicationId } from "../../api/mctdService";

const InitialCreditSummary = () => {
  const { applicationId } = useParams();
  //translation hook
  const { t } = useTranslation();
  const status = "Initial Creditworthiness Assessment";
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["Summary-of-Application-stage2", applicationId, status],
    queryFn: () => summaryAgainstApplicationId(applicationId, status),
  });

  if (isLoading) {
    return <LoadingItemPlaceholder />;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  const list =
    data.proposalEvaluationQuestions?.length > 0 ? (
      data.proposalEvaluationQuestions.map((item) => (
        <SummaryItem key={item?._id} item={item} />
      ))
    ) : (
      <p></p>
    );

  const stage2 = data.percentage?.stage2;
  const points = {
    borrowingCap: `${stage2?.borrowing_loan_capacity || 0} UAH`,
    requestedLoan: `${stage2?.requested_loan || 0} UAH`,
    perLoan: `${
      (stage2?.percentage_borrowing_capacity &&
        Number(stage2?.percentage_borrowing_capacity).toFixed(2)) ||
      0
    }%`,
  };

  return (
    <>
      <SummaryHeader>
        <SummaryHeader.BlueTab
          value={points.borrowingCap}
          title={t("BORROWING CAPACITY")}
        />
        <SummaryHeader.YellowTab
          value={points.requestedLoan}
          title={t("REQUESTED LOAN")}
        />
        <SummaryHeader.GreenTab
          value={points.perLoan}
          title={t("PERCENTAGE OF REQUESTED LOAN")}
        />
      </SummaryHeader>
      <div className="divide-y divide-gray-200">{list}</div>
      {data?.application?.remarksStage2 && (
        <div className="space-y-3">
          <p className="text-gray-700">
            <span className="text-black font-medium">
              {t("Evaluator Remarks")}:{" "}
            </span>
            {data?.application?.remarksStage2}
          </p>
        </div>
      )}
    </>
  );
};

const SummaryItem = ({ item }) => {
  const { t } = useTranslation();

  return (
    <div className="py-6 px-2 flex items-start flex-col-reverse gap-2 md:flex-row md:justify-between">
      <div className="flex items-start gap-2">
        <FaRegQuestionCircle className="text-sky-600 min-w-[24px] mt-1" />
        <div className="space-y-3">
          <h3 className="text-black">{item?.question?.title}</h3>
          <p className="text-black">
            {item?.question?.description}{" "}
            <span className="font-medium">
              ({item?.evaluation_score + " " + item?.unit})
            </span>
          </p>
        </div>
      </div>
      <Status status={item?.evaluation_status} />
    </div>
  );
};

export default InitialCreditSummary;
