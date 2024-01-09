import React from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Input,
  Modal,
  SectionTitle,
  Wrapper,
} from "../components";
import { useForm } from "react-hook-form";
import useModal from "../utils/hooks/useModal";
import CreatePassword from "../features/CreatePassword";
import useAuthContext from "../utils/hooks/useAuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UpdateProfile } from "../api/mctdService";
import { useTranslation } from "react-i18next";
import { createRequiredValidation } from "../utils/utils";

const UserSetting = () => {
  //translation hook
  const { t } = useTranslation();
  const { user, setUser } = useAuthContext();

  const { isOpen, toggleModal, closeModal, selectedValue } = useModal();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: user && {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  });

  const userUpdateMutate = useMutation(UpdateProfile, {
    onSuccess: (fetchdata) => {
      localStorage.setItem("user", JSON.stringify(fetchdata));
      setUser(fetchdata);
      toast.success(t("Profile Updated"));
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (data) => {
    userUpdateMutate.mutate(data);
  };

  return (
    <>
      <Wrapper className="space-y-3">
        <Breadcrumb>
          <SectionTitle>{t("User Information")}</SectionTitle>
        </Breadcrumb>
        <Card>
          <form
            className="space-y-5 md:max-w-[25rem]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              label={t("First Name")}
              name="firstName"
              type="text"
              placeholder={t("first name")}
              register={register}
              errors={errors}
              validationSchema={createRequiredValidation("First name required")}
            />
            <Input
              label={t("Last Name")}
              name="lastName"
              type="text"
              placeholder={t("last name")}
              register={register}
              errors={errors}
              validationSchema={createRequiredValidation("Last name required")}
            />
            <Input
              label={t("Email")}
              name="email"
              type="email"
              placeholder={t("User email")}
              register={register}
              errors={errors}
              disabled
            />
            <div className="flex items-center gap-3">
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={userUpdateMutate.isLoading}
              >
                {t("Update Profile")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => toggleModal(null)}
              >
                {t("Change Password")}
              </Button>
            </div>
          </form>
        </Card>
      </Wrapper>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={t("Update Password")}
        maxWidth="max-w-lg"
      >
        <CreatePassword closeModal={closeModal} selectedValue={selectedValue} />
      </Modal>
    </>
  );
};

export default UserSetting;
