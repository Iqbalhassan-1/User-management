import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, NoDataAvailable, Status } from "../../components";
import { formatDate } from "../../utils/utils";
import toast from "react-hot-toast";
import { selfAssignApps } from "../../api/evaService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const EvaApplicationsList = ({ data }) => {
  return (
    <div className="bg-white divide-y divide-gray-200 rounded-b-lg">
      {data?.applications?.length > 0 ? (
        data?.applications?.map((appsItem) => (
          <ApplicationItem data={appsItem} key={appsItem?._id} />
        ))
      ) : (
        <NoDataAvailable />
      )}
    </div>
  );
};

const ApplicationItem = ({ data }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  //translation hook
  const { t } = useTranslation();

  // /proposals/${id}/applications/${data?._id}
  const handleStartEva = () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to start evaluation?"
    );
    if (userConfirmed) {
      navigate(`/proposals/${id}/applications/${data?._id}`, { replace: true });
      return;
    }
    return;
  };

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
            Submitted on {formatDate(data?.updatedAt)}
          </p>
        </div>

        {/* <Link to={`/proposals/${id}/applications/${data?._id}`}> */}
        <Button
          variant="primary"
          size="sm"
          type="button"
          onClick={handleStartEva}
        >
          {t("Start Evaluation")}
        </Button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default EvaApplicationsList;
