import React, { useState, useEffect, useRef } from "react";

// Importaciones de PrimeReact
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "jspdf-autotable";
import Table from "../components/Table";
import { DialogDelete } from "../components/DialogDelete";
import * as UsuarioService from "../services/UsuarioService";
import { exportToExcel, exportToPdf } from "../exports/ExportFileCat";
import { DialogCreateUpdate } from "../components/DialogUser";

export default function User() {
  let dataUser = {
    id: null,
    nombre: "",
    dni: "",
    correo: "",
    contraseña: "",
    rol: "",
  };

  const [users, setUsers] = useState([]);
  const [userDialog, setUserDialog] = useState(false);
  const [deleteUserDialog, setDeleteUserDialog] = useState(false);
  const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
  const [user, setUser] = useState(dataUser);
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    UsuarioService.getUserList()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveUpdate = () => {
    setSubmitted(true);

    if (user.nombre && user.dni) {
      if (user.id || isCreating === false) {
        UsuarioService.updateUser(user)
          .then(() => {
            getUsers();
            setUserDialog(false);
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
        UsuarioService.createUser(user)
          .then(() => {
            getUsers();
            setUserDialog(false);
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

  const removeUser = () => {
    UsuarioService.deleteUser(user.id)
      .then(() => {
        getUsers();
      })
      .catch((error) => {
        console.log(error);
      });
    setDeleteUserDialog(false);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Usuario Eliminado",
      life: 3000,
    });
  };

  const removeSelectedUsers = () => {
    const userIds = selectedUsers.map((user) => user.id);
    UsuarioService.deleteSelectedUsers(userIds)
      .then(() => {
        setUsers((prevusers) =>
          prevusers.filter((c) => !userIds.includes(c.id))
        );
        setSelectedUsers(null);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Usuarios Eliminados",
          life: 3000,
        });
        getUsers();
      })
      .catch((error) => {
        console.error("Error al eliminar las usuarios:", error);
      });
    setDeleteUsersDialog(false);
  };

  const openNew = () => {
    setUser(dataUser);
    setSubmitted(false);
    setUserDialog(true);
    setModalTitle("Crear Usuario");
    setIsCreating(true);
  };

  const editUser = (user) => {
    setUser({ ...user });
    setSubmitted(false);
    setUserDialog(true);
    setModalTitle("Editar Usuario");
    setIsCreating(false);
  };

  const confirmDeleteUser = (user) => {
    setUser(user);
    setDeleteUserDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setUserDialog(false);
  };

  const hideDeleteUserDialog = () => {
    setDeleteUserDialog(false);
  };

  const hideDeleteUsersDialog = () => {
    setDeleteUsersDialog(false);
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const exportExcel = () => {
    exportToExcel(users);
  };

  const exportPDF = () => {
    exportToPdf(users);
  };

  const confirmDeleteSelected = () => {
    setDeleteUsersDialog(true);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _user = { ...user };

    _user[`${name}`] = val;

    setUser(_user);
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
          disabled={!selectedUsers || !selectedUsers.length}
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
          onClick={() => editUser(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteUser(rowData)}
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Administrar Usuarios</h4>
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
  const userDialogFooter = (
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
  const deleteUserDialogFooter = (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          outlined
          onClick={hideDeleteUserDialog}
        />
        <Button
          label="Aceptar"
          icon="pi pi-check"
          severity="danger"
          onClick={removeUser}
        />
      </div>
    </React.Fragment>
  );
  const deleteUsersDialogFooter = (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          outlined
          onClick={hideDeleteUsersDialog}
        />
        <Button
          label="Aceptar"
          icon="pi pi-check"
          severity="danger"
          onClick={removeSelectedUsers}
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
        value={users}
        selection={selectedUsers}
        onSelectionChange={(e) => setSelectedUsers(e.value)}
        dataKey="id"
        globalFilter={globalFilter}
        header={header}
        nombre_00="nombre"
        header_00="Nombre"
        nombre_01="dni"
        header_01="DNI"
        nombre_02="correo"
        header_02="Correo"
        nombre_03="contraseña"
        header_03="Contraseña"
        nombre_04="rol"
        header_04="Rol"
        body={actionBodyTemplate}
      />
      {/** Modal de CREAR y ACTUALIZAR */}
      <DialogCreateUpdate
        isCategory={false}
        visible={userDialog}
        header={modalTitle}
        footer={userDialogFooter}
        onHide={hideDialog}
        htmlFor_00="nombre"
        label_00="Nombre"
        id_00="nombre"
        value_00={user.nombre}
        onChange_00={(e) => onInputChange(e, "nombre")}
        className_00={classNames({ "p-invalid": submitted && !user.nombre })}
        msgRequired_00={
          submitted &&
          !user.nombre && (
            <small className="p-error">El nombre es obligatorio.</small>
          )
        }
        htmlFor_01="dni"
        label_01="Dni"
        id_01="dni"
        value_01={user.dni}
        onChange_01={(e) => onInputChange(e, "dni")}
        className_01={classNames({ "p-invalid": submitted && !user.dni })}
        msgRequired_01={
          submitted &&
          !user.dni && <small className="p-error">El dni es obligatorio.</small>
        }
        htmlFor_02="correo"
        label_02="Correo"
        id_02="correo"
        value_02={user.correo}
        onChange_02={(e) => onInputChange(e, "correo")}
        className_02={classNames({ "p-invalid": submitted && !user.correo })}
        msgRequired_02={
          submitted &&
          !user.correo && (
            <small className="p-error">El correo es obligatorio.</small>
          )
        }
        htmlFor_03="contraseña"
        label_03="Contraseña"
        id_03="contraseña"
        value_03={user.contraseña}
        onChange_03={(e) => onInputChange(e, "contraseña")}
        className_03={classNames({
          "p-invalid": submitted && !user.contraseña,
        })}
        msgRequired_03={
          submitted &&
          !user.contraseña && (
            <small className="p-error">La contraseña es obligatorio.</small>
          )
        }
        htmlFor_04="rol"
        label_04="Rol"
        id_04="rol"
        value_04={user.rol}
        onChange_04={(e) => onInputChange(e, "rol")}
        className_04={classNames({ "p-invalid": submitted && !user.rol })}
        msgRequired_04={
          submitted &&
          !user.rol && <small className="p-error">El rol es obligatorio.</small>
        }
      />
      {/** Modal de ELIMINAR un Usuario */}
      <DialogDelete
        visible={deleteUserDialog}
        footer={deleteUserDialogFooter}
        onHide={hideDeleteUserDialog}
        msgDialogModal={
          user && (
            <span>
              ¿Estás seguro de que quieres eliminar a <b>{user.nombre}</b>? No
              podrás revertir esto.
            </span>
          )
        }
      />
      {/** Modal de ELIMINAR varios Usuarios */}
      <DialogDelete
        visible={deleteUsersDialog}
        footer={deleteUsersDialogFooter}
        onHide={hideDeleteUsersDialog}
        msgDialogModal={
          user && (
            <span>
              ¿Estás seguro de que desea eliminar los usuarios seleccionados? No
              podrás revertir esto.
            </span>
          )
        }
      />
    </div>
  );
}
