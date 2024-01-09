import { useQuery } from "@tanstack/react-query";
import { Accordian, LoadingItemPlaceholder } from "../../components";
import QuestionSelection from "./QuestionSelection";
import { getQuestionsByCategory } from "../../api/mctdService";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { MdErrorOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";

const CFPQuestions = () => {
  //translation hook
  const { t } = useTranslation();
  const {
    formState: { errors, isSubmitted },
    setError,
    clearErrors,
    watch,
  } = useFormContext();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-question-by-catgeory"],
    queryFn: getQuestionsByCategory,
  });

  const questionsWatch = watch("questions");

  useEffect(() => {
    if (data && isSubmitted) {
      const eligibilityQuestionsIds = data["Eligibility Screening"]?.map(
        (question) => question._id
      );

      const qualityQuestionsIds = data["Quality and Relevance Screening"]?.map(
        (question) => question._id
      );

      const hasEligibilityQuestion = questionsWatch.some((id) =>
        eligibilityQuestionsIds.includes(id)
      );

      const hasQualityQuestion = questionsWatch.some((id) =>
        qualityQuestionsIds.includes(id)
      );

      if (!hasEligibilityQuestion && !hasQualityQuestion) {
        setError("questions", {
          type: "required",
          message:
            "Please select questions from both Eligibility Screening and Quality Relevance",
        });
      } else if (!hasEligibilityQuestion) {
        setError("questions", {
          type: "required",
          message:
            "Please select at least one question from Eligibility Screening.",
        });
      } else if (!hasQualityQuestion) {
        setError("questions", {
          type: "required",
          message:
            "Please select at least one question from Quality and Relevance Screening.",
        });
      } else {
        clearErrors("questions");
      }
    }
  }, [questionsWatch, setError, clearErrors, isSubmitted]);

  if (isLoading) {
    return <LoadingItemPlaceholder />;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="w-full space-y-3">
      <Accordian accordianTitle={"Eligibility Review Questions"}>
        <QuestionSelection questions={data["Eligibility Screening"]} />
      </Accordian>
      <Accordian accordianTitle={"Initial Credit Worthiness Assessment"}>
        <QuestionSelection
          questions={data["Initial Creditworthiness Assessment"]}
        />
      </Accordian>
      <Accordian accordianTitle="Quality and Relevance Screening">
        <QuestionSelection
          questions={data["Quality and Relevance Screening"]}
        />
      </Accordian>
      <Accordian accordianTitle="Final Credit Worthiness Assessment">
        <QuestionSelection questions={data["Creditworthiness Assessment"]} />
      </Accordian>
      {errors && errors?.questions?.type === "required" && (
        <p
          className="mt-1 flex items-center gap-1 text-sm text-red-500"
          role="alert"
        >
          <span aria-label="Error">
            <MdErrorOutline />
          </span>
          <span>{errors?.questions?.message}</span>
        </p>
      )}
    </div>
  );
};

export default CFPQuestions;
