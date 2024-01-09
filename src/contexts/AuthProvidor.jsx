import { createContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser, logoutUser } from "../api/authService";
import { toast } from "react-hot-toast";

const AuthContext = createContext({});

const userDetails = JSON.parse(localStorage.getItem("user"));

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userDetails ? userDetails : null);

  const LoginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const { user, token } = data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      setUser(user);
    },
    onError: (err) => {
      // Handle Error login
      toast.error(err.message);
    },
  });

  const logoutMutation = useMutation(logoutUser, {
    onSuccess: () => {
      // Handle successful logout
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
    },
    onError: (err) => {
      // Handle error during logout
      toast.error(err.message);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleLogin: LoginMutation.mutateAsync,
        isLoading: LoginMutation.isLoading,
        loginError: LoginMutation.error,
        handleLogout: logoutMutation.mutate,
        logoutLoading: logoutMutation.isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
