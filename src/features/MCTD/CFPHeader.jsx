import { Link, useParams } from "react-router-dom";
import { Button, Card, LoadingItemPlaceholder } from "../../components";
import Info from "./Info";
import { getProposalDetails } from "../../api/mctdService";
import { useQuery } from "@tanstack/react-query";
import { ROLES, formatDate } from "../../utils/utils";
import useAuthContext from "../../utils/hooks/useAuthContext";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const CFPHeader = ({ hasBtn }) => {
  //translation hook
  const { id } = useParams();
  const { t } = useTranslation();

  const { user } = useAuthContext();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-All-Programmes-Details", id],
    queryFn: () => getProposalDetails(id),
  });

  if (isLoading) {
    return <LoadingItemPlaceholder />;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  const isMunicipality = user?.role === ROLES.MUNI;
  const isMCTD = user?.role === ROLES.MCTD;

  return (
    <>
      <div className="flex justify-start md:justify-between flex-col gap-5 md:gap-0 md:flex-row">
        <div className="space-y-4 flex-1">
          <h1 className="heading-primary">{data?.title}</h1>
          <Info>
            <Info.Type>{t("Reference No")}:</Info.Type>
            <Info.Value>{data?.reference_no}</Info.Value>
          </Info>
          {isMCTD && (
            <Info>
              <Info.Type>{t("Status")}:</Info.Type>
              <Info.ValueAsStatus status={data?.status} />
            </Info>
          )}
          <Info>
            <Info.Type>{t("Publish on")}:</Info.Type>
            <Info.Value>{formatDate(data?.createdAt)}</Info.Value>
          </Info>
          <Info>
            <Info.Type>{t("Deadline")}:</Info.Type>
            <Info.Value>{formatDate(data?.lastDate)}</Info.Value>
          </Info>
        </div>
        {isMunicipality && (
          <CountDown data={{ lastDate: data?.lastDate, status: data.status }} />
        )}
      </div>
    </>
  );
};
const CountDown = ({ data }) => {
  const { id } = useParams();
  const { lastDate, status } = data;
  // Initialize state for days, hours, minutes, and seconds
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Calculate the time remaining
  const calculateTimeRemaining = () => {
    const now = new Date();
    const difference = new Date(lastDate) - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }
  };

  // Update the countdown every second
  useEffect(() => {
    const timer = setInterval(calculateTimeRemaining, 1000);

    // Cleanup the interval on unmount
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Initial calculation when the component mounts
    calculateTimeRemaining();
  }, [lastDate]);

  //translation hook
  const { t } = useTranslation();

  const isDeadlineEnded = new Date(lastDate) < new Date();

  return (
    <div className="flex flex-col items-start md:items-center space-y-3">
      <div className="text-start p-2 md:text-center border border-gray-100">
        <p className="text-gray-700 font-medium text-lg">
          {t("Deadline Countdown")}
        </p>
        <div className="flex items-center justify-start md:justify-center gap-2">
          <h3 className="flex items-center flex-col">
            <span
              className={`text-3xl font-semibold ${
                days < 2 ? "text-red-500" : "text-green-700"
              }`}
            >
              {days}
            </span>
            <span className="text-gray-500">{t("Days")}</span>
          </h3>
          <h3 className="flex items-center flex-col">
            <span
              className={`text-3xl font-semibold ${
                days < 2 ? "text-red-500" : "text-green-700"
              }`}
            >
              {hours}
            </span>
            <span className="text-gray-500">{t("Hours")}</span>
          </h3>
          <h3 className="flex items-center flex-col">
            <span
              className={`text-3xl font-semibold ${
                days < 2 ? "text-red-500" : "text-green-700"
              }`}
            >
              {minutes}
            </span>
            <span className="text-gray-500">{t("Minutes")}</span>
          </h3>
          <h3 className="flex items-center flex-col">
            <span
              className={`text-3xl font-semibold ${
                days < 2 ? "text-red-500" : "text-green-700"
              }`}
            >
              {seconds}
            </span>
            <span className="text-gray-500">{t("Seconds")}</span>
          </h3>
        </div>
      </div>
      {status === "Open" && !isDeadlineEnded && (
        <Link
          to={`/active-call-for-proposals/${id}/details/apply`}
          className="block w-[235px] md:w-full"
        >
          <Button
            variant="primary"
            size="md"
            className="w-full flex justify-center"
          >
            {t("Apply Now")}
          </Button>
        </Link>
      )}
    </div>
  );
};

export default CFPHeader;
