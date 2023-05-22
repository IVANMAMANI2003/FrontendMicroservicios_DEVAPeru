import React, { useState, useEffect, useRef } from "react";

// Importaciones de PrimeReact
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "jspdf-autotable";
import Table from "../components/Table";
import { DialogDelete } from "../components/Dialog";
import {
    getMensajeList,
    createMensaje,
    updateMensaje,
    deleteMensaje,
    deleteSelectedMensaje,
} from "../services/MensajeService";
import { exportToExcel, exportToPdf } from "../exports/ExportFileCat";
import { DialogCreateUpdate } from "../components/Dialog";
export default function mensaje() {
    let dataMensaje = {
      id: null,
      nombre: "",
      correo: "",
      fecha: "",
      telefono: "",
      asunto: "",
    };
    const [mensajes, setMensajes] = useState([]);
    const [mensajeDialog, setMensajeDialog] = useState(false);
    const [deleteMensajeDialog, setDeleteMensajeDialog] = useState(false);
    const [deleteMensajesDialog, setDeleteMensajesDialog] = useState(false);
    const [mensaje, setMensaje] = useState(dataMensaje);
    const [selectedMensajes, setSelectedMensajes] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
    
    useEffect(() => {
        getMensajes();
      }, []);
      const getMensajes = () => {
        getMensajeList()
          .then((response) => {
            setMensajes(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      const saveUpdate = () => {
        setSubmitted(true);
    
        if (mensaje.nombre && mensaje.correo) {
          if (mensaje.id || isCreating === false) {
            updateMensaje(mensaje)
              .then(() => {
                getMensajes();
                setMensajeDialog(false);
                toast.current.show({
                  severity: "success",
                  summary: "Éxito",
                  detail: "Usuario actualizado",
                  life: 3000,
                });
              })
              .catch((error) => {
                console.error("Error al actualizar el usuario:", error);
              });
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
      const removeMensaje = () => {
        deleteMensaje(mensaje.id)
          .then(() => {
            getMensajes();
          })
          .catch((error) => {
            console.log(error);
          });
        setDeleteMensajeDialog(false);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Usuario Eliminado",
          life: 3000,
        });
      };
      const removeSelectedMensajes = () => {
        const mensajeIds = selectedMensajes.map((mensaje) => mensaje.id);
        deleteSelectedMensaje(mensajeIds)
          .then(() => {
            setMensaje((prevmensajes) =>
            prevmensajes.filter((c) => !mensajeIds.includes(c.id))
            );
            setSelectedMensajes(null);
            toast.current.show({
              severity: "success",
              summary: "Successful",
              detail: "Usuarios Eliminados",
              life: 3000,
            });
            getMensajes();
          })
          .catch((error) => {
            console.error("Error al eliminar las usuarios:", error);
          });
        setDeleteMensajesDialog(false);
      };

      const openNew = () => {
        setMensaje(dataMensaje);
        setSubmitted(false);
        setMensajeDialog(true);
        setModalTitle("Crear Mensaje");
        setIsCreating(true);
      };
    
      const editmensaje = (mensaje) => {
        setMensaje({ ...mensaje });
        setSubmitted(false);
        setMensajeDialog(true);
        setModalTitle("Editar Mensaje");
        setIsCreating(false);
      };
      const confirmDeleteMensaje = (mensaje) => {
        setMensaje(mensaje);
        setDeleteMensajeDialog(true);
      };
      const hideDialog = () => {
        setSubmitted(false);
        setMensajeDialog(false);
      };
      
      const hideDeleteMensajeDialog = () => {
        setDeleteMensajeDialog(false);
      };
    
      const hideDeleteMensajesDialog = () => {
        setDeleteMensajesDialog(false);
      };
    
      const exportCSV = () => {
        dt.current.exportCSV();
      };

      const exportExcel = () => {
        exportToExcel(mensajes);
      };
    
      const exportPDF = () => {
        exportToPdf(mensajes);
      };
    
      const confirmDeleteSelected = () => {
        setDeleteMensajesDialog(true);
      };
    
      const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || "";
        let _mensaje = { ...mensaje };
    
        _mensaje[`${name}`] = val;
    
        setMensaje(_mensaje);
      };
      
      const leftToolbarTemplate = () => {
        return (
          <div className="flex flex-wrap gap-2">
            <Button
              label="New"
              icon="pi pi-plus"
              severity="success"
              onClick={openNew}
            />
            <Button
              label="Delete"
              icon="pi pi-trash"
              severity="danger"
              onClick={confirmDeleteSelected}
              disabled={!selectedMensajes || !selectedMensajes.length}
            />
          </div>
        );
      };

      const rightToolbarTemplate = () => {
        return (
          <div className="flex align-items-center justify-content-end gap-2">
            <Button
              label="CSV"
              type="button"
              icon="pi pi-file"
              rounded
              onClick={exportCSV}
              data-pr-tooltip="CSV"
            />
            <Button
              label="XLSX"
              type="button"
              icon="pi pi-file-excel"
              severity="success"
              rounded
              onClick={exportExcel}
              data-pr-tooltip="XLS"
            />
            <Button
              label="PDF"
              type="button"
              icon="pi pi-file-pdf"
              severity="warning"
              rounded
              onClick={exportPDF}
              data-pr-tooltip="PDF"
            />
          </div>
        );
      };
      
      const actionBodyTemplate = (rowData) => {
        return (
          <React.Fragment>
            <Button
              icon="pi pi-pencil"
              rounded
              outlined
              className="mr-2"
              onClick={() => editmensaje(rowData)}
            />
            <Button
              icon="pi pi-trash"
              rounded
              outlined
              severity="danger"
              onClick={() => confirmDeleteMensaje(rowData)}
            />
          </React.Fragment>
        );
      };

      const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
          <h4 className="m-0">Administrar Mensajes</h4>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              type="search"
              onInput={(e) => setGlobalFilter(e.target.value)}
              placeholder="Buscar..."
            />
          </span>
        </div>
      );
      const mensajeDialogFooter = (
        <React.Fragment>
          <Button
            label="Cancelar"
            icon="pi pi-times"
            outlined
            onClick={hideDialog}
          />
          <Button label="Guardar" icon="pi pi-check" onClick={saveUpdate} />
        </React.Fragment>
      );
      const deleteMensajeDialogFooter = (
        <React.Fragment>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              label="Cancelar"
              icon="pi pi-times"
              outlined
              onClick={hideDeleteMensajeDialog}
            />
            <Button
              label="Aceptar"
              icon="pi pi-check"
              severity="danger"
              onClick={removeMensaje}
            />
          </div>
        </React.Fragment>
      );
    
      const deleteMensajesDialogFooter = (
        <React.Fragment>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              label="Cancelar"
              icon="pi pi-times"
              outlined
              onClick={hideDeleteMensajesDialog}
            />
            <Button
              label="Aceptar"
              icon="pi pi-check"
              severity="danger"
              onClick={removeSelectedMensajes}
            />
          </div>
        </React.Fragment>
      );
    
      return (
        <div>
          {/** TABLA del Usuario */}
          <Table
            refToast={toast}
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
            refDT={dt}
            value={mensajes}
            selection={selectedMensajes}
            onSelectionChange={(e) => setSelectedMensajes(e.value)}
            dataKey="id"
            globalFilter={globalFilter}
            header={header}
            nombre_00="nombre"
            header_00="Nombre"
            nombre_01="correo"
            header_01="Correo"
            nombre_02="fecha"
            header_02="Fecha"
            nombre_03="telefono"
            header_03="Telefono"
            nombre_04="asunto"
            header_04="Asunto"
            body={actionBodyTemplate}
          />
          {/** Modal de CREAR y ACTUALIZAR */}
      <DialogCreateUpdate
        isCategory={false}
        visible={mensajeDialog}
        header={modalTitle}
        footer={mensajeDialogFooter}
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
         {/** Modal de ELIMINAR un Mensaje */}
         <DialogDelete
        visible={deleteMensajeDialog}
        footer={deleteMensajeDialogFooter}
        onHide={hideDeleteMensajeDialog}
        msgDialogModal={
          mensaje && (
            <span>
              ¿Estás seguro de que quieres eliminar a <b>{mensaje.nombre}</b>? No
              podrás revertir esto.
            </span>
          )
        }
      />
      {/** Modal de ELIMINAR varios Mensajes */}
      <DialogDelete
        visible={deleteMensajesDialog}
        footer={deleteMensajesDialogFooter}
        onHide={hideDeleteMensajesDialog}
        msgDialogModal={
          mensaje && (
            <span>
              ¿Estás seguro de que desea eliminar los mensajes seleccionados?
              No podrás revertixr esto.
            </span>
          )
        }
      />
    </div>
  );
}
