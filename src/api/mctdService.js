import {
  UPDATE_EXPERT,
  CREATE_PROPOSAL,
  GET_PROPOSAL,
  GET_PROPOSALS_APPS,
  GET_PROPOSAL_DETAILS,
  DELETE_EXPERT,
  UPLOAD_FILE,
  START_EVALUATION,
  CREATE_USER,
  QUESTIONS_BY_CATEGORY,
  GET_FORM_FIELD,
  GET_APPLICATION_DETAILS,
  UPLOAD_MULTIPLE_FILES,
} from "../config/apiRoutes";
import api from "./api";

//************Api's Updated start  from here*/******* */
// Get Dashboard data
export const getDashboardStats = async () => {
  try {
    const [dashboardResponse, graphResponse] = await Promise.all([
      api.get("dashboard"),
      api.get("dashboard/graph"),
    ]);

    return {
      dashboard: dashboardResponse,
      graph: graphResponse,
    };
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
export const getAllReports = async (selectedId = "") => {
  try {
    const response = await api.get(
      `reports/application?programeId=${selectedId}`
    );
    console.log(response);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went Wrong!");
  }
};

// MCTD POST API => CREATE-New User
export const CreateNewUser = async (userData) => {
  try {
    const response = await api.post("users/create", userData);
    return response.data;
  } catch (err) {
    throw new Error(err?.message || "Something went wrong!");
  }
};
// MCTD UPDATE API => UPDATE-User
export const UpdateUser = async (updatedata) => {
  const { id, updtData } = updatedata;
  try {
    const response = await api.put(`users/${id}`, updtData);
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message || "Something went wrong!");
  }
};

// MCTD DELETE API => DELETE-User
export const DeleteUser = async (id) => {
  try {
    const response = await api.delete(`users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response);
  }
};
export const UpdateProfile = async (userData) => {
  try {
    const response = await api.post("users/update-profile", userData);
    return response.user;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
export const UpdatePassword = async (formdata) => {
  try {
    const response = await api.post("users/update-password", formdata);
    return response;
  } catch (err) {
    throw new Error(err.message || "Something went wrong!");
  }
};

// MCTD GET API => Get User by stage and Role
export const getExpertByStageId = async (evaluator, stage = "", search) => {
  try {
    const route = stage
      ? `users?role=${evaluator}&stage=${stage}&search=${search}`
      : `users?role=${evaluator}&search=${search}`;
    const response = await api.get(route);

    return response.users;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went Wrong!");
  }
};
//  MCTD GET API => Get All Form-Fields
export const getAllFormFields = async () => {
  try {
    const response = await api.get(GET_FORM_FIELD);
    return response.fields;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};

// Update Question
export const UpdateQuestion = async (updatedata) => {
  const { id, data } = updatedata;

  try {
    const response = await api.put(`questions/${id}`, data);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
// Delete Question
export const DeleteQuestion = async (id) => {
  try {
    const response = await api.delete(`questions/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
// Muncipality GET API => get Application details
export const getApplicationDetailsById = async (applicationId) => {
  try {
    const response = await api.get(GET_APPLICATION_DETAILS + applicationId);
    return response;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went Wrong!");
  }
};
// MCTD GET API => all proposals by status query parameter
export const getProposalsByStatus = async (status, search) => {
  try {
    const response = await api.get(
      `${GET_PROPOSAL}?status=${status}&search=${search}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
// MCTD GET API => applications against each proposal
export const getApplicationsAgainstProposal = async (
  programmeId,
  search = ""
) => {
  try {
    const response = await api.get(
      `programs/applications/${programmeId}?search=${search}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};

// MCTD GET API => proposal details
export const getProposalDetails = async (programmeId) => {
  try {
    const response = await api.get(GET_PROPOSAL_DETAILS + programmeId);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};

//************Api's Updated end here*/******* */

// MCTD POST API => add new programme
export const createNewProposal = async (proposalsData) => {
  try {
    const response = await api.post(CREATE_PROPOSAL, proposalsData);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};

// MCTD POST API => start evaluation proces
export const startEvaluationProcess = async (programId) => {
  console.log("object", programId);
  try {
    const response = await api.get(`programs/start-evaluations/${programId}`);
    console.log("res", response);
    return response.data;
  } catch (error) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
// MCTD Put API => Close Proposal;
export const closeProposalProcess = async (data) => {
  try {
    const response = await api.put(`programs/update-status/`, data);
    console.log("res", response);
    return response;
  } catch (error) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
// MCTD DELETE API => Delete Proposal
export const deleteProposal = async (programId) => {
  try {
    const response = await api.delete(`programs/delete/${programId}`);
    console.log("res", response);
    return response.data;
  } catch (error) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};

// POST API => File Upload
export const uploadFile = async ({ formData, name }) => {
  try {
    const response = await api.post(UPLOAD_FILE, formData);
    return { url: response?.url, name };
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};

export const uploadMultipleFiles = async (files) => {
  try {
    const response = await api.post(UPLOAD_MULTIPLE_FILES, files);
    return response.urls;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};

//  GET API => Get All Muncipility User
export const getAllMuncipilityUsers = async () => {
  try {
    const response = await api.get("users");
    return response.users;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
// MCTD POST API => CREATE-EXPERT
export const CreateNewMuncipility = async (munData) => {
  try {
    const response = await api.post("users/create", munData);
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};

// ***********************New Api Start from here**************
// MCTD POST API => CREATE-Question
export const CreateNewQuestion = async (data) => {
  try {
    const response = await api.post("questions/create", data);
    return response.question;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};

//  GET API => Get All Questions
export const getAllQuestions = async (search) => {
  try {
    const response = await api.get(`questions?search=${search}`);
    return response.questions;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};

//  GET API => Get All Questions
export const getQuestionsByCategory = async () => {
  try {
    const response = await api.get(QUESTIONS_BY_CATEGORY);
    return response.questions;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
//  GET API => Get Summary OF Application
export const summaryAgainstApplicationId = async (applicationId, status) => {
  try {
    const response = await api.get(
      `applications/summaryReport/${applicationId}/${status}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};

// applications/summaryReport/653b7dc10e2025146779ef27
