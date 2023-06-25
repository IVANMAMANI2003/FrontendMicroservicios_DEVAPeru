/* eslint-disable react/prop-types */
import { useState } from "react";
import Error from "./Error";

function Form(props) {
  const {
    titleForm,
    onSubmit,
    value,
    onChange,
    showErrorMessage,
    value_02,
    onChange_02,
    showErrorMessage_02,
    value_03,
    onChange_03,
    showErrorMessage_03,
    errorMessage,
    onClick,
    isVisible,
    onTitleButton,
    onTitleSpan,
    showErrorMessage_Pri,
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword_02, setShowPassword_02] = useState(false);
  return (
    <>
      <div className="text-md font-normal md:text-base text-center">
        {titleForm}
      </div>
      <span className="flex items-center justify-center text-lg font-semibold text-gray-900">
        <img className="w-14 h-14 mr-2" src="img/deva.png" alt="logo" />
        DEVAPerú SAC
      </span>
      <Error
        showErrorMessage={showErrorMessage_Pri}
        errorMessage={errorMessage}
      />
      <form
        className="flex flex-col gap-4"
        onSubmit={onSubmit}
        autoComplete="off"
      >
        <div className="">
          <label className="block mb-2 text-sm font-normal">
            Nombre de Usuario
          </label>
          <label className="relative">
            <input
              type="userName"
              value={value}
              onChange={onChange}
              className={`input-login text-xs sm:text-sm placeholder-gray-400 focus:ring-green-600 focus:border-green-600 focus:outline-none ${
                showErrorMessage ? "input-error" : ""
              }`}
              placeholder="example"
            />
            <div className="absolute inset-y-0 left-0 pl-3 pt-1 flex items-center text-sm leading-5">
              <i className="pi pi-user"></i>
            </div>
          </label>
          <Error
            showErrorMessage={showErrorMessage}
            errorMessage={errorMessage}
          />
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
              type={showPassword ? "text" : "password"}
              value={value_02}
              onChange={onChange_02}
              autoComplete="current-password"
              placeholder="••••••••"
              className={`input-login text-xs sm:text-sm placeholder-gray-400 focus:ring-green-600 focus:border-green-600 focus:outline-none ${
                showErrorMessage_02 ? "input-error" : ""
              }`}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
              <i
                style={{ cursor: "pointer" }}
                className={`pi ${showPassword ? "pi-eye-slash" : "pi-eye"}`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
          </div>
          <Error
            showErrorMessage={showErrorMessage_02}
            errorMessage={errorMessage}
          />
          {isVisible && (
            <div className="flex items-center justify-between pt-1">
              <a
                href="{{ route('password.request') }}"
                className="text-xs sm:text-sm font-base text-green-600 hover:underline hover:text-green-500"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          )}
        </div>
        {!isVisible && (
          <div>
            <label className="block mb-2 text-sm font-normal text-gray-900">
              Repetir contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 pt-1 flex items-center text-sm leading-5">
                <i className="pi pi-lock"></i>
              </div>
              <input
                type={showPassword_02 ? "text" : "password"}
                value={value_03}
                onChange={onChange_03}
                autoComplete="new-password"
                placeholder="••••••••"
                className={`input-login text-xs sm:text-sm placeholder-gray-400 focus:ring-green-600 focus:border-green-600 focus:outline-none ${
                  showErrorMessage_03 ? "input-error" : ""
                }`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                <i
                  style={{ cursor: "pointer" }}
                  className={`pi ${showPassword_02 ? "pi-eye-slash" : "pi-eye"}`}
                  onClick={() => setShowPassword_02(!showPassword_02)}
                ></i>
              </div>
            </div>
            <Error
              showErrorMessage={showErrorMessage_03}
              errorMessage={errorMessage}
            />
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <button
              type="submit"
              className="btn-ingresar text-sm bg-gradient-to-r from-emerald-700 to-green-600 focus:ring-4 focus:outline-none focus:ring-green-300"
            >
              <div className="absolute left-0 inset-y-0 flex items-center pl-3">
                <i className="pi pi-sign-in"></i>
              </div>
              {onTitleButton}
            </button>
          </div>
          <div className="flex items-start text-right">
            <span
              onClick={onClick}
              className="text-xs sm:text-sm font-base text-green-600 hover:underline hover:text-green-500 cursor-pointer"
            >
              {onTitleSpan}
            </span>
          </div>
        </div>
      </form>
    </>
  );
}

export default Form;
