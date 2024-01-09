import { useContext } from "react";
import AuthContext from "../../contexts/AuthProvidor";

const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;
