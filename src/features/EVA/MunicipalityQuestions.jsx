import { useTranslation } from "react-i18next";
import useModal from "../../utils/hooks/useModal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  buildingSubmit,
  getAllQuestionsFields,
  questionSubmit,
  questionUpdateStep1,
} from "../../api/evaService";
import {
  Accordian,
  Button,
  Modal,
  SectionTitle,
  Status,
  TextArea,
} from "../../components";
import QuestionCard from "./QuestionCard";
import { useParams } from "react-router-dom";
import BuildingQuestions from "./BuildingQuestions";
import { createRequiredValidation } from "../../utils/utils";
import { FiEdit } from "react-icons/fi";
import toast from "react-hot-toast";

const MunicipalityQuestions = ({
  questions,
  buildings,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  applicationId,
  buildingQuestions,
  isLoading,
  onPrev,
  onNext,
  handleNextEvaluated,
  handlePrevEvaluated,
  currentEvaluatedIndex,
  isEditMode,
  onEditMode,
}) => {
  //transaltion hook
  const { t } = useTranslation();

  const { isOpen, closeModal, toggleModal, selectedValue } = useModal();

  const questionsUnevaluated = questions?.filter((qs) => qs?.checked === false);
  // get evaluated questions
  const questionsEvaluated = questions?.filter((q) => q?.checked === true);
  const allQuestionsChecked = questions?.every((question) => question?.checked);

  const [showEvaluated, setShowEvaluated] = useState(false);
  const [showUnevaluated, setShowUnevaluated] = useState(true);

  const handleEvaluatedButtonClick = () => {
    setShowEvaluated(true);
    setShowUnevaluated(false);
  };

  const handleUnevaluatedButtonClick = () => {
    setShowEvaluated(false);
    setShowUnevaluated(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const queryClient = useQueryClient();
  const buildingSubmitMutation = useMutation(buildingSubmit, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("All-Buildings");
      toast.success(t("Building Evaluated"));
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const questionSubmitMutation = useMutation(questionSubmit, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("All-Questions");
      toast.success(t("Question Evaluated"));
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const questionUpdateMutation = useMutation(questionUpdateStep1, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("All-Questions");
      toast.success(data?.message);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmitQuestion = (data, approved, id, isEditMode) => {
    if (isEditMode) {
      const formData = {
        ...data,
        applicationId: applicationId,
        evaluation_status: approved,
        questionId: id,
      };
      // questionevaluated
      questionUpdateMutation.mutate(formData);
      console.log("formdata update", formData);
      if (questionsEvaluated?.length - 1 === currentEvaluatedIndex) {
        return onPrev();
      }
    } else if (!isEditMode) {
      const formData = {
        ...data,
        applicationId: applicationId,
        evaluation_status: approved,
        questionId: id,
      };
      console.log("formdata post", formData);

      // questionevaluated
      questionSubmitMutation.mutate(formData);
      if (questionsUnevaluated?.length - 1 === currentQuestionIndex) {
        return onPrev();
      }
    }
    // onPrev();
  };

  return (
    <>
      <SectionTitle>{t("Municipality Evaluation")}</SectionTitle>
      {/* togglebuttons */}
      <div className="flex gap-2">
        <ToggleButton
          onClick={handleUnevaluatedButtonClick}
          isActive={showUnevaluated}
          count={questionsUnevaluated?.length}
        >
          Unevaluated
        </ToggleButton>
        <ToggleButton
          onClick={handleEvaluatedButtonClick}
          isActive={showEvaluated}
          count={questionsEvaluated?.length}
        >
          Evaluated
        </ToggleButton>
      </div>
      {/* questions evaluated & unevaluated  */}
      {showUnevaluated && (
        <Accordian
          accordianTitle="Questions"
          evaluationStatus={allQuestionsChecked ? "Approved" : "Pending"}
          defaultOpen={true}
        >
          {questionsUnevaluated?.length > 0
            ? questionsUnevaluated?.map((question, index) => {
                if (index === currentQuestionIndex) {
                  return (
                    <div className="p-2 space-y-4" key={question?._id}>
                      <QuestionCard
                        currentQuestionIndex={currentQuestionIndex}
                        questionsAll={questionsUnevaluated}
                        title={question?.title}
                        description={question?.description}
                        onNext={onNext}
                        onPrev={onPrev}
                      />
                      <QuestionForm
                        handleSubmit={handleSubmit}
                        onSubmitQuestion={onSubmitQuestion}
                        isEditMode={false}
                        isLoading={isLoading}
                        toggleModal={toggleModal}
                        questionId={question?._id}
                      />
                    </div>
                  );
                }
              })
            : null}
        </Accordian>
      )}
      {showEvaluated && (
        <Accordian accordianTitle={"Questions"} defaultOpen={true}>
          {questionsEvaluated?.length > 0
            ? questionsEvaluated?.map((qsEva, index) => {
                if (index === currentEvaluatedIndex) {
                  return (
                    <div className="p-2 space-y-4" key={qsEva?._id}>
                      <QuestionCard
                        currentQuestionIndex={currentEvaluatedIndex}
                        questionsAll={questionsEvaluated}
                        title={qsEva?.title}
                        description={qsEva?.description}
                        onNext={handleNextEvaluated}
                        onPrev={handlePrevEvaluated}
                      />
                      <div className="flex items-center gap-3 justify-start">
                        <span className="text-sky-600 font-medium">
                          Evaluated
                        </span>{" "}
                        <Status status={qsEva?.evaluation_status} />
                      </div>
                      {!isEditMode ? (
                        <Button
                          type="button"
                          className="ml-auto"
                          size="sm"
                          variant={"outline"}
                          onClick={onEditMode}
                        >
                          <span>
                            <FiEdit size={18} />
                          </span>
                        </Button>
                      ) : (
                        <QuestionForm
                          handleSubmit={handleSubmit}
                          onSubmitQuestion={onSubmitQuestion}
                          isEditMode={true}
                          isLoading={isLoading}
                          toggleModal={toggleModal}
                          questionId={qsEva?._id}
                        />
                      )}
                    </div>
                  );
                }
              })
            : null}
        </Accordian>
      )}

      <BuildingQuestions
        buildings={buildings}
        buildingQuestions={buildingQuestions}
        buildingSubmitMutation={buildingSubmitMutation}
      />
      <CorrectionOrRejectModalQuestions
        closeModal={closeModal}
        isOpen={isOpen}
        selectedValue={selectedValue}
        questionSubmitMutation={questionSubmitMutation}
        isEditMode={isEditMode}
        questionUpdateMutation={questionUpdateMutation}
        questionsEvaluated={questionsEvaluated}
      />
    </>
  );
};

const CorrectionOrRejectModalQuestions = ({
  closeModal,
  isOpen,
  selectedValue,
  questionSubmitMutation,
  questionUpdateMutation,
  questionsEvaluated,
}) => {
  const { applicationId } = useParams();
  const { t } = useTranslation();

  const {
    data: questionFields,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Questions-Fields"],
    queryFn: () => getAllQuestionsFields(),
  });

  // const [currentStep, setCurrentStep] = useState("default");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const selectedIds = selectedValue;
  const getSelectedQuestionIds = questionsEvaluated?.find(
    (qs) => qs?._id === selectedIds
  );
  const isMatchFound = getSelectedQuestionIds !== undefined;

  const onSubmit = (data) => {
    let modifiedData;
    if (data?.type === "Rejected") {
      modifiedData = {
        evaluation_status: data.type,
        evaluation_comment: data?.remarks,
        applicationId: applicationId,
        questionId: selectedValue,
      };
    } else {
      const selectedFields = [];
      for (const section in questionFields) {
        if (questionFields?.hasOwnProperty(section)) {
          const sectionData = questionFields[section];
          for (const field of sectionData) {
            if (data[field.field_name] === true) {
              selectedFields?.push(field);
            }
          }
        }
      }
      modifiedData = {
        correction_fields: selectedFields,
        applicationId: applicationId,
        questionId: selectedValue,
        evaluation_status: data?.type,
        evaluation_comment: data?.remarks,
      };
    }
    if (isMatchFound) {
      questionUpdateMutation.mutate(modifiedData);
    } else if (!isMatchFound) {
      questionSubmitMutation.mutate(modifiedData);
    }
    closeModal();
    reset();
  };

  const isCorrection = watch("type");

  return (
    <Modal
      title={t("Correct/Reject Question")}
      isOpen={isOpen}
      onClose={closeModal}
      selectedValue={selectedValue}
      className="max-h-[30rem]"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <h3>{t("Please select one of the options below:")}</h3>
          <div className="space-x-2 mb-1">
            <input
              type="radio"
              className="cursor-pointer"
              name="type"
              id="request-correction"
              value="Correction"
              {...register(
                "type",
                createRequiredValidation(t("Please Select one"))
              )}
            />
            <label
              htmlFor="request-correction"
              className="inline-block cursor-pointer text-gray-600"
            >
              {t("Request Correction")}
            </label>
          </div>
          <div className="space-x-2">
            <input
              type="radio"
              className="cursor-pointer"
              name="type"
              id="rejected"
              value="Rejected"
              {...register(
                "type",
                createRequiredValidation(t("Please Select one"))
              )}
            />
            <label
              htmlFor="rejected"
              className="inline-block cursor-pointer text-gray-600"
            >
              {t("Reject")}
            </label>
          </div>
          {errors?.type && (
            <p
              className="flex items-center gap-1 text-sm text-red-500"
              role="alert"
            >
              <span aria-label="Error">
                <MdErrorOutline />
              </span>
              <span>{errors?.type?.message}</span>
            </p>
          )}
        </div>
        {isCorrection === "Correction" && (
          <div>
            <h3>{t("Fields")}</h3>
            {Object?.keys(questionFields)?.map((title) => (
              <div key={title}>
                <h4>{title}</h4>
                {questionFields[title]?.map((field) => {
                  return (
                    <div
                      key={field?.field_name}
                      className="flex items-center gap-2 mb-2"
                    >
                      <input
                        type="checkbox"
                        id={field?.field_name}
                        name={field?.field_name}
                        {...register(field?.field_name)}
                        className=""
                      />
                      <label
                        htmlFor={field?.field_name}
                        className="text-md text-gray-500"
                      >
                        {field?.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
        <TextArea
          label={t("Remarks")}
          name="remarks"
          register={register}
          errors={errors}
          validationSchema={createRequiredValidation(t("Please add remarks"))}
        />
        <div className="flex items-center justify-end gap-3">
          <Button variant="primary" size="sm" type="submit">
            {t("Submit")}
          </Button>
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={closeModal}
          >
            {t("Cancel")}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
const QuestionForm = ({
  questionId,
  isEditMode,
  isLoading,
  toggleModal,
  onSubmitQuestion,
  handleSubmit,
}) => {
  const { t } = useTranslation();

  return (
    <form
      className="flex items-center gap-3 justify-end"
      onSubmit={handleSubmit((data) =>
        onSubmitQuestion(data, "Approved", questionId, isEditMode)
      )}
    >
      <Button variant="secondary" size="sm" type="submit">
        {isLoading ? "loading" : t("Yes")}
      </Button>
      <Button
        variant="reject"
        size="sm"
        type="button"
        onClick={() => toggleModal(questionId)}
      >
        {isLoading ? "loading" : t("No")}
      </Button>
    </form>
  );
};
const ToggleButton = ({ onClick, isActive, count, children }) => (
  <Button
    type="button"
    size="sm"
    className={`${
      isActive ? "bg-sky-600 text-white" : "bg-gray-400 text-white"
    }`}
    onClick={onClick}
  >
    {children}
    <span
      className={`text-sm rounded-full h-6 w-6 grid place-items-center ${
        isActive ? "text-gray-500 bg-gray-100" : "text-white bg-gray-500"
      }`}
    >
      {count}
    </span>
  </Button>
);
export default MunicipalityQuestions;
