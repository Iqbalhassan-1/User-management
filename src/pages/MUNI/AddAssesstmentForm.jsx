import React, { useEffect, useState } from "react";
import {
  Button,
  CustomSelect,
  FileInput,
  Input,
  TextArea,
} from "../../components";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { createRequiredValidation } from "../../utils/utils";
import { FaArrowRight } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import {
  addSelfAssessmentData,
  checkAssessmentStatus,
} from "../../api/muniService";
import toast from "react-hot-toast";

const AddAssesstmentForm = ({
  nextStep,
  handleNextStep,
  formData,
  isEligibleTrue,
}) => {
  //translation hook
  const { t } = useTranslation();
  const { setValue, getValues } = useForm();

  const [isEligible, setIsEligible] = useState({ status: false });

  const handleEligibility = (conditions) => {
    setIsEligible({
      conditions,
      status: true,
    });
    handleNextStep({ ...conditions, isEligible: true });
  };
  useEffect(() => {
    const formValues = getValues();
    Object.keys(formValues).forEach(
      (field) => {
        setValue(field, formValues[field]);
      },
      [formValues, setValue]
    );
  }, [formData, setValue, getValues, isEligible]);

  return (
    <>
      <CheckEligibility
        handleEligibility={handleEligibility}
        handleNextStep={handleNextStep}
        formData={formData}
        isEligibleTrue={isEligibleTrue}
      />
      {(isEligible.status || isEligibleTrue) && (
        <Assessments
          conditions={isEligible.conditions}
          nextStep={nextStep}
          handleNextStep={handleNextStep}
          formData={formData}
        />
      )}
    </>
  );
};

const CheckEligibility = ({
  handleEligibility,
  handleNextStep,
  formData,
  isEligibleTrue,
}) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      borrowing_category: String(formData.borrowing_category),
      payment_schedules: formData.payment_schedules,
      repeated_payment: formData.repeated_payment,
    },
  });

  const mutation = useMutation(checkAssessmentStatus, {
    onSuccess: (data) => {
      if (data.status) {
        handleEligibility(data?.conditions);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    const modifiedData = {
      ...data,
      borrowing_category: Number(data.borrowing_category),
    };
    console.log("conditiondata", data);
    handleNextStep(modifiedData);
    mutation.mutate(modifiedData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="font-medium text-lg">{t("Barrower Category")}</h3>
        <div className="space-y-3">
          <div className="flex items-start lg:items-center gap-2 lg:gap-1">
            <input
              type="radio"
              className="cursor-pointer mt-1 lg:mt-0"
              name="borrowing_category"
              id="1"
              value="1"
              {...register(
                "borrowing_category",
                createRequiredValidation(t("Please Select one"))
              )}
              disabled={isEligibleTrue}
            />
            <label htmlFor="1" className="inline-block cursor-pointer">
              {t(
                "A city of oblast significance or a territorial community with an administrative center in a city of oblast significance"
              )}
            </label>
          </div>
          <div className="flex items-center gap-2 lg:gap-1">
            <input
              type="radio"
              className="cursor-pointer"
              name="borrowing_category"
              id="2"
              value="2"
              {...register(
                "borrowing_category",
                createRequiredValidation(t("Please Select one"))
              )}
              disabled={isEligibleTrue}
            />
            <label htmlFor="2" className="inline-block cursor-pointer">
              {t("District Council")}
            </label>
          </div>
          <div className="flex items-start lg:items-center gap-2 lg:gap-1">
            <input
              type="radio"
              className="cursor-pointer mt-1"
              name="borrowing_category"
              id="3"
              value="3"
              {...register(
                "borrowing_category",
                createRequiredValidation(t("Please Select one"))
              )}
              disabled={isEligibleTrue}
            />
            <label htmlFor="3" className="inline-block cursor-pointer">
              {t(
                "A city of rayon significance or a territorial community with an administrative center in a city of rayon significance"
              )}
            </label>
          </div>
          <div className="flex items-center gap-2 lg:gap-1">
            <input
              type="radio"
              className="cursor-pointer"
              name="borrowing_category"
              id="4"
              value="4"
              {...register(
                "borrowing_category",
                createRequiredValidation(t("Please Select one"))
              )}
              disabled={isEligibleTrue}
            />
            <label htmlFor="4" className="inline-block cursor-pointer">
              {t("Village/rural territorial community")}
            </label>
          </div>
          {errors?.borrowing_category && (
            <p
              className="flex items-center gap-1 text-sm text-red-500"
              role="alert"
            >
              <span aria-label="Error">
                <MdErrorOutline />
              </span>
              <span>{errors?.borrowing_category?.message}</span>
            </p>
          )}
        </div>
        <CustomSelect
          label={t(
            "Has the payment schedule for the repayment and service of the local debt and/or guaranteed local debt been violated, resulting in the assessment of any penalties and does the potential borrower have such indebtedness outstanding as of the current date?"
          )}
          name="payment_schedules"
          register={register}
          errors={errors}
          fisrtOp="Select"
          validationSchema={createRequiredValidation(
            t("Please Select one option")
          )}
          disabled={isEligibleTrue}
        >
          <option value="yes">{t("Yes")}</option>
          <option value="no">{t("No")}</option>
        </CustomSelect>
        <CustomSelect
          label={t(
            "During the past 5 years, has there been a REPEATED PAYMENT SCHEDULE VIOLATION in the process of making payments for the repayment and servicing of local debt and/or guaranteed local debt, which led to the accrual of any penalties?"
          )}
          name="repeated_payment"
          register={register}
          errors={errors}
          fisrtOp="Select"
          validationSchema={createRequiredValidation(
            t("Please Select one option")
          )}
          disabled={isEligibleTrue}
        >
          <option value="yes">{t("Yes")}</option>
          <option value="no">{t("No")}</option>
        </CustomSelect>
      </div>
      {}
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={mutation.isLoading || isEligibleTrue}>
          {t("View Status")}
        </Button>

        {mutation?.data && (
          <p
            className={`${
              mutation.data.status ? "text-green-600" : "text-red-600"
            } font-medium`}
            aria-label="alert"
          >
            {mutation.data.message}
          </p>
        )}
        {isEligibleTrue && (
          <p className="text-green-600 font-medium" aria-label="alert">
            Eligible
          </p>
        )}
      </div>
    </form>
  );
};

const Assessments = ({ conditions, nextStep, handleNextStep, formData }) => {
  const { t } = useTranslation();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      new_borrowing_planned: formData.new_borrowing_planned,
      amount_of_revenues: formData.amount_of_revenues,
      amount_of_personal_income_tax: formData.amount_of_personal_income_tax,
      limit_amount_local_debt: FormData.limit_amount_local_debt,
      amount_of_local_borrowing: formData.amount_of_local_borrowing,
      expenditures_of_fund: formData.expenditures_of_fund,
      revise_subsidy: formData.revise_subsidy,
      transfers: formData.transfers,
      expenditures_of_budget: formData.expenditures_of_budget,
      marginal_amount: formData.marginal_amount,
    },
  });

  const mutation = useMutation(addSelfAssessmentData, {
    onSuccess: (data) => {
      nextStep();
      toast.success(t("Self Assessment done"));
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    const modifiedData = {
      ...data,
      ...conditions,
      programId: id,
    };
    handleNextStep(modifiedData);
    mutation.mutate(modifiedData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-3">
        <div className="space-y-4">
          <Input
            label={t(
              "The limit amount of local debt and guaranteed debt in the year in which the new borrowing is planned:"
            )}
            name="new_borrowing_planned"
            type="number"
            min={0}
            placeholder={t("0.00 UAH")}
            register={register}
            errors={errors}
            validationSchema={createRequiredValidation(
              t("Borrowing Planned is required")
            )}
          />
          <Input
            label={t(
              "The amount of revenues of the general fund of the local budget, excluding interbudgetary transfers (code 90010100), for the previous three years:"
            )}
            name="amount_of_revenues"
            min={0}
            type="number"
            placeholder={t("0.00 UAH")}
            register={register}
            errors={errors}
            validationSchema={createRequiredValidation(
              t("Borrowing Planned is required")
            )}
          />
          <Input
            label={t(
              "The amount of personal income tax(code  11010000) for the previous three years:"
            )}
            name="amount_of_personal_income_tax"
            type="number"
            min={0}
            placeholder={t("0.00 UAH")}
            register={register}
            errors={errors}
            validationSchema={createRequiredValidation(
              t("Borrowing Planned is required")
            )}
          />
          <Input
            label={t(
              "Limit amount of local debt and guaranteed debt for the current year:"
            )}
            name="limit_amount_local_debt"
            type="number"
            min={0}
            placeholder={t("0.00 UAH")}
            register={register}
            errors={errors}
            validationSchema={createRequiredValidation(
              t("Borrowing Planned is required")
            )}
          />
          <Input
            label={t(
              "The amount of local borrowing that the borrower may make and/or provide a guarantee in the current year:"
            )}
            name="amount_of_local_borrowing"
            type="number"
            min={0}
            placeholder={t("0.00 UAH")}
            register={register}
            errors={errors}
            validationSchema={createRequiredValidation(
              t("Borrowing Planned is required")
            )}
          />
        </div>
        <div className="space-y-4">
          <h3 className="font-medium text-lg">
            {t("Limit of Expenditures on Local Debt Service")}
          </h3>
          <Input
            label={t(
              "Expenditures of the general fund of the local budget(total) (code 900203) in the current year"
            )}
            name="expenditures_of_fund"
            type="number"
            min={0}
            placeholder={t("0.00 UAH")}
            register={register}
            errors={errors}
            validationSchema={createRequiredValidation(
              t("Borrowing Planned is required")
            )}
          />
          <Input
            label={t("Reverse subsidy in the current year")}
            name="revise_subsidy"
            type="number"
            min={0}
            placeholder={t("0.00 UAH")}
            register={register}
            errors={errors}
            validationSchema={createRequiredValidation(
              t("Borrowing Planned is required")
            )}
          />
          <Input
            label={t(
              "Transfers from the local budget to other local budgets due to transfers from the state budget in the current year:"
            )}
            name="transfers"
            type="number"
            min={0}
            placeholder={t("0.00 UAH")}
            register={register}
            errors={errors}
            validationSchema={createRequiredValidation(
              t("Borrowing Planned is required")
            )}
          />
          <Input
            label={t(
              "Expenditures of the general budget fund at the expense of subventions from the state budget and at the expense of subventions from other local budgets in the current year"
            )}
            name="expenditures_of_budget"
            type="number"
            min={0}
            placeholder={t("0.00 UAH")}
            register={register}
            errors={errors}
            validationSchema={createRequiredValidation(
              t("Borrowing Planned is required")
            )}
          />
          <Input
            label={t(
              "The marginal amount of costs for servicing the municipal debt in the current year:"
            )}
            name="marginal_amount"
            type="number"
            min={0}
            placeholder={t("0.00 UAH")}
            register={register}
            errors={errors}
            validationSchema={createRequiredValidation(
              t("Borrowing Planned is required")
            )}
          />
        </div>
      </div>
      <Button
        type="submit"
        variant="primary"
        size="md"
        className="max-w-[12rem] ml-auto"
      >
        <span>{t("Next")}</span>
        <FaArrowRight />
      </Button>
    </form>
  );
};

export default AddAssesstmentForm;
