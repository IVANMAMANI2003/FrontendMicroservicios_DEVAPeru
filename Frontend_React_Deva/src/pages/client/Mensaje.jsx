import { useState } from "react";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import "jspdf-autotable";
import { CreateUpdate } from "../../components/FormMensaje";
import { createMensaje } from "../../services/MensajeService";
import { useRef } from "react";

export default function Message() {
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
  const toastComponentRef = useRef(null);
  const toast = useRef(null);

  const saveUpdate = () => {
    setSubmitted(true);
    if (
      !mensaje.nombre ||
      !mensaje.correo ||
      !mensaje.fecha ||
      !mensaje.telefono ||
      !mensaje.asunto
    ) {
      console.error("Campos vacíos");
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "Completa los campos",
        life: 3000,
      });

      return;
    }
    toast.current = toastComponentRef.current;

    createMensaje(mensaje)
      .then(() => {
        toast.current.show({
          severity: "success",
          summary: "Éxito",
          detail: "Mensaje Enviado",
          life: 3000,
        });
      })
      .catch((error) => {
        console.error("Error al enviar el mensaje", error);
        console.log("Error al enviar el mensaje", error);
      });
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _mensaje = { ...mensaje };

    _mensaje[`${name}`] = val;

    setMensaje(_mensaje);
  };

  const isFieldInvalid = (field) => {
    return submitted && !mensaje[field];
  };

  return (
    <div>
      <div className="p-2 text-5xl bg-white md:px-10 px-5 md:flex-row lg:max-w-full md:max-w-full text-justify justify-between">
        <div className="pr-0 sm:px-0">
          <h1 className="text-2xl font-bold text-center items-center">
            <u>CONTÁCTANOS</u>
          </h1>
        </div>
      </div>
      <div className="mt-3">
        <div className="bg-white flex flex-1 items-center justify-center md:items-stretch md:justify-start">
          <div className="max-w-sm w-full lg:max-w-full lg:flex justify-center">
            <div className="rounded-xl shadow-xl focus:ring-indigo-400 sm:text-sm m-6">
              <div className="flex flex-col items-center text-left">
                <span className="my-2 font-bold m-3">
                  <ion-icon name="location-outline"></ion-icon>
                  Dirección
                  <p className="font-normal">
                    Lorem ipsum dolor sit amet <br /> consectetur adipiscing
                    elit ultrices
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
                  <a className="font-normal hover:text-green-500">
                    admin@grupodeva.pe
                  </a>
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
            <div className="order-last w-full">
              <CreateUpdate
                width="30rem"
                htmlFor_00="nombre"
                label_00="Nombre"
                id_00="nombre"
                value_00={mensaje.nombre}
                onChange_00={(e) => onInputChange(e, "nombre")}
                className_00={classNames({
                  "p-invalid": isFieldInvalid("nombre"),
                })}
                msgRequired_00={
                  isFieldInvalid("nombre") && (
                    <small className="p-error">El nombre es obligatorio.</small>
                  )
                }
                htmlFor_01="correo"
                label_01="Correo"
                id_01="correo"
                value_01={mensaje.correo}
                onChange_01={(e) => onInputChange(e, "correo")}
                className_01={classNames({
                  "p-invalid": isFieldInvalid("correo"),
                })}
                msgRequired_01={
                  isFieldInvalid("correo") && (
                    <small className="p-error">El correo es obligatorio.</small>
                  )
                }
                htmlFor_02="fecha"
                label_02="Fecha"
                id_02="fecha"
                value_02={mensaje.fecha}
                onChange_02={(e) => onInputChange(e, "fecha")}
                className_02={classNames({
                  "p-invalid": isFieldInvalid("fecha"),
                })}
                msgRequired_02={
                  isFieldInvalid("fecha") && (
                    <small className="p-error">La fecha es obligatoria.</small>
                  )
                }
                htmlFor_03="telefono"
                label_03="Telefono"
                id_03="telefono"
                value_03={mensaje.telefono}
                onChange_03={(e) => onInputChange(e, "telefono")}
                className_03={classNames({
                  "p-invalid": isFieldInvalid("telefono"),
                })}
                msgRequired_03={
                  isFieldInvalid("telefono") && (
                    <small className="p-error">
                      El teléfono es obligatorio.
                    </small>
                  )
                }
                htmlFor_04="asunto"
                label_04="Asunto"
                id_04="asunto"
                value_04={mensaje.asunto}
                onChange_04={(e) => onInputChange(e, "asunto")}
                className_04={classNames({
                  "p-invalid": isFieldInvalid("asunto"),
                })}
                msgRequired_04={
                  isFieldInvalid("asunto") && (
                    <small className="p-error">El asunto es obligatorio.</small>
                  )
                }
              />
            </div>
          </div>
          <div className="mt-4">
            <Button
              className=""
              label="Enviar"
              icon="pi pi-send"
              onClick={saveUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
