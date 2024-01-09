import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateNewUser, UpdateUser } from "../../api/mctdService";
import toast from "react-hot-toast";
import { Button, Input, Modal } from "../../components";
import { createRequiredValidation, validations } from "../../utils/utils";
import EvaluatorCategories from "./EvaluatorCategories";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const AddNewEvaluator = ({ isOpen, closeModal, selectedValue }) => {
  //translation hook
  const { t } = useTranslation();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    values: selectedValue,
  });

  // create new evaluator
  const queryClient = useQueryClient();
  const addNewEvaMutation = useMutation(CreateNewUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-All-Evaluators");
      toast.success(t("New Evaluator Added"));
      closeModal();
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const updateUserEva = useMutation(UpdateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-All-Evaluators");
      toast.success(t("Update Evaluator Detail"));
      closeModal();
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // submit data
  const onSubmit = (data) => {
    if (!selectedValue) {
      const evaluatorData = {
        ...data,
        role: "Evaluator",
      };
      addNewEvaMutation.mutate(evaluatorData);
      return;
    }

    const updtData = {
      firstName: data.firstName,
      lastName: data.lastName,
    };

    updateUserEva.mutate({ id: selectedValue._id, updtData });
  };

  useEffect(() => {
    if (selectedValue) return;

    setValue("stage", "Eligibility Screening");
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={selectedValue ? t("Update Evaluator") : t("Create New Evaluator")}
      maxWidth="max-w-2xl"
      className="lg:max-h-[30rem]"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <Input
            label={t("First Name")}
            name="firstName"
            type="text"
            placeholder="Enter here"
            register={register}
            errors={errors}
            validationSchema={createRequiredValidation(
              t("first name is required")
            )}
          />
          <Input
            label={t("Last Name")}
            name="lastName"
            type="text"
            placeholder={t("Enter here")}
            register={register}
            errors={errors}
            validationSchema={createRequiredValidation(
              t("last name is  required")
            )}
          />
          <Input
            label={t("Email")}
            name="email"
            type="email"
            placeholder={t("Enter here")}
            register={register}
            errors={errors}
            disabled={selectedValue}
            validationSchema={createRequiredValidation(t("Email is required"))}
          />
          {!selectedValue && (
            <>
              <EvaluatorCategories register={register} errors={errors} />
              <Input
                label={t("Password")}
                name="password"
                type="password"
                placeholder={t("Enter here")}
                register={register}
                errors={errors}
                validationSchema={validations.passwordStrength}
              />
            </>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={addNewEvaMutation.isLoading || updateUserEva.isLoading}
          >
            {selectedValue ? t("Update") : t("Create")}
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

export default AddNewEvaluator;
