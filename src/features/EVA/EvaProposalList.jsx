import { Link } from "react-router-dom";
import { formatDate } from "../../utils/utils";
import { LoadingItemPlaceholder, NoDataAvailable } from "../../components";
import { useTransition } from "react";
import { useTranslation } from "react-i18next";

const EvaProposalList = ({ data, isLoading }) => {
  if (isLoading) {
    return <LoadingItemPlaceholder />;
  }

  return (
    <div className="bg-white divide-y divide-gray-200 rounded-b-lg">
      {data?.length > 0 ? (
        data?.map((cfpItem) => (
          <EvaProposalItem data={cfpItem} key={cfpItem?._id} />
        ))
      ) : (
        <NoDataAvailable />
      )}
    </div>
  );
};

const EvaProposalItem = ({ data }) => {
  //translation hook
  const { t } = useTranslation();

  return (
    <div className="p-4 relative group hover:bg-sky-100 transition-all">
      <div className="flex items-start flex-col gap-6 md:flex-row justify-between">
        <div className="space-y-5">
          <p className="text-gray-600">{data?.reference_no}</p>
          <Link
            to={`/proposals/${data?._id}/self-assign`}
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
            <div className="space-y-4 flex flex-col">
              <span className="text-sky-600 font-semibold">
                {data?.applicationCount}
              </span>
              <span className="text-gray-500">{t("Applications")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaProposalList;
