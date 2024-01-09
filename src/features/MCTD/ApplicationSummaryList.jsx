import { useTranslation } from "react-i18next";
import { Status } from "../../components";

const ApplicationSummaryList = ({ data }) => {
  const list = data.map((item) => <SummaryItem key={item.id} item={item} />);
  return <div className="divide-y divide-gray-200">{list}</div>;
};

const SummaryItem = ({ item }) => {
  //translation hook
  const { t } = useTranslation();
  return (
    <div className="py-3 flex items-start flex-col-reverse gap-2 md:flex-row md:justify-between">
      <div className="space-y-1">
        <h3 className="text-black font-medium">{item.question}</h3>
        <div className="flex items-start gap-2">
          <span className="text-black">{t("Remarks:")}</span>
          <span className="text-gray-400">{item.remarks}</span>
        </div>
      </div>
      <Status status={item.status} />
    </div>
  );
};

export default ApplicationSummaryList;
