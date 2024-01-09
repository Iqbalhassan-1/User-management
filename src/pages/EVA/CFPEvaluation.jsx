import { useQuery } from "@tanstack/react-query";
import {
  Breadcrumb,
  Card,
  DebounceInput,
  SectionTitle,
  Wrapper,
} from "../../components";
import EvaProposalList from "../../features/EVA/EvaProposalList";
import { getAllEvaProgrammes } from "../../api/evaService";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const CFPEvaluation = () => {
  //translation hook
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-All-Evaluations-Programmes", searchText],
    queryFn: () => getAllEvaProgrammes(searchText),
  });

  if (isError) {
    return <p>{error?.message}</p>;
  }

  return (
    <Wrapper className="space-y-3">
      <Breadcrumb>
        <div className="flex-btw">
          <SectionTitle>{t("List of Call for Proposals")}</SectionTitle>
        </div>
      </Breadcrumb>
      <Card className="p-0 sm:p-0 divide-y divide-gray-200 rounded-b-lg">
        <div className="p-4 sm:p-5">
          <DebounceInput value={searchText} onChange={setSearchText} />
        </div>
        <EvaProposalList data={data} isLoading={isLoading} />
      </Card>
    </Wrapper>
  );
};

export default CFPEvaluation;
