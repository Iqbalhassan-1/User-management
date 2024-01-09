import { FaArrowLeft } from "react-icons/fa";
import { Button, FileInput } from "../../components";
import { useForm } from "react-hook-form";
import { createRequiredValidation, extractFileName } from "../../utils/utils";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createNewApplication } from "../../api/muniService";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";
import { useTranslation } from "react-i18next";
import useSmoothScrollToTop from "../../utils/hooks/useSmoothScrollToTop";
import useDataContext from "../../utils/hooks/useDataContext";

const AdditionalDocStep = ({ prevStep, setFormData }) => {
  //translation hook
  const { t } = useTranslation();

  const { id } = useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const { uploadedFiles, setUploadedFiles } = useDataContext();

  const uploadedFileName = uploadedFiles?.map((item) => {
    return item?.name;
  });
  const uploadedFileUrl = uploadedFiles?.map((item) => {
    return extractFileName(item?.url);
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // scroll to top
  useSmoothScrollToTop();

  const { mutate, isLoading } = useMutation(createNewApplication, {
    onSuccess: (data) => {
      if (data?.status === 1) {
        setFormData({});
        setUploadedFiles([]);
      }
      toast.success(t("Application Submitted Successfully"));
      navigate("/all-applications");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const onSubmit = (data) => {
    // for (const field of files) {
    //   const fieldName = field.name;
    //   const url = field.url;
    //   if (data.hasOwnProperty(fieldName)) {
    //     // Replace the value in the data object with the URL
    //     if (fieldName) {
    //       data[fieldName] = url ?? "";
    //     }
    //   }
    // }

    // file get from context
    for (const field of uploadedFiles) {
      const fieldName = field.name;
      const url = field.url;
      if (data.hasOwnProperty(fieldName)) {
        if (fieldName) {
          data[fieldName] = url ?? "";
        }
      }
    }

    mutate({
      documents: {
        ...data,
      },
      programId: id,
      status: "Submitted",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FileInput
        label={t("Feasibility Design")}
        name="fesibility_design_file"
        register={register}
        errors={errors}
        setFiles={setFiles}
        validationSchema={
          uploadedFileName?.includes("fesibility_design_file")
            ? {}
            : createRequiredValidation(t("Feasibility Design required"))
        }
      />
      {uploadedFileName?.includes("fesibility_design_file") && (
        <p>
          {t("File URL")}:{" "}
          {uploadedFileUrl[uploadedFileName.indexOf("fesibility_design_file")]}
        </p>
      )}
      <div className="space-y-3">
        <h3 className="heading-secondary">{t("Financial Documents")}</h3>
        <FileInput
          label={t("Balance Sheet")}
          name="balance_sheet_file"
          register={register}
          errors={errors}
          setFiles={setFiles}
          validationSchema={
            uploadedFileName?.includes("balance_sheet_file")
              ? {}
              : createRequiredValidation(t("Balance Sheet required"))
          }
        />
        {uploadedFileName?.includes("balance_sheet_file") && (
          <p>
            {t("File URL")}:{" "}
            {uploadedFileUrl[uploadedFileName.indexOf("balance_sheet_file")]}
          </p>
        )}
        <FileInput
          label={t("Financial Results")}
          name="financial_result_file"
          register={register}
          errors={errors}
          setFiles={setFiles}
          validationSchema={
            uploadedFileName?.includes("financial_result_file")
              ? {}
              : createRequiredValidation(t("Financial Results required"))
          }
        />
        {uploadedFileName?.includes("financial_result_file") && (
          <p>
            {t("File URL")}:{" "}
            {uploadedFileUrl[uploadedFileName.indexOf("financial_result_file")]}
          </p>
        )}
        <FileInput
          label={t("Technical Report of Inspection and Assessments")}
          name="technical_report_file"
          register={register}
          errors={errors}
          setFiles={setFiles}
          validationSchema={
            uploadedFileName?.includes("technical_report_file")
              ? {}
              : createRequiredValidation(
                  t("Technical Report of Inspection and Assessments required")
                )
          }
        />
        {uploadedFileName?.includes("technical_report_file") && (
          <p>
            {t("File URL")}:{" "}
            {uploadedFileUrl[uploadedFileName.indexOf("technical_report_file")]}
          </p>
        )}
      </div>
      <div className="space-y-3">
        <h3 className="heading-secondary">
          {t(
            "Current Financial Situation Status of Municipal debt portfolio for 5 years"
          )}
        </h3>
        <FileInput
          label={t("Guarantees by Municipal")}
          name="guarantees_by_municipality_file"
          register={register}
          errors={errors}
          setFiles={setFiles}
          validationSchema={
            uploadedFileName?.includes("guarantees_by_municipality_file")
              ? {}
              : createRequiredValidation(t("Guarantees by Municipal required"))
          }
        />
        {uploadedFileName?.includes("guarantees_by_municipality_file") && (
          <p>
            {t("File URL")}:{" "}
            {
              uploadedFileUrl[
                uploadedFileName.indexOf("guarantees_by_municipality_file")
              ]
            }
          </p>
        )}
      </div>
      <div className="space-y-3">
        <h3 className="heading-secondary">
          {t("Decision of city council to approve loan application")}
        </h3>
        <FileInput
          label={t("Decision of city council")}
          name="decision_of_city_council_file"
          register={register}
          errors={errors}
          setFiles={setFiles}
          validationSchema={
            uploadedFileName?.includes("decision_of_city_council_file")
              ? {}
              : createRequiredValidation(t("Decision of city council required"))
          }
        />
        {uploadedFileName?.includes("decision_of_city_council_file") && (
          <p>
            {t("File URL")}:{" "}
            {
              uploadedFileUrl[
                uploadedFileName.indexOf("decision_of_city_council_file")
              ]
            }
          </p>
        )}
      </div>
      <div className="space-y-3 text-gray-900">
        <div>
          <input
            type="checkbox"
            name="confirm"
            id="confirm"
            className="w-4 h-4"
            {...register("confirm", {
              required: t("please confirm"),
            })}
          />
          <label htmlFor="confirm" className="ml-3">
            {t(
              "I certify that, in accordance with my competence, the information included in this Questionnaire reflects the current situation."
            )}
          </label>
          {errors && errors?.confirm?.type === "required" && (
            <p
              className="mt-1 flex items-center gap-1 text-sm text-red-500"
              role="alert"
            >
              <span aria-label="Error">
                <MdErrorOutline />
              </span>
              <span>{errors?.confirm?.message}</span>
            </p>
          )}
        </div>
        <ul className="list-inside list-decimal sm:pl-5 text-gray-600 space-y-1">
          <li>
            {t(
              "the United Nations, and any agency or person which is duly appointed, empowered or authorised by the United Nations to enact, administer, implement and/or enforce Sanctions."
            )}
          </li>
          <li>
            {t(
              "the European Union, and any agency or person which is duly appointed, empowered or authorised by the European Union to enact,administer, implement and/or enforce Sanctions"
            )}
          </li>
          <li>
            {t(
              "the United States Department of the Treasury Office of Foreign Asset Control (OFAC), the United States Department of State and/or the United States Department of Commerce."
            )}
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" size="sm" type="button" onClick={prevStep}>
          <FaArrowLeft />
          <span>{t("Previous")}</span>
        </Button>
        <Button variant="primary" size="sm" type="submit" disabled={isLoading}>
          {isLoading ? t("Loading...") : t("Submit")}
        </Button>
      </div>
    </form>
  );
};

export default AdditionalDocStep;
