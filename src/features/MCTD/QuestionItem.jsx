import React from "react";
import useModal from "../../utils/hooks/useModal";
import AddNewQuestion from "./AddNewQuestion";
import { Status } from "../../components";
import { MdDelete, MdEdit } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteQuestion } from "../../api/mctdService";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const QuestionItem = ({ data }) => {
  //translation hook
  const { t } = useTranslation();

  const { isOpen, toggleModal, closeModal, selectedValue } = useModal();
  const queryClient = useQueryClient();
  // delete Question
  const deleteQuestion = useMutation(DeleteQuestion, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-All-Questions");
      toast.success(t("Question Delete Successfully"));
    },
  });
  const handleDelete = (id) => {
    if (window.confirm(t("Are you sure to delete this Question?"))) {
      deleteQuestion.mutate(id);
    }
    return;
  };

  return (
    <>
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-4 justify-between">
          <Status status={data?.stage} />
          <div className="flex-left gap-2">
            <button
              className="bg-white text-black p-2 rounded-lg shadow-md"
              onClick={() => toggleModal(data)}
            >
              <MdEdit size={18} />
            </button>
            <button
              className="bg-white p-2 rounded-lg shadow-md text-red-500"
              onClick={() => handleDelete(data?._id)}
            >
              <MdDelete size={18} />
            </button>
          </div>
        </div>
        <h3 className="text-black font-medium">{data?.title}</h3>
      </div>
      <AddNewQuestion
        isOpen={isOpen}
        closeModal={closeModal}
        selectedValue={selectedValue}
      />
    </>
  );
};

export default QuestionItem;
