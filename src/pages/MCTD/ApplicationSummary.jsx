import { useTranslation } from "react-i18next";
import {
  Breadcrumb,
  Card,
  LoadingItemPlaceholder,
  SectionTitle,
  Wrapper,
} from "../../components";
import {
  ApplicationHeader,
  ApplicationSummaryTabs,
  Info,
} from "../../features/MCTD";
import { summaryAgainstApplicationId } from "../../api/mctdService";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const ApplicationSummary = () => {
  //translation hook
  const { t } = useTranslation();
  const { applicationId } = useParams();
  const status = "Eligibility Screening";
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["Summary-of-Application-Header", applicationId, status],
    queryFn: () => summaryAgainstApplicationId(applicationId, status),
  });

  if (isLoading) {
    return <LoadingItemPlaceholder />;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  return (
    <Wrapper className="space-y-3">
      <Breadcrumb>
        <SectionTitle>{t("Application Summary")}</SectionTitle>
      </Breadcrumb>
      <Card className="p-0 sm:p-0 divide-y divide-gray-200 rounded-b-lg">
        <ApplicationHeader data={data?.application} />
        <ApplicationSummaryTabs data={data.users} />
      </Card>
    </Wrapper>
  );
};

export default ApplicationSummary;
