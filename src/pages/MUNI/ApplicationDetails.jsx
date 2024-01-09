import React from "react";
import {
  Accordian,
  Breadcrumb,
  Card,
  LoadingItemPlaceholder,
  SectionTitle,
  Wrapper,
} from "../../components";
import { Info } from "../../features/MCTD";
import { useParams } from "react-router-dom";
import { getApplicationDetailsById } from "../../api/mctdService";
import { useQuery } from "@tanstack/react-query";
import {
  extractFileName,
  formatDate,
  handleFileDownload,
  ROLES,
} from "../../utils/utils";
import { MdDownload } from "react-icons/md";
import BuildingDetails from "../MCTD/BuildingDetails";
import useAuthContext from "../../utils/hooks/useAuthContext";
import { useTranslation } from "react-i18next";

const ApplicationDetails = () => {
  //translation hook
  const { t } = useTranslation();
  const { applicationId } = useParams();
  const { user } = useAuthContext();

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["get-applicationbyId", applicationId],
    queryFn: () => getApplicationDetailsById(applicationId),
  });

  const isEva = user?.role === ROLES.EVA;

  if (isLoading) {
    return <LoadingItemPlaceholder />;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  return (
    <Wrapper className="space-y-3 px-0 lg:px-2">
      {!isEva && (
        <Breadcrumb>
          <SectionTitle>{t("Application Details")}</SectionTitle>
        </Breadcrumb>
      )}
      <Card className="space-y-4">
        <ApplicationHeader appsItem={data} />
        <MunicipalityInfo appsItem={data?.muncipality_info} />
        <Representative appsItem={data?.representative_detail} />
        <GeneralCharBuilding appsItem={data?.general_characteristics} />
        <OwnerShip appsItem={data?.ownership} />
        <BuildingInformation appsItem={data?.buildings} />
        <AdditionalDocuments appsItem={data?.documents} />
      </Card>
    </Wrapper>
  );
};

const ApplicationHeader = ({ appsItem }) => {
  //translation hook
  const { t } = useTranslation();

  return (
    <>
      <div className="flex-1 pb-3 border-b">
        {/* <h2 className="heading-secondary">{appsItem?.programId?.title}</h2> */}
        <Info>
          <Info.Type>{t("Call for Proposal")}:</Info.Type>
          <Info.Value>{appsItem?.programId?.title}</Info.Value>
        </Info>
        <Info>
          <Info.Type>{t("Reference No")}:</Info.Type>
          <Info.Value>{appsItem?.programId?.reference_no}</Info.Value>
        </Info>
      </div>
      <div className="space-y-2">
        {/* <h2 className="heading-secondary">
          {appsItem?.muncipality_info?.name}
        </h2> */}
        <Info>
          <Info.Type>{t("Application")}:</Info.Type>
          <Info.Value>{appsItem?.muncipality_info?.name}</Info.Value>
        </Info>
        <Info>
          <Info.Type>{t("Reference No")}:</Info.Type>
          <Info.Value>{appsItem?.projectNumber}</Info.Value>
        </Info>
        <Info>
          <Info.Type>{t("Status")}:</Info.Type>
          <Info.ValueAsStatus status={appsItem?.status} />
        </Info>
        <Info>
          <Info.Type>{t("Publish on")}:</Info.Type>
          <Info.Value>{formatDate(appsItem?.createdAt)}</Info.Value>
        </Info>
        <Info>
          <Info.Type>{t("Deadline")}:</Info.Type>
          <Info.Value>{formatDate(appsItem?.updatedAt)}</Info.Value>
        </Info>
      </div>
    </>
  );
};

const MunicipalityInfo = ({ appsItem }) => {
  //translation hook
  const { t } = useTranslation();

  return (
    <>
      <SectionTitle>{t("Municipality Information")}</SectionTitle>
      <div className="space-y-2">
        <div>
          <h3>
            {t(
              "Name of Municipality/ Territorial hromdas/ Regional administration/Regional council"
            )}
          </h3>
          <span className="text-gray-500">{appsItem?.name}</span>
        </div>
        <div>
          <h3>{t("Total no. of Inhabitants as of 1st February 2022")}</h3>
          <span className="text-gray-500">
            {appsItem?.total_no_inhabitants}
          </span>
        </div>
        <div>
          <h3>{t("Total no. of IDPs")}</h3>
          <span className="text-gray-500">{appsItem?.total_no_idps}</span>
        </div>
        <div>
          <h3>{t("Share of IDPs in % of Total Population")}</h3>
          <span className="text-gray-500">
            {appsItem?.share_ipds_total_population}
          </span>
        </div>
      </div>
    </>
  );
};

const Representative = ({ appsItem }) => {
  //translation hook
  const { t } = useTranslation();

  return (
    <>
      <SectionTitle>{t("Representative")}</SectionTitle>
      <div className="space-y-2">
        <div>
          <h3>{t("Full Name")}</h3>
          <span className="text-gray-500">{appsItem?.full_name}</span>
        </div>
        <div>
          <h3>{t("Email")}</h3>
          <span className="text-gray-500">{appsItem?.email}</span>
        </div>
        <div>
          <h3>{t("Telephone")}</h3>
          <span className="text-gray-500">{appsItem?.telephone}</span>
        </div>
        <div>
          <h3>{t("Address")}</h3>
          <span className="text-gray-500">{appsItem?.address}</span>
        </div>
      </div>
    </>
  );
};

const GeneralCharBuilding = ({ appsItem }) => {
  //translation hook
  const { t } = useTranslation();
  return (
    <>
      <SectionTitle>
        {t("General Characteristics of Building in Municipality")}
      </SectionTitle>
      <div className="space-y-2">
        <div>
          <h3>{t("No of Public Buildings for Thermal Modernization")}</h3>
          <span className="text-gray-500">
            {appsItem?.no_of_public_building}
          </span>
        </div>
        <div>
          <h3>{t("Share of IDP’s in User of Public Services")}</h3>
          <span className="text-gray-500">{appsItem?.share_idps}</span>
        </div>
        <div>
          <h3>{t("Prior experience in implementing investment projects")}</h3>
          <span className="text-gray-500">
            {appsItem?.cost_of_perior_investment}
          </span>
        </div>
        <div>
          <h3>
            {t(
              "Results of prior investment projects (with local or international funding)"
            )}
          </h3>
          <span className="text-gray-500">{appsItem?.perior_experience}</span>
        </div>
      </div>
    </>
  );
};

const OwnerShip = ({ appsItem }) => {
  //transation hook
  const { t } = useTranslation();

  return (
    <>
      <SectionTitle>
        {t("Ownership (% of privately and municipality owned)")}
      </SectionTitle>
      <div className="space-y-2">
        <div>
          <h3>{t("Privately owned")}</h3>
          <span className="text-gray-500">{appsItem?.privately_ownerd}</span>
        </div>
        <div>
          <h3>{t("Publicly owned")}</h3>
          <span className="text-gray-500">{appsItem?.public_ownerd}</span>
        </div>
        <div>
          <h3>{t("Established Year")}</h3>
          <span className="text-gray-500">{appsItem?.established_year}</span>
        </div>
      </div>
      {/* <div className="grid grid-cols-16 gap-3"> */}
      <SectionTitle>{t("Final Beneficiary Guarantee Letter")}</SectionTitle>
      <FileComponent file={appsItem?.enery_efficiency_certificate_file} />
      <SectionTitle>
        {t(
          "Improvement of Public Service Delivery, Social Enterprise Development"
        )}
      </SectionTitle>
      <FileComponent file={appsItem?.final_beneficary_gurantee_letter_file} />
      <SectionTitle>{t("Energy Efficiency Certificate")}</SectionTitle>
      <FileComponent file={appsItem?.improvement_public_service_deivery_file} />
      {/* </div> */}
    </>
  );
};

const AdditionalDocuments = ({ appsItem }) => {
  //translation hook
  const { t } = useTranslation();
  const {
    fesibility_design_file,
    balance_sheet_file,
    financial_result_file,
    guarantees_by_municipality_file,
    decision_of_city_council_file,
    technical_report_file,
  } = appsItem;

  return (
    <>
      <SectionTitle>{t("Additional Documents")}</SectionTitle>
      {/* <div className="grid grid-cols-16 gap-3"> */}
      <SectionTitle>{t("Feasibility Design")}</SectionTitle>
      <FileComponent file={fesibility_design_file} />
      <SectionTitle>{t("Balance Sheet")}</SectionTitle>
      <FileComponent file={balance_sheet_file} />
      <SectionTitle>{t("Financial Results")}</SectionTitle>
      <FileComponent file={financial_result_file} />
      <SectionTitle>{t("Guarantees by Municipal")}</SectionTitle>
      <FileComponent file={guarantees_by_municipality_file} />
      <SectionTitle>{t("Decision of City Council")}</SectionTitle>
      <FileComponent file={decision_of_city_council_file} />
      <SectionTitle>
        {t("Technical Report of Inspection and Assessments")}
      </SectionTitle>
      <FileComponent file={technical_report_file} />
      {/* </div> */}
    </>
  );
};

const BuildingInformation = ({ appsItem }) => {
  //translation hook
  const { t } = useTranslation();

  return (
    <>
      <SectionTitle>{t("Sub-project Information")}</SectionTitle>
      {appsItem?.map((building, index) => (
        <BuildingDetails
          building={building}
          key={building?._id}
          index={index}
        />
      ))}
    </>
  );
};

const FileComponent = ({ file }) => {
  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  if (!isValidURL(file)) {
    return null; // If the URL is not valid, return nothing
  }

  return (
    // <SectionTitle>Technical Design</SectionTitle>

    <div className="p-4 bg-white border border-gray-200 rounded-md flex-3">
      <div className="flex-btw gap-5 w-full">
        <div>
          <h3 className="text-normal text-black font-medium leading-tight">
            {extractFileName(file)}
          </h3>
          {/* <span className="text-gray-500">0.8 MB</span> */}
        </div>
        <button type="button" onClick={() => handleFileDownload(file)}>
          <MdDownload size={24} className="text-sky-600" />
        </button>
      </div>
    </div>
  );
};

export default ApplicationDetails;
