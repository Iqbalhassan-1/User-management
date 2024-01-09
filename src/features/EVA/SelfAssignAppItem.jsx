import { useTranslation } from "react-i18next";
import { formatDate } from "../../utils/utils";
import { Button } from "../../components";

const SelfAssignAppItem = ({ data, handleAssignApps }) => {
  //translation hook
  const { t } = useTranslation();

  return (
    <div className="p-4 relative group hover:bg-sky-100 transition-all">
      <div className="flex items-start flex-col gap-6 md:flex-row justify-between">
        <div className="space-y-5">
          <p className="text-gray-600">{data?.projectNumber}</p>
          <h3
            className="text-black font-medium block group-hover:text-sky-600
          hover:underline"
          >
            {data?.muncipality_info?.name}
          </h3>
          <p className="text-gray-500">
            {t("Submitted on")} {formatDate(data?.updatedAt)}
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          type="button"
          onClick={() => handleAssignApps(data?._id)}
        >
          {t("Self Assign")}
        </Button>
      </div>
    </div>
  );
};

/*

{isSelfAssign !== null ? (
            //  Todo: proposals/:id/applications/:applicationId
            <Link to={`/proposals/${id}/applications/${data?._id}`}>
              <Button
                variant="primary"
                size="sm"
                type="button"
                // onClick={() => handleAssignApps(data?._id)}
              >
                {t("Start Evaluations")}
              </Button>
            </Link>
          ) : (
*/

export default SelfAssignAppItem;
