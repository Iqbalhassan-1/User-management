import { useTranslation } from "react-i18next";
import { LoadingItemPlaceholder, SummaryHeader } from "../../components";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { summaryAgainstApplicationId } from "../../api/mctdService";

const QualityAndRelevanceSummary = () => {
  //translatio hook
  const { t } = useTranslation();
  const { applicationId } = useParams();
  const status = "Quality and Relevance Screening";
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["Summary-of-Application=stage3", applicationId, status],
    queryFn: () => summaryAgainstApplicationId(applicationId, status),
  });

  if (isLoading) {
    return <LoadingItemPlaceholder />;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  const list = data?.proposalEvaluationQuestions?.map((item) => (
    <SummaryItem key={item?.question._id} item={item} />
  ));

  return (
    <>
      <SummaryHeader>
        <SummaryHeader.BlueTab
          value={`${data.obtainPoints}/${data.totalPoints}`}
          title={t("TOTAL POINTS")}
        />
      </SummaryHeader>
      <div className="divide-y divide-gray-200">{list}</div>
      {data?.application?.remarksStage3 && (
        <div className="space-y-3">
          <p className="text-gray-700">
            <span className="text-black font-medium">
              {t("Evaluator Remarks")}:{" "}
            </span>
            {data?.application?.remarksStage3}
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
      <div className="flex items-start gap-4">
        <p className="bg-sky-200 rounded flex gap-1 text-gray-900 font-medium min-w-[26px] px-2">
          <span>{item.selecetdPoint?.points}</span>
          <span>{t("Points")}</span>
        </p>
        <div className="flex-1">
          {item.question.pointsQuestions.map((pointQ) => (
            <p className="text-black" key={pointQ._id}>
              {pointQ.title}{" "}
              <span className="font-medium">({pointQ.points} points)</span>
            </p>
          ))}
          <p className="text-gray-400">{item?.questionId?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default QualityAndRelevanceSummary;
