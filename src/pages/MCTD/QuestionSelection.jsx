import { MdDelete } from "react-icons/md";
import { useForm, useFormContext } from "react-hook-form";
import { Button, Modal } from "../../components";
import { FaPlus, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import useModal from "../../utils/hooks/useModal";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const QuestionSelection = ({ questions }) => {
  //translation hook
  const { t } = useTranslation();
  const { isOpen, toggleModal, closeModal } = useModal();
  const { watch, setValue } = useFormContext();
  const {
    register,
    handleSubmit,
    reset,
    setValue: setQuestionValue,
  } = useForm();
  const [selectAll, setSelectAll] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");

  const questionsWatch = watch("questions");

  const onSubmit = (data) => {
    const trueIdsArray = Object.keys(data).filter((key) => data[key] === true);
    if (trueIdsArray.length > 0) {
      setValue("questions", [...questionsWatch, ...trueIdsArray]);
      closeModal();
      reset();
    }
  };

  let selectedQuestions = useMemo(() => {
    return questions?.filter((question) =>
      questionsWatch?.includes(question._id)
    );
  }, [questions, questionsWatch]);

  const handleRemoveQuestion = (id) => {
    const updatedQuestions = selectedQuestions
      ?.filter((question) => question._id !== id)
      ?.map((question) => question?._id);
    selectedQuestions = updatedQuestions;

    setValue("questions", selectedQuestions);
  };

  const handleSelect = () => {
    if (selectAll) {
      // Deselect all questions
      questions.forEach((question) => {
        setQuestionValue(question._id, false);
      });
    } else {
      // Select all questions
      questions.forEach((question) => {
        setQuestionValue(question._id, true);
      });
    }

    // Toggle the selectAll state
    setSelectAll((prev) => !prev);
  };
  const sortQuestions = (order) => {
    const sortedQuestions = [...selectedQuestions].sort((a, b) => {
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();
      return order === "asc"
        ? titleA.localeCompare(titleB)
        : titleB.localeCompare(titleA);
    });

    return sortedQuestions;
  };
  const sortedQuestionsList = useMemo(
    () => sortQuestions(sortOrder),
    [selectedQuestions, sortOrder]
  );
  const handleSortToggle = () => {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  };
  return (
    <>
      <div className="px-3 my-2">
        {sortedQuestionsList?.length > 0 && (
          <>
            <button
              onClick={handleSortToggle}
              type="button"
              data-tooltip-target="tooltip-right"
              data-tooltip-placement="right"
              className="bg-white p-2 rounded-lg border border-gray-200 text-green-600 opac"
            >
              {sortOrder === "asc" ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
            </button>
            <div
              id="tooltip-right"
              role="tooltip"
              className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
            >
              Tooltip on right
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </>
        )}
      </div>
      <ul className="bg-white divide-y divide-gray-200 opac">
        {sortedQuestionsList?.map((question) => (
          <li
            className="p-3 bg-white flex items-start justify-between gap-3"
            key={question._id}
          >
            <div>
              <h3 className="text-gray-900 font-medium">{question?.title}</h3>
              <p className="text-gray-500 text-sm">{question?.description}</p>
              {question.correctionPossible === "Yes" ? (
                question?.correctionFields?.map((field) => (
                  <>
                    <h4 className="uppercase font-semibold text-sm text-gray-500 mt-4 mb-2">
                      {t("CORRECTION FIELDS")}
                    </h4>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-gray-600 bg-gray-100 p-2 rounded-md font-semibold">
                        {field}
                      </span>
                    </div>
                  </>
                ))
              ) : (
                <h4 className="uppercase font-semibold text-sm text-gray-500 mt-4 mb-2">
                  {t("Correction Not Possible")}
                </h4>
              )}
            </div>
            <button
              type="button"
              className="bg-white p-2 rounded-lg border border-gray-200 text-red-500"
              onClick={() => handleRemoveQuestion(question._id)}
            >
              <MdDelete />
            </button>
          </li>
        ))}
        <li className="p-3 w-full">
          <Button onClick={toggleModal} type="button">
            <FaPlus />
            <span>{t("Add Questions")}</span>
          </Button>
        </li>
      </ul>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Select Questions"
        maxWidth="max-w-3xl"
        className="max-h-[30rem]"
      >
        <form className="space-y-6">
          <button onClick={handleSelect} type="button">
            {selectAll ? t("Deselect All") : t("Select All")}
          </button>
          <div className="divide-y divide-gray-100 shadow-sm">
            {questions
              ?.filter((question) => !questionsWatch?.includes(question._id))
              ?.map((question) => (
                <div className="relative" key={question._id}>
                  <input
                    type="checkbox"
                    id={question._id}
                    name={question._id}
                    {...register(question._id)}
                    className="w-5 h-5 peer absolute left-3 top-4 cursor-pointer"
                  />
                  <label
                    htmlFor={question._id}
                    className="p-3 pl-10 bg-gray-50 peer-checked:bg-sky-50 w-full block transition-colors cursor-pointer"
                  >
                    <h3 className="text-gray-900 font-medium">
                      {question?.title}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {question?.description}
                    </p>
                    <div className="flex items-center gap-2">
                      {question?.correctionPossible === "Yes" ? (
                        <h4 className="uppercase font-semibold text-sm text-gray-500 mt-4 mb-2">
                          {t("Correction Possible")},
                        </h4>
                      ) : (
                        <h4 className="uppercase font-semibold text-sm text-gray-500 mt-4 mb-2">
                          {t("Correction Not Possible,")}
                        </h4>
                      )}
                      <h4 className="uppercase font-semibold text-sm text-gray-500 mt-4 mb-2">
                        {t("Related to Sub-project")}:{" "}
                        {question?.questionType === "building" ? "Yes" : "No"}
                      </h4>
                    </div>
                  </label>
                </div>
              ))}
          </div>
          <div className="flex items-center justify-end gap-3">
            <Button
              size="sm"
              variant="outline"
              type="button"
              onClick={closeModal}
            >
              {t("Cancel")}
            </Button>
            <Button size="sm" type="button" onClick={handleSubmit(onSubmit)}>
              {t("Add Questions")}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default QuestionSelection;
