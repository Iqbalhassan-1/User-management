import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllEvaCorrectionApps } from "../../api/evaService";
import {
  LoadingItemPlaceholder,
  NoDataAvailable,
  Status,
} from "../../components";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../utils/utils";

const CorrectionEvaApplications = () => {
  const { id } = useParams();
  // get application againt proposals id
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-All-Correction-Applications", id],
    queryFn: () => getAllEvaCorrectionApps(id),
  });

  if (isLoading) {
    return <LoadingItemPlaceholder />;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  return <EvaApplicationsList data={data?.applications} />;
};

const EvaApplicationsList = ({ data = [] }) => {
  const status = data?.[0]?.stage1_status;

  return (
    <div className="bg-white divide-y divide-gray-200 rounded-b-lg">
      {data?.length > 0 ? (
        data?.map((appsItem) => (
          <ApplicationItem
            data={appsItem}
            currentStatus={status}
            key={appsItem?._id}
          />
        ))
      ) : (
        <NoDataAvailable />
      )}
    </div>
  );
};

const ApplicationItem = ({ data, currentStatus }) => {
  //translatio hook
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

export default CorrectionEvaApplications;
