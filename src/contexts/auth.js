import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";
import cookie from "js-cookie";
import translateMessage from "../constants/messages";
import { useSnackbar } from "notistack";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  //return context;
  return useContext(AuthContext);
};

function useAuthProvider() {
  const [user, setUser] = useState(null);

  const handleUser = (user) => {
    if (user) {
      setUser(user);
      cookie.set("auth", true, {
        expires: 1, // dia
      });

      return user;
    } else {
      setUser(false);
      cookie.remove("auth");
      return false;
    }
  };
  const { enqueueSnackbar } = useSnackbar();

  async function register(data) {
    try {
      const response = await api.post("/register", data);
      //console.log("response", response);
      //handleUser(response.data);
      return response;
    } catch (error) {
      if (error.response) {
        enqueueSnackbar(
          "Usuario no se pudo crear, email o cédula ya existe en el sistema",
          {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          }
        );
        console.log(error.response.data);
        return Promise.reject(error.response);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  }

  async function login(data) {
    try {
      const response = await api.post("/login", data);
      enqueueSnackbar("Bienvenido al sistema SISMED", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      handleUser(response.data.user);
      return response;
    } catch (error) {
      if (error.response) {
        enqueueSnackbar("Verifique email y contraseña", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
        console.log("errores", error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  }

  async function logout() {
    try {
      const response = await api.post("/logout");
      handleUser(false);
      enqueueSnackbar("Sesión finalizada en el sistema SISMED", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      return response;
    } catch (error) {}
  }

  const sendPasswordResetEmail = async (email) => {
    await api.post("forgot-password", { email });
  };

  const confirmPasswordReset = async (
    email,
    password,
    password_confirmation,
    token
  ) => {
    // try {
    await api.post("/password_resets", {
      email,
      password,
      password_confirmation,
      token,
    });
  };

  async function getAuthenticatedUser() {
    try {
      const response = await api.get("/user");
      //console.log("Usuario activo", response);
      handleUser(response.data);
      return response;
    } catch (error) {
      handleUser(false);
      if (error.response) {
        console.log(error.response.data);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        return error.response;
      } else if (error.request) {
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  }

  useEffect(() => {
    //console.log("RENDER AUTH", user);
    try {
      getAuthenticatedUser();
    } catch (error) {
      console.log("NO USER");
    }
  }, []);

  return {
    user,
    register,
    login,
    logout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}
