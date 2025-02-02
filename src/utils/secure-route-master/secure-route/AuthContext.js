import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode"; // Make sure jwt-decode is imported correctly
import global from "../../config/Global.json"

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {

  let getAPI = (API_NAME) => {
    return global.api.host + global.api[API_NAME];
  }

  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authToken") ? JSON.parse(localStorage.getItem("authToken")) : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem("authToken") ? jwtDecode(localStorage.getItem("authToken")) : {}
  );

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const loginUser = (e) => {
    e.preventDefault();
    axios
      .post(getAPI("token"), {
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then((response) => {
        if (global.checkSuperUser !== undefined && global.checkSuperUser === true) {
          checkSuperUser(response.data.access);
        }

        setAuthToken(response.data);
        setUser(jwtDecode(response.data.access));
        localStorage.setItem("authToken", JSON.stringify(response.data));
      })
      .catch((error) => {
        toast.error("Username or password incorrect");
        console.error(error);
      });
  };

  const checkSuperUser = async (token) => {
    try {
      const response = await axios.get(getAPI("isSuperUser"), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.is_superuser) {
        toast.success("Welcome, Admin");
      } else {
        logOutUser("User is not super user");
      }
    } catch (error) {
      toast.error("Error checking user permissions");
      console.error(error);
    }
  };



  const logOutUser = (message) => {
    setAuthToken(null);
    setUser({});
    localStorage.removeItem("authToken");
    if (message) toast.error(message);
    // navigate("login");
  };


  useEffect(() => {
    const checkSuperUserRefresh = async (token) => {
     
      try {
        const response = await axios.get(getAPI("isSuperUser"), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.data.is_superuser) {
          logOutUser("User is not super user");
        }
      } catch (error) {
        toast.error("Error checking user permissions");
        console.error(error);
      }
    };
    const refreshToken = () => {
      if (authToken?.refresh) {
        axios
          .post(getAPI("refreshToken"), { refresh: `${authToken.refresh}` })
          .then((response) => {
            if (global.checkSuperUser !== undefined && global.checkSuperUser === true) {
              checkSuperUserRefresh(response.data.access);
            }

            setAuthToken(response.data);
            setUser(jwtDecode(response.data.access));
            localStorage.setItem("authToken", JSON.stringify(response.data));
          })
          .catch(logOutUser); // Log out if there's an error
      } else {
        logOutUser();
      }

      if (loading) {
        setLoading(false);
      }
    };
    if (loading) {
      refreshToken();
    }

    const fourMinutes = 1000 * 60 * 4;
    const interval = setInterval(() => {
      if (authToken) {
        refreshToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authToken, loading]);

  const contextData = {
    user,
    loginUser,
    logOutUser,
    authToken,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
