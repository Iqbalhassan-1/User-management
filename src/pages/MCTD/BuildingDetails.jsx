import React from "react";
import { MdDownload } from "react-icons/md";
import { Accordian, SectionTitle } from "../../components";
import { extractFileName, handleFileDownload } from "../../utils/utils";
import { useTranslation } from "react-i18next";

const BuildingDetails = ({ building, index }) => {
  //translation hook
  const { t } = useTranslation();
  return (
    <Accordian accordianTitle={`Sub-project ${index + 1}: ${building?.name}`}>
      <div className="min-h-0 bg-white rounded-b-md">
        <div className="px-3 space-y-3 py-3">
          <div className="space-y-3">
            <div>
              <h3>{t("Sub-project Name")}</h3>
              <span className="text-gray-500">{building?.name}</span>
            </div>
            <div>
              <h3>{t("Sub-project Owner (Municipality or Other)")}</h3>
              <span className="text-gray-500">{building?.owner_number}</span>
            </div>
            <div>
              <h3>{t("Sub-project Address")}</h3>
              <span className="text-gray-500">{building?.address}</span>
            </div>
            <div>
              <h3>{t("Latitude")}</h3>
              <span className="text-gray-500">{building?.latitude}</span>
            </div>
            <div>
              <h3>{t("Longitude")}</h3>
              <span className="text-gray-500">{building?.longitude}</span>
            </div>
            <div>
              <h3>
                {t("War Damages (% of War Damages Cost/ Sub-project Cost)")}
              </h3>
              <span className="text-gray-500">{building?.war_damages}</span>
            </div>
            <div>
              <h3>
                {t(`Characteristics of the Heat System in Use (energy sources and
                their efficiency)`)}
              </h3>
              <span className="text-gray-500">
                {building?.characteristic_of_heat_system}
              </span>
            </div>
            <div>
              <h3>{t("Funding Requested From")}</h3>
              <span className="text-gray-500">
                {building?.funding_requested_form}
              </span>
            </div>
            <div>
              <h3>{t("Other Funding Sources (If applicable)")}</h3>
              <span className="text-gray-500">
                {building?.other_funcing_sources}
              </span>
            </div>
          </div>
          <SectionTitle>{t("Tariff for Energy")}</SectionTitle>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <h3>{t("Electricity")}</h3>
              <span className="text-gray-500">{building?.electicity}</span>
            </div>
            <div>
              <h3>{t("Heat")}</h3>
              <span className="text-gray-500">{building?.heat}</span>
            </div>
          </div>
          <SectionTitle>{t("Project Cost")}</SectionTitle>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <h3>{t("Administrative Cost")}</h3>
              <span className="text-gray-500">
                {building?.administrative_cost}
              </span>
            </div>
            <div>
              <h3>{t("Labor Cost")}</h3>
              <span className="text-gray-500">{building?.labor_cost}</span>
            </div>
            <div>
              <h3>{t("Overhead Cost")}</h3>
              <span className="text-gray-500">{building?.overhead_cost}</span>
            </div>
            <div>
              <h3>{t("Contigency Cost")}</h3>
              <span className="text-gray-500">{building?.contigency_cost}</span>
            </div>
          </div>
          <div>
            <h3>
              {t(
                "Description of the sub-project's current condition and refurbishment needs"
              )}
            </h3>
            <p className="text-gray-500">{building?.description}</p>
          </div>
          <div>
            <h3>{t("Purposed Refurbishment Activities")}</h3>
            <p className="text-gray-500">
              {building?.purpose_refurbishment_activity}
            </p>
          </div>
          <div>
            <h3>{t("Planned Timeline for the Refurbishment")}</h3>
            <p className="text-gray-500">{building?.planned_timeine}</p>
          </div>
          <SectionTitle>{t("Technical Design")}</SectionTitle>
          <FileComponent file={building?.technical_designs_document} />
          <SectionTitle>{t("Energy Audit")}</SectionTitle>
          <FileComponent file={building?.energy_audit_document} />
          <SectionTitle>{t("Public Use Confirmation")}</SectionTitle>
          <FileComponent file={building?.public_use_confirmation_document} />
          <SectionTitle>{t("Privatisation Status Confirmation")}</SectionTitle>
          <FileComponent file={building?.privatisation_confirmation_document} />
          <SectionTitle>
            {t("Concession-Rent-ESCO Agreement Status Confirmation")}
          </SectionTitle>
          <FileComponent file={building?.concession_rent_esco_document} />
          <SectionTitle>{t("Structural Survey")}</SectionTitle>
          <FileComponent file={building?.structural_survey_document} />
          <SectionTitle>
            {t("Ex-Post Energy Audit and EPC Confirmation")}
          </SectionTitle>
          <FileComponent file={building?.post_energy_audit_document} />
        </div>
      </div>
    </Accordian>
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

export default BuildingDetails;
