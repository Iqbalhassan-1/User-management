import { useQuery } from "@tanstack/react-query";
import {
  Breadcrumb,
  Card,
  DebounceInput,
  LoadingItemPlaceholder,
  NoDataAvailable,
  SectionTitle,
  Wrapper,
} from "../../components";
import { CallForProposalItem } from "../../features/MCTD";
import { getProposalsByStatus } from "../../api/mctdService";
import { useTranslation } from "react-i18next";

const MuniCFP = () => {
  //translation hook
  const { t } = useTranslation();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-open-Proposals"],
    queryFn: () => getProposalsByStatus("Open", ""),
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
        <SectionTitle>{t("List of Call for Proposals")}</SectionTitle>
      </Breadcrumb>
      <Card className="p-0 sm:p-0 divide-y divide-gray-200 rounded-b-lg">
        <div className="p-4 sm:p-5">
          <DebounceInput value="" />
        </div>
        {data.length > 0 ? (
          data?.map((cfpItem) => (
            <CallForProposalItem data={cfpItem} key={cfpItem?._id} />
          ))
        ) : (
          <NoDataAvailable />
        )}
      </Card>
    </Wrapper>
  );
};

export default MuniCFP;
