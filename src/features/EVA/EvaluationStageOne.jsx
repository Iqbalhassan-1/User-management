import { useState } from "react";
import { Button, Card, LoadingItemPlaceholder } from "../../components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  allQuestionSubmiited,
  getAllQuestionsBuilding,
  getAllQuestionsEvaluation,
} from "../../api/evaService";
import useAuthContext from "../../utils/hooks/useAuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { getAppBuildingById } from "../../api/muniService";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import CountStatus from "./CountStatus";
import MunicipalityQuestions from "./MunicipalityQuestions";

const EvaluationStageOne = () => {
  return <Questions />;
};

const Questions = () => {
  //translation hook
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const { applicationId, id } = useParams();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentEvaluatedIndex, setCurrentEvaluatedIndex] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleIsEditMode = () => {
    setIsEditMode((prevMode) => !prevMode);
  };

  // for question which not evaluated next and previous
  const handleNextButtonClick = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };
  const handlePrevButtonClick = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  // for question which evaluated next and previous
  const handleNextEvaluated = () => {
    setCurrentEvaluatedIndex((prevIndex) => prevIndex + 1);
    setIsEditMode(false);
  };
  const handlePrevEvaluated = () => {
    setCurrentEvaluatedIndex((prevIndex) => prevIndex - 1);
    setIsEditMode(false);
  };
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["All-Questions", applicationId],
    queryFn: () => getAllQuestionsEvaluation(applicationId),
  });
  const {
    data: buildingQuestions,
    isLoading: isBuilidingQuestionLoading,
    isError: buildingQuestionIsError,
    error: buildingQuestionError,
  } = useQuery({
    queryKey: ["All-buidling-Questions", applicationId],
    queryFn: () => getAllQuestionsBuilding(applicationId),
  });
  const {
    data: allBuildings,
    isLoading: isAllBuildingsLoading,
    isError: allBuildingsIsError,
    error: allBuildingError,
  } = useQuery({
    queryKey: ["All-Buildings", applicationId],
    queryFn: () => getAppBuildingById(applicationId),
  });

  const SubmitAllQuestion = useMutation(allQuestionSubmiited, {
    onSuccess: () => {
      queryClient.invalidateQueries("All-Questions");
      toast.success("All Questions Submitted");
      navigate(`/proposals/${id}/self-assign/completed`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const allQuestionsChecked = data?.every((question) => question?.checked);
  const allBuildingsChecked = allBuildings?.building?.every(
    (buildItem) => buildItem?.evaluation_status !== "Pending"
  );

  const getCountByStatus = (data, status) =>
    data?.filter((item) => item?.evaluation_status === status)?.length;

  const approvedCountq = getCountByStatus(data, "Approved");
  const correctionCountq = getCountByStatus(data, "Correction");
  const rejectedCountq = getCountByStatus(data, "Rejected");

  const approvedCountb = getCountByStatus(allBuildings?.building, "Approved");
  const correctionCountb = getCountByStatus(
    allBuildings?.building,
    "Correction"
  );
  const rejectedCountb = getCountByStatus(allBuildings?.building, "Rejected");

  // final step Submission

  const handleSubmitQuestions = () => {
    let status = "";
    if (
      rejectedCountq > 0 ||
      allBuildings?.building?.length === rejectedCountb
    ) {
      status = "Rejected";
    } else if (correctionCountq > 0) {
      status = "Correction";
    } else {
      status = "Approved";
    }
    const formData = {
      applicationId: applicationId,
      status: status,
    };
    SubmitAllQuestion.mutate(formData);
  };

  if (isLoading || isBuilidingQuestionLoading || isAllBuildingsLoading) {
    return <LoadingItemPlaceholder />;
  }
  if (isError || buildingQuestionIsError || allBuildingsIsError) {
    return (
      <p>
        {error?.message ||
          buildingQuestionError?.message ||
          allBuildingError?.message}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {(allBuildingsChecked || buildingQuestions?.length === 0) &&
      allQuestionsChecked ? (
        <Card>
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-medium sm:text-lg text-gray-800">
                {t("Review Information Application")}
              </h3>
              <p>
                {t(`Kindly make sure that you have provided correct information and
                all the decisions are final. Whether the proposal qualify for
                the next stage of evaluation or is calculated based on each
                decision you made.`)}
              </p>
            </div>
            <h3 className="text-base font-medium sm:text-lg text-gray-800">
              {t("Evaluated Questions Against Municipality Information")}
            </h3>
            <CountStatus
              approvedCount={approvedCountq}
              correctionCount={correctionCountq}
              rejectedCount={rejectedCountq}
              t={t}
            />
            <h3 className="text-base font-medium sm:text-lg text-gray-800">
              {t("Evaluated Sub-project")}
            </h3>
            <CountStatus
              approvedCount={approvedCountb}
              rejectedCount={rejectedCountb}
              t={t}
            />
            {rejectedCountq > 0 ||
            allBuildings?.building?.length === rejectedCountb ? (
              <p className="text-red-500 font-semibold">
                {t(`The Quality and Relevance Screening of this proposal is going to
                be marked as rejected.`)}
              </p>
            ) : correctionCountq > 0 ? (
              <p className="text-yellow-500 font-semibold">
                {t("This proposal is going to be submitted for correction.")}
              </p>
            ) : (
              <p className="text-blue-500 font-semibold">
                {t(`The Eligibility Screening of this proposal is going to be marked
                as approved.`)}
              </p>
            )}

            <Button
              className="ml-auto"
              type="button"
              onClick={handleSubmitQuestions}
            >
              {t("Process Application")}
            </Button>
          </div>
        </Card>
      ) : (
        <MunicipalityQuestions
          questions={data}
          buildings={allBuildings}
          buildingQuestions={buildingQuestions}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          applicationId={applicationId}
          isLoading={isLoading}
          onNext={handleNextButtonClick}
          onPrev={handlePrevButtonClick}
          handleNextEvaluated={handleNextEvaluated}
          handlePrevEvaluated={handlePrevEvaluated}
          currentEvaluatedIndex={currentEvaluatedIndex}
          isEditMode={isEditMode}
          onEditMode={handleIsEditMode}
        />
      )}
    </div>
  );
};

export default EvaluationStageOne;
