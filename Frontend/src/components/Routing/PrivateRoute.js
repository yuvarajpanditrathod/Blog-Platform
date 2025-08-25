import { useEffect, useState, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../Context/AuthContext";

const PrivateRoute = () => {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const { setActiveUser, setConfig } = useContext(AuthContext);

  useEffect(() => {
    const controlAuth = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/auth/private", config);
        setAuth(true);
        setActiveUser(data.user);
        setConfig(config);
      } catch (error) {
        // If token is invalid or expired, redirect to login
        localStorage.removeItem("authToken");
        setAuth(false);
        setActiveUser({});
        navigate("/login"); // Redirect to login page
      }
    };

    // Check authentication status on every render
    controlAuth();
  }, [navigate, setActiveUser, setConfig]);

  // Render the protected component if authorized, else redirect to login
  return auth ? <Outlet /> : null;  // `null` or redirect to login is fine
};

export default PrivateRoute;
