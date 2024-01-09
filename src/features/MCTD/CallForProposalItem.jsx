import React from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownList,
} from "../../components/UI/DropDown";
import { Button, Status } from "../../components";
import { MdMoreHoriz } from "react-icons/md";
import { ROLES, formatDate } from "../../utils/utils";
import useAuthContext from "../../utils/hooks/useAuthContext";
import {
  closeProposalProcess,
  deleteProposal,
  startEvaluationProcess,
} from "../../api/mctdService";

const CallForProposalItem = ({ data }) => {
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const isMCTD = user?.role === ROLES.MCTD;
  const isMunicipality = user?.role === ROLES.MUNI;

  const mctdDetailsLink = `/call-for-proposals/${data?._id}/details`;
  const muniDetailsLink = `/active-call-for-proposals/${data?._id}/details`;

  const queryClient = useQueryClient();
  const startEvaluation = useMutation(startEvaluationProcess, {
    onSuccess: (responseData) => {
      queryClient.invalidateQueries("get-All-Proposals");
      toast.success(responseData?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const closeProposal = useMutation(closeProposalProcess, {
    onSuccess: (responseData) => {
      queryClient.invalidateQueries("get-All-Proposals");
      toast.success(responseData?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const deleteProposalMutation = useMutation(deleteProposal, {
    onSuccess: (responseData) => {
      queryClient.invalidateQueries("get-All-Proposals");
      toast.success(responseData?.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleStartEvaluation = (id) => {
    const confirmMessage = t("Are you sure to start Evaluation!");
    if (window.confirm(confirmMessage)) {
      startEvaluation.mutate(id);
    }
  };

  const handleCloseProposal = (id) => {
    const confirmMessage = t("Are you sure to Close Proposal!");
    if (window.confirm(confirmMessage)) {
      let data = {
        programId: id,
        status: "Closed",
      };
      closeProposal.mutate(data);
    }
  };
  const handleDeleteProposal = (id) => {
    const confirmMessage = t("Are you sure to Delete Proposal!");
    if (window.confirm(confirmMessage)) {
      deleteProposalMutation.mutate(id);
    }
  };

  const renderMCTDStatus = () => {
    if (isMCTD) {
      return <Status status={data?.status} />;
    }
    return null;
  };

  const renderMCTDActions = () => {
    if (isMCTD) {
      return (
        <div className="absolute top-4 right-4">
          <Dropdown>
            <DropdownButton className="bg-white rounded-full drop-shadow-lg p-2 border border-gray-100 focus:drop-shadow-md">
              <MdMoreHoriz size={24} />
            </DropdownButton>
            <DropdownList className="w-[10rem] right-0">
              <DropdownItem>
                <Link to={`/call-for-proposals/${data?._id}/applications`}>
                  <button className="px-4 py-2 text-left w-full">
                    {t("View Applications")}
                  </button>
                </Link>
              </DropdownItem>
              {data?.status !== "Closed" &&
                data?.status !== "Under Evaluations" &&
                data?.applicationCount > 0 && (
                  <DropdownItem>
                    <button
                      className="px-4 py-2 text-left w-full"
                      onClick={() => handleStartEvaluation(data?._id)}
                    >
                      {t("Start Evaluations")}
                    </button>
                  </DropdownItem>
                )}
              {data?.status !== "Closed" && (
                <DropdownItem>
                  <button
                    className="px-4 py-2 text-left w-full"
                    onClick={() => handleCloseProposal(data?._id)}
                  >
                    {t("Close Proposal")}
                  </button>
                </DropdownItem>
              )}
              {data?.status === "Open" && data?.applicationCount === 0 && (
                <DropdownItem>
                  <button
                    className="px-4 py-2 text-left w-full"
                    onClick={() => handleDeleteProposal(data?._id)}
                  >
                    {t("Delete Proposal")}
                  </button>
                </DropdownItem>
              )}
            </DropdownList>
          </Dropdown>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-4 relative group hover:bg-sky-100 transition-all">
      <div className="flex items-start flex-col gap-6 md:flex-row justify-between md:max-w-7xl">
        <div className="space-y-5">
          {renderMCTDStatus()}
          <p className="text-gray-600">{data?.reference_no}</p>
          <Link
            to={isMCTD ? mctdDetailsLink : muniDetailsLink}
            className="text-black font-medium block group-hover:text-sky-600 hover:underline truncate"
          >
            {data?.title}
          </Link>
          <p className="text-gray-500">
            {t("Created on")} {formatDate(data?.createdAt)}
          </p>
        </div>
        <div className="md:self-end">
          <div className="flex-left gap-10">
            {isMCTD && (
              <div className="space-y-4 flex flex-col">
                <span className="text-sky-600 font-semibold">
                  {data?.applicationCount}
                </span>
                <span className="text-gray-500">{t("Applications")}</span>
              </div>
            )}
            <div className="space-y-4 flex flex-col">
              <span className="text-red-600 font-semibold">
                {formatDate(data?.lastDate)}
              </span>
              <span className="text-gray-500">{t("Deadline")}</span>
            </div>
          </div>
        </div>
        {renderMCTDActions()}
      </div>
    </div>
  );
};

export default CallForProposalItem;
