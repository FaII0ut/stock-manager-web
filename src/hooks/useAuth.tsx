import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "../api/axios";
import { useStoreActions, useStoreState } from "../store/hooks";
import { toast } from "react-toastify";

const useAuth = () => {
  const setSetting = useStoreActions((action) => action.user.setSetting);
  const setUser = useStoreActions((action) => action.user.setUser);
  const setToken = useStoreActions((action) => action.user.setToken);
  const user = useStoreState((state) => state.user.user);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setCheckingAuth(false);
    }
  }, [user]);

  // login function
  const login = async (email: string, password: string) => {
    try {
      await csrf();
      const response = await axios.post("auth/login", {
        email: email,
        password: password,
      });
      console.log(response);
      if (response.status === 200) {
        setUser(response.data.data.data.user);
        setToken(response.data.data.data.token);
        setSetting(response.data.data.data);
        localStorage.setItem("token", response.data.data.data.token);
        Router.push("/");
      } else {
        errorMsg();
      }
    } catch (error) {
      errorMsg();
    }
  };

  const errorMsg = () => {
    toast.error("🚧 Are you sure you are doing this right? 🚧", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  };

  const csrf = async () => {
    if (!process.env.NEXT_PUBLIC_HOST) {
      return;
    }

   
    try {
      await axios.get('sanctum/csrf-cookie');
    } catch (error) {
      console.error("Failed to fetch CSRF token:", error);
      // Router.push("/login");
    }
  };


  // logout function
  const logout = async () => {
    localStorage.removeItem("token");
    Router.push("/login");
  };

  // logout function
  const getUser = async () => {
    if (user) {
      return user;
    }

    try {
      await csrf();
      const response = await axios.get("auth/me");
      if (response.status === 200) {
        setUser(response.data.user);
        setToken(response.data.token);
        setSetting(response.data);
        router.asPath === "login" && Router.push("/");
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      Router.push("/login");
    }
  };

  return {
    login,
    logout,
    getUser,
  };
};

export default useAuth;
