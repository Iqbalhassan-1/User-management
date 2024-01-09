import { useForm, useFieldArray } from "react-hook-form";
import { Button, Input, Modal, TextArea } from "../../components";
import { createRequiredValidation } from "../../utils/utils";
import EvaluatorCategories from "./EvaluatorCategories";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateNewQuestion,
  UpdateQuestion,
  getAllFormFields,
} from "../../api/mctdService";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { MdAdd, MdDelete } from "react-icons/md";

const AddNewQuestion = ({ isOpen, closeModal, selectedValue }) => {
  //translation hook
  const { t } = useTranslation();

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    trigger,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      stage: "Eligibility Screening",
      questionType: "building",
      correctionPossible: "No",
      pointsQuestions: [{ title: "", points: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pointsQuestions",
  });

  const queryClient = useQueryClient();
  const questionSubmitMutation = useMutation(CreateNewQuestion, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("get-All-Questions");
      toast.success(t("Question Added Successfully"));
      closeModal();
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const updateMutateQuestion = useMutation(UpdateQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-All-Questions");
      toast.success(t("Update Question Detail"));
      closeModal();
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { isLoading, mutate } = questionSubmitMutation;

  const onSubmit = (data) => {
    const stageSpecificProperties = {
      "Eligibility Screening": ["questionType", "correctionPossible"],
      "Initial Creditworthiness Assessment": [],
      "Quality and Relevance Screening": ["pointsQuestions", "maxValue"],
      "Creditworthiness Assessment": [],
    };

    const modifiedData = {
      title: data.title,
      description: data.description,
      stage: data.stage,
    };

    stageSpecificProperties[data.stage].forEach((property) => {
      modifiedData[property] = data[property];
    });

    if (!selectedValue) {
      mutate(modifiedData);
      return;
    }

    updateMutateQuestion.mutate({ id: selectedValue._id, data: modifiedData });
  };

  useEffect(() => {
    if (selectedValue) {
      setValue("stage", selectedValue.stage || "");
      setValue("title", selectedValue.title || "");
      setValue("description", selectedValue.description || "");
      setValue("questionType", selectedValue.questionType || "building");
      setValue("correctionPossible", selectedValue.correctionPossible || "No");
      setValue("maxValue", selectedValue.maxValue || "");

      if (
        selectedValue.pointsQuestions &&
        selectedValue.pointsQuestions.length > 0
      ) {
        const pointsQuestions = selectedValue.pointsQuestions.map(
          (point, index) => ({
            title: point.title || "",
            points: point.points || "",
          })
        );
        setValue("pointsQuestions", pointsQuestions);
      }
    }
  }, [setValue, selectedValue]);

  const selectedStage = watch("stage");
  const selectQuestionType = watch("questionType");

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={!selectedValue ? t("Create New Question") : t("Update Question")}
      maxWidth="max-w-3xl"
      className="max-h-[30rem]"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <EvaluatorCategories register={register} errors={errors} />
          <Input
            label={t("Question")}
            name="title"
            type="text"
            placeholder={t("Type your Question")}
            register={register}
            errors={errors}
            validationSchema={createRequiredValidation(
              t("Question title required")
            )}
          />
          <TextArea
            label={t("Description")}
            name="description"
            placeholder={t("Write Description (if any)")}
            register={register}
            errors={errors}
            isOptional
          />
          {selectedStage === "Quality and Relevance Screening" && (
            <div className="space-y-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ title: "", points: "" })}
                className="ml-auto"
              >
                <MdAdd />
                <span>{t("Add Points")}</span>
              </Button>
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-3">
                  {/* <Input
                  label="Name"
                  name={`description.${index}.name`}
                  type="text"
                  placeholder="Add points description"
                  register={register}
                  errors={errors}
                /> */}
                  <div className="flex items-center gap-1 flex-1 w-full">
                    <label htmlFor={`pointsQuestions.${index}.title`}>
                      {index + 1}.
                    </label>
                    <input
                      type="text"
                      name={`pointsQuestions.${index}.title`}
                      id={`pointsQuestions.${index}.title`}
                      placeholder={t("Add points description")}
                      {...register(`pointsQuestions.${index}.title`)}
                      className="border border-gray-200 p-2 rounded-md w-full"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <label
                      htmlFor={`pointsQuestions.${index}.points`}
                      // className="block"
                    >
                      {t("Points")}{" "}
                    </label>
                    <input
                      type="number"
                      name={`pointsQuestions.${index}.points`}
                      id={`pointsQuestions.${index}.points`}
                      placeholder={t("Add points here")}
                      {...register(`pointsQuestions.${index}.points`)}
                      className="border border-gray-200 p-2 rounded-md"
                    />
                  </div>
                  {/* <Input
                  label="Points"
                  name={`description.${index}.point`}
                  type="number"
                  placeholder="Enter here"
                  register={register}
                  errors={errors}
                /> */}
                  <button
                    onClick={() => remove(index)}
                    className="text-red-500"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              ))}
              <div className="w-1/2">
                <Input
                  label={t("Max Value")}
                  name="maxValue"
                  type="number"
                  placeholder={t("max value")}
                  register={register}
                  errors={errors}
                  isOptional
                />
              </div>
            </div>
          )}
          {selectedStage === "Eligibility Screening" && (
            <>
              <div className="space-y-2">
                <h3 className="block font-medium">
                  <span className="text-gray-900">
                    {t("Associated with Buildings")}
                  </span>
                  <span className="text-red-500"> *</span>
                </h3>
                <div className="space-x-2">
                  <input
                    type="radio"
                    className="cursor-pointer"
                    name="questionType"
                    id="building"
                    value="building"
                    {...register("questionType")}
                  />
                  <label
                    htmlFor="building"
                    className="inline-block cursor-pointer"
                  >
                    {t("Yes")}
                  </label>
                </div>

                <div className="space-x-2">
                  <input
                    type="radio"
                    className="cursor-pointer"
                    name="questionType"
                    id="NA"
                    value="NA"
                    {...register("questionType")}
                  />

                  <label htmlFor="NA" className="inline-block cursor-pointer">
                    {t("No")}
                  </label>
                </div>
              </div>
              {selectQuestionType === "NA" && (
                <CorrectionPossible
                  register={register}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                  trigger={trigger}
                  selectedValue={selectedValue}
                />
              )}
            </>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isLoading}
          >
            {isLoading
              ? t("Processing...")
              : selectedValue
              ? t("Update Question")
              : t("Save Question")}
          </Button>

          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={closeModal}
          >
            {t("Cancel")}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

const CorrectionPossible = ({ register }) => {
  //translation hook
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <h3 className="block font-medium">
          <span className="text-gray-900">{t("Correction Possible")}</span>
          <span className="text-red-500"> *</span>
        </h3>

        <div className="space-x-2">
          <input
            type="radio"
            className="cursor-pointer"
            name="correctionPossible"
            id="Yes"
            value="Yes"
            {...register("correctionPossible")}
          />
          <label htmlFor="Yes" className="inline-block cursor-pointer">
            {t("Yes")}
          </label>
        </div>

        <div className="space-x-2">
          <input
            type="radio"
            className="cursor-pointer"
            name="correctionPossible"
            id="No"
            value="No"
            {...register("correctionPossible")}
          />

          <label htmlFor="No" className="inline-block cursor-pointer">
            {t("No")}
          </label>
        </div>
      </div>
    </div>
  );
};

/*

{correctionPossible === "Yes" && (
        <div className="space-y-3">
          <MultiSelect
            label={t("Correction Fields")}
            name="correctionFields"
            options={options}
            register={register}
            unregister={unregister}
            values={values}
            trigger={trigger}
            setValue={setValue}
            errors={errors}
            validationSchema={{
              required: t("Select atleast one one Correction field"),
            }}
          />

          <div className={`flex items-center flex-wrap gap-2`}>
            {values?.map((value) => (
              <div
                className={`flex items-center gap-2 bg-gray-100 rounded-md p-2 text-gray-600 font-semibold text-sm opac`}
                aria-label="badge"
                key={value?.id}
              >
                {/* <span>{getTarget(options, value)?.name}</span> */
//         <span>{value?.name}</span>

//         <button
//           className=""
//           onClick={() => removeSelectedPartner(value)}
//           type="button"
//         >
//           <FaTimes />
//         </button>
//       </div>
//     ))}
//   </div>
// </div>
// )}

// */

export default AddNewQuestion;

const MultiSelect = ({
  name,
  label,
  options: possiblesValues,
  register,
  trigger,
  values,
  setValue,
  disabled,
  errors,
  validationSchema,
}) => {
  const customOnChange = useCallback(
    (event) => {
      const selectedValueId = Number(event.target.value);
      const selectedValue = possiblesValues?.find(
        (value) => value?.id === selectedValueId
      );

      setValue("values", [...values, selectedValue]);
      trigger("values");
    },
    [values, setValue, trigger]
  );

  //translation hook
  const { t } = useTranslation();

  useEffect(() => {
    register("values", validationSchema);
  }, [register, validationSchema]);

  const selectedValuesFilter = possiblesValues?.filter(
    (value) => !values?.find((selected) => selected?.id === value?.id)
  );
  console.log("selec", selectedValuesFilter);

  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        <span className="text-gray-900">{label}</span>
        <span className="text-red-500"> *</span>
      </label>
      <select
        id={name}
        name={name}
        onChange={customOnChange}
        className={`box-border w-full border text-gray-600 focus-within:outline-none rounded-md transition-colors px-1 py-2 border-gray-200 focus:outline-none ${
          errors[name]?.message ? "border-red-500" : "focus:border-blue-500"
        } ${disabled ? "bg-slate-100" : ""}`}
      >
        <option value="">{t("Select Field")}</option>
        {possiblesValues?.length > 0 &&
          selectedValuesFilter?.map((value) => {
            return (
              <option key={value?.id} value={value?.id}>
                {value?.name}
              </option>
            );
          })}
      </select>
      {errors && errors?.values && values?.length === 0 && (
        <p className="mt-1 text-sm text-red-500" role="alert">
          {errors.values.message}
        </p>
      )}
    </div>
  );
};
