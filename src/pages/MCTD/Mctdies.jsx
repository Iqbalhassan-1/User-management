import { Link } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Modal,
  SectionTitle,
  Wrapper,
} from "../../components";
import { MdAdd } from "react-icons/md";
import { AddNewMctd, MctdList } from "../../features/MCTD";
import useModal from "../../utils/hooks/useModal";
import { useTranslation } from "react-i18next";

const Mctdies = () => {
  //translation hook
  const { t } = useTranslation();
  const { isOpen, toggleModal, closeModal, selectedValue } = useModal();

  return (
    <>
      <Wrapper className="space-y-4">
        <Breadcrumb>
          <div className="flex items-start flex-col gap-3 md:justify-between md:gap-0 md:flex-row">
            <SectionTitle>{t("MCTD List")}</SectionTitle>
            {/* TODO: */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => toggleModal(null)}
            >
              <MdAdd size={24} />
              <span>{t("Add MCTD")}</span>
            </Button>
          </div>
        </Breadcrumb>
        <MctdList openModal={toggleModal} />
      </Wrapper>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={!selectedValue ? t("Create New MCTD") : t("Update MCTD")}
        maxWidth="max-w-lg"
        className="lg:max-h-[30rem]"
      >
        <AddNewMctd closeModal={closeModal} selectedItem={selectedValue} />
      </Modal>
    </>
  );
};

export default Mctdies;
