import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "jspdf-autotable";
import Table from "../components/Table";
import {
    getMensajeList,
    createMensaje,
    updateMensaje,
    deleteMensaje,
    deleteSelectedMensaje,
} from "../services/MensajeService";
import { exportToExcel, exportToPdf } from "../exports/ExportFileCat";


export default function  ReactFinalFormDemo(){
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
      const [submitted, setSubmitted] = useState(false);
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
    
        if (mensaje.nombre && mensaje.correo) {
          if (mensaje.id || isCreating === false) {
            
          } else {
            createMensaje(mensaje)
              .then(() => {
                getMensajes();
                setMensajeDialog(false);
                toast.current.show({
                  severity: "success",
                  summary: "Éxito",
                  detail: "Usuario creado",
                  life: 3000,
                });
              })
              .catch((error) => {
                console.error("Error al crear el usuario", error);
                console.log("Error al crear el usuario:", error);
              });
          }
        }
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
 {/*   const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false) } /></div>;
    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" >
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );*/}

    return (
        <div>
      <div className="grid lg:grid-cols-1 lg:p-5 justify-center ">
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
                   
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>

            <div className="rounded-xl shadow-xl focus:ring-indigo-500 sm:text-sm m-2">
              <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-2 md:gap-6">
                  <div className="mt-5 md:col-span-2 md:mt-0">
                    <form >
                      <div className="overflow-hidden shadow sm:rounded-md">
                        <div className="bg-white px-4 py-5 sm:p-6">
                          <div className="grid grid-cols-2">
                            <div className="p-2">
                              <label htmlFor_00="nombre" label_00="Nombre"  id_00="nombre" value_00={mensaje.nombre} className="block text-sm font-medium text-gray-700">
                                Nombre
                              </label>
                              <InputText id="nombre" className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
                            </div>

                            <div className="p-2">
                              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                                Teléfono
                              </label>
                              <InputText id="telefono" className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
                            </div>

                            <div className="col-span-10 p-2">
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Correo Electrónico
                              </label>
                              <InputText id="email" className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
                            </div>

                            <div className="col-span-10 p-2">
                              <label htmlFor="asunto" className="block text-sm font-medium text-gray-700">
                                Asunto
                              </label>
                              <InputText id="asunto" className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" required />
                            </div>

                            <div className="col-span-10 p-2">
                              <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700">
                                Mensaje
                              </label>
                              <textarea  rows={4}
                                cols={40}
                                id="mensaje"
                                
                                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                              />
                            </div>
                          </div>
                        </div>
                        <div className=" bg-white px-4 pb-6 flex flex-1 items-center justify-center md:items-stretch md:justify-star">
                          <Button
                            type="submit"
                            label="ENVIAR"
                            className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition"
                          ></Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Incluir el componente de pie de página */}
    </div>
    );
}


{/** htmlFor_00="nombre"
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
          
        } */}