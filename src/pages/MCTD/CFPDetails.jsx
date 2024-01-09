import { FaFileDownload } from "react-icons/fa";
import {
  Breadcrumb,
  Card,
  LoadingItemPlaceholder,
  SectionTitle,
  Wrapper,
} from "../../components";
import { Link, useParams } from "react-router-dom";
import { MdDownload, MdPerson } from "react-icons/md";
import { docIcon, pdfIcon, xslIcon } from "../../assets";
import { CFPHeader } from "../../features/MCTD";
import { useQuery } from "@tanstack/react-query";
import { getProposalDetails } from "../../api/mctdService";
import { extractFileName, handleFileDownload } from "../../utils/utils";
import { useTranslation } from "react-i18next";

// Call for Proposal details
const CFPDetails = () => {
  const { id } = useParams();
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

  return (
    <Wrapper className="space-y-4">
      <Breadcrumb />
      {/* Details */}
      <Card className="space-y-7">
        <CFPHeader />
        <CFPDetailsDesc data={data} />
        <CFPDetailsFiles data={data?.documents} />
        <ContactPersonnel data={data} />
      </Card>
    </Wrapper>
  );
};

const CFPDetailsDesc = ({ data }) => {
  //transaltion hook
  const { t } = useTranslation();
  return (
    <div className="space-y-3">
      <SectionTitle>{t("Description")}</SectionTitle>
      <p className="text-gray-900">{data?.description}</p>
    </div>
  );
};

const CFPDetailsFiles = ({ data }) => {
  //translation hook
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      <SectionTitle>{t("Attachments")}</SectionTitle>
      <div className="flex flex-wrap gap-3">
        {data?.length > 0
          ? data.map((file, index) => (
              <button
                className="flex-btw gap-5 p-3 bg-white border border-gray-200 rounded-md"
                key={index}
                onClick={() => handleFileDownload(file)}
              >
                <h3 className="text-normal text-black font-medium leading-tight">
                  {extractFileName(file)}
                </h3>
                <MdDownload size={24} className="text-sky-600" />
              </button>
            ))
          : ""}
      </div>
    </div>
  );
};

const ContactPersonnel = ({ data }) => {
  return (
    <div className="space-y-3">
      <SectionTitle>Contact Personnel</SectionTitle>
      <div className="flex flex-wrap divide-x divide-gray-200">
        {data?.contact?.map((user) => (
          <div className="flex items-start gap-2 px-2 sm:px-3" key={user?._id}>
            <MdPerson size={24} className="text-gray-500" />
            <div>
              <h3 className="font-medium text-black">{user?.name}</h3>
              {/* Email */}
              <Link
                to={`mailto:${user?.email}`}
                rel="noreferrer"
                target="_blank"
                className="block text-sky-600 font-medium underline mt-1"
              >
                {user?.email}
              </Link>
              {/* Phone */}
              <Link
                to={`tel:${user?.phone}`}
                rel="noreferrer"
                target="_blank"
                className="block text-sky-600 font-medium underline"
              >
                {user?.phone}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CFPDetails;
