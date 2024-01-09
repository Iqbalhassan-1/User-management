import { MdAdd } from "react-icons/md";
import {
  Button,
  Card,
  CustomTabLink,
  SectionTitle,
  Wrapper,
  Breadcrumb,
} from "../index";
import { Link, Outlet, useParams } from "react-router-dom";
import CFPTabs from "../../features/MCTD/CFPTabs";
import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getApplicationsAgainstProposal } from "../../api/mctdService";
import useDataContext from "../../utils/hooks/useDataContext";
import { useTranslation } from "react-i18next";
// import CFPTabs from "../features/MCTD/CFPTabs";

const CallForProposalsLayout = () => {
  //translation hook
  const { t } = useTranslation();

  const { data } = useDataContext();
  const openCount = data?.filter((item) => item?.status === "Open")?.length;
  const closeCount = data?.filter((item) => item?.status === "Closed")?.length;
  const evaluationCount = data?.filter(
    (item) => item?.status === "Under Evaluations"
  )?.length;

  return (
    <>
      <Wrapper className="space-y-3">
        <Breadcrumb>
          <div className="flex-btw">
            <SectionTitle>{t("Call for Proposals")}</SectionTitle>
            {/* TODO: */}
            <Link to="/call-for-proposals/create">
              <Button variant="primary" size="sm">
                <MdAdd size={24} />
                <span>{t("New Proposal")}</span>
              </Button>
            </Link>
          </div>
        </Breadcrumb>
        <div>
          <CFPTabs>
            <CustomTabLink
              end
              to="."
              text={t("All Proposals")}
              count={data?.length}
            />
            <CustomTabLink to="open" text={t("Open")} count={openCount} />
            <CustomTabLink
              to="under-evaluation"
              text={t("Under Evaluation")}
              count={evaluationCount}
            />
            <CustomTabLink to="closed" text={t("Closed")} count={closeCount} />
          </CFPTabs>
          <Outlet />
          {/* outlet={{ updateState }} */}
        </div>
      </Wrapper>
    </>
  );
};

export default CallForProposalsLayout;
