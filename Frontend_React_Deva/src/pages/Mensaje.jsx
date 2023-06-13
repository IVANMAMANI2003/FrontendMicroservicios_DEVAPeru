/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef } from "react";

// Importaciones de PrimeReact
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "jspdf-autotable";
import Table from "../components/Table";
import { DialogDelete } from "../components/DialogDelete";
import {
  getMensajeList,
  deleteMensaje,
  deleteSelectedMensaje,
} from "../services/MensajeService";
import { exportToExcel, exportToPdf } from "../exports/ExportFileCat";
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
  const [deleteMensajeDialog, setDeleteMensajeDialog] = useState(false);
  const [deleteMensajesDialog, setDeleteMensajesDialog] = useState(false);
  const [mensaje, setMensaje] = useState(dataMensaje);
  const [selectedMensajes, setSelectedMensajes] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
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
      detail: "Mensaje Eliminado",
      life: 3000,
    });
  };
  const removeSelectedMensajes = () => {
    const mensajeIds = selectedMensajes.map((mensaje) => mensaje.id);
    const isMultiple = selectedMensajes.length > 1;

    deleteSelectedMensaje(mensajeIds)
      .then(() => {
        getMensajes();
        setMensajes((prevmensajes) =>
          prevmensajes.filter((c) => !mensajeIds.includes(c.id))
        );
        setSelectedMensajes([]);
        if (isMultiple) {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Mensajes Eliminados",
            life: 3000,
          });
        } else {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Mensaje Eliminado",
            life: 3000,
          });
        }
      })
      .catch((error) => {
        console.error("Error al eliminar los mensajes:", error);
      });
    setDeleteMensajesDialog(false);
  };

  const confirmDeleteMensaje = (mensaje) => {
    setMensaje(mensaje);
    setDeleteMensajeDialog(true);
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

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
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
      {/** Modal de ELIMINAR un Mensaje */}
      <DialogDelete
        visible={deleteMensajeDialog}
        footer={deleteMensajeDialogFooter}
        onHide={hideDeleteMensajeDialog}
        msgDialogModal={
          mensaje && (
            <span>
              ¿Estás seguro de que quieres eliminar a <b>{mensaje.nombre}</b>?
              No podrás revertir esto.
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
              ¿Estás seguro de que desea eliminar los mensajes seleccionados? No
              podrás revertixr esto.
            </span>
          )
        }
      />
    </div>
  );
}
