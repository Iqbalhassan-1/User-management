import { MdAdd } from "react-icons/md";
import {
  Breadcrumb,
  Button,
  Modal,
  SectionTitle,
  Wrapper,
} from "../../components";
import { AddNewQuestion, QuestionsList } from "../../features/MCTD";
import useModal from "../../utils/hooks/useModal";
import { useTranslation } from "react-i18next";

const Questions = () => {
  //translation hook
  const { t } = useTranslation();
  const { isOpen, toggleModal, closeModal, selectedValue } = useModal();

  return (
    <>
      <Wrapper className="space-y-4">
        <Breadcrumb>
          <div className="flex items-start flex-col gap-3 md:justify-between md:gap-0 md:flex-row">
            <SectionTitle>{t("Questions")}</SectionTitle>
            {/* TODO: */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => toggleModal(null)}
            >
              <MdAdd size={24} />
              <span>{t("Create Questions")}</span>
            </Button>
          </div>
        </Breadcrumb>
        <QuestionsList openModal={toggleModal} />
      </Wrapper>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={!selectedValue ? t("Add New Question") : t("Update Question")}
        maxWidth="max-w-lg"
        className="max-h-[30rem]"
      >
        <AddNewQuestion closeModal={closeModal} selectedItem={selectedValue} />
      </Modal>
    </>
  );
};

export default Questions;
