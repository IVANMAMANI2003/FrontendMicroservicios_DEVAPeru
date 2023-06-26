/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import "jspdf-autotable";
//import { creamensaje } from "../components/Mensaje";
import { CreateUpdate } from "../components/FormMensaje"
import Footer from '../partials/Footer';

import {
  createMensaje,
} from "../services/MensajeService";


export default function Contatanos() {
  const [mensajeDialog, setMensajeDialog] = useState(true);
  let dataMensaje = {
    id: null,
    nombre: "",
    correo: "",
    fecha: "",
    telefono: "",
    asunto: "",
  };

  const [mensaje, setMensaje] = useState(dataMensaje);
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);


  useEffect(() => {

  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  const onSubmit = (data, form) => {
    // setFormData(data);
    // setShowMessage(true);

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
      <div style={{ padding: '2rem', textAlign: 'center', fontSize: '3.10rem', backgroundColor: 'white' }}>
        <a style={{ fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif", borderBottomWidth: '2px', borderBottomColor: 'black' }} >
          CONTÁCTANOS
        </a>
      </div>
      <div style={{ padding: '2.4rem', textAlign: 'center' }}>
        <span>
          ¡Bienvenidos a DEVAPERÚ! Estamos comprometidos en brindarle un servicio excepcional y satisfacer todas sus necesidades. Nos enorgullece ofrecer soluciones personalizadas y de calidad que superen sus expectativas
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', padding: '1rem', justifyContent: 'center'}} >
        <div style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'row', flex: '1', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ maxWidth: '20rem', width: '100%', display: 'flex', justifyContent: 'center' }} >
            <div style={{
              borderRadius: '0.75rem', boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)',
              outlineWidth: '2px', outlineStyle: 'solid', fontSize: '0.875rem', margin: '1.5rem', color: '#cdd3d0'
            }} >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'left', color: 'black' }}>
                <span style={{ marginTop: '0.5rem', marginBottom: '0.5rem', fontWeight: 'bold', margin: '0.75rem' }}>
                  <i className="pi pi-map-marker"></i>
                  Dirección
                  <p style={{ fontWeight: 'normal' }}>
                    Lorem ipsum dolor sit amet <br /> consectetur adipiscing elit ultrices
                  </p>
                  <br />
                  <i className="pi pi-phone"></i>
                  Teléfonos
                  <p className="font-normal">
                    (+51) 999 999 999 <br />
                    254 - 3412 <br />
                    354 - 4589
                  </p>
                  <br />
                  <i className="pi pi-envelope"></i>
                  Correo Electrónico <br />
                  <a className="font-normal hover:text-green-500">admin@grupodeva.pe</a>
                </span>
                <div className="flex flex-shrink-0 items-center justify-center">
                  <iframe
                    className="items-center"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3844.2890361930595!2d-70.11398948454165!3d-15.52262852046589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9167f5484b369675%3A0xfdbeb0b4e54aafe0!2sDEVAPERU!5e0!3m2!1ses!2spe!4v1669720678058!5m2!1ses!2spe"
                    width="300"
                    height="385"
                  ></iframe>
                </div>
              </div>
            </div>
            <div style={{
              borderRadius: '0.75rem', boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.1)', outlineWidth: '2px', outlineStyle: 'solid', fontSize: '0.875rem', margin: '1.5rem', color: '#cdd3d0'
            }}>
              <div style={{
                marginTop: '1.5rem', '@media (minWidth: 640px)': {
                  marginTop: '0'
                }
              }}>
                {/*gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'*/}
                <div style={{ display: 'grid', gap: '1.1rem' }}>
                  <div style={{
                    marginTop: '0.01rem', '@media (minWidth: 768px)': {
                      gridColumn: 'span 2', marginTop: '0'
                    }
                  }}>
                    <CreateUpdate
                      width='30rem'
                      ismensaje={true}
                      onHide={hideDialog}
                      htmlFor_00="nombre"
                      label_00="Nombre"
                      id_00="nombre"
                      value_00={mensaje.nombre}
                      onChange_00={(e) => onInputChange(e, "nombre")}
                      className_00={classNames({
                        "p-invalid": submitted && mensaje.nombre
                      })}
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
                      htmlFor_02="telefono"
                      label_02="Telefono"
                      id_02="telefono"
                      value_02={mensaje.telefono}
                      onChange_02={(e) => onInputChange(e, "telefono")}
                      className_02={classNames({ "p-invalid": submitted && !mensaje.telefono })}
                      msgRequired_02={
                        submitted &&
                        !mensaje.telefono && (
                          <small className="p-error">El telefono es obligatorio.</small>
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
                      htmlFor_04="mensaje"
                      label_04="Mensaje"
                      id_04="mensaje"
                      value_04={mensaje.mensaje}
                      onChange_04={(e) => onInputChange(e, "mensaje")}
                      className_04={classNames({ "p-invalid": submitted && !mensaje.mensaje })}
                      msgRequired_04={
                        submitted &&
                        !mensaje.mensaje && <small className="p-error">El mensaje es obligatorio.</small>

                      }
                    />
                    <div style={{
                      padding: '0.1rem',
                      paddingBottom: '0.1rem',
                      display: 'flex',
                      backgroundColor: 'white',
                      flex: '1',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '@media (minWidth: 768px)': {
                        alignItems: 'stretch',
                        justifyContent: 'flex-start'
                      }
                    }}>
                      <Button label="Enviar" icon="pi pi-send" onClick={saveUpdate} />
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Incluir el componente de pie de página */}
      <Footer />
    </div>

  );
}