import _axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";

var axios = _axios.create({
  baseURL: process.env.NEXT_PUBLIC_HOST,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
  },
  withCredentials: true,
});

axios.interceptors.request.use(
  function (config: any) {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (config) => {
    let url = config.config.url ?? "";

    if (config.config.method == "get") {
      // setShowFromStore(true)
    }
    if (config.config.method == "put") {
      toast.success("Updated successfully", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
    if (config.config.method == "post") {
      toast.success("Created successfully", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
    return config;
  },

  (error) => {
    if (error.response) {
      if (error.response.status === 408 || error.code === "ECONNABORTED") {
      }
      // if (error.response.status === 401 || error.response.status === 419) {
      //   Router.push("/login");
      // }
      if (error.response.status === 500) {
        toast("🦄 500 Server error.", {
          position: "bottom-left",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
      }
      if (error.response.status === 403) {
        toast.warn(String(error.response.data.message), {
          position: "bottom-left",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
      }
      if (error.response.status === 422) {
        Object.keys(error.response.data.errors).map((key, index) => {
          setTimeout(() => {
            toast.error(String(error.response.data.errors[key][0]), {
              position: "bottom-left",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "dark",
            });
          }, 100 * index);
        });
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
