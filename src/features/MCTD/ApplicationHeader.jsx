import { useTranslation } from "react-i18next";
import Info from "./Info";
import { formatDate } from "../../utils/utils";

const ApplicationHeader = ({ data }) => {
  //translation hook
  const { t } = useTranslation();

  return (
    <>
      <div className="p-4 sm:p-5 space-y-2">
        <Info>
          <Info.Type>{t("Call for Proposal")}:</Info.Type>
          <Info.Value>{data.programId?.title}</Info.Value>
        </Info>
        <Info>
          <Info.Type>{t("Reference No")}:</Info.Type>
          <Info.Value>{data.programId?.reference_no}</Info.Value>
        </Info>
      </div>
      <div className="p-4 sm:p-5 space-y-2">
        {/* <h1 className="heading-primary">{data?.muncipality_info?.name}</h1> */}
        <Info>
          <Info.Type>{t("Application")}:</Info.Type>
          <Info.Value>{data.muncipality_info?.name}</Info.Value>
        </Info>
        <Info>
          <Info.Type>{t("Reference No:")}</Info.Type>
          <Info.Value>{data?.projectNumber}</Info.Value>
        </Info>
        <Info>
          <Info.Type>{t("Submitted on:")}</Info.Type>
          <Info.Value>{formatDate(data?.createdAt)}</Info.Value>
        </Info>
        <Info>
          <Info.Type>Status:</Info.Type>
          <Info.ValueAsStatus status={data?.status} />
        </Info>
      </div>
    </>
  );
};

export default ApplicationHeader;
