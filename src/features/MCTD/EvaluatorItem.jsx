import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownList,
} from "../../components/UI/DropDown";
import { MdMoreHoriz } from "react-icons/md";
import { avatar } from "../../assets";
import useModal from "../../utils/hooks/useModal";
import { AddNewEvaluator } from ".";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteUser } from "../../api/mctdService";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const EvaluatorItem = ({ data }) => {
  //translation hook
  const { t } = useTranslation();
  const { isOpen, toggleModal, closeModal, selectedValue } = useModal();
  const queryClient = useQueryClient();
  // delete User Evaluator
  const deleteUser = useMutation(DeleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("get-All-Evaluators");
      toast.success(t("Evaluator User Delete Successfully"));
    },
  });
  const handleDelete = (id) => {
    if (window.confirm(t("Are you sure delete Evaluator!"))) {
      deleteUser.mutate(id);
    }
    return;
  };

  return (
    <>
      <div className="p-4 lg:p-6 relative group hover:bg-sky-100 transition-all">
        <div className="flex items-start flex-col gap-8 lg:flex-row justify-between lg:items-center lg:max-w-7xl">
          <div className="flex items-center justify-center gap-2">
            <img
              src={avatar}
              alt="person profile image"
              className="w-12 h-12"
            />
            <div className="">
              <h3 className="font-medium">
                {data?.firstName + " " + data?.lastName}
              </h3>
              <p className="text-gray-500">{data?.email}</p>
            </div>
          </div>
          <div className="flex items-center flex-wrap gap-4 sm:gap-6">
            <div className="space-y-2 flex flex-col">
              <span className="text-sky-600 font-semibold">
                {data?.pending}
              </span>
              <span className="text-gray-500">{t("Pending Applications")}</span>
            </div>
            <div className="space-y-2 flex flex-col">
              <span className="text-sky-600 font-semibold">
                {data?.approved}
              </span>
              <span className="text-gray-500">
                {t("Approved Applications")}
              </span>
            </div>
            <div className="space-y-2 flex flex-col">
              <span className="text-sky-600 font-semibold">
                {data?.rejected}
              </span>
              <span className="text-gray-500">
                {t("Rejected Applications")}
              </span>
            </div>
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <Dropdown>
            <DropdownButton className="bg-white rounded-full drop-shadow-lg p-2 border border-gray-100 focus:drop-shadow-md">
              <MdMoreHoriz size={24} />
            </DropdownButton>
            <DropdownList className="w-[10rem] right-0">
              <DropdownItem>
                <button
                  className="px-4 py-2 text-left w-full"
                  onClick={() => toggleModal(data)}
                >
                  {t("Edit")}
                </button>
              </DropdownItem>
              <DropdownItem>
                <button
                  className="px-4 py-2 text-left w-full text-red-500"
                  onClick={() => handleDelete(data?._id)}
                >
                  {t("Delete")}
                </button>
              </DropdownItem>
            </DropdownList>
          </Dropdown>
        </div>
      </div>
      <AddNewEvaluator
        isOpen={isOpen}
        closeModal={closeModal}
        selectedValue={selectedValue}
      />
    </>
  );
};

export default EvaluatorItem;
