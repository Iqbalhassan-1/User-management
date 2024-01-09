import { useForm } from "react-hook-form";
import {
  Accordian,
  Button,
  Card,
  CustomSelect,
  Input,
  Modal,
  TextArea,
} from "../../components";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  allQuestionSubmiited,
  allQuestionSubmiitedStage2,
  allQuestionSubmiitedStage3,
  getAllQuestionsEvaluation,
  questionSubmitStageThree,
  questionSubmitStageTwo,
} from "../../api/evaService";
import { useState } from "react";
import useModal from "../../utils/hooks/useModal";
import toast from "react-hot-toast";
const option = ["Million", "Billion", "Trillion"];

const EvaluationStageThree = () => {
  const { applicationId, id } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const queryClient = useQueryClient();
  const { isOpen, closeModal, toggleModal, selectedValue } = useModal();
  const navigate = useNavigate();

  const {
    data: questions,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["All-Questions-stage3", applicationId],
    queryFn: () => getAllQuestionsEvaluation(applicationId),
  });
  // post api mutation
  const questionSubmitMutationStage3 = useMutation(questionSubmitStageThree, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("All-Questions-stage3");
      toast.success(t("Question Evaluated"));
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const SubmitAllQuestionStage3 = useMutation(allQuestionSubmiitedStage3, {
    onSuccess: () => {
      queryClient.invalidateQueries("All-Questions-stage3");
      toast.success("All Questions Submitted");
      navigate(`/proposals/${id}/self-assign/completed`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const questionsAll = questions?.filter((qs) => qs?.checked === false);
  const allQuestionsChecked = questions?.every((question) => question?.checked);

  //transaltion hook
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onsubmit = (data, approved, questionId) => {
    // const flattenedArray = questions?.flatMap((obj) => obj?.pointsQuestions);
    // const pointsQuestion = flattenedArray?.filter(
    //   (item) => item?._id === data?.question
    // );
    // console.log("flated", flattenedArray, pointsQuestion);

    const formData = {
      applicationId: applicationId,
      evaluation_status: approved,
      questionId: questionId,
      selectedPointId: data?.question,
    };
    if (data?.question === null) {
      toast.error("please select points");
    } else {
      questionSubmitMutationStage3.mutate(formData);
      reset();
    }
  };

  const onSubmitReport = (data) => {
    const formData = {
      remarksStage3: data?.remarks,
      applicationId: applicationId,
      status: "Rejected",
    };
    SubmitAllQuestionStage3.mutate(formData);
    closeModal();
    reset();
  };
  const onFinishReport = () => {
    const formData = {
      applicationId: applicationId,
      status: "Approved",
    };
    console.log("formdata", formData);
    SubmitAllQuestionStage3.mutate(formData);
    // SubmitReport.mutate({ userId: user._id, formData });
  };

  // const getAllArrayOfObject = questions?.flatMap((obj) => obj?.pointsQuestions);
  const totalPoints = questions?.reduce(
    (acc, q) => acc + (Number(q?.maxValue) || 0),
    0
  );
  const obtainedPoints = questions?.reduce(
    (acc, q) => acc + (Number(q.selecetdPoint?.points) || 0),
    0
  );
  const onError = (errors, e) => console.log(errors, e);

  return (
    <div>
      {allQuestionsChecked ? (
        <>
          {/* <Card className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-base font-medium sm:text-lg text-gray-800">
                {t("Review Information")}
              </h3>
              <p>
                {t(`Kindly make sure that you have provided correct information and
                all the decisions are final. Whether the proposal qualify for
                the next stage of evaluation or not, is calculated based on each
                decision you made.`)}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-medium sm:text-lg text-gray-800">
                {t("Municipality Summary")}
              </h3>
              {questions?.map((appQ, index) => {
                return (
                  <div key={index} className="space-y-2">
                    <p>
                      {index + 1}. {appQ?.title}
                    </p>
                    {appQ?.points > 0 && (
                      <p className="flex gap-4 text-blue-500 font-medium">
                        <span>Points</span>
                        <span>{`${appQ?.points}`}</span>
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
                <Button type="button" onClick={onFinishReport}>
                  Finish
                </Button>
              </div>
            </div>
          </Card> */}
          <Card>
            {/* SUMMARY DESIGN START FROM HERE  */}
            <Accordian accordianTitle="Summary" defaultOpen={true}>
              <div className="divide-y divide-gray-100 shadow-sm p-2 space-y-4">
                {questions?.map((appQ, index) => {
                  return (
                    <div key={index} className="space-y-2">
                      <p>
                        {index + 1}. {appQ?.selecetdPoint?.title}
                      </p>

                      <p className="flex max-w-min ml-auto px-2 py-1 gap-2 text-sky-500 font-medium border rounded-md border-sky-500">
                        <span>{`${appQ?.selecetdPoint?.points}`}</span>
                        <span>Points</span>
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="grid grid-cols-2 p-2 gap-4">
                <div className="flex items-center gap-2 bg-sky-100 border border-sky-300 rounded-sm p-2 lg:p-4">
                  <h2 className="font-bold text-2xl text-sky-700">
                    {totalPoints}
                  </h2>
                  <h2>TOTAL POINTS</h2>
                </div>
                <div className="flex items-center gap-2 bg-sky-100 border border-sky-300 rounded-sm p-2 lg:p-4">
                  <h2 className="font-bold text-2xl text-sky-700">
                    {obtainedPoints}
                  </h2>
                  <h2>OBTAINED POINTS</h2>
                </div>
              </div>
              <div className="flex justify-end gap-3 p-2">
                <Button
                  type="button"
                  className="bg-red-500 hover:bg-red-500"
                  onClick={() => toggleModal()}
                >
                  Reject
                </Button>
                <Button type="button" onClick={onFinishReport}>
                  Approve
                </Button>
              </div>
              {/* <div className="p-2">
                <Button
                  className="ml-auto"
                  size="md"
                  type="button"
                  onClick={onFinishReport}
                >
                  Submit
                </Button>
              </div> */}
            </Accordian>
          </Card>
        </>
      ) : (
        questionsAll?.map((question, index) => {
          return (
            <>
              <Accordian
                accordianTitle={`${index + 1}. ${question?.title}`}
                defaultOpen={index === currentQuestionIndex ? true : false}
                key={index}
              >
                <form
                  className="p-2"
                  onSubmit={handleSubmit(
                    (data) => onsubmit(data, "Approved", question?._id),
                    onError
                  )}
                >
                  {question?.pointsQuestions?.map((item, questionIndex) => {
                    return (
                      <div
                        className="flex items-start space-x-2 my-2"
                        key={questionIndex}
                      >
                        <input
                          type="radio"
                          className="cursor-pointer mt-2"
                          name="question"
                          id={item?._id}
                          value={item?._id}
                          {...register("question")}
                        />
                        <label
                          htmlFor={`${item?._id}`}
                          className="cursor-pointer flex-1"
                        >
                          <span className="block">{item?.title}</span>
                          <span className="text-gray-500">
                            Points: {item?.points}
                          </span>
                        </label>
                      </div>
                    );
                  })}
                  <Button
                    className="ml-auto"
                    size="sm"
                    variant="primary"
                    type="submit"
                  >
                    {isLoading ? "loading" : "Submit"}
                  </Button>
                </form>
              </Accordian>
            </>
          );
        })
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

export default EvaluationStageThree;
