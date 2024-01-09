import { useQuery } from "@tanstack/react-query";
import { getApplicationByStatus } from "../../api/muniService";
import ApplicationItem from "../../features/MCTD/ApplicationItem";
import { LoadingItemPlaceholder, NoDataAvailable } from "../../components";
import { useTranslation } from "react-i18next";

const UnderReviewApplications = () => {
  //translation hook
  const { t } = useTranslation();

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["get-all-applications", "Under Evaluations"],
    queryFn: () => getApplicationByStatus("Under Evaluations"),
  });

  if (isLoading) {
    return <LoadingItemPlaceholder />;
  }
  if (isError) {
    return <p>{error?.message}</p>;
  }

  return (
    <div className="bg-white divide-y divide-gray-200 rounded-b-lg">
      {data?.length > 0 ? (
        data?.map((appsItem) => (
          <ApplicationItem data={appsItem} key={appsItem?._id} />
        ))
      ) : (
        <NoDataAvailable />
        // <p>{t("No Applications")}</p>
      )}
    </div>
  );
};

export default UnderReviewApplications;
