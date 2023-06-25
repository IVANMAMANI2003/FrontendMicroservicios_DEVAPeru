/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [registerMode, setRegisterMode] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
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
      console.error(error);
    } finally {
      setUserName("");
      setPassword("");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9090/auth/create", {
        userName: userName,
        password: password,
      });
      console.log("Registro exitoso");
      console.log(response);
      setRegisterMode(false);
    } catch (error) {
      console.error(error);
    } finally {
      setUserName("");
      setPassword("");
    }
  };

  return (
    <>
      <img src="/img/fondo-login.png" className="fondo-login" />

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
                <x-validation-errors />
                {registerMode ? (
                  <>
                    <div className="text-md font-normal md:text-base text-center">
                      Por favor, registra tu cuenta
                    </div>
                    <span className="flex items-center justify-center text-lg font-semibold text-gray-900">
                      <img
                        className="w-14 h-14 mr-2"
                        src="img/deva.png"
                        alt="logo"
                      />
                      DEVAPerú SAC
                    </span>
                    <form
                      className="flex flex-col gap-4"
                      onSubmit={handleRegister}
                      autoComplete="off"
                    >
                      <div className="">
                        <label className="block mb-2 text-sm font-normal">
                          Correo electrónico
                        </label>
                        <label className="relative">
                          <input
                            type="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="input-login text-xs sm:text-sm placeholder-gray-400 focus:ring-green-600 focus:border-green-600"
                            placeholder="name@company.com"
                            required
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 pt-1 flex items-center text-sm leading-5">
                            <i className="pi pi-envelope"></i>
                          </div>
                        </label>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-normal text-gray-900">
                          Contraseña
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 pt-1 flex items-center text-sm leading-5">
                            <i className="pi pi-lock"></i>
                          </div>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            placeholder="••••••••"
                            className="input-login text-xs sm:text-sm placeholder-gray-400 focus:ring-green-600 focus:border-green-600"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                            <i className="pi pi-eye"></i>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-start">
                          <button
                            type="submit"
                            className="btn-ingresar text-sm bg-gradient-to-r from-emerald-700 to-green-600 focus:ring-4 focus:outline-none focus:ring-green-300"
                          >
                            <div className="absolute left-0 inset-y-0 flex items-center pl-3 pt-1">
                              <i className="pi pi-check"></i>
                            </div>
                            Registrar
                          </button>
                        </div>
                        <div className="flex items-start text-right">
                          <span
                            onClick={() => setRegisterMode(false)}
                            className="text-xs sm:text-sm font-base text-green-600 hover:underline hover:text-green-500 cursor-pointer"
                          >
                            ¿Ya tienes una cuenta? Inicia sesión
                          </span>
                        </div>
                      </div>
                    </form>
                  </>
                ) : (
                  <>
                    <div className="text-md font-normal md:text-base text-center">
                      Por favor, ingresa con tu cuenta
                    </div>
                    <span className="flex items-center justify-center text-lg font-semibold text-gray-900">
                      <img
                        className="w-14 h-14 mr-2"
                        src="img/deva.png"
                        alt="logo"
                      />
                      DEVAPerú SAC
                    </span>
                    <form
                      className="flex flex-col gap-4"
                      onSubmit={handleLogin}
                      autoComplete="off"
                    >
                      <div className="">
                        <label className="block mb-2 text-sm font-normal">
                          Correo electrónico
                        </label>
                        <label className="relative">
                          <input
                            type="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="input-login text-xs sm:text-sm placeholder-gray-400 focus:ring-green-600 focus:border-green-600"
                            placeholder="name@company.com"
                            required
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 pt-1 flex items-center text-sm leading-5">
                            <i className="pi pi-envelope"></i>
                          </div>
                        </label>
                      </div>
                      <div>
                        <label className="block mb-2 text-sm font-normal text-gray-900">
                          Contraseña
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 pt-1 flex items-center text-sm leading-5">
                            <i className="pi pi-lock"></i>
                          </div>
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            placeholder="••••••••"
                            className="input-login text-xs sm:text-sm placeholder-gray-400 focus:ring-green-600 focus:border-green-600"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                            <i className="pi pi-eye"></i>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <a
                            href="{{ route('password.request') }}"
                            className="text-xs sm:text-sm font-base text-green-600 hover:underline hover:text-green-500"
                          >
                            ¿Olvidaste tu contraseña?
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-start">
                          <button
                            type="submit"
                            className="btn-ingresar text-sm bg-gradient-to-r from-emerald-700 to-green-600 focus:ring-4 focus:outline-none focus:ring-green-300"
                          >
                            <div className="absolute left-0 inset-y-0 flex items-center pl-3 pt-1">
                              <i className="pi pi-sign-in"></i>
                            </div>
                            Ingresar
                          </button>
                        </div>
                        <div className="flex items-start text-right">
                          <span
                            onClick={() => setRegisterMode(true)}
                            className="text-xs sm:text-sm font-base text-green-600 hover:underline hover:text-green-500 cursor-pointer"
                          >
                            ¿No tienes una cuenta? Regístrate
                          </span>
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
