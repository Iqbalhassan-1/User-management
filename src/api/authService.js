import { BASE_URL, LOGIN_USER, UPLOAD_FILE } from "../config/apiRoutes";
import axios from "axios";

const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}${LOGIN_USER}`, credentials);

    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    throw new Error(err.response?.data?.message || "Login failed"); // Throw the error with a custom message
  }
};

const logoutUser = async () => {
  try {
    // Return a successful response
    return { success: true };
  } catch (error) {
    // Handle any errors that occur during logout
    throw new Error("Logout failed");
  }
};

export { loginUser, logoutUser };
