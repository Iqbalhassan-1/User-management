import React from "react";
import useModal from "../../utils/hooks/useModal";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Accordian,
  Button,
  Modal,
  NoDataAvailable,
  SectionTitle,
  Status,
  TextArea,
} from "../../components";
import BuildingItem from "./BuidlingItem";
import { createRequiredValidation } from "../../utils/utils";

const BuildingQuestions = ({
  buildings,
  buildingQuestions,
  buildingSubmitMutation,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  //translation hook
  const { t } = useTranslation();

  const { applicationId } = useParams();
  const { isOpen, closeModal, toggleModal, selectedValue } = useModal();
  const onSubmitBuilding = (data, approved, id) => {
    const formData = {
      ...data,
      applicationId: applicationId,
      evaluation_status: approved,
      buildingId: id,
    };
    buildingSubmitMutation.mutate(formData);
  };

  return (
    <>
      {buildingQuestions?.length > 0 ? (
        <>
          <SectionTitle>{t("Sub-projects Evaluation")}</SectionTitle>
          {buildings?.building?.map((buildItem, index) => (
            <Accordian
              accordianTitle={`Sub-project ${index + 1}: ${buildItem?.name}`}
              key={buildItem?._id}
              evaluationStatus={buildItem?.evaluation_status}
            >
              {buildingQuestions.map((question, index) => (
                <BuildingItem data={question} key={question?._id} />
              ))}
              {buildItem?.evaluation_status === "Pending" ? (
                <form
                  className="flex items-center gap-3 justify-end p-2"
                  onSubmit={handleSubmit((data) =>
                    onSubmitBuilding(data, "Approved", buildItem?._id)
                  )}
                >
                  <Button variant="secondary" size="sm" type="submit">
                    {t("Yes")}
                  </Button>
                  <Button
                    variant="reject"
                    size="sm"
                    type="button"
                    onClick={() => toggleModal(buildItem?._id)}
                  >
                    {t("No")}
                  </Button>
                </form>
              ) : (
                <div className="flex items-center gap-3 justify-end p-2">
                  <Status status={buildItem?.evaluation_status} />
                </div>
              )}
            </Accordian>
          ))}
        </>
      ) : (
        <NoDataAvailable />
      )}

      <CorrectionOrRejectModalBuildings
        closeModal={closeModal}
        isOpen={isOpen}
        selectedValue={selectedValue}
        buildingQuestions={buildingQuestions}
        buildingSubmitMutation={buildingSubmitMutation}
      />
    </>
  );
};
const CorrectionOrRejectModalBuildings = ({
  closeModal,
  isOpen,
  selectedValue,
  buildingQuestions,
  buildingSubmitMutation,
}) => {
  const { applicationId } = useParams();
  // const { data, isError, isLoading, error } = useQuery({
  //   queryKey: ["Buidling-fields"],
  //   queryFn: () => getAllBuildingFields(),
  // });
  // const [currentStep, setCurrentStep] = useState("default");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    let modifiedData;
    let selectedFieldsRejection = [];
    let status = "Rejected";
    // if (data?.type === "Reject") {
    for (const key in data) {
      if (data[key] === true) {
        selectedFieldsRejection.push(key);
      }
    }
    modifiedData = {
      evaluation_status: status,
      evaluation_comment: data?.remarks,
      applicationId: applicationId,
      buildingId: selectedValue,
      rejection_questions: selectedFieldsRejection,
    };
    // } else {
    //   const selectedFields = Object.keys(data).reduce((result, fieldName) => {
    //     if (data[fieldName] === true) {
    //       result.push(fieldName);
    //     }
    //     return result;
    //   }, []);

    //   modifiedData = {
    //     correction_fields: selectedFields,
    //     applicationId: applicationId,
    //     buildingId: selectedValue,
    //     evaluation_status: data?.type,
    //     evaluation_comment: data?.remarks,
    //   };
    // }

    buildingSubmitMutation.mutate(modifiedData);
    closeModal();
    reset();
  };

  // const isCorrection = watch("type");

  //translation hook
  const { t } = useTranslation();

  return (
    <Modal
      title={t("Reasons for Rejecting the sub-project")}
      isOpen={isOpen}
      onClose={closeModal}
      selectedValue={selectedValue}
      className="max-h-[30rem]"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <h3>{t("Select Questions")}</h3>
          {buildingQuestions?.length > 0 ? (
            buildingQuestions?.map((field) => {
              return (
                <div className="flex items-center gap-2 mb-2" key={field?._id}>
                  <input
                    type="checkbox"
                    id={field?.title}
                    name={field?._id}
                    {...register(field?._id)}
                    className=""
                  />
                  <label
                    htmlFor={field?.title}
                    className="text-md text-gray-500"
                  >
                    {field?.title}
                  </label>
                </div>
              );
            })
          ) : (
            <p>{t("No Data Available")}</p>
          )}
        </div>
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

export default BuildingQuestions;
