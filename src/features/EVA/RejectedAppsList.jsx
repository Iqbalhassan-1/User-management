import { useTranslation } from "react-i18next";
import { NoDataAvailable, Status } from "../../components";
import useAuthContext from "../../utils/hooks/useAuthContext";
import { formatDate } from "../../utils/utils";
import { RejectedApplications } from "../../pages";

const RejectedAppsList = ({ data = [] }) => {
  const { user } = useAuthContext();

  const evaStatus = {
    "Eligibility Screening": data?.[0]?.stage1_status,
    "Initial Creditworthiness Assessment": data?.[0]?.stage2_status,
    "Quality and Relevance Screening": data?.[0]?.stage3_status,
    "Creditworthiness Assessment": data?.[0]?.stage4_status,
  };

  const currentStatus = evaStatus[user?.stage];

  return (
    <div className="bg-white divide-y divide-gray-200 rounded-b-lg">
      {data?.length > 0 ? (
        data?.map((appsItem) => (
          <ApplicationItem
            data={appsItem}
            key={appsItem?._id}
            currentStatus={currentStatus}
          />
        ))
      ) : (
        <NoDataAvailable />
      )}
    </div>
  );
};

const ApplicationItem = ({ data, currentStatus }) => {
  //translation hook
  const { t } = useTranslation();

  return (
    <div className="p-4 relative group hover:bg-sky-100 transition-all">
      <Status status={currentStatus} />
      <p className="text-gray-600 mt-3 mb-5">{data?.projectNumber}</p>
      <h3 className="text-black font-medium block mb-5">
        {data?.muncipality_info?.name}
      </h3>
      <p className="text-gray-500">
        {t("Submitted on")} {formatDate(data?.updatedAt)}
      </p>
    </div>
  );
};

export default RejectedAppsList;
