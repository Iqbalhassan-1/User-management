import { MdDelete, MdEdit } from "react-icons/md";
import {
  Card,
  DebounceInput,
  LoadingItemPlaceholder,
  Status,
} from "../../components";
import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllQuestions } from "../../api/mctdService";

const QuestionsList = ({ openModal }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-All-Questions"],
    queryFn: () => getAllQuestions(),
  });

  if (isLoading) {
    return <LoadingItemPlaceholder />;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  return (
    <Card className="p-0 sm:p-0 divide-y divide-gray-200 rounded-b-lg">
      <div className="p-4">
        <DebounceInput />
      </div>
      {data?.map((details) => (
        <Question data={details} key={details?._id} openModal={openModal} />
      ))}
    </Card>
  );
};

const Question = ({ data, openModal }) => {
  return (
    <div className="p-4 space-y-3">
      <div className="flex items-center gap-4 justify-between">
        <Status status={data?.stage} />

        <div className="flex-left gap-2">
          <button
            className="bg-white text-black p-2 rounded-lg shadow-md"
            onClick={() => openModal(data)}
          >
            <MdEdit size={18} />
          </button>
          <button className="bg-white p-2 rounded-lg shadow-md text-red-500">
            <MdDelete size={18} />
          </button>
        </div>
      </div>
      <h3 className="text-black font-medium">{data?.title}</h3>
    </div>
  );
};

// delete Question
// const deleteQuestion = useMutation(DeleteEvaQuestion, {
//   onSuccess: () => {
//     queryClient.invalidateQueries("get-All-EvaQuestions");
//     toast.success("Question Delete Successfully");
//   },
// });
// const handleDelete = (id) => {
//   if (window.confirm("Are you sure to delete this Question!")) {
//     deleteQuestion.mutate(id);
//   }
//   return;
// };

export default memo(QuestionsList);
