import { useTranslation } from "react-i18next";

const NoDataAvailable = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white py-8 px-4 w-full rounded-b-lg">
      <p className="text-gray-600 text-lg font-medium">{t("No data available")}</p>
    </div>
  );
};

export default NoDataAvailable;
