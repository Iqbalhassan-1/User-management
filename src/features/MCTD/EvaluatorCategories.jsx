import { useTranslation } from "react-i18next";

const EvaluatorCategories = ({ register, errors }) => {
  //translation hook

  const { t } = useTranslation();
  return (
    <div className="space-y-3">
      <h3 className="block font-medium">
        <span className="text-gray-900">{t("Evaluation Category")}</span>
        <span className="text-red-500"> *</span>
      </h3>
      <div className="flex items-center flex-wrap gap-3">
        <div>
          <input
            type="radio"
            className="hidden peer sr-only"
            name="stage"
            id="Eligibility Screening"
            value="Eligibility Screening"
            {...register("stage")}
          />
          <label
            htmlFor="Eligibility Screening"
            className="block border border-gray-200 rounded-md py-2 px-3 cursor-pointer text-gray-500 bg-gray-100 font-medium peer-checked:bg-sky-200 peer-checked:text-sky-600 peer-checked:border-sky-600"
          >
            {t("Eligibility")}
          </label>
        </div>
        <div>
          <input
            type="radio"
            className="hidden peer sr-only"
            name="stage"
            value="Initial Creditworthiness Assessment"
            id="Initial Creditworthiness Assessment"
            {...register("stage")}
          />
          <label
            htmlFor="Initial Creditworthiness Assessment"
            className="block border border-gray-200 rounded-md py-2 px-3 cursor-pointer text-gray-500 bg-gray-100 font-medium peer-checked:bg-sky-200 peer-checked:text-sky-600 peer-checked:border-sky-600"
          >
            {t("Initial Credit")}
          </label>
        </div>
        <div>
          <input
            type="radio"
            className="hidden peer sr-only"
            name="stage"
            id="Quality and Relevance Screening"
            value="Quality and Relevance Screening"
            {...register("stage")}
          />
          <label
            htmlFor="Quality and Relevance Screening"
            className="block border border-gray-200 rounded-md py-2 px-3 cursor-pointer text-gray-500 bg-gray-100 font-medium peer-checked:bg-sky-200 peer-checked:text-sky-600 peer-checked:border-sky-600"
          >
            {t("Quality and Relevance")}
          </label>
        </div>
        <div>
          <input
            type="radio"
            className="hidden peer sr-only"
            name="stage"
            id="Creditworthiness Assessment"
            value="Creditworthiness Assessment"
            {...register("stage")}
          />
          <label
            htmlFor="Creditworthiness Assessment"
            className="block border border-gray-200 rounded-md py-2 px-3 cursor-pointer text-gray-500 bg-gray-100 font-medium peer-checked:bg-sky-200 peer-checked:text-sky-600 peer-checked:border-sky-600"
          >
            {t("Final Credit")}
          </label>
        </div>
      </div>
    </div>
  );
};

export default EvaluatorCategories;
