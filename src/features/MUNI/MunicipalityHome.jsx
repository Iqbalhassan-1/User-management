import { useTranslation } from "react-i18next";
import { Card, Wrapper } from "../../components";

const MunicipalityHome = () => {
  //translation hook
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Card>
        <h1 className="heading-primary">{t("Welcome to Municipality")}</h1>
      </Card>
    </Wrapper>
  );
};

export default MunicipalityHome;
