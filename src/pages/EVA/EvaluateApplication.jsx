import { useState } from "react";
import {
  Accordian,
  Breadcrumb,
  Button,
  Card,
  Modal,
  SectionTitle,
  Status,
  TextArea,
  Wrapper,
} from "../../components";
import useModal from "../../utils/hooks/useModal";
import ApplicationDetails from "../MUNI/ApplicationDetails";
import { useForm } from "react-hook-form";
import { createRequiredValidation } from "../../utils/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  buildingSubmit,
  getAllBuildingFields,
  getAllQuestionsEvaluation,
  questionSubmit,
} from "../../api/evaService";
import useAuthContext from "../../utils/hooks/useAuthContext";
import { useParams } from "react-router-dom";
import { getAppBuildingById } from "../../api/muniService";
import toast from "react-hot-toast";
import { MdErrorOutline } from "react-icons/md";
import EvaluationStageOne from "../../features/EVA/EvaluationStageOne";
import EvaluationStageTwo from "../../features/EVA/EvaluationStageTwo";
import EvaluationStageThree from "../../features/EVA/EvaluationStageThree";
import EvaluationStageFour from "../../features/EVA/EvaluationStageFour";

const evaUserView = {
  "Eligibility Screening": EvaluationStageOne,
  "Initial Creditworthiness Assessment": EvaluationStageTwo,
  "Quality and Relevance Screening": EvaluationStageThree,
  "Creditworthiness Assessment": EvaluationStageFour,
};

const EvaluateApplication = () => {
  const { user } = useAuthContext();
  const CurrentEvaluation = evaUserView[user?.stage];

  return (
    <Wrapper className="space-y-3">
      <Breadcrumb />
      <div className="grid grid-cols-16 space-y-3 md:space-y-0">
        <CurrentEvaluation />
        <ApplicationDetails />
      </div>
    </Wrapper>
  );
};

export default EvaluateApplication;
