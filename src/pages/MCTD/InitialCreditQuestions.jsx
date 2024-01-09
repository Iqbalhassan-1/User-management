import { useForm } from "react-hook-form";
import TemplateQuestionsList from "../../features/MCTD/TemplateQuestionsList";
import { Select, Accordian, Button } from "../../components";
import { useTranslation } from "react-i18next";

const questions = [
  {
    id: 1,
    title: "Energy Efficiency Enhancement Fund for Public Buildings in Ukraine",
  },
  {
    id: 2,
    title:
      "Regional Energy Efficiency Fund for Sustainable Development in Ukraine's Regions",
  },
  {
    id: 3,
    title: "Public Building Retrofit Fund for Enaergy Conservation in Ukraine",
  },
];

const InitialCreditQuestions = () => {
  //translation hook
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onQuestionAdd = (data) => {
    console.log(data);
  };

  return (
    <>
      <Accordian accordianTitle="Initial Credit Assessment Questions">
        <TemplateQuestionsList questions={questions} />
        <div className="p-2">
          <div className="flex items-end gap-3">
            <Select
              label="Select Question"
              name="questions"
              register={register}
              errors={errors}
              fisrtOp="Select Question"
              validationSchema={{
                required: "question Required",
              }}
            >
              <option value="1">
                Energy Efficiency Enhancement Fund for Public Buildings in
                Ukraine
              </option>
              <option value="2">
                Regional Energy Efficiency Fund for Sustainable Development in
                Ukraine's Regions
              </option>
              <option value="3">
                Public Building Retrofit Fund for Enaergy Conservation in
                Ukraine
              </option>
            </Select>
            <Button size="md" onClick={handleSubmit(onQuestionAdd)}>
              {t("Add")}
            </Button>
          </div>
        </div>
      </Accordian>
    </>
  );
};

export default InitialCreditQuestions;
