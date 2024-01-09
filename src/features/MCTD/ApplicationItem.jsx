import React from "react";
import { Button, Status } from "../../components";
import { Link, useParams } from "react-router-dom";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownList,
} from "../../components/UI/DropDown";
import { MdMoreHoriz } from "react-icons/md";
import { formatDate, status } from "../../utils/utils";
import useAuthContext from "../../utils/hooks/useAuthContext";
import { useTranslation } from "react-i18next";

const ApplicationItem = ({ data }) => {
  //translation hook
  const { t } = useTranslation();

  const { id } = useParams();
  const { user } = useAuthContext();

  const isMCTD = user?.role === "MCTD";
  const isMunicipality = user?.role === "Municipality";
  const mctdDetailsLink = `/call-for-proposals/${id}/applications/${data?._id}/details`;
  const muniDetailsLink = `/all-applications/${data?._id}/details`;
  const mctdSummaryLink = `/call-for-proposals/${id}/applications/${data?._id}/summary`;
  const muniSummaryLink = `/all-applications/${data?._id}/summary`;

  const isCorrection = isMunicipality && data?.status === "Correction";
  const isMCTDAndCreditworthiness =
    data?.status === "Approved" || data?.status === "Rejected";

  return (
    <div className="p-4 relative group hover:bg-sky-100 transition-all">
      <div className="flex items-start flex-col gap-6 md:flex-row justify-between md:max-w-5xl">
        <div className="space-y-5">
          <Status status={data?.status} />
          <p className="text-gray-600">{data?.projectNumber}</p>
          <Link
            to={isMCTD ? mctdDetailsLink : muniDetailsLink}
            className="text-black font-medium block group-hover:text-sky-600
            hover:underline"
          >
            {data?.muncipality_info?.name}
          </Link>
          <p className="text-gray-500">
            {t("Submitted on")} {formatDate(data?.updatedAt)}
          </p>
        </div>
        {isMCTD && (
          <div className="md:self-end">
            <div className="flex-left gap-10 w-72">
              <div className="space-y-4 flex flex-col">
                <Status status={data?.evaluation_status} />
                <span className="text-gray-500">{t("Evaluation Status")}</span>
              </div>
            </div>
          </div>
        )}
        <div className="absolute top-4 right-4 flex gap-3">
          {isCorrection && (
            <Link to={`/all-applications/${data?._id}/correction-form`}>
              <Button variant="primary" size="md">
                {t("Resubmit")}
              </Button>
            </Link>
          )}
          <Dropdown>
            <DropdownButton className="bg-white rounded-full drop-shadow-lg p-2 border border-gray-100 focus:drop-shadow-md">
              <MdMoreHoriz size={24} />
            </DropdownButton>
            <DropdownList className="w-[10rem] right-0">
              <DropdownItem>
                <Link to={isMCTD ? mctdDetailsLink : muniDetailsLink}>
                  <button className="px-4 py-2 text-left w-full">
                    {t("View Application")}
                  </button>
                </Link>
              </DropdownItem>
              {isMCTDAndCreditworthiness && (
                <DropdownItem>
                  <Link
                    to={isMCTD ? mctdSummaryLink : muniSummaryLink}
                    className="px-4 py-2 text-left w-full block"
                  >
                    {t("View Summary")}
                  </Link>
                </DropdownItem>
              )}
            </DropdownList>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default ApplicationItem;
