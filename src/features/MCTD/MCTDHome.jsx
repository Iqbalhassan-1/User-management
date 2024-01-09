import {
  Breadcrumb,
  Button,
  LoadingSpinner,
  SectionTitle,
  Wrapper,
} from "../../components";
import funds from "../../assets/funds.svg";
import Approved from "../../assets/Approved.svg";
import Pending from "../../assets/Pending.svg";
import Evaluator from "../../assets/dashboard-evaluator.svg";
import Municipality from "../../assets/dashboard-muni.svg";
import Chart from "react-google-charts";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../../api/mctdService";
import { generateExcel } from "../../utils/utils";
import { Link } from "react-router-dom";

const buildingsChartOptions = {
  chart: {
    title: "Buildings",
  },
  colors: ["#94B952", "#EC4D48"],
  // vAxis: {
  //   format: "#,##",
  // },
  // viewWindowMode: "explicit",
  // viewWindow: { min: 0, max: "auto" },
};
const applicationsChartOptions = {
  chart: {
    title: "Applications",
  },
  colors: ["#F29D02", "#94B952", "#EC4D48"],
  // vAxis: {
  //   format: "#",
  // },
  // viewWindowMode: "explicit",
  // viewWindow: { min: 0, max: "auto" },
};

const MCTDHome = () => {
  //translation hook
  const { t } = useTranslation();

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["get-dashboard-stats"],
    queryFn: () => getDashboardStats(),
  });
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  const { dashboard = {}, graph = {} } = data;

  return (
    <Wrapper className="space-y-6">
      <Breadcrumb>
        <div className="flex-btw">
          {/* <SectionTitle>{t("Dashboard")}</SectionTitle> */}
          <Button
            onClick={() => generateExcel(data)}
            size="sm"
            className="text-sm lg:text-base"
          >
            {t("Generate Reports")}
          </Button>
          <Link to={`/getReports`}>
            <Button variant="outline" size="md">
              {t("Get Reports")}
            </Button>
          </Link>
        </div>
      </Breadcrumb>
      <div className="grid grid-cols-16 gap-3">
        <div className="flex items-center justify-start gap-5 p-4 sm:p-5 bg-white rounded-lg shadow-sm">
          <img
            src={funds}
            alt="funds-icon"
            className="object-cover w-12 h-12"
          />
          <div className="flex flex-col">
            <p className="text-base text-gray-500 font-medium">
              {t("Approved Funds")}
            </p>
            <p className="text-3xl font-semibold flex items-center justify-start">
              <span className="text-gray-500 pr-1">€</span>
              <span>{dashboard?.totalfund}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-start gap-5 p-4 sm:p-5 bg-white rounded-lg shadow-sm">
          <img
            src={Municipality}
            alt="municipality-icon"
            className="object-cover w-12 h-12"
          />
          <div className="flex flex-col">
            <p className="text-base text-gray-500 font-medium">
              {t("Total Municipalities")}
            </p>
            <p className="text-3xl font-semibold">{dashboard?.muncipalities}</p>
          </div>
        </div>
        <div className="flex items-center justify-start gap-5 p-4 sm:p-5 bg-white rounded-lg shadow-sm">
          <img
            src={Evaluator}
            alt="evaluator-icon"
            className="object-cover w-12 h-12"
          />
          <div className="flex flex-col">
            <p className="text-base text-gray-500 font-medium">
              {t("Total Evaluators")}
            </p>
            <p className="text-3xl font-semibold">{dashboard?.evaluators}</p>
          </div>
        </div>
      </div>
      <TotalAPR data={dashboard} />
      <ChartBar data={graph} />
    </Wrapper>
  );
};

const TotalAPR = ({ data }) => {
  //translation hook
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-16 gap-5">
      {/* <div className="flex items-center justify-start gap-5 p-4 sm:p-5 bg-white rounded-lg shadow-sm">
        <img
          src={Pending}
          alt="pendig-icon"
          className="object-cover w-[1.875rem] h-7"
        />
        <div className="flex flex-col">
          <p className="text-3xl font-semibold">25</p>
          <p className="text-base text-gray-500 font-medium">
            {t("Pending Applications")}
          </p>
        </div>
      </div> */}
      <div className="flex items-center justify-start gap-5 p-4 sm:p-5 bg-white rounded-lg shadow-sm">
        <img
          src={Pending}
          alt="rejected-icon"
          className="object-cover w-12 h-12"
        />
        <div className="flex flex-col">
          <p className="text-base text-gray-500 font-medium">
            {t("Total Applications")}
          </p>
          <p className="text-3xl font-semibold">{data?.applications}</p>
        </div>
      </div>
      <div className="flex items-center justify-start gap-5 p-4 sm:p-5 bg-white rounded-lg shadow-sm">
        <img
          src={Approved}
          alt="approved-icon"
          className="object-cover w-12 h-12"
        />
        <div className="flex flex-col">
          <p className="text-base text-gray-500 font-medium">
            {t("Approved Applications")}
          </p>
          <p className="text-3xl font-semibold">{data?.approvedapplication}</p>
        </div>
      </div>

      {/* <div className="flex items-center justify-start gap-5 p-4 sm:p-5 bg-white rounded-lg shadow-sm">
        <img
          src={Rejected}
          alt="rejected-icon"
          className="object-cover w-[1.875rem] h-7"
        />
        <div className="flex flex-col">
          <p className="text-3xl font-semibold">25</p>
          <p className="text-base text-gray-500 font-medium">
            {t("Rejected Buildings")}
          </p>
        </div>
      </div> */}
      <div className="flex items-center justify-start gap-5 p-4 sm:p-5 bg-white rounded-lg shadow-sm">
        <img
          src={Approved}
          alt="approved-icon"
          className="object-cover w-12 h-12"
        />
        <div className="flex flex-col">
          <p className="text-base text-gray-500 font-medium">
            {t("Approved Buildings")}
          </p>
          <p className="text-3xl font-semibold">{data?.approvedbuilding}</p>
        </div>
      </div>
    </div>
  );
};

const ChartBar = ({ data }) => {
  return (
    // <div className="grid grid-cols-16 gap-5">
    <>
      <div className="bg-white rounded-lg p-4 w-full">
        <Chart
          chartType="Bar"
          width="100%"
          height="400px"
          data={data?.applications}
          options={applicationsChartOptions}
        />
      </div>
      <div className="bg-white rounded-lg p-4 w-full">
        <Chart
          chartType="Bar"
          width="100%"
          height="400px"
          data={data?.building}
          options={buildingsChartOptions}
        />
      </div>
      {/* // </div> */}
    </>
  );
};

export default MCTDHome;

/* <Breadcrumb>
        <div className="flex-btw">
          <SectionTitle>{t("Dashboard")}</SectionTitle>
          <div>
            <CustomSelect
              name="unit"
              register={register}
              errors={errors}
              fisrtOp="All Call For Proposals"
              isOptional
            >
              {option?.map((option) => (
                <option value={option}>{option}</option>
              ))}
            </CustomSelect>
          </div>
        </div>
      </Breadcrumb> */
