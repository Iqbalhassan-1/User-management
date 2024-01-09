import { MdDelete, MdEdit, MdMoreHoriz } from "react-icons/md";
import { Card, DebounceInput, Status } from "../../components";
import { memo } from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownList,
} from "../../components/UI/DropDown";
import { useTranslation } from "react-i18next";

const mockData = [
  {
    id: 1,
    question:
      "Sustainable Energy Fund for Public Infrastructure in Ukraine's Regions",
    status: "Open",
  },
  {
    id: 2,
    question:
      "Energy Efficiency Enhancement Fund for Public Buildings in Ukraine",
    status: "Eligibility Evaluator",
  },
  {
    id: 3,
    question:
      "Regional Energy Efficiency Fund for Sustainable  Development in Ukraine's Regions",
    status: "Quality and Relevance Evaluator",
  },
];

const TemplateList = () => {
  return (
    <Card className="p-0 sm:p-0 divide-y divide-gray-200 rounded-b-lg">
      <div className="p-4">
        <DebounceInput />
      </div>
      {mockData.map((details) => (
        <TemplateItem data={details} key={details.id} />
      ))}
    </Card>
  );
};

const TemplateItem = ({ data }) => {
  //translation hook
  const { t } = useTranslation();

  return (
    <div className="p-4 relative group hover:bg-sky-100 transition-all">
      <div className="flex items-start flex-col gap-6 md:flex-row justify-between">
        <div className="space-y-3 flex-1">
          <Link
            to="/call-for-proposals/1/details"
            className="text-black font-medium block group-hover:text-sky-600 hover:underline"
          >
            {t("California Air Resources Board (CARB)")}
          </Link>
          <p className="text-gray-500">Created by Craig Welton</p>
        </div>
        <div className="space-y-3 flex flex-col">
          <span className="text-sky-600 font-semibold">22 Jul, 2023</span>
          <span className="text-gray-500">Created on</span>
        </div>
        <div className="absolute top-3 right-3 md:static">
          <Dropdown>
            <DropdownButton className="bg-white rounded-full drop-shadow-lg p-2 border border-gray-100 focus:drop-shadow-md">
              <MdMoreHoriz size={24} />
            </DropdownButton>
            <DropdownList className="w-[10rem] right-0">
              <DropdownItem>
                <button className="px-4 py-2 text-left w-full">
                  {t("View Applications")}
                </button>
              </DropdownItem>
              <DropdownItem>
                <button className="px-4 py-2 text-left w-full">{t("Edit")}</button>
              </DropdownItem>
            </DropdownList>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default memo(TemplateList);

/*
<div className={`${styles.flexLeft} self-end`}>
              {values.map((value) => (
                <div
                  className={`${styles.flexLeft} bg-lightSlate p-2 rounded-md text-sm bump`}
                  aria-label="badge"
                  key={value}
                >
                  <span>{getTarget(partners, value)?.name}</span>
                  <button
                    className="text-sm text-slate-600"
                    onClick={() => removeSelectedPartner(value)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>

*/
