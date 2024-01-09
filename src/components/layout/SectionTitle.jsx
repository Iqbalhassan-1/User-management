import { useTranslation } from "react-i18next";

const SectionTitle = ({ children }) => {
  //translation hook
  const { t } = useTranslation();
  return (
    <h2 className="text-black text-xl sm:text-xl font-semibold">{t(children)}</h2>
  );
};

export default SectionTitle;
