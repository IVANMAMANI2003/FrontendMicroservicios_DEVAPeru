import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "jspdf-autotable";
//import { creamensaje } from "../components/Mensaje";
import { DialogCreateUpdate } from "../components/nuevomensaje"

import {
  createMensaje,
} from "../services/MensajeService";
import { exportToExcel, exportToPdf } from "../exports/ExportFileCat";


export default function ReactFinalFormDemo() {
  const [mensajeDialog, setMensajeDialog] = useState(true);
  let dataMensaje = {
    id: null,
    nombre: "",
    correo: "",
    fecha: "",
    telefono: "",
    asunto: "",
  };
  const [mensajes, setMensajes] = useState([]);
  const [mensaje, setMensaje] = useState(dataMensaje);
  const [submitted, setSubmitted] = useState(true);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);


  useEffect(() => {

  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = (data, form) => {
    setFormData(data);
    setShowMessage(true);

    form.restart();
  };

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
  };
  const saveUpdate = () => {
    setSubmitted(true);
    createMensaje(mensaje)
  };
  const openNew = () => {
    setMensaje(dataMensaje);
    setSubmitted(false);
    setMensajeDialog(true);
    setModalTitle("Crear Mensaje");
    setIsCreating(true);
  };
  const hideDialog = () => {
    setSubmitted(false);
    setMensajeDialog(false);
  };
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _mensaje = { ...mensaje };

    _mensaje[`${name}`] = val;

    setMensaje(_mensaje);
  };
  return (

    <div >
      <div className="p-2  text-center text-5xl bg-white  md:px-10 px-5 bg-white md:flex-row lg:max-w-full md:max-w-full text-justify justify-between">
        <div className="pr-0 sm:px-0">
          <h1 className="text-2xl font-bold text-center  items-center  ">
            <u>CONTÁCTANOS</u>
          </h1>
        </div>
      </div>
      <div className="mt-3">
        <div className="bg-white flex flex-1 items-center justify-center md:items-stretch md:justify-start">
          <div className="max-w-sm w-full lg:max-w-full lg:flex justify-center">
            <div className="rounded-xl shadow-xl focus:ring-indigo-400 sm:text-sm  m-6">
              <div className="flex flex-col items-center text-left">
                <span className="my-2 font-bold m-3">
                  <ion-icon name="location-outline"></ion-icon>
                  Dirección
                  <p className="font-normal">
                    Lorem ipsum dolor sit amet <br /> consectetur adipiscing elit ultrices
                  </p>
                  <br />
                  <ion-icon name="call-outline"></ion-icon>
                  Teléfonos
                  <p className="font-normal">
                    (+51) 999 999 999 <br />
                    254 - 3412 <br />
                    354 - 4589
                  </p>
                  <br />
                  <ion-icon name="mail-outline"></ion-icon>
                  Correo Electrónico <br />
                  <a className="font-normal hover:text-green-500">admin@grupodeva.pe</a>
                </span>
                <div className="flex flex-shrink-0 items-center justify-center">
                  <iframe
                    className="items-center"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3844.2890361930595!2d-70.11398948454165!3d-15.52262852046589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9167f5484b369675%3A0xfdbeb0b4e54aafe0!2sDEVAPERU!5e0!3m2!1ses!2spe!4v1669720678058!5m2!1ses!2spe"
                    width="300"
                    height="300"
                  ></iframe>
                </div>
              </div>
            </div>
            <DialogCreateUpdate
              width='30rem'
              ismensaje={true}
              header={modalTitle}
              onHide={hideDialog}
              htmlFor_00="nombre"
              label_00="Nombre"
              id_00="nombre"
              value_00={mensaje.nombre}
              onChange_00={(e) => onInputChange(e, "nombre")}
              className_00={classNames({ "p-invalid": submitted && !mensaje.nombre })}
              msgRequired_00={
                submitted &&
                !mensaje.nombre && (
                  <small className="p-error">El nombre es obligatorio.</small>
                )
              }
              htmlFor_01="correo"
              label_01="Correo"
              id_01="correo"
              value_01={mensaje.correo}
              onChange_01={(e) => onInputChange(e, "correo")}
              className_01={classNames({ "p-invalid": submitted && !mensaje.correo })}
              msgRequired_01={
                submitted &&
                !mensaje.correo && <small className="p-error">El correo es obligatorio.</small>
              }
              htmlFor_02="fecha"
              label_02="Fecha"
              id_02="fecha"
              value_02={mensaje.fecha}
              onChange_02={(e) => onInputChange(e, "fecha")}
              className_02={classNames({ "p-invalid": submitted && !mensaje.fecha })}
              msgRequired_02={
                submitted &&
                !mensaje.fecha && (
                  <small className="p-error">El fecha es obligatorio.</small>
                )
              }
              htmlFor_03="telefono"
              label_03="Telefono"
              id_03="telefono"
              value_03={mensaje.telefono}
              onChange_03={(e) => onInputChange(e, "telefono")}
              className_03={classNames({
                "p-invalid": submitted && !mensaje.telefono,
              })}
              msgRequired_03={
                submitted &&
                !mensaje.telefono && (
                  <small className="p-error">La telefono es obligatorio.</small>
                )
              }
              htmlFor_04="asunto"
              label_04="Asunto"
              id_04="asunto"
              value_04={mensaje.asunto}
              onChange_04={(e) => onInputChange(e, "asunto")}
              className_04={classNames({ "p-invalid": submitted && !mensaje.asunto })}
              msgRequired_04={
                submitted &&
                !mensaje.asunto && <small className="p-error">El asunto es obligatorio.</small>

              }
            />

          </div>
          
        </div>
        <Button label="Guardar" icon="pi pi-send" onClick={saveUpdate} />
      </div>

      {/* Incluir el componente de pie de página */}
    </div>
  );
}


{/** htmlFor="nombre"
        label="Nombre"
        id="nombre"
        value={mensaje.nombre}
        onChange={(e) => onInputChange(e, "nombre")}
        className={classNames({ "p-invalid": submitted && !mensaje.nombre })}
        msgRequired={
          submitted &&
          !mensaje.nombre && (
            <small className="p-error">El nombre es obligatorio.</small>
          )
        }
        htmlFor_01="correo"
        label_01="Correo"
        id_01="correo"
        value_01={mensaje.correo}
        onChange_01={(e) => onInputChange(e, "correo")}
        className_01={classNames({ "p-invalid": submitted && !mensaje.correo })}
        msgRequired_01={
          submitted &&
          !mensaje.correo && <small className="p-error">El correo es obligatorio.</small>
        }
        htmlFor_02="fecha"
        label_02="Fecha"
        id_02="fecha"
        value_02={mensaje.fecha}
        onChange_02={(e) => onInputChange(e, "fecha")}
        className_02={classNames({ "p-invalid": submitted && !mensaje.fecha })}
        msgRequired_02={
          submitted &&
          !mensaje.fecha && (
            <small className="p-error">El fecha es obligatorio.</small>
          )
        }
        htmlFor_03="telefono"
        label_03="Telefono"
        id_03="telefono"
        value_03={mensaje.telefono}
        onChange_03={(e) => onInputChange(e, "telefono")}
        className_03={classNames({
          "p-invalid": submitted && !mensaje.telefono,
        })}
        msgRequired_03={
          submitted &&
          !mensaje.telefono && (
            <small className="p-error">La telefono es obligatorio.</small>
          )
        }
        htmlFor_04="asunto"
        label_04="Asunto"
        id_04="asunto"
        value_04={mensaje.asunto}
        onChange_04={(e) => onInputChange(e, "asunto")}
        className_04={classNames({ "p-invalid": submitted && !mensaje.asunto })}
        msgRequired_04={
          submitted &&
          !mensaje.asunto && <small className="p-error">El asunto es obligatorio.</small>
          
        } */}