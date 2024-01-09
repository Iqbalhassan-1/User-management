import { useTranslation } from "react-i18next";
import {
  LoadingItemPlaceholder,
  NoDataAvailable,
  SectionTitle,
  Status,
  SummaryHeader,
} from "../../components";
import { FaBuilding, FaRegQuestionCircle } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { summaryAgainstApplicationId } from "../../api/mctdService";

const EligibilitySummary = () => {
  //translation hook
  const { t } = useTranslation();
  const { applicationId } = useParams();
  const status = "Eligibility Screening";
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["Summary-of-Application=stage1", applicationId, status],
    queryFn: () => summaryAgainstApplicationId(applicationId, status),
  });
  if (isLoading) {
    return <LoadingItemPlaceholder />;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  const list =
    data.proposalEvaluationQuestions.length > 0 ? (
      data.proposalEvaluationQuestions.map((item) => (
        <SummaryItem key={item.question._id} item={item} />
      ))
    ) : (
      <NoDataAvailable />
    );

  const BuildingList =
    data.building.length > 0 ? (
      data.building.map((item) => <BuildingItem key={item._id} item={item} />)
    ) : (
      <NoDataAvailable />
    );

  const rejectedQuestions =
    data.proposalEvaluationQuestions.filter(
      (item) => item?.evaluation_status === "Rejected"
    ).length || 0;

  const acceptedQuestions =
    data.proposalEvaluationQuestions.filter(
      (item) => item?.evaluation_status === "Approved"
    ).length || 0;

  return (
    <div className="space-y-4">
      <SummaryHeader>
        <SummaryHeader.BlueTab
          value={data.proposalEvaluationQuestions.length || 0}
          title={t("TOTAL CRITERIA")}
        />
        <SummaryHeader.GreenTab
          value={acceptedQuestions}
          title={t("ACCEPTED")}
        />
        <SummaryHeader.RejectedTab
          value={rejectedQuestions}
          title={t("Rejected")}
        />
        <SummaryHeader.YellowTab
          value={data.building.length || 0}
          title={t("SUB-PROJECTS")}
        />
      </SummaryHeader>

      <div className="divide-y divide-gray-200">
        <SectionTitle>{t("Municipality Criterias")}</SectionTitle>
        {list}
      </div>
      {
        <div className="divide-y divide-gray-200">
          <SectionTitle>{t("Sub-projects")}</SectionTitle>
          {BuildingList}
        </div>
      }
    </div>
  );
};

const SummaryItem = ({ item }) => {
  const { t } = useTranslation();

  return (
    <div className="py-6 px-2 flex items-start flex-col-reverse gap-2 md:flex-row md:justify-between">
      <div className="flex items-start gap-2">
        <FaRegQuestionCircle className="text-sky-600 min-w-[24px] mt-1" />
        <div className="space-y-3">
          <h3 className="text-black">{item.question.title}</h3>
          <p className="text-gray-700">{item.question.description}</p>
          {item.evaluation_status === "Rejected" && (
            <p className="text-gray-700">
              <span className="text-black font-medium">
                {t("Evaluator Remarks")}:{" "}
              </span>
              {item.evaluation_comment}
            </p>
          )}
        </div>
      </div>
      <Status status={item.evaluation_status} />
    </div>
  );
};
const BuildingItem = ({ item }) => {
  const { t } = useTranslation();

  return (
    <div className="py-6 px-2 flex items-start flex-col-reverse gap-2 md:flex-row md:justify-between">
      <div className="flex items-start gap-2">
        <FaBuilding className="text-sky-600 min-w-[24px] mt-1" />
        <div className="space-y-3">
          <h3 className="text-black">{item?.name}</h3>
          <p className="text-gray-400">{item?.questionId?.description}</p>
          {item?.evaluation_status === "Rejected" && (
            <p className="text-gray-400">
              <span className="text-black">{t("Evaluator Remarks")}: </span>
              {item?.evaluation_comment}
            </p>
          )}
        </div>
      </div>
      <Status status={item?.evaluation_status} />
    </div>
  );
};

export default EligibilitySummary;
