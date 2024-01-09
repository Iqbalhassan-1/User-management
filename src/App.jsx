import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Suspense, lazy } from "react";
// import RootLayout from "./components/layout/RootLayout";

const RootLayoutLazy = lazy(() => import("./components/layout/RootLayout"));

// Pages
import {
  Home,
  CallForProposals,
  OpenCFPs,
  ClosedCFPs,
  UnderEvaCFPs,
  CreateNewCFP,
  CFPDetails,
  CFPApplications,
  CFPUnderReviewApplications,
  CFPApprovedApplications,
  CFPRejectedApplications,
  EligibilityEvaluators,
  InitialCreditEVAs,
  QualityRelevanceEVAs,
  FinancialCreditEVAs,
  Municipalities,
  ApplicationSummary,
  Login,
  QuestionsEligibility,
  QuestionsInitialCredit,
  QuestionsFinalCredit,
  QuestionsQualityAndRelv,
  MuniCFP,
  PageNotFound,
  RejectedApplications,
  ApprovedApplications,
  UnderReviewApplications,
  CorrectionApplications,
  ApplicationForm,
  AllApplications,
  ApplicationDetails,
  AllEvaluators,
  AllQuestions,
  SubmittedApplications,
  UserSetting,
  CFPEvaluation,
  ApplicationsEvaluation,
  AssignedEvaApplications,
  CompletedEvaApplications,
  CorrectionEvaApplications,
  EvaluateApplication,
  CorrectionForm,
  RejectedEvaApplications,
  Mctdies,
  GetReports,
} from "./pages";
import {
  CFPApplicationsLayout,
  CallForProposalsLayout,
  EvaluatorCFPLayout,
  EvaluatorsLayout,
  QuestionsLayout,
} from "./components";

import RequireAuth from "./features/RequireAuth";
import { ROLES } from "./utils/utils";
import MuniApplicationLayout from "./components/layout/MuniApplicationLayout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div></div>}>
                <RootLayoutLazy />
              </Suspense>
            }
          >
            {/* All User Routes */}
            <Route
              element={
                <RequireAuth
                  allowedRoles={[ROLES.MCTD, ROLES.EVA, ROLES.MUNI]}
                />
              }
            >
              <Route index element={<Home />} />
              <Route path="user-setting" element={<UserSetting />} />
            </Route>

            {/* MCTD Routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES.MCTD]} />}>
              <Route path="getReports" element={<GetReports />} />
              <Route
                path="call-for-proposals"
                element={<CallForProposalsLayout />}
              >
                <Route index element={<CallForProposals />} />
                <Route path="open" element={<OpenCFPs />} />
                <Route path="closed" element={<ClosedCFPs />} />
                <Route path="under-evaluation" element={<UnderEvaCFPs />} />
              </Route>
              <Route
                path="call-for-proposals/:id/details"
                element={<CFPDetails />}
              />
              <Route
                path="call-for-proposals/create"
                element={<CreateNewCFP />}
              />

              <Route
                path="call-for-proposals/:id/applications"
                element={<CFPApplicationsLayout />}
              >
                <Route index element={<CFPApplications />} />
                <Route
                  path="under-review"
                  element={<CFPUnderReviewApplications />}
                />
                <Route path="approved" element={<CFPApprovedApplications />} />
                <Route path="rejected" element={<CFPRejectedApplications />} />
              </Route>
              <Route
                path="call-for-proposals/:id/applications/:applicationId/details"
                element={<ApplicationDetails />}
              />
              <Route
                path="call-for-proposals/:id/applications/:applicationId/summary"
                element={<ApplicationSummary />}
              />

              <Route path="evaluators" element={<EvaluatorsLayout />}>
                <Route index element={<AllEvaluators />} />
                <Route
                  path="eligibility-evaluators"
                  element={<EligibilityEvaluators />}
                />
                <Route
                  path="initial-credit-evaluator"
                  element={<InitialCreditEVAs />}
                />
                <Route
                  path="quality-and-relevance-evaluator"
                  element={<QualityRelevanceEVAs />}
                />
                <Route
                  path="final-credit-evaluator"
                  element={<FinancialCreditEVAs />}
                />
              </Route>
              <Route path="questions" element={<QuestionsLayout />}>
                <Route index element={<AllQuestions />} />
                <Route
                  path="eligibilty-question"
                  element={<QuestionsEligibility />}
                />
                <Route
                  path="initial-credit-question"
                  element={<QuestionsInitialCredit />}
                />
                <Route
                  path="quality-and-relevance-question"
                  element={<QuestionsQualityAndRelv />}
                />
                <Route
                  path="final-credit-question"
                  element={<QuestionsFinalCredit />}
                />
              </Route>
              <Route path="municipalities" element={<Municipalities />} />

              <Route path="mctd" element={<Mctdies />} />
            </Route>
            {/* Municipality Routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES.MUNI]} />}>
              <Route path="active-call-for-proposals" element={<MuniCFP />} />
              <Route
                path="active-call-for-proposals/:id/details"
                element={<CFPDetails />}
              />
              <Route
                path="active-call-for-proposals/:id/details/apply"
                element={<ApplicationForm />}
              />
              <Route
                path="all-applications"
                element={<MuniApplicationLayout />}
              >
                <Route index element={<AllApplications />} />
                <Route path="correction" element={<CorrectionApplications />} />
                <Route path="submitted" element={<SubmittedApplications />} />
                <Route
                  path="under-review"
                  element={<UnderReviewApplications />}
                />
                <Route path="approved" element={<ApprovedApplications />} />
                <Route path="rejected" element={<RejectedApplications />} />
              </Route>
              <Route
                path="all-applications/:id/correction-form"
                element={<CorrectionForm />}
              />
              <Route
                path="all-applications/:applicationId/details"
                element={<ApplicationDetails />}
              />
              <Route
                path="all-applications/:applicationId/summary"
                element={<ApplicationSummary />}
              />
            </Route>
            {/* Evaluator Routes */}
            <Route element={<RequireAuth allowedRoles={[ROLES.EVA]} />}>
              <Route path="proposals" element={<CFPEvaluation />} />
              <Route
                path="proposals/:id/self-assign"
                element={<EvaluatorCFPLayout />}
              >
                <Route index element={<ApplicationsEvaluation />} />
                <Route path="assigned" element={<AssignedEvaApplications />} />
                <Route
                  path="completed"
                  element={<CompletedEvaApplications />}
                />
                <Route path="rejected" element={<RejectedEvaApplications />} />
                <Route
                  path="send-for-correction"
                  element={<CorrectionEvaApplications />}
                />
              </Route>
              <Route
                path="proposals/:id/applications/:applicationId"
                element={<EvaluateApplication />}
              />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
