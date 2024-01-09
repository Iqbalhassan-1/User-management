import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  addNewAppBuilding,
  createNewApplication,
  deleteAppBuilding,
  getAppBuildingById,
  updtAppBuilding,
} from "../../api/muniService";
import toast from "react-hot-toast";
import {
  Button,
  FileInput,
  TextArea,
  Input,
  SectionTitle,
  NoDataAvailable,
} from "../../components";
import {
  FaArrowLeft,
  FaArrowRight,
  FaChevronDown,
  FaBuilding,
} from "react-icons/fa";
import { MdDownload, MdEdit, MdOutlineDelete } from "react-icons/md";
import { createRequiredValidation, extractFileName } from "../../utils/utils";
import { useTranslation } from "react-i18next";
import useSmoothScrollToTop from "../../utils/hooks/useSmoothScrollToTop";

const defaultbuildingInfo = {
  name: "",
  owner_number: "",
  address: "",
  latitude: "",
  longitude: "",
  description: "",
  purpose_refurbishment_activity: "",
  planned_timeine: "",
  war_damages: "",
  characteristic_of_health_system: "",
  funding_requested_form: "",
  other_funcing_sources: "",
  electicity: "",
  heat: "",
  administrative_cost: "",
  labor_cost: "",
  material_cost: "",
  overhead_cost: "",
  contigency_cost: "",
  estimated_cost: "",
  technical_designs_documents: "",
};

const AddbuildingsStep = ({ nextStep, prevStep }) => {
  //translation hook
  const { t } = useTranslation();

  const { id } = useParams();
  const application = localStorage.getItem("appId");
  const [currentMode, setCurrentMode] = useState("add");
  const [files, setFiles] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: defaultbuildingInfo,
  });

  const queryClient = useQueryClient();
  const addNewBuildingMutate = useMutation(addNewAppBuilding, {
    onSuccess: () => {
      queryClient.invalidateQueries("buildings");
      toast.success(t("Building Added Successfully"));
      reset();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const updtBuildingMutate = useMutation(updtAppBuilding, {
    onSuccess: () => {
      queryClient.invalidateQueries("buildings");
      toast.success(t("Building Updated Successfully"));
      setCurrentMode("add");
      reset();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const onSubmit = (data) => {
    if (currentMode === "add") {
      const modifiedData = {
        ...data,
        application,
        program: id,
        technical_designs_document: files.at(-1)?.url,
        energy_audit_document: files.at(-1).url,
        public_use_confirmation_document: files.at(-1).url,
        privatisation_confirmation_document: files.at(-1).url,
        concession_rent_esco_document: files.at(-1).url,
        structural_survey_document: files.at(-1).url,
        post_energy_audit_document: files.at(-1).url,
      };
      addNewBuildingMutate.mutate(modifiedData);
    } else if (currentMode === "update") {
      const modifiedData = {
        ...data,
        technical_designs_document: files.at(-1)?.url,
        energy_audit_document: files.at(-1).url,
        public_use_confirmation_document: files.at(-1).url,
        privatisation_confirmation_document: files.at(-1).url,
        concession_rent_esco_document: files.at(-1).url,
        structural_survey_document: files.at(-1).url,
        post_energy_audit_document: files.at(-1).url,
      };
      updtBuildingMutate.mutate({ id: data?._id, buildingData: modifiedData });
    }
  };

  const isLoading =
    addNewBuildingMutate.isLoading || updtBuildingMutate.isLoading;

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AddNewBuilding
          register={register}
          errors={errors}
          reset={reset}
          setValue={setValue}
          currentMode={currentMode}
          setCurrentMode={setCurrentMode}
          setFiles={setFiles}
          isLoading={isLoading}
          prevStep={prevStep}
        />

        <Buildings
          setValue={setValue}
          setCurrentMode={setCurrentMode}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      </form>
    </div>
  );
};

const Buildings = ({ setValue, setCurrentMode, nextStep, prevStep }) => {
  //translation hook
  const { t } = useTranslation();

  const { id } = useParams();
  const application = localStorage.getItem("appId");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["buildings", application],
    queryFn: () => getAppBuildingById(application),
  });

  // scroll to top
  useSmoothScrollToTop();

  const createBuildingsMutate = useMutation(createNewApplication, {
    onSuccess: (data) => {
      toast.success(t("Application buildings added Successfully"));
      nextStep();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSelectBuilding = (building) => {
    setCurrentMode("update");
    const fields = [
      "name",
      "owner_number",
      "address",
      "latitude",
      "longitude",
      "description",
      "purpose_refurbishment_activity",
      "planned_timeine",
      "war_damages",
      "characteristic_of_heat_system",
      "funding_requested_form",
      "other_funcing_sources",
      "electicity",
      "heat",
      "administrative_cost",
      "labor_cost",
      "material_cost",
      "overhead_cost",
      "contigency_cost",
      "estimated_cost",
      "technical_designs_document",
      "_id",
    ];
    fields.forEach((fieldName) => {
      setValue(fieldName, building[fieldName]);
    });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleNextStep = () => {
    if (data?.building?.length === 0) {
      window.alert(t("Please Add atleast one sub-project"));
      return;
    }

    const buildingsIds = data?.building.map((building) => building?._id);
    createBuildingsMutate.mutate({
      buildings: buildingsIds,
      programId: id,
      status: "Draft",
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <SectionTitle>{t("Saved Sub-projects")}</SectionTitle>
        {data?.building?.length > 0 ? (
          data?.building?.map((building, index) => (
            <BuildingAccordian
              key={building?._id}
              building={building}
              handleSelectBuilding={handleSelectBuilding}
              index={index}
            />
          ))
        ) : (
          <p className="text-lg font-medium text-gray-500">
            {t("No sub-project added yet")}
          </p>
        )}
      </div>
      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" size="md" type="button" onClick={prevStep}>
          <FaArrowLeft />
          <span>{"Previous Step"}</span>
        </Button>
        <Button
          variant="primary"
          size="md"
          type="button"
          onClick={handleNextStep}
          disabled={createBuildingsMutate.isLoading}
        >
          <span>{t("Next Step")}</span>
          <FaArrowRight />
        </Button>
      </div>
    </div>
  );
};

const AddNewBuilding = ({
  register,
  errors,
  reset,
  currentMode,
  setCurrentMode,
  isLoading,
  setFiles,
  prevStep,
}) => {
  const handleClearFields = () => {
    setCurrentMode("add");
    reset();
  };

  //translation hook
  const { t } = useTranslation();

  return (
    <>
      <div className="space-y-3">
        <Input
          label={t("Sub-project Name")}
          name="name"
          type="text"
          placeholder={t("Enter sub-project name")}
          autoComplete="given-name"
          register={register}
          errors={errors}
          validationSchema={createRequiredValidation(
            t("Sub-project Name required")
          )}
        />
        <Input
          label={t("Sub-project Owner (Municipality or Other)")}
          name="owner_number"
          type="text"
          placeholder={t("Enter sub-project owner")}
          autoComplete="given-name"
          register={register}
          errors={errors}
          validationSchema={createRequiredValidation(
            t("Sub-project Owner (Municipality or Other) required")
          )}
        />
        <Input
          label={t("Sub-project Address")}
          name="address"
          type="text"
          placeholder={t("Sub-project location, street name")}
          autoComplete="address"
          register={register}
          errors={errors}
          validationSchema={createRequiredValidation(
            t("Sub-project Address required")
          )}
        />
        <div className="grid grid-cols-16 gap-3">
          <Input
            label={t("Latitude")}
            name="latitude"
            type="number"
            min={0}
            placeholder={t("e.g. 44° and 53° N")}
            register={register}
            errors={errors}
            validationSchema={createRequiredValidation(
              t("Sub-project Latitude required")
            )}
          />
          <Input
            label={t("Longitude")}
            name="longitude"
            type="number"
            min={0}
            placeholder={t("e.g. 22° and 41°")}
            register={register}
            errors={errors}
            validationSchema={createRequiredValidation(
              t("Sub-project Longitude required")
            )}
          />
        </div>
        <TextArea
          label={t(
            "Description of the sub-project's current condition and refurbishment needs"
          )}
          name="description"
          type="number"
          min={0}
          placeholder={t("Write text here")}
          register={register}
          errors={errors}
          validationSchema={createRequiredValidation(
            t("Description of current condition of sub-project required")
          )}
        ></TextArea>
        <TextArea
          label={t("Purposed Refurbishment Activities")}
          name="purpose_refurbishment_activity"
          type="number"
          placeholder={t("Write text here")}
          register={register}
          errors={errors}
          validationSchema={createRequiredValidation(
            t("Purposed Refurbishment Activities required")
          )}
        ></TextArea>
        <TextArea
          label={t("Planned Timeline for the Refurbishment")}
          name="planned_timeine"
          type="number"
          placeholder={t("Write text here")}
          register={register}
          errors={errors}
          validationSchema={createRequiredValidation(
            t("Planned Timeline for the Refurbishment required")
          )}
        ></TextArea>
        <Input
          label={t("War Damages (% of War Damages Cost/ Sub-project Cost)")}
          name="war_damages"
          type="number"
          min={0}
          placeholder={t("e.g. 30%")}
          register={register}
          errors={errors}
          validationSchema={{
            required: t("War damage cost required"),
            valueAsNumber: true,
            min: { value: 0, message: "Value should be at least 0" },
            max: { value: 100, message: "Value should be at most 100" },
          }}
        />
        <Input
          label={t(
            "Characteristics of the Heat System in Use (energy sources and their efficiency)"
          )}
          name="characteristic_of_heat_system"
          type="text"
          placeholder={t(
            "Please describe the energy sources and their efficiency in the heat system"
          )}
          register={register}
          errors={errors}
          validationSchema={createRequiredValidation(
            t("Characteristics of the Heat System required")
          )}
        />
        <Input
          label={t("Funding Requested From")}
          name="funding_requested_form"
          type="text"
          placeholder={t("Funding Requested From")}
          register={register}
          errors={errors}
          validationSchema={createRequiredValidation(
            t("Funding Source(s) required")
          )}
        />
        <Input
          label={t("Other Funding Sources (If applicable)")}
          name="other_funcing_sources"
          type="text"
          placeholder={t("Funding Source(s)")}
          register={register}
          errors={errors}
          // validationSchema={createRequiredValidation(
          //   "Other Funding Source(s) required"
          // )}
          isOptional
        />
      </div>
      <div className="sapce-y-3">
        <h3 className="heading-secondary">{t("Tariff for Energy")}</h3>
        <div className="grid grid-cols-16 gap-3">
          <Input
            label={t("Electricity")}
            name="electicity"
            type="text"
            placeholder={t("Electricity Source & Efficiency")}
            register={register}
            errors={errors}
            validationSchema={createRequiredValidation(
              t("Electricity Source & Efficiency required")
            )}
          />
          <Input
            label={t("Heat")}
            name="heat"
            type="text"
            placeholder={t("Heat Source & Efficiency")}
            register={register}
            errors={errors}
            validationSchema={createRequiredValidation(
              t("Heat Source & Efficiency required")
            )}
          />
        </div>
      </div>
      <div className="sapce-y-3">
        <h3 className="heading-secondary">{t("Project Cost")}</h3>
        <div className="grid grid-cols-16 gap-3">
          <Input
            label={t("Administrative Cost")}
            name="administrative_cost"
            type="number"
            min={0}
            placeholder={t("Enter Administrative Cost")}
            register={register}
            errors={errors}
            validationSchema={createRequiredValidation(
              t("Administrative Cost is required")
            )}
          />
          <Input
            label={t("Labor Cost")}
            name="labor_cost"
            type="number"
            min={0}
            placeholder={t("Enter Labor Cost")}
            register={register}
            errors={errors}
            validationSchema={createRequiredValidation(
              t("Labor Cost required")
            )}
          />
          <Input
            label={t("Material Cost")}
            name="material_cost"
            type="number"
            min={0}
            placeholder={t("Enter Material Cost")}
            register={register}
            errors={errors}
            validationSchema={createRequiredValidation(
              t("Material Cost is required")
            )}
          />
          <Input
            label={t("Overhead Cost")}
            name="overhead_cost"
            type="number"
            min={0}
            placeholder={t("Enter Overhead Cost")}
            register={register}
            errors={errors}
            validationSchema={createRequiredValidation(
              t("Overhead is Cost required")
            )}
          />
          <Input
            label={t("Contigency Cost")}
            name="contigency_cost"
            type="number"
            min={0}
            placeholder={t("Enter Contigency Cost")}
            register={register}
            errors={errors}
            validationSchema={createRequiredValidation(
              t("Contigency Cost is required")
            )}
          />
          <Input
            label={t("Estimated Cost")}
            name="estimated_cost"
            type="number"
            min={0}
            placeholder={t("Enter Estimated Cost")}
            register={register}
            errors={errors}
            validationSchema={createRequiredValidation(
              t("Estimated Cost is required")
            )}
          />
        </div>
      </div>
      <FileInput
        label={t("Technical Design")}
        name="technical_designs_document"
        register={register}
        errors={errors}
        validationSchema={createRequiredValidation(
          t("Technical Design is required")
        )}
        setFiles={setFiles}
      />
      <FileInput
        label={t("Energy Audit")}
        name="energy_audit_document"
        register={register}
        errors={errors}
        validationSchema={createRequiredValidation(
          t("Energy Audit is required")
        )}
        setFiles={setFiles}
      />
      <FileInput
        label={t("Public Use Confirmation")}
        name="public_use_confirmation_document"
        register={register}
        errors={errors}
        validationSchema={createRequiredValidation(
          t("Public Use Confirmation Document is required")
        )}
        setFiles={setFiles}
      />{" "}
      <FileInput
        label={t("Privatisation Status Confirmation")}
        name="privatisation_confirmation_document"
        register={register}
        errors={errors}
        validationSchema={createRequiredValidation(
          t("Privatisation Status Confirmation is required")
        )}
        setFiles={setFiles}
      />{" "}
      <FileInput
        label={t("Concession-Rent-ESCO Agreement Status Confirmation")}
        name="concession_rent_esco_document "
        register={register}
        errors={errors}
        validationSchema={createRequiredValidation(
          t("Concession-Rent-ESCO Agreement Status Confirmation is required")
        )}
        setFiles={setFiles}
      />{" "}
      <FileInput
        label={t("Structural Survey Documentation")}
        name="structural_survey_document"
        register={register}
        errors={errors}
        validationSchema={createRequiredValidation(
          t("Structural Survey Documentation is required")
        )}
        setFiles={setFiles}
      />{" "}
      <FileInput
        label={t("Ex-Post Energy Audit and EPC Confirmation")}
        name="post_energy_audit_document"
        register={register}
        errors={errors}
        validationSchema={createRequiredValidation(
          t("Ex-Post Energy Audit and EPC Confirmation is required")
        )}
        setFiles={setFiles}
      />
      <div className="flex items-center gap-3 justify-end">
        {currentMode === "update" && (
          <Button
            variant="outline"
            size="md"
            type="button"
            disabled={isLoading}
            onClick={handleClearFields}
          >
            <span>{t("Clear")}</span>
          </Button>
        )}
        <Button variant="primary" size="md" type="submit" disabled={isLoading}>
          <span>
            {currentMode === "update"
              ? t("Update Sub-project")
              : t("Add Sub-project")}
          </span>
          <FaBuilding />
        </Button>
      </div>
    </>
  );
};

const BuildingAccordian = ({ building, index, handleSelectBuilding }) => {
  //translation hook
  const { t } = useTranslation();

  const [openAccordion, setOpenAccordion] = useState(-1);

  const handleToggleAccordion = (index) => {
    if (openAccordion === index) {
      setOpenAccordion(-1);
    } else {
      setOpenAccordion(index);
    }
  };

  const queryClient = useQueryClient();
  const deleteBuildingMutate = useMutation(deleteAppBuilding, {
    onSuccess: () => {
      queryClient.invalidateQueries("buildings");
      toast.success(t("Sub-project Deleted Successfully"));
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleDeleteBuilding = (id) => {
    const confirmDelete = window.confirm(
      t("Are you sure you want to delete this Sub-project?")
    );

    if (confirmDelete) {
      deleteBuildingMutate.mutate(id);
    }
  };

  return (
    <div className="border border-gray-200 rounded-md relative">
      <div className="flex items-center justify-between bg-gray-100 w-full pr-2 rounded-md">
        <h2 className="font-medium text-gray-900 flex-1 p-3">{`${
          building?.name
        } ${index + 1}`}</h2>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleToggleAccordion(index)}
            className="bg-white text-gray-800 p-2 rounded-lg border border-gray-200"
          >
            <FaChevronDown />
          </button>
          <button
            type="button"
            onClick={() => handleSelectBuilding(building)}
            className="bg-white text-gray-800 p-2 rounded-lg border border-gray-200"
          >
            <MdEdit />
          </button>
          <button
            className="p-2 bg-white text-red-500 rounded-lg border border-gray-200"
            onClick={() => handleDeleteBuilding(building?._id)}
            disabled={deleteBuildingMutate.isLoading}
            type="button"
          >
            <MdOutlineDelete />
          </button>
        </div>
      </div>
      <div
        className={`grid overflow-hidden transition-grid-row duration-500 ease-in-out ${
          openAccordion === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 bg-white rounded-b-md">
          <div className="px-3 space-y-3 py-3">
            <div className="space-y-3">
              <div>
                <h3>{t("Sub-project Name")}</h3>
                <span className="text-gray-500">{building?.name}</span>
              </div>
              <div>
                <h3>{t("Sub-project Owner (Municipality or Other)")}</h3>
                <span className="text-gray-500">{building?.owner_number}</span>
              </div>
              <div>
                <h3>{t("Sub-project Address")}</h3>
                <span className="text-gray-500">{building?.address}</span>
              </div>
              <div>
                <h3>{t("Latitude")}</h3>
                <span className="text-gray-500">{building?.latitude}</span>
              </div>
              <div>
                <h3>{t("Longitude")}</h3>
                <span className="text-gray-500">{building?.longitude}</span>
              </div>
              <div>
                <h3>
                  {t("War Damages (% of War Damages Cost/ Sub-project Cost)")}
                </h3>
                <span className="text-gray-500">{building?.war_damages}</span>
              </div>
              <div>
                <h3>
                  {t(
                    "Characteristics of the Heat System in Use (energy sources and their efficiency)"
                  )}
                </h3>
                <span className="text-gray-500">
                  {building?.characteristic_of_heat_system}
                </span>
              </div>
              <div>
                <h3>{"Funding Requested From"}</h3>
                <span className="text-gray-500">
                  {building?.funding_requested_form}
                </span>
              </div>
              <div>
                <h3>{t("Other Funding Sources (If applicable)")}</h3>
                <span className="text-gray-500">
                  {building?.other_funcing_sources}
                </span>
              </div>
            </div>
            <SectionTitle>{t("Tariff for Energy")}</SectionTitle>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <h3>{t("Electricity")}</h3>
                <span className="text-gray-500">{building?.electicity}</span>
              </div>
              <div>
                <h3>{t("Heat")}</h3>
                <span className="text-gray-500">{building?.heat}</span>
              </div>
            </div>
            <SectionTitle>{t("Project Cost")}</SectionTitle>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <h3>{t("Administrative Cost")}</h3>
                <span className="text-gray-500">
                  {building?.administrative_cost}
                </span>
              </div>
              <div>
                <h3>{t("Labor Cost")}</h3>
                <span className="text-gray-500">{building?.labor_cost}</span>
              </div>
              <div>
                <h3>{"Overhead Cost"}</h3>
                <span className="text-gray-500">{building?.overhead_cost}</span>
              </div>
              <div>
                <h3>{t("Contigency Cost")}</h3>
                <span className="text-gray-500">
                  {building?.contigency_cost}
                </span>
              </div>
            </div>
            <div>
              <h3>
                {t(
                  "Description of the sub-project's current condition and refurbishment needs"
                )}
              </h3>
              <p className="text-gray-500">{building?.description}</p>
            </div>
            <div>
              <h3>{t("Purposed Refurbishment Activities")}</h3>
              <p className="text-gray-500">
                {building?.purpose_refurbishment_activity}
              </p>
            </div>
            <div>
              <h3>{t("Planned Timeline for the Refurbishment")}</h3>
              <p className="text-gray-500">{building?.planned_timeine}</p>
            </div>

            <SectionTitle>{t("Technical Design")}</SectionTitle>
            <div className="p-4 bg-white border border-gray-200 rounded-md flex-3">
              <div className="flex-btw gap-5 w-full">
                <div>
                  <h3 className="text-normal text-black font-medium leading-tight">
                    {extractFileName(building?.technical_designs_document)}
                  </h3>
                  {/* <span className="text-gray-500">0.8 MB</span> */}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleFileDownload(building?.technical_designs_document)
                  }
                >
                  <MdDownload size={24} className="text-sky-600" />
                </button>
              </div>
            </div>
            <SectionTitle>{t("Energy Audit")}</SectionTitle>
            <div className="p-4 bg-white border border-gray-200 rounded-md flex-3">
              <div className="flex-btw gap-5 w-full">
                <div>
                  <h3 className="text-normal text-black font-medium leading-tight">
                    {extractFileName(building?.energy_audit_document)}
                  </h3>
                  {/* <span className="text-gray-500">0.8 MB</span> */}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleFileDownload(building?.energy_audit_document)
                  }
                >
                  <MdDownload size={24} className="text-sky-600" />
                </button>
              </div>
            </div>
            <SectionTitle>{t("Public Use Confirmation")}</SectionTitle>
            <div className="p-4 bg-white border border-gray-200 rounded-md flex-3">
              <div className="flex-btw gap-5 w-full">
                <div>
                  <h3 className="text-normal text-black font-medium leading-tight">
                    {extractFileName(
                      building?.public_use_confirmation_document
                    )}
                  </h3>
                  {/* <span className="text-gray-500">0.8 MB</span> */}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleFileDownload(
                      building?.public_use_confirmation_document
                    )
                  }
                >
                  <MdDownload size={24} className="text-sky-600" />
                </button>
              </div>
            </div>
            <SectionTitle>
              {t("Privatisation Status Confirmation")}
            </SectionTitle>
            <div className="p-4 bg-white border border-gray-200 rounded-md flex-3">
              <div className="flex-btw gap-5 w-full">
                <div>
                  <h3 className="text-normal text-black font-medium leading-tight">
                    {extractFileName(
                      building?.privatisation_confirmation_document
                    )}
                  </h3>
                  {/* <span className="text-gray-500">0.8 MB</span> */}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleFileDownload(
                      building?.privatisation_confirmation_document
                    )
                  }
                >
                  <MdDownload size={24} className="text-sky-600" />
                </button>
              </div>
            </div>
            <SectionTitle>
              {t("Concession-Rent-ESCO Agreement Status Confirmation")}
            </SectionTitle>
            <div className="p-4 bg-white border border-gray-200 rounded-md flex-3">
              <div className="flex-btw gap-5 w-full">
                <div>
                  <h3 className="text-normal text-black font-medium leading-tight">
                    {extractFileName(building?.concession_rent_esco_document)}
                  </h3>
                  {/* <span className="text-gray-500">0.8 MB</span> */}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleFileDownload(building?.concession_rent_esco_document)
                  }
                >
                  <MdDownload size={24} className="text-sky-600" />
                </button>
              </div>
            </div>
            <SectionTitle>{t("Structural Survey")}</SectionTitle>
            <div className="p-4 bg-white border border-gray-200 rounded-md flex-3">
              <div className="flex-btw gap-5 w-full">
                <div>
                  <h3 className="text-normal text-black font-medium leading-tight">
                    {extractFileName(building?.structural_survey_document)}
                  </h3>
                  {/* <span className="text-gray-500">0.8 MB</span> */}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleFileDownload(building?.structural_survey_document)
                  }
                >
                  <MdDownload size={24} className="text-sky-600" />
                </button>
              </div>
            </div>
            <SectionTitle>
              {t("Ex-Post Energy Audit and EPC Confirmation")}
            </SectionTitle>
            <div className="p-4 bg-white border border-gray-200 rounded-md flex-3">
              <div className="flex-btw gap-5 w-full">
                <div>
                  <h3 className="text-normal text-black font-medium leading-tight">
                    {extractFileName(building?.post_energy_audit_document)}
                  </h3>
                  {/* <span className="text-gray-500">0.8 MB</span> */}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    handleFileDownload(building?.post_energy_audit_document)
                  }
                >
                  <MdDownload size={24} className="text-sky-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddbuildingsStep;
