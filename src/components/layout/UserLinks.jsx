import React from "react";
import MCTDNavLinks from "./MCTDNavLinks";
import MuniNavLinks from "./MuniNavLinks";
import EvaNavLinks from "./EvaNavLinks";
import useAuthContext from "../../utils/hooks/useAuthContext";

const navLinks = {
  MCTD: MCTDNavLinks,
  Municipality: MuniNavLinks,
  Evaluator: EvaNavLinks,
};
const DefaultView = () => {
  return <div>Checking User</div>;
};
const UserLinks = () => {
  const { user } = useAuthContext();
  const CurrentUserLinks = navLinks[user?.role] || DefaultView;
  return <CurrentUserLinks />;
};

export default UserLinks;
