import { Outlet } from "react-router-dom";
import { CFPHeader, CFPTabs } from "../../features/MCTD";
import Breadcrumb from "../UI/BreadCrumb";
import Card from "../UI/Card";
import SectionTitle from "./SectionTitle";
import Wrapper from "./Wrapper";
import CustomTabLink from "./CustomTabLink";
import useDataContext from "../../utils/hooks/useDataContext";
import { useTranslation } from "react-i18next";

const CFPApplicationsLayout = () => {
  //translation hook
  const { t } = useTranslation();

  const { data } = useDataContext();

  const submittedCount = data?.filter(
    (item) => item?.status === "Approved"
  )?.length;

  const rejectedCount = data?.filter(
    (item) => item?.status === "Rejected"
  )?.length;

  const evaluationCount = data?.filter(
    (item) => item?.status === "Under Evaluations"
  )?.length;

  return (
    <Wrapper className="space-y-3">
      <Breadcrumb>
        <SectionTitle>{t("Applications")}</SectionTitle>
      </Breadcrumb>
      <Card className="p-0 sm:p-0 divide-y divide-gray-200 rounded-b-lg">
        <div className="p-4 sm:p-5 space-y-7">
          <CFPHeader />
        </div>
        <CFPTabs className="rounded-t-none bg-[unset]" noSearch>
          <CustomTabLink
            end
            to="."
            text={t("All Applications")}
            count={data?.length}
          />
          <CustomTabLink
            to="under-review"
            text={t("Under Review")}
            count={evaluationCount}
          />
          <CustomTabLink
            to="approved"
            text={t("Approved")}
            count={submittedCount}
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

export default CFPApplicationsLayout;
