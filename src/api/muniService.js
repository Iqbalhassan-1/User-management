import {
  APPLICATION_CORRECTION_FIELDS,
  APPLICATIONS_BY_STATUS,
  GET_APPLICATION_DETAILS,
  // GET_DRAFT_APPLICATIONS_MUNCIPALITY,
  // GET_DRAFT_APPLICATION_FIELDS,
  SUBMIT_CORRECTION_FORM,
  ADD_BUILDING,
  GET_BUILDINGS,
  UPDATE_BUILDING,
  DELETE_BUILDING,
} from "../config/apiRoutes";
import api from "./api";

// Muncipality POST API => Create Appliction against proposal
const createNewApplication = async (applicationData) => {
  try {
    const response = await api.post("applications/create", applicationData);
    return response;
  } catch (err) {
    throw new Error(err?.message || err?.message || "Something went wrong!");
  }
};

const checkAssessmentStatus = async (data) => {
  try {
    const response = await api.post("selfassessment/view-status", data);
    return response;
  } catch (err) {
    throw new Error(err?.message || err?.message || "Something went wrong!");
  }
};

const addSelfAssessmentData = async (data) => {
  try {
    const response = await api.post("selfassessment/submit", data);
    return response;
  } catch (err) {
    throw new Error(err?.message || err?.message || "Something went wrong!");
  }
};

const addNewAppBuilding = async (buildingData) => {
  try {
    const response = await api.post(ADD_BUILDING, buildingData);
    return response;
  } catch (err) {
    throw new Error(
      err.response?.data.message || err?.message || "Something went wrong!"
    );
  }
};

const updtAppBuilding = async ({ id, buildingData }) => {
  try {
    const response = await api.put(UPDATE_BUILDING + id, buildingData);
    return response;
  } catch (err) {
    throw new Error(
      err.response?.data.message || err?.message || "Something went wrong!"
    );
  }
};

const deleteAppBuilding = async (id) => {
  try {
    const response = await api.delete(DELETE_BUILDING + id);
    return response;
  } catch (err) {
    throw new Error(
      err.response?.data.message || err?.message || "Something went wrong!"
    );
  }
};

const getAppBuildingById = async (applicationId) => {
  try {
    const response = await api.get(GET_BUILDINGS + applicationId);
    return response;
  } catch (err) {
    throw new Error(
      err.response?.data.message || err?.message || "Something went wrong!"
    );
  }
};

// Muncipality GET API => get submitted applications
const getApplicationByStatus = async (status) => {
  try {
    const response = await api.get(
      `applications/my-applications?status=${status}`
    );
    return response;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went Wrong!");
  }
};

// Muncipality GET API => get submitted applications
const getDraftApplications = async () => {
  try {
    const response = await api.get(GET_DRAFT_APPLICATIONS_MUNCIPALITY);
    return response;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went Wrong!");
  }
};

// Muncipality GET API => get Application fields
const getDraftApplicationFieldsById = async (programId) => {
  try {
    const response = await api.get(GET_DRAFT_APPLICATION_FIELDS + programId);
    return response;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went Wrong!");
  }
};

// Muncipality GET API => get Application details
const getApplicationDetailsById = async (applicationId) => {
  try {
    const response = await api.get(GET_APPLICATION_DETAILS + applicationId);
    return response;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went Wrong!");
  }
};

// Muncipality GET API => Application Correction
const getMunAPPCorrFields = async (id) => {
  try {
    const response = await api.get(APPLICATION_CORRECTION_FIELDS + id);
    return response.data;
  } catch (err) {
    throw new Error(
      err.response?.data.message || err?.message || "Something went wrong!"
    );
  }
};

// Muncipality POST API => Application Correction
const munCorrectedFields = async (correctionData) => {
  try {
    const response = await api.post(
      SUBMIT_CORRECTION_FORM + correctionData.id,
      correctionData
    );
    return response.data;
  } catch (err) {
    throw new Error(
      err.response?.data.message || err?.message || "Something went wrong!"
    );
  }
};

export {
  addNewAppBuilding,
  checkAssessmentStatus,
  addSelfAssessmentData,
  getAppBuildingById,
  createNewApplication,
  getApplicationByStatus,
  getDraftApplicationFieldsById,
  getApplicationDetailsById,
  getDraftApplications,
  getMunAPPCorrFields,
  munCorrectedFields,
  updtAppBuilding,
  deleteAppBuilding,
};
