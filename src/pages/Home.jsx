import EvaluatorHome from "../features/EVA/EvaluatorHome";
import MCTDHome from "../features/MCTD/MCTDHome";
import MunicipalityHome from "../features/MUNI/MunicipalityHome";
import useAuthContext from "../utils/hooks/useAuthContext";

const roleBasedView = {
  MCTD: MCTDHome,
  Municipality: MunicipalityHome,
  Evaluator: EvaluatorHome,
};

const Home = () => {
  const { user } = useAuthContext();

  const CurrentUserView = roleBasedView[user.role];

  return (
    <>
      <CurrentUserView />
    </>
  );
};

export default Home;
