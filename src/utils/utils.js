import { BASE_URL } from "../config/apiRoutes";
import * as XLSX from "xlsx";

export const ROLES = {
  MCTD: "MCTD",
  MUNI: "Municipality",
  MOI: "MOI",
  EVA: "Evaluator",
};

export const status = [
  "Open",
  "Under Evaluations",
  "Approved",
  "Correction",
  "Rejected",
  "Closed",
];

export const createRequiredValidation = (errMsg) => {
  if (errMsg) {
    return { required: errMsg };
  }
};

export const validations = {
  emailValidation: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  },
  passwordStrength: {
    required: "Password is required",
    pattern: {
      value: /^(?=.*[A-Za-z\d])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message:
        "Password must be at least 8 characters and contain at least 1 special character",
    },
  },
  passwordValidations: { required: "Password is required" },
  minLength: {
    value: 6,
    message: "Please enter a minimum of 6 characters",
  },
  maxLength: {
    value: 25,
    message: "characters should not be greater then 25",
  },
  maxValue: {
    value: 25,
    message: "characters should not be greater then 25",
  },
};

// Make File name better
export const extractFileName = (url) => {
  const fileNameWithNumbers = url?.match(/\/files\/([^/]+)$/)?.[1];
  const fileNameWithoutNumbers = fileNameWithNumbers?.replace(/\d+/g, "");
  return fileNameWithoutNumbers;
};

// export const getFileName = (url) => {
//   const urlParts = url?.split("/");
//   const fileName = urlParts[urlParts?.length - 1];
//   return fileName;
// };

// export const getFileType = (url) => {
//   const fileType = url?.split(".")?.pop()?.toLowerCase();
//   return fileType;
// };

// TODO: Date Formater
// Formate Date 2-12-2023
export const formateDateInDigit = (dateStr) => {
  if (dateStr) {
    const date = new Date(dateStr);
    const formattedDate = new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    })
      .format(date)
      .replace(/\//g, "-");
    return formattedDate;
  }
  return "";
};

// Format Date Jul 11, 2023
export const formatDate = (dateStr) => {
  if (dateStr) {
    const date = new Date(dateStr);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate;
  }
  return "";
};

// Download file
export const handleFileDownload = (file) => {
  // const fileUrl = `${BASE_URL}${file}`;

  // Create a temporary anchor element
  const downloadLink = document.createElement("a");
  downloadLink.href = file;

  // Set the "download" attribute to force the file download with a custom filename
  downloadLink.setAttribute("download", file);
  downloadLink.setAttribute("target", "_blank");

  // Append the anchor element to the body and click it programmatically
  document.body.appendChild(downloadLink);
  downloadLink.click();

  // Remove the anchor element from the DOM
  document.body.removeChild(downloadLink);
};

export const generateExcel = (data) => {
  const { dashboard } = data;

  // Define headers for the Excel sheet
  const headers = [
    "Year",
    "Evaluators",
    "Municipality",
    "Totalfunds",
    "Applications",
    "Approvedapplication",
    "Approvedbuilding",
    "Pendingapplication",
    "Rejectedapplication",
  ];

  // Combine data from different sources into a single array of objects
  const combinedData = [
    headers, // First row contains headers
    [
      new Date().getFullYear(),
      dashboard.evaluators || "",
      dashboard.muncipalities || "",
      dashboard.totalfund || "",
      dashboard.applications || "",
      dashboard.approvedapplication || "",
      dashboard.approvedbuilding || "",
      dashboard.pendingapplication || "",
      dashboard.rejectedapplication || "",
    ],
  ];

  // Create an Excel worksheet from the combined data
  const worksheet = XLSX.utils.aoa_to_sheet(combinedData);

  // Create a new Excel workbook
  const workbook = XLSX.utils.book_new();

  // Append the worksheet to the workbook with a given name ("Sheet1" in this case)
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Write the workbook to a file with the specified filename ("report.xlsx" in this case)
  XLSX.writeFile(workbook, `report-date-${new Date().getDate()}.xlsx`);
};
