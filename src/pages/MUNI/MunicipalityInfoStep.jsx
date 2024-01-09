import { useForm } from "react-hook-form";
import { Button, FileInput, Input, TextArea } from "../../components";
import { createRequiredValidation, extractFileName } from "../../utils/utils";
import { useParams } from "react-router-dom";
import { MdArrowRight } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { createNewApplication } from "../../api/muniService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import useSmoothScrollToTop from "../../utils/hooks/useSmoothScrollToTop";
import useDataContext from "../../utils/hooks/useDataContext";

const MunicipalityInfoStep = ({
  nextStep,
  prevStep,
  handleNextStep,
  formData,
}) => {
  //translation hook
  const { t } = useTranslation();

  const { id } = useParams();

  const [files, setFiles] = useState([]);
  const { uploadedFiles } = useDataContext();

  const uploadedFileName = uploadedFiles?.map((item) => {
    return item.name;
  });
  const uploadedFileUrl = uploadedFiles?.map((item) => {
    return extractFileName(item?.url);
  });

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    defaultValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      //municiplaty info
      name: formData.muncipality_info?.name,
      total_no_inhabitants: formData.muncipality_info?.total_no_inhabitants,
      total_no_idps: formData.muncipality_info?.total_no_idps,
      share_ipds_total_population:
        formData.muncipality_info?.share_ipds_total_population,
      //representative detail
      full_name: formData.representative_detail?.full_name,
      email: formData.representative_detail?.email,
      telephone: formData.representative_detail?.telephone,
      address: formData.representative_detail?.address,
      // genereral characteristics
      no_of_public_building:
        formData.general_characteristics?.no_of_public_building,
      share_idps: formData.general_characteristics?.share_idps,
      perior_experience: formData.general_characteristics?.perior_experience,
      cost_of_perior_investment:
        formData.general_characteristics?.cost_of_perior_investment,
      result_of_perior_investment:
        formData.general_characteristics?.result_of_perior_investment,

      //ownership
      privately_ownerd: formData.ownership?.privately_ownerd,
      public_ownerd: formData.ownership?.public_ownerd,
      established_year: formData.ownership?.established_year,
      final_beneficary_gurantee_letter_file:
        formData.ownership?.final_beneficary_gurantee_letter_file,
      improvement_public_service_deivery_file:
        formData.ownership?.improvement_public_service_deivery_file,
      enery_efficiency_certificate_file:
        formData.ownership?.enery_efficiency_certificate_file,
    },
  });

  // scroll to top
  useSmoothScrollToTop();

  const createAppMutation = useMutation(createNewApplication, {
    onSuccess: (data) => {
      toast.success(t("Municipality Info Added"));
      localStorage.setItem("appId", data?.application?._id);
      handleNextStep(data?.application);
      console.log("api munic", data);
      nextStep();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (data) => {
    // hidden current state
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
    console.log("formdata", data);

    const modifiedData = {
      muncipality_info: {
        name: data?.name,
        total_no_inhabitants: data?.total_no_inhabitants,
        total_no_idps: data?.total_no_idps,
        share_ipds_total_population: data?.share_ipds_total_population,
      },
      representative_detail: {
        full_name: data?.full_name,
        email: data?.email,
        telephone: data?.telephone,
        address: data?.address,
      },
      general_characteristics: {
        no_of_public_building: data?.no_of_public_building,
        share_idps: data?.share_idps,
        perior_experience: data?.perior_experience,
        cost_of_perior_investment: data?.cost_of_perior_investment,
        result_of_perior_investment: data?.result_of_perior_investment,
      },
      ownership: {
        privately_ownerd: data?.privately_ownerd,
        public_ownerd: data?.public_ownerd,
        established_year: data?.established_year,
        final_beneficary_gurantee_letter_file:
          data?.final_beneficary_gurantee_letter_file,
        improvement_public_service_deivery_file:
          data?.improvement_public_service_deivery_file,
        enery_efficiency_certificate_file:
          data?.enery_efficiency_certificate_file,
      },
      programId: id,
      status: "Draft",
    };
    // console.log("municaplaty", modifiedData);
    handleNextStep(modifiedData);
    createAppMutation.mutate(modifiedData);
  };
  useEffect(() => {
    const formValues = getValues();
    Object.keys(formValues).forEach(
      (field) => {
        setValue(field, formValues[field]);
      },
      [formValues, setValue]
    );
  }, [formData, setValue, getValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-3">
        <Input
          label={t(
            "Name of Municipality/ Territorial hromdas/Regional administration/ Regional council"
          )}
          name="name"
          type="text"
          placeholder={t("enter here")}
          register={register}
          errors={errors}
          validationSchema={createRequiredValidation(
            t("Municipality name is required")
          )}
        />
        <Input
          label={t("Total no. of Inhabitants as of 1st February 2022")}
          name="total_no_inhabitants"
          type="number"
          placeholder={"enter here"}
          register={register}
          errors={errors}
          validationSchema={createRequiredValidation(
            t("Number of inhabitants required")
          )}
        />
        <Input
          label={t("Total no. of IDPs")}
          name="total_no_idps"
          type="number"
          placeholder={t("enter here")}
          register={register}
          errors={errors}
          validationSchema={createRequiredValidation(
            t("Total no. of IDPs required")
          )}
        />
        <Input
          label={t("Share of IDPs in % of Total Population")}
          name="share_ipds_total_population"
          type="number"
          placeholder={t("enter here")}
          register={register}
          errors={errors}
          validationSchema={{
            required: t("Share of IDPs in % of Total Population required"),
            valueAsNumber: true,
            min: { value: 0, message: "Value should be at least 0" },
            max: { value: 100, message: "Value should be at most 100" },
          }}
        />
      </div>
      <div className="space-y-3">
        <h3 className="heading-secondary">{t("Representative Details")}</h3>
        <Input
          label={t("Full Name")}
          name="full_name"
          type="text"
          placeholder={t("enter here")}
          autoComplete="given-name"
          register={register}
          errors={errors}
          validationSchema={createRequiredValidation(
            t("Representative name required")
          )}
        />
        <Input
          label={t("Email")}
          name="email"
          type="email"
          placeholder={t("john@example.com")}
          autoComplete="email"
          register={register}
          errors={errors}
          validationSchema={createRequiredValidation(
            t("Representative email required")
          )}
        />
        <Input
          label={t("Telephone")}
          name="telephone"
          type="tel"
          placeholder={t("555 555 555")}
          autoComplete="tel"
          register={register}
          errors={errors}
          validationSchema={createRequiredValidation(
            t("Representative telephone number required")
          )}
        />
        <Input
          label={t("Address")}
          name="address"
          type="text"
          placeholder={t("enter here")}
          register={register}
          errors={errors}
          validationSchema={createRequiredValidation(
            t("Representative address required")
          )}
        />
      </div>
      <div className="space-y-3">
        <h3 className="heading-secondary">
          {t("General Characteristics of Building in Municipality")}
        </h3>
        <Input
          label={t("No of Public Buildings for Thermal Modernization")}
          name="no_of_public_building"
          type="number"
          placeholder={t("enter here")}
          register={register}
          errors={errors}
          validationSchema={createRequiredValidation(
            t("No of Public Buildings required")
          )}
        />
        <Input
          label={t("Share of IDP’s in User of Public Services")}
          name="share_idps"
          type="number"
          placeholder={t("enter here")}
          register={register}
          errors={errors}
          validationSchema={createRequiredValidation(
            t("Share of IDP’s required")
          )}
        />
        <TextArea
          label={t("Prior experience in implementing investment projects")}
          name="perior_experience"
          placeholder={t("enter here")}
          register={register}
          errors={errors}
          validationSchema={createRequiredValidation(
            t("Prior experience required")
          )}
        ></TextArea>
        <Input
          label={t(
            "Cost of prior investment projects (with local or international financing)"
          )}
          name="cost_of_perior_investment"
          type="number"
          placeholder={t("enter here")}
          register={register}
          errors={errors}
          validationSchema={createRequiredValidation(
            t("Cost of prior investment projects required")
          )}
        />
        <TextArea
          label={t(
            "Results of prior investment projects (with local or international funding)"
          )}
          name="result_of_perior_investment"
          placeholder={t("enter here")}
          register={register}
          errors={errors}
          validationSchema={createRequiredValidation(
            t("Results of prior investment projects required")
          )}
        ></TextArea>
      </div>
      <div className="space-y-3">
        <h3 className="heading-secondary">
          {t("Ownership (% of privately and municipality owned)")}
        </h3>
        <div className="grid grid-cols-16 gap-3">
          <Input
            label={t("Privately owned")}
            name="privately_ownerd"
            type="number"
            placeholder={t("enter here")}
            register={register}
            errors={errors}
            validationSchema={{
              required: t("Privately owned required"),
              valueAsNumber: true,
              min: { value: 0, message: "Value should be at least 0" },
              max: { value: 100, message: "Value should be at most 100" },
            }}
          />
          <Input
            label={t("Public owned")}
            name="public_ownerd"
            type="number"
            placeholder={t("enter here")}
            register={register}
            errors={errors}
            validationSchema={{
              required: t("Public owned required"),
              valueAsNumber: true,
              min: { value: 0, message: "Value should be at least 0" },
              max: { value: 100, message: "Value should be at most 100" },
            }}
          />
          <Input
            label={t("Established Year")}
            name="established_year"
            type="number"
            placeholder={t("enter here eg. 1992")}
            register={register}
            errors={errors}
            validationSchema={{
              ...createRequiredValidation(t("Established date required")),
              minLength: {
                value: 4,
                message: "please enter correct date format",
              },
              maxLength: {
                value: 4,
                message: "should not be greater than 4 characters",
              },
            }}
          />
        </div>
      </div>
      <div className="space-y-2">
        <FileInput
          label={t("Final Beneficiary Guarantee Letter")}
          name="final_beneficary_gurantee_letter_file"
          register={register}
          errors={errors}
          validationSchema={
            uploadedFileName?.includes("final_beneficary_gurantee_letter_file")
              ? {}
              : createRequiredValidation(
                  t("Final Beneficiary Guarantee Letter required")
                )
          }
          setFiles={setFiles}
        />
        {uploadedFileName?.includes(
          "final_beneficary_gurantee_letter_file"
        ) && (
          <p>
            {t("File URL")}:{" "}
            {
              uploadedFileUrl[
                uploadedFileName.indexOf(
                  "final_beneficary_gurantee_letter_file"
                )
              ]
            }
          </p>
        )}
      </div>
      <FileInput
        label={t(
          "Improvement of Public Service Delivery, Social Enterprise Development"
        )}
        name="improvement_public_service_deivery_file"
        register={register}
        errors={errors}
        validationSchema={
          uploadedFileName?.includes("improvement_public_service_deivery_file")
            ? {}
            : createRequiredValidation(
                t("Improvement of Public Service Delivery required")
              )
        }
        setFiles={setFiles}
      />
      {uploadedFileName?.includes(
        "improvement_public_service_deivery_file"
      ) && (
        <p>
          {t("File URL")}:{" "}
          {
            uploadedFileUrl[
              uploadedFileName.indexOf(
                "improvement_public_service_deivery_file"
              )
            ]
          }
        </p>
      )}
      <FileInput
        label={t("Energy Efficiency Certificate")}
        name="enery_efficiency_certificate_file"
        register={register}
        errors={errors}
        validationSchema={
          uploadedFileName?.includes("enery_efficiency_certificate_file")
            ? {}
            : createRequiredValidation(t("Energy Efficiency Certificate"))
        }
        setFiles={setFiles}
      />
      {uploadedFileName?.includes("enery_efficiency_certificate_file") && (
        <p>
          {t("File URL")}:{" "}
          {
            uploadedFileUrl[
              uploadedFileName.indexOf("enery_efficiency_certificate_file")
            ]
          }
        </p>
      )}
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={prevStep}
          // className="max-w-[12rem] ml-auto"
        >
          <FaArrowLeft />
          <span>{t("Previous")}</span>
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="md"
          // className="max-w-[12rem] ml-auto"
        >
          <span>{t("Next")}</span>
          <FaArrowRight />
        </Button>
      </div>
    </form>
  );
};

export default MunicipalityInfoStep;
