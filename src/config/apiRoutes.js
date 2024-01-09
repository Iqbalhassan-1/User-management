// const BASE_URL = "http://54.75.0.248:3000/api/";
// const BASE_URL = "http://54.75.0.248:3000/api/v1/";

// const BASE_URL = "http://192.168.18.101:3000/api/";
const BASE_URL = "https://pmp-backend.cloud-squarex.com/api/";
const LOGIN_USER = "users/login";
// 192.168.18.101

const UPLOAD_FILE = "files/upload";
const UPLOAD_MULTIPLE_FILES = "files/upload/multiple";

// MCTD
const CREATE_PROPOSAL = "programs/create";
const GET_PROPOSAL = "programs/get-all";
const START_EVALUATION = "programs/start-evaluations/:programId";
const GET_PROPOSAL_DETAILS = "programs/detail/";
const GET_PROPOSALS_APPS = "programs/applications/";
const CREATE_EXPERT = "users/evaluators/create";
const UPDATE_EXPERT = "users";
const DELETE_EXPERT = "users";
const CREATE_USER = "users/create";
const QUESTIONS_BY_CATEGORY = "questions/groupby";
const GET_FORM_FIELD = "questions/get-fields";
// users?role=Evaluator&stage=Eligibility%20Screening

// Muncipality
const CREATE_APPLICATION = "applications/create";
const APPLICATIONS_BY_STATUS = "applications/my-applications?status=";
const ADD_BUILDING = "applications/building/create";
const UPDATE_BUILDING = "applications/building/update/";
const DELETE_BUILDING = "applications/building/delete/";
const GET_BUILDINGS = "applications/building/by-application/";
const GET_APPLICATION_DETAILS = "applications/detail/";
const APPLICATION_CORRECTION_FIELDS = "applications/corrections/";
const SUBMIT_CORRECTION_FORM = "applications/corrections/";

// Experts
const GET_EVA_PROGRAMMES = "evaluators/programs";
const GET_EXPERT_Appplications = "evaluators/:evaluatorId/applications";
const ASSIGN_EXPERT = "applications/assignToEvaluator";
export {
  BASE_URL,
  LOGIN_USER,
  CREATE_USER,
  CREATE_PROPOSAL,
  GET_PROPOSAL,
  GET_PROPOSAL_DETAILS,
  GET_PROPOSALS_APPS,
  CREATE_EXPERT,
  UPDATE_EXPERT,
  DELETE_EXPERT,
  GET_EVA_PROGRAMMES,
  UPLOAD_FILE,
  UPLOAD_MULTIPLE_FILES,
  ASSIGN_EXPERT,
  CREATE_APPLICATION,
  GET_EXPERT_Appplications,
  APPLICATIONS_BY_STATUS,
  GET_BUILDINGS,
  // GET_DRAFT_APPLICATION_FIELDS,
  GET_APPLICATION_DETAILS,
  ADD_BUILDING,
  START_EVALUATION,
  APPLICATION_CORRECTION_FIELDS,
  SUBMIT_CORRECTION_FORM,
  QUESTIONS_BY_CATEGORY,
  GET_FORM_FIELD,
  UPDATE_BUILDING,
  DELETE_BUILDING,
};
