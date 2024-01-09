import { useForm } from "react-hook-form";
import {
  Accordian,
  Button,
  Card,
  CustomSelect,
  Input,
  LoadingItemPlaceholder,
  Modal,
  TextArea,
} from "../../components";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  allQuestionSubmiited,
  allQuestionSubmiitedStage2,
  getAllQuestionsEvaluation,
  questionSubmitStageTwo,
} from "../../api/evaService";
import { useEffect, useState } from "react";
import useModal from "../../utils/hooks/useModal";
import toast from "react-hot-toast";
import QuestionCard from "./QuestionCard";
const option = ["Million", "Billion", "Trillion"];

const EvaluationStageTwo = () => {
  const { applicationId, id } = useParams();
  //transaltion hook
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // modal
  const { isOpen, closeModal, toggleModal, selectedValue } = useModal();
  const navigate = useNavigate();
  // for question which not evaluated next and previous
  const handleNextButtonClick = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };
  const handlePrevButtonClick = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const {
    register: finishRegister,
    handleSubmit: finishSubmit,
    formState: { errors: finishError },
    watch,
    setValue,
  } = useForm();
  // get data for rejected request
  const borrowingWatch = watch("borrowing_loan_capacity");
  const requestedLoanWatch = watch("requested_loan");
  const percentageCapacityWatch = watch("percentage_borrowing_capacity");
  const {
    data: questions,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["All-Questions-stage2", applicationId],
    queryFn: () => getAllQuestionsEvaluation(applicationId),
  });
  // each question evaluation post method
  const questionSubmitMutationStage2 = useMutation(questionSubmitStageTwo, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("All-Questions-stage2");
      toast.success(t("Question Evaluated"));
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const SubmitAllQuestionStage2 = useMutation(allQuestionSubmiitedStage2, {
    onSuccess: () => {
      queryClient.invalidateQueries("All-Questions-stage2");
      toast.success("All Questions Submitted");
      navigate(`/proposals/${id}/self-assign/completed`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // show allQuestions where not evaluation not done yet . => false
  const questionsAll = questions?.filter((qs) => qs?.checked === false);

  // show allQuestions where allQuestion evaluated => output true .
  const allQuestionsChecked = questions?.every((question) => question?.checked);

  // each question evaluation
  const onsubmit = (data, approved, id) => {
    const formData = {
      evaluation_score: data.response,
      unit: data.unit ? "" + data.unit : "",
      applicationId: applicationId,
      evaluation_status: approved,
      questionId: id,
    };

    questionSubmitMutationStage2.mutate(formData);
    reset();
    if (questionsAll?.length - 1 === currentQuestionIndex) {
      return handlePrevButtonClick();
    }
  };

  // final Report submit => Rejected
  const onSubmitReport = (data) => {
    const formData = {
      remarksStage2: data?.remarks,
      applicationId: applicationId,
      borrowing_loan_capacity: borrowingWatch,
      requested_loan: requestedLoanWatch,
      percentage_borrowing_capacity: percentageCapacityWatch,
      status: "Rejected",
    };

    SubmitAllQuestionStage2.mutate(formData);
    closeModal();
    reset();
  };

  // final Report submit => Approved
  const onFinishReport = (data) => {
    const formData = {
      applicationId: applicationId,
      status: "Approved",
      ...data,
    };

    SubmitAllQuestionStage2.mutate(formData);
  };

  // loading and errors
  if (isLoading) {
    return <LoadingItemPlaceholder />;
  }
  if (isError) {
    return <p>{error?.message}</p>;
  }
  return (
    <div className="space-y-6">
      <BorrowingCapityForm
        finishRegister={finishRegister}
        finishSubmit={finishSubmit}
        finishError={finishError}
        watch={watch}
        setValue={setValue}
      />
      {allQuestionsChecked ? (
        <Card className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-base font-medium sm:text-lg text-gray-800">
              {t("Review Information")}
            </h3>
            <p>
              {t(`Kindly make sure that you have provided correct information and
              all the decisions are final. Whether the proposal qualify for the
              next stage of evaluation or not, is calculated based on each
              decision you made`)}
            </p>
          </div>
          <div className="space-y-4">
            {questions?.map((appQ, index) => {
              <h3 className="text-base font-medium sm:text-lg text-gray-800">
                {t("Financial Assesstment")}
              </h3>;
              return (
                <div key={index}>
                  <p>
                    {index + 1}. {appQ?.title}
                  </p>
                  {appQ?.evaluation_score > 0 && (
                    <p className="flex gap-4 text-blue-500 font-medium">
                      <span>Assessment Response</span>
                      <span>{`${appQ?.evaluation_score} ${appQ?.unit}`}</span>
                    </p>
                  )}
                </div>
              );
            })}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                className="bg-red-500 hover:bg-red-500"
                onClick={() => toggleModal()}
              >
                Reject
              </Button>
              <Button type="button" onClick={finishSubmit(onFinishReport)}>
                Approve
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Accordian accordianTitle={"Evaluate Questions"} defaultOpen={true}>
          {questionsAll?.length > 0
            ? questionsAll?.map((question, index) => {
                if (index === currentQuestionIndex) {
                  return (
                    <div className="p-2 space-y-4" key={question?._id}>
                      {/* <div>
                        <div className="flex space-y-1">
                          <p className="grow text-gray-900 font-medium">
                            {question?.title}
                          </p>
                          <div className="flex-none w-10 text-blue-500 font-semibold">
                            <span>
                              {currentQuestionIndex + 1} /{" "}
                              {questionsAll?.length}
                            </span>
                          </div>
                        </div>
                        <p>{question?.description}</p>
                      </div> */}
                      <QuestionCard
                        currentQuestionIndex={currentQuestionIndex}
                        questionsAll={questionsAll}
                        title={question?.title}
                        description={question?.description}
                        onNext={handleNextButtonClick}
                        onPrev={handlePrevButtonClick}
                      />
                      <form
                        className="space-y-4"
                        onSubmit={handleSubmit((data) =>
                          onsubmit(data, "Approved", question?._id)
                        )}
                      >
                        <div className="max-w-sm flex items-center gap-2">
                          <Input
                            label={t("Enter value here")}
                            name="response"
                            type="number"
                            placeholder={t("enter here")}
                            register={register}
                            errors={errors}
                            validationSchema={{
                              required: t("Value Required"),
                            }}
                          />
                          <div className="w-1/2">
                            <CustomSelect
                              label="Unit"
                              name="unit"
                              register={register}
                              errors={errors}
                              fisrtOp="Select Unit"
                              validationSchema={{
                                required: "Required",
                              }}
                            >
                              {option?.map((option) => (
                                <option value={option} key={option}>
                                  {option}
                                </option>
                              ))}
                            </CustomSelect>
                          </div>
                        </div>
                        <Button
                          variant="primary"
                          size="sm"
                          type="submit"
                          className="ml-auto"
                        >
                          {isLoading ? "loading" : t("Next")}
                        </Button>
                      </form>
                    </div>
                  );
                }
              })
            : ""}
        </Accordian>
      )}
      <Modal isOpen={isOpen} onClose={closeModal} title="Reject">
        <h2>
          Please indicate whether the proposal is being rejected or requires
          revisions. Additionally, please include comments and reasons to assist
          the municipality.
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmitReport)}>
          <TextArea
            label="Comments"
            name="remarks"
            placeholder="add comments"
            register={register}
            errors={errors}
            validationSchema={{
              required: "Comments is required",
            }}
          />

          <Button type="submit" className="bg-red-500 hover:bg-red-500 ml-auto">
            <span>Reject</span>
          </Button>
        </form>
      </Modal>
    </div>
  );
};

const BorrowingCapityForm = ({
  finishRegister,
  finishSubmit,
  finishError,
  setValue,
  watch,
}) => {
  const borrowingWatch = watch("borrowing_loan_capacity");
  const requestedLoanWatch = watch("requested_loan");

  useEffect(() => {
    // (requested / borrowning) * 100
    if (borrowingWatch === "" && borrowingWatch === 0) {
      setValue("percentage_borrowing_capacity", 0);
      return;
    }

    if (borrowingWatch !== "" && borrowingWatch !== 0) {
      const result = (requestedLoanWatch / borrowingWatch) * 100;
      setValue("percentage_borrowing_capacity", result);
    }
  }, [borrowingWatch, requestedLoanWatch]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={finishSubmit(onSubmit)}
      className="bg-white rounded-lg px-2 py-4 shadow-sm space-y-5"
    >
      <div className="space-y-3">
        <Input
          label="Borrowing Capacity (0.00 UAH)"
          name="borrowing_loan_capacity"
          type="number"
          placeholder={"Enter the amount here"}
          register={finishRegister}
          errors={finishError}
          validationSchema={{
            required: "Points Required",
          }}
        />
        <Input
          label="Requested loan (0.00 UAH)"
          name="requested_loan"
          type="number"
          placeholder={"Enter the amount here"}
          register={finishRegister}
          errors={finishError}
          validationSchema={{
            required: "Points Required",
          }}
        />
        <Input
          label="% of borrowing capacity"
          name="percentage_borrowing_capacity"
          type="number"
          placeholder={"Percentage of borrowing capacity"}
          register={finishRegister}
          errors={finishError}
          // validationSchema={{
          //   required: "Points Required",
          // }}
          disabled
        />
      </div>
    </form>
  );
};

export default EvaluationStageTwo;
