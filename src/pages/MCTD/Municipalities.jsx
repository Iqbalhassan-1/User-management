import { Link } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Modal,
  SectionTitle,
  Wrapper,
} from "../../components";
import { MdAdd } from "react-icons/md";
import { AddNewMunicipality, MunicipalityList } from "../../features/MCTD";
import useModal from "../../utils/hooks/useModal";
import { useTranslation } from "react-i18next";

const Municipalities = () => {
  //translation hook
  const { t } = useTranslation();
  const { isOpen, toggleModal, closeModal, selectedValue } = useModal();

  return (
    <>
      <Wrapper className="space-y-4">
        <Breadcrumb>
          <div className="flex items-start flex-col gap-3 md:justify-between md:gap-0 md:flex-row">
            <SectionTitle>{t("Municipality List")}</SectionTitle>
            {/* TODO: */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => toggleModal(null)}
            >
              <MdAdd size={24} />
              <span>{t("Add Municipality")}</span>
            </Button>
          </div>
        </Breadcrumb>
        <MunicipalityList openModal={toggleModal} />
      </Wrapper>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={
          !selectedValue
            ? t("Create New Municipality")
            : t("Update Municipality")
        }
        maxWidth="max-w-lg"
        className="lg:max-h-[30rem]"
      >
        <AddNewMunicipality
          closeModal={closeModal}
          selectedItem={selectedValue}
        />
      </Modal>
    </>
  );
};

export default Municipalities;
