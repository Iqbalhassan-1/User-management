import { useTranslation } from "react-i18next";

const Status = ({ status = "" }) => {
  //translation hook
  const { t } = useTranslation();
  let content;

  if (status === "Open") {
    content = (
      <span className="text-sm bg-green-100 text-green-800 px-3 p-1 font-medium capitalize rounded-md">
        {t("Open")}
      </span>
    );
  }
  if (status === "Closed") {
    content = (
      <span className="text-sm border border-stone-300 bg-stone-100 text-stone-600 px-3 py-[2px] capitalize rounded-sm">
        {t("Closed")}
      </span>
    );
  }
  if (status === "Approved") {
    content = (
      <span className="text-sm bg-green-100 text-green-800 px-3 py-[2px] capitalize font-medium rounded-md">
        {t("Approved")}
      </span>
    );
  }
  if (status === "Under Evaluations") {
    content = (
      <span className="text-sm bg-indigo-100 text-indigo-800 px-3 p-1 font-medium capitalize rounded-md">
        {t("Under Evaluation")}
      </span>
    );
  }
  if (status === "Rejected" || status === "Reject") {
    content = (
      <span className="text-sm bg-pink-100 text-pink-800 px-3 p-1 font-medium capitalize rounded-md">
        {t("Rejected")}
      </span>
    );
  }
  if (status === "Correction") {
    content = (
      <span className="text-sm bg-yellow-100 text-yellow-800 px-4 py-[2px] capitalize font-medium rounded-md">
        {t("Correction")}
      </span>
    );
  }
  if (status === "Eligibility Screening") {
    content = (
      <span className="text-sm bg-[#E5EDFF] text-[#42389D] px-3 p-1 font-medium capitalize rounded-md">
        {t("Eligibility Screening")}
      </span>
    );
  }
  if (status === "Quality and Relevance Screening") {
    content = (
      <span className="text-sm bg-yellow-100 text-yellow-800 px-3 p-1 font-medium capitalize rounded-md">
        {t("Quality and Relevance Screening")}
      </span>
    );
  }
  if (status === "Initial Creditworthiness Assessment") {
    content = (
      <span className="text-sm bg-orange-100 text-orange-900 px-4 py-[2px] capitalize rounded-md">
        {t("Initial Creditworthiness Assessment")}
      </span>
    );
  }
  if (status === "Creditworthiness Assessment") {
    content = (
      <span className="text-sm bg-[#DEF7EC] text-[#03543F] px-3 p-1 font-medium capitalize rounded-md">
        {t("Creditworthiness Assessment")}
      </span>
    );
  }
  if (status === "Submitted") {
    content = (
      <span className="text-sm bg-green-100 text-green-800 px-3 py-[2px] capitalize rounded-md">
        {t("Submitted")}
      </span>
    );
  }
  if (status === "Draft") {
    content = (
      <span className="text-sm bg-orange-100 text-orange-900 px-4 py-[2px] capitalize rounded-md">
        {t("Draft")}
      </span>
    );
  }
  if (status === "approved") {
    content = (
      <span className="text-sm bg-green-100 text-green-800 px-3 py-[2px] capitalize rounded-md">
        {t("Approved")}
      </span>
    );
  }

  if (status === "No Status") {
    content = (
      <span className="text-sm bg-gray-100 text-gray-900 px-4 py-[2px] capitalize font-medium rounded-md">
        {t("No Status")}
      </span>
    );
  }

  return content;
};

export default Status;
