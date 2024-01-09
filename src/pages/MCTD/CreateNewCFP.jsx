import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { useDropzone } from "react-dropzone";
import {
  Accordian,
  Breadcrumb,
  Button,
  Card,
  Input,
  MultipleSelect,
  SectionLayout,
  SectionTitle,
  TextArea,
  Wrapper,
} from "../../components";
import { createRequiredValidation, validations } from "../../utils/utils";
import {
  MdAdd,
  MdDelete,
  MdEmail,
  MdErrorOutline,
  MdFileUpload,
  MdOutlineDelete,
  MdPerson,
  MdPhone,
  MdSave,
  MdUpload,
} from "react-icons/md";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createNewProposal,
  uploadFile,
  uploadMultipleFiles,
} from "../../api/mctdService";
import toast from "react-hot-toast";
import CFPQuestions from "./CFPQuestions";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CreateNewCFP = () => {
  //translation hook
  const { t } = useTranslation();
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      contact: [{ name: "", email: "", phone: "" }],
      questions: [],
      documents: [],
    },
  });

  const {
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = methods;

  const queryClient = useQueryClient();
  const addNewCFPMutation = useMutation(createNewProposal, {
    onSuccess: () => {
      // Invalidate query and refetch
      queryClient.invalidateQueries("get-All-Proposals");
      toast.success("New proposal Added");
      reset();
      navigate("/call-for-proposals");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const dateIs = new Date();
  const year = dateIs.getFullYear().toString();
  const month = ("0" + (dateIs.getMonth() + 1)).slice(-2);
  const day = ("0" + dateIs.getDate()).slice(-2);
  const currentDate = year + "-" + month + "-" + day;

  const onSubmit = (data) => {
    if (data.questions.length === 0) return;

    addNewCFPMutation.mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <Wrapper className="space-y-4">
        <Breadcrumb>
          <SectionTitle>New Programme</SectionTitle>
        </Breadcrumb>
        <SectionLayout>
          <Card>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* Basic Info */}
              <div className="space-y-3">
                <h3 className="heading-secondary">{t("Basic Info")}</h3>
                <Input
                  label={t("Title")}
                  name="title"
                  type="text"
                  placeholder={t("Enter here")}
                  register={methods.register}
                  errors={errors}
                  validationSchema={createRequiredValidation(
                    t("Title required")
                  )}
                />
                <TextArea
                  label={t("Proposal Overview")}
                  name="description"
                  placeholder={t("Enter here")}
                  register={methods.register}
                  errors={errors}
                  validationSchema={createRequiredValidation(
                    t("Proposal overview is required")
                  )}
                  size={{ col: 40, row: 6 }}
                />
              </div>
              {/* Deadline */}
              <div className="space-y-3">
                <h3 className="heading-secondary">{t("Deadline")}</h3>
                <Input
                  label={t("Proposal Submission Last Date")}
                  name="lastDate"
                  type="date"
                  min={currentDate}
                  placeholder="Enter here"
                  register={methods.register}
                  errors={errors}
                  validationSchema={createRequiredValidation(
                    t("Proposal submission last date is required")
                  )}
                />
              </div>
              {/* Upload Documents */}
              <div className="space-y-3">
                <h3 className="heading-secondary">
                  {t("Upload Relevant Documents")}
                </h3>
                <CustomFileInput />
              </div>

              {/* Question Selection */}
              <div className="space-y-3">
                <h3 className="heading-secondary">
                  {t("Select Questions for Evaluation")}{" "}
                  <span className="text-red-500">*</span>
                </h3>
                {/* TODO: */}
                <CFPQuestions />
              </div>

              {/* Add Contacts */}
              <AddContacts />

              <div className="flex-left gap-2">
                <Button
                  variant="primary"
                  size="md"
                  type="submit"
                  disabled={addNewCFPMutation.isLoading}
                >
                  <MdUpload />
                  <span>{t("Publish Programme")}</span>
                </Button>
              </div>
            </form>
          </Card>
        </SectionLayout>
      </Wrapper>
    </FormProvider>
  );
};

const AddContacts = () => {
  //translation hook
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();
  const { fields, prepend, remove } = useFieldArray({
    name: "contact",
    control,
  });

  const handleAppend = () => {
    prepend({
      name: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex-btw">
        <h3 className="heading-secondary">{t("Contact Info")}</h3>
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={handleAppend}
        >
          <MdAdd />
          <span>{t("Add personal")}</span>
        </Button>
      </div>
      <div className="grid grid-cols-16 gap-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="opac border border-gray-200 p-4 rounded-sm shadow-sm relative opac space-y-3"
          >
            <div className="flex items-center justify-between">
              <MdPerson className="text-sky-600" size={24} />
              <button
                className="text-red-500 bg-transparent text-xl hover:text-red-500/70"
                onClick={() => remove(index)}
                type="button"
              >
                <MdOutlineDelete size={24} />
              </button>
            </div>
            <div className="grid grid-cols-16 gap-3">
              <Input
                label={t("Contact Person’s Name")}
                name={`contact.${index}.name`}
                type="text"
                placeholder="john doe"
                autoComplete="given-name"
                icon={MdPerson}
                register={register}
                errors={errors}
                validationSchema={createRequiredValidation(
                  t("Contact person’s name required")
                )}
                errMsg={errors?.contact?.[index]?.name?.message}
              />
              <Input
                label={t("Contact Person’s Email")}
                name={`contact.${index}.email`}
                type="email"
                icon={MdEmail}
                autoComplete="email"
                placeholder="user@example.com"
                register={register}
                errors={errors}
                validationSchema={validations.emailValidation}
                errMsg={errors?.contact?.[index]?.email?.message}
              />
              <Input
                label={t("Contact Person’s Phone")}
                name={`contact.${index}.phone`}
                type="tel"
                placeholder="+380 67 123 45 67"
                autoComplete="tel"
                icon={MdPhone}
                register={register}
                errors={errors}
                validationSchema={createRequiredValidation(
                  t("Phone number is required")
                )}
                errMsg={errors?.contact?.[index]?.phone?.message}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CustomFileInput = () => {
  const { t } = useTranslation();

  const ref = useRef(null);
  const {
    register,
    formState: { errors },
    clearErrors,
    setValue,
  } = useFormContext();

  const uploadFilesMutation = useMutation(uploadMultipleFiles, {
    onSuccess: (data) => {
      toast.success(t("Files Uploaded"));
      setValue("documents", data);
      clearErrors("documents");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onDrop = useCallback(
    (acceptedFiles) => {
      const fileNames = acceptedFiles.map((file) => file.name);
      const labelText = fileNames.join(", ");
      ref.current.textContent = `Selected Files: ${labelText}`;

      if (acceptedFiles.length > 0) {
        const formData = new FormData();
        acceptedFiles.forEach((file) => {
          formData.append("files", file);
        });

        uploadFilesMutation.mutate(formData);
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="p-8 flex flex-col items-center justify-center gap-2 border-dashed border-2 border-gray-200 bg-white rounded-lg cursor-pointer peer-disabled:bg-gray-300 peer-disabled:cursor-wait"
      >
        <input
          type="file"
          name="documents"
          id="documents"
          className="sr-only"
          {...register(
            "documents",
            createRequiredValidation(t("Please choose some documents"))
          )}
          disabled={uploadFilesMutation.isLoading}
          accept=".doc, .docx, .pdf, .xlsx"
          {...getInputProps()}
        />
        <div className="grid place-items-center">
          <MdFileUpload className="text-gray-400" size={24} />
          <span className="text-gray-500 font-medium" ref={ref}>
            {isDragActive
              ? t("Drop the files here")
              : t("Choose multiple files to upload")}
          </span>
        </div>
      </div>
      {errors && errors?.documents?.type === "required" && (
        <p
          className="mt-1 flex items-center gap-1 text-sm text-red-500"
          role="alert"
        >
          <span aria-label="Error">
            <MdErrorOutline />
          </span>
          <span>{errors?.documents?.message}</span>
        </p>
      )}
    </div>
  );
};

/* <Button variant="outline" size="md" type="submit">
                  <MdSave />
                  <span>Save to Draft</span>
                </Button> */

export default CreateNewCFP;
