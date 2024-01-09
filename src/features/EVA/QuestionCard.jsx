import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const QuestionCard = ({
  currentQuestionIndex,
  questionsAll,
  title,
  description,
  onNext,
  onPrev,
}) => {
  return (
    <>
      <div className="flex space-y-1">
        <p className="grow text-gray-900 font-medium">{title}</p>
        <div className="flex items-baseline gap-1 grow-0 flex-nowrap whitespace-nowrap">
          <button
            className="text-gray-500 hover:text-sky-600 transition-colors disabled:text-gray-500 disabled:cursor-not-allowed"
            onClick={onPrev}
            disabled={currentQuestionIndex === 0}
          >
            <FaArrowLeft />
          </button>
          <p className="text-blue-500 font-semibold">
            {currentQuestionIndex + 1} / {questionsAll?.length}
          </p>
          <button
            className="text-gray-500 hover:text-sky-600 transition-colors disabled:text-gray-500 disabled:cursor-not-allowed"
            onClick={onNext}
            disabled={currentQuestionIndex === questionsAll?.length - 1}
          >
            <FaArrowRight />
          </button>
        </div>

        {/* </div> */}
      </div>
      <p>{description}</p>
    </>
  );
};
export default QuestionCard;
