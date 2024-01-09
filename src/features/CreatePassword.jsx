import { useForm } from "react-hook-form";
import { Button, Input } from "../components";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdatePassword } from "../api/mctdService";
import { useTranslation } from "react-i18next";

const CreatePassword = ({ closeModal }) => {
  //translation hook
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();
  const updatedPasswordMutation = useMutation(UpdatePassword, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-All-Evaluators");
      toast.success(t("Password Updated"));
      closeModal();
    },
    onError: (err) => {
      setError("password", {
        type: "required",
        message: err.message,
      });
    },
  });

  const handleUpdatePassword = (data) => {
    updatedPasswordMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(handleUpdatePassword)} className="space-y-4">
      <Input
        label={t("Current Password")}
        name="password"
        type="password"
        placeholder={t("Current password")}
        register={register}
        errors={errors}
        validationSchema={{
          required: t("Current password is required"),
        }}
      />
      <Input
        label={t("New Password")}
        name="newpassword"
        type="password"
        placeholder={t("New password")}
        register={register}
        errors={errors}
        validationSchema={{
          required: t("New password is required"),
        }}
      />
      <Input
        label={t("Confirm Password")}
        name="confirmpassword"
        type="password"
        placeholder={t("Confirm Password")}
        register={register}
        errors={errors}
        validationSchema={{
          required: t("Confirm password is required"),
        }}
      />
      <div className="flex justify-end">
        <Button type="submit">
          {t("Update Password")}
          {/* {updtPasswordMutation.isLoading ? "Updating..." : "Update Password"} */}
        </Button>
      </div>
    </form>
  );
};
export default CreatePassword;
