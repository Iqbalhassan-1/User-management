import { useNavigate } from "react-router-dom";

const useGoBack = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1, { replace: true });
  };

  return goBack;
};

export default useGoBack;
