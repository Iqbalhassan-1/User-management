import { Outlet } from "react-router-dom";
import { CFPTabs } from "../../features/MCTD";
import Breadcrumb from "../UI/BreadCrumb";
import Card from "../UI/Card";
import CustomTabLink from "./CustomTabLink";
import SectionTitle from "./SectionTitle";
import Wrapper from "./Wrapper";
import useDataContext from "../../utils/hooks/useDataContext";
import { useTranslation } from "react-i18next";

const MuniApplicationLayout = () => {
  //translation hook
  const { t } = useTranslation();

  const { data } = useDataContext();
  const submittedCount = data?.filter(
    (item) => item?.status === "Submitted"
  )?.length;
  const approvedCount = data?.filter(
    (item) => item?.status === "Approved"
  )?.length;
  const rejectedCount = data?.filter(
    (item) => item?.status === "Rejected"
  )?.length;
  const evaluationCount = data?.filter(
    (item) => item?.status === "Under Evaluations"
  )?.length;
  const correctionCount = data?.filter(
    (item) => item?.status === "Correction"
  )?.length;
  return (
    <Wrapper className="space-y-3">
      <Breadcrumb>
        <SectionTitle>{t("My Applications")}</SectionTitle>
      </Breadcrumb>
      <Card className="p-0 sm:p-0 divide-y divide-gray-200 rounded-b-lg">
        <CFPTabs className="rounded-t-none bg-[unset]">
          <CustomTabLink
            end
            to="."
            text={t("All Applications")}
            count={data?.length}
          />
          <CustomTabLink
            to="submitted"
            text={t("Submitted")}
            count={submittedCount}
          />
          <CustomTabLink
            to="correction"
            text={t("Correction")}
            count={correctionCount}
          />
          <CustomTabLink
            to="under-review"
            text={t("Under Review")}
            count={evaluationCount}
          />
          <CustomTabLink
            to="approved"
            text={t("Approved")}
            count={approvedCount}
          />
          <CustomTabLink
            to="rejected"
            text={t("Rejected")}
            count={rejectedCount}
          />
        </CFPTabs>
        <Outlet />
      </Card>
    </Wrapper>
  );
};

export default MuniApplicationLayout;
