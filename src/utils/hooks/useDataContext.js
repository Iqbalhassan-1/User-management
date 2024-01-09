import { useContext } from "react";
import DataContext from "../../contexts/DataProvider";

const useDataContext = () => {
  return useContext(DataContext);
};

export default useDataContext;
