import { useForm } from "react-hook-form";
import { MdEmail, MdLock, MdLogin } from "react-icons/md";
import { Button, Input, Wrapper } from "../components";
import ukraineLogo from "../assets/ukraine-logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { validations } from "../utils/utils";
import useAuthContext from "../utils/hooks/useAuthContext";
import { useTranslation } from "react-i18next";

const Login = () => {

  //translation hook
  const { t } = useTranslation();
  
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { handleLogin, isLoading } = useAuthContext();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    handleLogin(data).then((data) => {
      navigate("/");
    });
  };

  return (
    <main className="bg-gradient-to-b from-cyan-500 to-blue-500 min-h-screen grid place-items-center">
      <Wrapper className="max-w-md grid place-items-center">
        <div className="w-full drop-shadow-md">
          <div
            className={`grid place-items-center w-full bg-login-pattern bg-cover bg-no-repeat rounded-t-md py-8`}
          >
            <img src={ukraineLogo} alt="ukraine logo" />
            <h1 className="heading-primary text-white font-medium">PMPU</h1>
          </div>
          <form
            className="space-y-7 w-full bg-white p-4  rounded-b-md"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="text-center space-y-1">
              <h2 className="heading-secondary">{t("Sign In")}</h2>
              <p className="text-sm text-gray-400">
               {t("Please log in to access your account.")}
              </p>
            </div>
            <div className="space-y-5">
              <Input
                label={t("Email")}
                name="email"
                type="email"
                icon={MdEmail}
                placeholder="user@example.com"
                register={register}
                errors={errors}
                validationSchema={validations.emailValidation}
              />
              <Input
                label={t("Password")}
                name="password"
                type="password"
                icon={MdLock}
                placeholder="password"
                register={register}
                errors={errors}
                validationSchema={validations.passwordValidations}
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin h-4 w-4 rounded-full bg-transparent border-2 border-transparent border-r-white border-t-white"></div>
              ) : (
                t("Sign In")
              )}
            </Button>
          </form>
        </div>
      </Wrapper>
    </main>
  );
};

export default Login;
