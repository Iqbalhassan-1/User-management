import {
  ASSIGN_EXPERT,
  GET_EVA_PROGRAMMES,
  GET_EXPERT_Appplications,
} from "../config/apiRoutes";
import api from "./api";

// GET EXPERTS => ALL ALL PROGRAMMES
export const getAllEvaProgrammes = async (search) => {
  // Api-Updated-New
  try {
    const response = await api.get(
      `programs/under-evaluations?search=${search}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err?.message || "Something went wrong!");
  }
};

// GET APPLICATIONS => All APPLICATIONS EACH PROGRAMME
export const getAllEvaApplications = async (programmeId) => {
  try {
    const response = await api.get(
      `applications/evaluators-applications/${programmeId}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err?.message || "Something went wrong!");
  }
};
// GET APPLICATIONS => All ASSIGNED APPLICATIONS EACH PROGRAMME
export const getAllEvaAssignApps = async (programmeId) => {
  try {
    const response = await api.get(
      `evaluators/applications/my-assigned/${programmeId}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};

// GET APPLICATIONS => All COMPLETED APPLICATIONS EACH PROGRAMME
export const getAllEvaCompletedApps = async (programmeId) => {
  try {
    const response = await api.get(
      `evaluators/applications/my-completed/${programmeId}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};

// GET APPLICATIONS => All COMPLETED APPLICATIONS EACH PROGRAMME
export const getApplicationsCount = async (programmeId) => {
  try {
    const response = await api.get(`programs/get-counts/${programmeId}`);
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
// GET APPLICATIONS => All Correction APPLICATIONS EACH PROGRAMME
export const getAllEvaCorrectionApps = async (programmeId) => {
  try {
    const response = await api.get(
      `evaluators/applications/my-correction/${programmeId}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err?.message || "Something went wrong!");
  }
};
// GET APPLICATIONS => All Rejected APPLICATIONS EACH PROGRAMME
export const getAllEvaRejectedApps = async (programmeId) => {
  try {
    const response = await api.get(
      `evaluators/applications/my-rejected/${programmeId}`
    );
    return response.data;
  } catch (err) {
    throw new Error(err?.message || "Something went wrong!");
  }
};

// EVALUATOR GET API => assign Apps to self
export const selfAssignApps = async (data) => {
  try {
    const response = await api.post(
      `evaluators/applications/self-assign`,
      data
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message || "Something went wrong!");
  }
};

// EVALUATOR GET API => All Application Assign to expert
export const getAllAssignProjects = async (evaluatorId) => {
  // /evaluators/:evaluatorId/assignedApplications
  try {
    const response = await api.get(
      `evaluators/${evaluatorId}/assignedApplications`
    );

    return response.applications;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};

// GET EVALUATION QUESTIONS => All Questions Eligibilty Screening
export const getAllQuestionsEvaluation = async (applicationId) => {
  try {
    const response = await api.get(
      `evaluators/questions/get-all/${applicationId}`
    );

    return response.questions;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
// GET EVALUATION QUESTIONS => All Questions Eligibilty Screening
export const getAllQuestionsBuilding = async (applicationId) => {
  try {
    const response = await api.get(
      `evaluators/questions/get-all/building/${applicationId}`
    );

    return response.questions;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};

// POST ANSWER QUESTION => Question Answer Submitted
export const questionSubmitEvaluation = async (data) => {
  const { userId, formData } = data;
  try {
    const response = await api.post(
      `/users/${userId}/applications/proposalEvaluationQuestions`,
      formData
    );
    return response.proposalEvaluationQuestion;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
// POST SUBMIT  AllQUESTION => AllQuestion Submitted
export const AllQuestionSubmitted = async (data) => {
  const { userId, formData } = data;
  try {
    const response = await api.post(
      `/users/${userId}/applications/evaluateStage1`,
      formData
    );

    return response;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
// stage 2 post api => submit final report
export const AllQuestionSubmittedStage2 = async (data) => {
  const { userId, formData } = data;
  try {
    const response = await api.post(
      `/users/${userId}/applications/evaluateStage2`,
      formData
    );
    return response;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
// stage 3 post api => submit final report
export const AllQuestionSubmittedStage3 = async (data) => {
  const { userId, formData } = data;
  try {
    const response = await api.post(
      `/users/${userId}/applications/evaluateStage3`,
      formData
    );
    return response;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
// stage 4 post api => submit final report
export const AllQuestionSubmittedStage4 = async (data) => {
  const { userId, formData } = data;
  try {
    const response = await api.post(
      `/users/${userId}/applications/evaluateStage4`,
      formData
    );
    return response;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
export const getAllEvaSubmittedApplications = async (evaluatorId) => {
  try {
    const response = await api.get(
      `evaluators/${evaluatorId}/evaluatedApplications`
    );

    return response.applications;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};

// GET EVALUATION QUESTIONS => All Questions Eligibilty Screening
export const getAllQuestionsEvaCorrection = async (userId, applicationId) => {
  try {
    const response = await api.get(
      `/users/${userId}/applications/${applicationId}/evaluationQuestions/correctionQuestions`
    );
    return response;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
// Buildings api
// Submit report against the building
export const buildingSubmit = async (data) => {
  try {
    const response = await api.post("evaluators/building/evaluation", data);
    return response.building;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
// Get All-Buildings
export const getAllBuildingFields = async (applicationId) => {
  try {
    const response = await api.get(`evaluators/building/correction-fileds`);
    return response.fields;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
// Get All-Questions
export const getAllQuestionsFields = async (applicationId) => {
  try {
    const response = await api.get(`questions/get-fields/correction`);
    return response.fields;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
// submit question
export const questionSubmit = async (data) => {
  try {
    const response = await api.post(
      "evaluators/questions/evaluation-step-1",
      data
    );
    return response.building;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
export const questionUpdateStep1 = async (data) => {
  try {
    const response = await api.post(
      "evaluators/questions/evaluation-update-step-1",
      data
    );

    return response;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
//evaluators/questions/evaluation-step-2
export const questionSubmitStageTwo = async (data) => {
  try {
    const response = await api.post(
      "evaluators/questions/evaluation-step-2",
      data
    );
    console.log("res", response);
    return response.building;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
//evaluators/questions/evaluation-step-3
export const questionSubmitStageThree = async (data) => {
  try {
    const response = await api.post(
      "evaluators/questions/evaluation-step-3",
      data
    );
    console.log(response);

    return response.question;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
//evaluators/questions/evaluation-step-2
export const questionSubmitStageFour = async (data) => {
  try {
    const response = await api.post(
      "evaluators/questions/evaluation-step-4",
      data
    );

    return response.building;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
// all questions submitted stage 1
export const allQuestionSubmiited = async (formData) => {
  try {
    const response = await api.post(
      `evaluators/applications/submission/stage-1`,
      formData
    );

    return response;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
// all questions submitted stage2
export const allQuestionSubmiitedStage2 = async (formData) => {
  try {
    const response = await api.post(
      `evaluators/applications/submission/stage-2`,
      formData
    );
    console.log("res stage 2", response);

    return response.application;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
export const allQuestionSubmiitedStage3 = async (formData) => {
  try {
    const response = await api.post(
      `evaluators/applications/submission/stage-3`,
      formData
    );
    return response.application;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};

export const allQuestionSubmiitedStage4 = async (formData) => {
  try {
    const response = await api.post(
      `evaluators/applications/submission/stage-4`,
      formData
    );
    console.log("res stage 2", response);

    return response.application;
  } catch (err) {
    throw new Error(err.response?.data.message || "Something went wrong!");
  }
};
