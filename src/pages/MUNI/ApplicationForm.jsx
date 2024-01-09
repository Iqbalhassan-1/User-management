import { Fragment, useState } from "react";
import { MdCheck } from "react-icons/md";
import { Breadcrumb, Card, SectionTitle, Wrapper } from "../../components";
import MunicipalityInfoStep from "./MunicipalityInfoStep";
import AddbuildingsStep from "./AddBuildingsStep";
import AdditionalDocStep from "./AdditionalDocStep";
import { useTranslation } from "react-i18next";
import AddAssesstmentForm from "./AddAssesstmentForm";

const applicationSteps = {
  1: AddAssesstmentForm,
  2: MunicipalityInfoStep,
  3: AddbuildingsStep,
  4: AdditionalDocStep,
};

const ApplicationForm = () => {
  //translation hook
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isEligibleTrue, setIsEligibleTrue] = useState(false);

  const handleNextStep = (data) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
  };

  const CurrentView = applicationSteps[currentStep];

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => {
    setIsEligibleTrue(true);
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <Wrapper className="space-y-3">
      <Breadcrumb>
        <SectionTitle>{t("New Application")}</SectionTitle>
      </Breadcrumb>
      <Card className="space-y-6">
        <FormHeader currentStep={currentStep} />
        <CurrentView
          nextStep={nextStep}
          handleNextStep={(data) => handleNextStep(data)}
          prevStep={prevStep}
          formData={formData}
          setFormData={setFormData}
          isEligibleTrue={isEligibleTrue}
        />
      </Card>
    </Wrapper>
  );
};

const FormHeader = ({ currentStep }) => {
  const steps = [
    {
      id: 1,
      title: "Credit Assessment Form",
    },
    {
      id: 2,
      title: "Municipality Info",
    },
    {
      id: 3,
      title: "Sub-project Info",
    },
    {
      id: 4,
      title: "Additional Documents",
    },
  ];

  return (
    <div className="flex items-center justify-between gap-3 p-4 rounded-md border overflow-x-scroll overflow-hidden tabs-scroll">
      {steps.map((step, index) => (
        <Fragment key={step.id}>
          <div className="flex items-center gap-2 whitespace-nowrap">
            {step.id < currentStep ? (
              <div className="p-1 bg-green-100 rounded-full">
                <MdCheck className="text-green-500" size={18} />
              </div>
            ) : (
              <div
                className={`text-sm rounded-full h-6 w-6 grid place-items-center border font-medium bg-white ${
                  step.id === currentStep
                    ? "border-sky-600 text-sky-600"
                    : "text-gray-600"
                }`}
              >
                {step.id}
              </div>
            )}
            <h3
              className={`${
                step.id === currentStep ? "text-sky-600" : "text-gray-600"
              } font-medium`}
            >
              {step.title}
            </h3>
          </div>
          {index < steps.length - 1 && (
            <hr className="w-full h-[1px] bg-gray-100 border-0 rounded"></hr>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default ApplicationForm;
