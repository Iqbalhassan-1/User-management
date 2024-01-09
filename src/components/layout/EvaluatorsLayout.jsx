import { Link, Outlet } from "react-router-dom";
import Card from "../UI/Card";
import Wrapper from "./Wrapper";
import Button from "../UI/Button";
import { MdAdd } from "react-icons/md";
import { AddNewEvaluator, CFPTabs } from "../../features/MCTD";
import CustomTabLink from "./CustomTabLink";
import SectionTitle from "./SectionTitle";
import Breadcrumb from "../UI/BreadCrumb";
import useModal from "../../utils/hooks/useModal";
import Modal from "../UI/Modal";
import useDataContext from "../../utils/hooks/useDataContext";
import { useTranslation } from "react-i18next";

const EvaluatorsLayout = () => {
  //translation hook
  const { t } = useTranslation();
  
  const { data } = useDataContext();
  const firstStage = data?.filter(
    (item) => item?.stage === "Eligibility Screening"
  )?.length;
  const secondStage = data?.filter(
    (item) => item?.stage === "Initial Creditworthiness Assessment"
  )?.length;
  const thirdStage = data?.filter(
    (item) => item?.stage === "Quality and Relevance Screening"
  )?.length;
  const fourthStage = data?.filter(
    (item) => item?.stage === "Creditworthiness Assessment"
  )?.length;
  const { isOpen, toggleModal, closeModal, selectedValue } = useModal();

  return (
    <>
      <Wrapper className="space-y-3">
        <Breadcrumb>
          <div className="flex items-start flex-col gap-3 md:justify-between md:gap-0 md:flex-row">
            <SectionTitle>{t("Evaluator List")}</SectionTitle>
            {/* TODO: */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => toggleModal(null)}
            >
              <MdAdd size={24} />
              <span>{t("Add Evaluator")}</span>
            </Button>
          </div>
        </Breadcrumb>
        <Card className="p-0 sm:p-0 divide-y divide-gray-200 rounded-b-lg">
          <CFPTabs>
            <CustomTabLink
              end
              to="."
              text={t("All Evaluators")}
              count={data?.length}
            />
            <CustomTabLink
              to="eligibility-evaluators"
              text={t("Eligibility Evaluators")}
              count={firstStage}
            />
            <CustomTabLink
              to="initial-credit-evaluator"
              text={t("Initial Credit Evaluator")}
              count={secondStage}
            />
            <CustomTabLink
              to="quality-and-relevance-evaluator"
              text={t("Quality and Relevance Evaluators")}
              count={thirdStage}
            />
            <CustomTabLink
              to="final-credit-evaluator"
              text={t("Final Credit Evaluators")}
              count={fourthStage}
            />
          </CFPTabs>
          <Outlet />
        </Card>
      </Wrapper>
      <AddNewEvaluator
        isOpen={isOpen}
        closeModal={closeModal}
        selectedValue={selectedValue}
      />
    </>
  );
};

export default EvaluatorsLayout;
