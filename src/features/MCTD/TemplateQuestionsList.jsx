import { MdDelete, MdEdit } from "react-icons/md";

const TemplateQuestionsList = ({ questions, isEditable }) => {
  return (
    <ul>
      {questions.map((question) => (
        <li className="p-1 bg-white rounded-md" key={question.id}>
          <div className="bg-gray-50 flex flex-col sm:items-center sm:justify-between sm:flex-row gap-3 p-2 rounded-md">
            <h3 className="text-sm sm:text-base text-gray-900">
              {question.title}
            </h3>
            <div className="flex-left gap-2">
              {isEditable && (
                <button className="bg-white text-black p-2 rounded-lg border border-gray-200">
                  <MdEdit />
                </button>
              )}
              <button className="bg-white p-2 rounded-lg border border-gray-200 text-red-500">
                <MdDelete />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TemplateQuestionsList;
