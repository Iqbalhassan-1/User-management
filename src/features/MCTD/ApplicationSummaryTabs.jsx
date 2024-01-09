import { useState } from "react";
import EligibilitySummary from "./EligibilitySummary";
import InitialCreditSummary from "./InitialCreditSummary";
import QualityAndRelevanceSummary from "./QualityAndRelevanceSummary";
import FinalCreditSummary from "./FinalCreditSummary";
import { useTranslation } from "react-i18next";

const tabsView = {
  1: EligibilitySummary,
  2: InitialCreditSummary,
  3: QualityAndRelevanceSummary,
  4: FinalCreditSummary,
};

const ApplicationSummaryTabs = ({ data }) => {
  //translation hook
  const { t } = useTranslation();

  const [currentView, setCurrentView] = useState(1);

  const TabContent = tabsView[currentView];

  return (
    <div className="p-4 sm:p-5 flex flex-col lg:flex-row items-start gap-4">
      <Tabs
        setCurrentView={setCurrentView}
        currentView={currentView}
        data={data}
      />
      <div className="flex-1">
        <TabContent />
      </div>
    </div>
  );
};

const Tabs = ({ setCurrentView, currentView, data }) => {
  //translation hook
  const { t } = useTranslation();

  const { stage1, stage2, stage3, stage4 } = data;

  const tabData = [
    {
      id: 1,
      label: "Eligibility Questions",
      assignedTo: `${stage1?.firstName} ${stage1?.lastName}`,
      isEvaluated: stage1 ? true : false,
    },
    {
      id: 2,
      label: "Initial Credit Questions",
      assignedTo: `${stage2?.firstName} ${stage2?.lastName}`,
      isEvaluated: stage2 ? true : false,
    },
    {
      id: 3,
      label: "Quality and Relevance Evaluator",
      assignedTo: `${stage3?.firstName} ${stage3?.lastName}`,
      isEvaluated: stage3 ? true : false,
    },
    {
      id: 4,
      label: "Final Credit Questions",
      assignedTo: `${stage4?.firstName} ${stage4?.lastName}`,
      isEvaluated: stage4 ? true : false,
    },
  ];

  return (
    <aside className="border-b border-gray-200 flex items-start flex-row lg:flex-col gap-2 lg:border-none overflow-x-scroll overflow-hidden w-full lg:w-auto lg:overflow-x-auto tabs-scroll">
      {tabData?.map(
        (tab) =>
          tab.isEvaluated && (
            <button
              key={tab?.id}
              className={`text-left p-2 rounded-md whitespace-nowrap ${
                currentView === tab?.id ? "bg-sky-50" : ""
              }`}
              onClick={() => setCurrentView(tab?.id)}
            >
              <span
                className={`block ${
                  currentView === tab?.id ? "text-sky-600" : "text-gray-500"
                } font-medium`}
              >
                {t(tab?.label)}
              </span>
              <span
                className={`block text-xs ${
                  currentView === tab?.id ? "text-sky-600" : "text-gray-400"
                }`}
              >{`${t("Assigned to")} ${tab?.assignedTo}`}</span>
            </button>
          )
      )}
    </aside>
  );
};

export default ApplicationSummaryTabs;
