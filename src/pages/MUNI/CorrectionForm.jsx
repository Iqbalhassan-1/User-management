import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMunAPPCorrFields, munCorrectedFields } from "../../api/muniService";
import {
  Breadcrumb,
  Button,
  Card,
  FileInput,
  Input,
  LoadingItemPlaceholder,
  SectionTitle,
  Wrapper,
} from "../../components";
import { useForm } from "react-hook-form";
import { createRequiredValidation } from "../../utils/utils";
import toast from "react-hot-toast";
import { useState } from "react";
import useGoBack from "../../utils/hooks/useGoBack";
import { useTranslation } from "react-i18next";

const CorrectionForm = () => {
  //translation hook
  const { t } = useTranslation();
  const { id } = useParams();
  const goBack = useGoBack();
  const [files, setFiles] = useState([]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const {
    data: correctionFields,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["correction-fields", id],
    queryFn: () => getMunAPPCorrFields(id),
  });

  const correctionMutation = useMutation(munCorrectedFields, {
    onSuccess: () => {
      toast.success(t("Application resubmitted successfully"));
      goBack();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  if (isLoading) {
    return <LoadingItemPlaceholder />;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  const combinedArray = Object.keys(correctionFields?.correction).reduce(
    (acc, key) => {
      return acc.concat(correctionFields?.correction[key]);
    },
    []
  );
  console.log(combinedArray);

  const onSubmit = (data) => {
    for (const field of files) {
      const fieldName = field.name; // Field name in your state
      const url = field.url; // URL of the uploaded file in your state

      // Check if the field name exists in the data object
      if (data.hasOwnProperty(fieldName)) {
        // Replace the value in the data object with the URL
        if (fieldName) {
          data[fieldName] = url;
        }
      }
    }

    const submitObject = {
      id,
    };

    for (const group in correctionFields?.correction) {
      const groupData = {};
      for (const item of correctionFields?.correction[group]) {
        const field_name = item.field_name;
        if (data[field_name]) {
          groupData[field_name] = data[field_name];
        }
      }
      if (Object.keys(groupData).length > 0) {
        submitObject[group] = groupData;
      }
    }

    correctionMutation.mutate(submitObject);
  };

  return (
    <Wrapper className="space-y-2">
      <Breadcrumb />
      <Card>
        <SectionTitle>{t("Requested Amendments")}</SectionTitle>
        <p className="text-dark-medium">
          {t(`To ensure your application's eligibility, please update the following
          information.`)}
        </p>
      </Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="space-y-2">
          {combinedArray.length > 0 &&
            combinedArray.map((field, i) => {
              return field.input_type === "file" ? (
                <FileInput
                  key={i}
                  label={field.label}
                  name={field.field_name}
                  type={field?.input_type}
                  placeholder={t("Enter here")}
                  register={register}
                  errors={errors}
                  setFiles={setFiles}
                  validationSchema={createRequiredValidation("required")}
                />
              ) : (
                <Input
                  key={i}
                  label={field.label}
                  name={field.field_name}
                  type={field?.input_type}
                  placeholder={t("Enter here")}
                  register={register}
                  errors={errors}
                  validationSchema={createRequiredValidation("required")}
                />
              );
            })}
          <Button
            type="submit"
            className="ml-auto"
            disabled={correctionMutation.isLoading}
          >
            {correctionMutation.isLoading ? t("Wait...") : t("Submit")}
          </Button>
        </Card>
      </form>
    </Wrapper>
  );
};

export default CorrectionForm;
