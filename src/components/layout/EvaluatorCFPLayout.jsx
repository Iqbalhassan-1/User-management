import { Outlet, useParams } from "react-router-dom";
import { CFPHeader, CFPTabs } from "../../features/MCTD";
import Breadcrumb from "../UI/BreadCrumb";
import Card from "../UI/Card";
import CustomTabLink from "./CustomTabLink";
import SectionTitle from "./SectionTitle";
import Wrapper from "./Wrapper";
import { useTranslation } from "react-i18next";
import useAuthContext from "../../utils/hooks/useAuthContext";
import useDataContext from "../../utils/hooks/useDataContext";
import { useQuery } from "@tanstack/react-query";
import { getApplicationsCount } from "../../api/evaService";

const EvaluatorCFPLayout = () => {
  //translation hook

  const { t } = useTranslation();

  return (
    <Wrapper className="space-y-3">
      <Breadcrumb>
        <SectionTitle>{t("Self Assign")}</SectionTitle>
      </Breadcrumb>
      <Card className="p-0 sm:p-0 divide-y divide-gray-200 rounded-b-lg">
        <div className="p-4 sm:p-5 space-y-7">
          <CFPHeader />
        </div>
        <CFPTabsHeader translate={t} />
        <Outlet />
      </Card>
    </Wrapper>
  );
};

const CFPTabsHeader = ({ translate }) => {
  const { id } = useParams();
  const { user } = useAuthContext();

  // getApplicationsCount
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["get-applications-counts", id],
    queryFn: () => getApplicationsCount(id),
  });

  const isEvaStageOne = user?.stage === "Eligibility Screening";

  return (
    <CFPTabs>
      <CustomTabLink
        end
        to="."
        text={translate("All")}
        count={data?.all || 0}
      />
      <CustomTabLink
        to="assigned"
        text={translate("Assigned")}
        count={data?.assigned || 0}
      />
      <CustomTabLink
        to="completed"
        text={translate("Completed")}
        count={data?.completed || 0}
      />
      {isEvaStageOne && (
        <CustomTabLink
          to="send-for-correction"
          text={translate("Send for Correction")}
          count={data?.correction || 0}
        />
      )}
      <CustomTabLink
        to="rejected"
        text={translate("Rejected")}
        count={data?.rejecetd || 0}
      />
    </CFPTabs>
  );
};

export default EvaluatorCFPLayout;
