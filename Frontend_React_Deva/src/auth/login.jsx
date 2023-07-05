/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "../components/Form";

function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [registerMode, setRegisterMode] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showErrorMessage_02, setShowErrorMessage_02] = useState(false);
  const [showErrorMessage_03, setShowErrorMessage_03] = useState(false);
  const [showErrorMessage_04, setShowErrorMessage_04] = useState(false);
  const [showErrorMessage_Pri, setShowErrorMessage_Pri] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (userName === "" || password === "") {
      setErrorMessage("Por favor, completa todos los campos");
      setShowErrorMessage(true);
      setShowErrorMessage_02(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost:9090/auth/login", {
        userName: userName,
        password: password,
      });
      // Procesar la respuesta del backend, por ejemplo, guardar el token en el almacenamiento local
      const token = response.data.token;
      console.log("Guardado exitoso");
      console.log("token", token);
      // Almacenar el token en el almacenamiento local
      localStorage.setItem("token", token);
      navigate("/sistema-dashboard");
      window.location.reload();
    } catch (error) {
      setErrorMessage(
        "Por favor, introduzca un nombre de usuario y contraseña correctos."
      );
      setShowErrorMessage_Pri(true);
      console.error(error);
    } finally {
      setUserName("");
      setPassword("");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (userName === "" || password === "" || repeatPassword === "") {
      setErrorMessage("Por favor, completa todos los campos");
      setShowErrorMessage(true);
      setShowErrorMessage_02(true);
      setShowErrorMessage_03(true);
      setShowErrorMessage_04(true);
      return;
    }
    if (password !== repeatPassword) {
      setErrorMessage("Las contraseña no coincide");
      setShowErrorMessage_03(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost:9090/auth/create", {
        userName: userName,
        password: password,
        correo: correo,
      });
      console.log("Registro exitoso");
      console.log(response);
      setRegisterMode(false);
    } catch (error) {
      console.error(error);
    } finally {
      setUserName("");
      setCorreo("");
      setPassword("");
      setRepeatPassword("");
    }
  };

  const resetForm = () => {
    setUserName("");
    setPassword("");
    setRepeatPassword("");
    setShowErrorMessage(false);
    setShowErrorMessage_02(false);
    setShowErrorMessage_03(false);
    setShowErrorMessage_04(false);
    setShowErrorMessage_Pri(false);
  };

  const handleInputChange = (e, setState, setShowError) => {
    setState(e.target.value);
    if (setShowError) {
      setShowError(false);
      setShowErrorMessage_Pri(false);
    }
  };

  return (
    <>
      <img
        src="/img/fondo-login.png"
        className="fondo-login"
        alt="login-img-fondo"
      />

      <div className="flex items-center h-screen">
        <div className="cont-area top-0 rounded-b-lg">
          <div className="flex gap-2">
            <div className="flex-1 bg-green-600 h-1 rounded-md"></div>
            <div className="flex-1 bg-blue-600 h-1 rounded-md"></div>
            <div className="flex-1 bg-yellow-500 h-1 rounded-md"></div>
            <div className="flex-1 bg-red-600 h-1 rounded-md"></div>
            <div className="flex-1 bg-gray-700 h-1 rounded-md"></div>
          </div>
          <div className="p-3 text-center">
            <div className="flex justify-between">
              <a
                href="/inicio"
                className="inline-flex items-center px-3 py-1 bg-white rounded-lg font-normal text-xs text-gray-700 uppercase hover:text-gray-900 focus:outline-none active:text-white active:bg-gray-800 disabled:opacity-25 transition"
              >
                <i className="pi pi-arrow-left mr-2"></i>
                Regresar
              </a>
              <div></div>
            </div>
          </div>
        </div>
        <div className="cont-area bottom-0 rounded-t-lg">
          <div className="p-3 text-center text-gray-600 text-sm">
            © 2022 DEVAPerú SAC. Todos los derechos reservados
          </div>
          <div className="flex gap-2">
            <div className="flex-1 bg-green-600 h-1 rounded-md"></div>
            <div className="flex-1 bg-blue-600 h-1 rounded-md"></div>
            <div className="flex-1 bg-yellow-500 h-1 rounded-md"></div>
            <div className="flex-1 bg-red-600 h-1 rounded-md"></div>
            <div className="flex-1 bg-gray-700 h-1 rounded-md"></div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="sombra w-full bg-white rounded-xl border max-w-sm border-gray-300">
              <div className="p-6 space-y-5">
                <div className="text-xl flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-green-300 after:mt-0.5 after:flex-1 after:border-t after:border-green-300">
                  <p className="mx-4 mb-0 text-center font-semibold text-green-600">
                    ¡Bienvenido!
                  </p>
                </div>
                <Form
                  showErrorMessage_Pri={showErrorMessage_Pri}
                  titleForm={
                    registerMode
                      ? "Por favor, registra tu cuenta"
                      : "Por favor, ingresa con tu cuenta"
                  }
                  isVisible={!registerMode}
                  onSubmit={registerMode ? handleRegister : handleLogin}
                  value={userName}
                  onChange={(e) =>
                    handleInputChange(e, setUserName, setShowErrorMessage)
                  }
                  value_02={password}
                  onChange_02={(e) =>
                    handleInputChange(e, setPassword, setShowErrorMessage_02)
                  }
                  value_03={repeatPassword}
                  onChange_03={(e) =>
                    handleInputChange(
                      e,
                      setRepeatPassword,
                      setShowErrorMessage_03
                    )
                  }
                  value_04={correo}
                  onChange_04={(e) =>
                    handleInputChange(e, setCorreo, setShowErrorMessage_04)
                  }
                  showErrorMessage={showErrorMessage}
                  showErrorMessage_02={showErrorMessage_02}
                  showErrorMessage_03={showErrorMessage_03}
                  showErrorMessage_04={showErrorMessage_04}
                  errorMessage={errorMessage}
                  onClick={() => {
                    setRegisterMode(!registerMode);
                    resetForm();
                  }}
                  onTitleButton={registerMode ? "Registrar" : "Ingresar"}
                  onTitleSpan={
                    registerMode
                      ? "¿Ya tienes una cuenta? Inicia sesión"
                      : "¿No tienes una cuenta? Regístrate"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
