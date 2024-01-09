import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { CreateNewUser, UpdateUser } from "../../api/mctdService";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, Input } from "../../components";
import { createRequiredValidation, validations } from "../../utils/utils";
import { useTranslation } from "react-i18next";

const AddNewMctd = ({ closeModal, selectedItem }) => {
  //translation hook
  const { t } = useTranslation();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    values: selectedItem,
  });
  // create Muncipitlity
  const queryClient = useQueryClient();
  const addNewMunc = useMutation(CreateNewUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-All-Mctdies");
      toast.success(t("New User-MCTD Successfully"));
      closeModal();
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  const updateUserExpert = useMutation(UpdateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-All-Mctdies");
      toast.success(t("Update User MCTD Detail"));
      closeModal();
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (data) => {
    if (selectedItem) {
      const updtData = {
        firstName: data.firstName,
        lastName: data.lastName,
      };
      updateUserExpert.mutate({ id: selectedItem._id, updtData });
      return;
    }

    const muncData = {
      ...data,
      role: "MCTD",
    };
    addNewMunc.mutate(muncData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <Input
          label={t("First Name")}
          name="firstName"
          type="text"
          placeholder={t("Enter here")}
          register={register}
          errors={errors}
          validationSchema={createRequiredValidation("first name required")}
        />
        <Input
          label={t("Last Name")}
          name="lastName"
          type="text"
          placeholder={t("Enter here")}
          register={register}
          errors={errors}
          validationSchema={createRequiredValidation("last name required")}
        />
        <Input
          label={t("Email")}
          name="email"
          type="email"
          placeholder={t("Enter here")}
          register={register}
          errors={errors}
          validationSchema={createRequiredValidation("email required")}
          disabled={selectedItem}
        />
        {!selectedItem && (
          <Input
            label={t("Password")}
            name="password"
            type="password"
            placeholder={t("Enter here")}
            register={register}
            errors={errors}
            validationSchema={validations.passwordStrength}
          />
        )}
      </div>
      <div className="flex items-center gap-3">
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={updateUserExpert.isLoading || addNewMunc.isLoading}
        >
          {selectedItem ? t("Update") : t("Create")}
        </Button>
        <Button type="button" variant="outline" size="md" onClick={closeModal}>
          {t("Cancel")}
        </Button>
      </div>
    </form>
  );
};

export default AddNewMctd;
