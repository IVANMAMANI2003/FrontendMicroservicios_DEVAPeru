import React, { useState, useEffect, useRef } from "react";

import { FilterMatchMode, FilterOperator } from "primereact/api";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "jspdf-autotable";
import Table from "../../components/Table";
import { DialogCreateUpdate } from "../../components/DialogBanner";
import { DialogDelete } from "../../components/DialogDelete";
import * as BannerService from "../../services/BannerService";
import { exportToExcel, exportToPdf } from "../../exports/ExportFilePro";

export const Banner = () => {
  let dataBanner = {
    nombre: "",
    tipo: "",
    file: null,
    preview: null,
    fileName: "",
  };

  const [banners, setBanners] = useState([]);
  const [bannerDialog, setbannerDialog] = useState(false);
  const [deletebannerDialog, setDeletebannerDialog] = useState(false);
  const [deletebannersDialog, setDeletebannersDialog] = useState(false);
  const [banner, setbanner] = useState(dataBanner);
  const [selectedbanners, setSelectedbanners] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    nombre: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
  });
  const [modalTitle, setModalTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = () => {
    BannerService.getBannerList()
      .then((response) => {
        setBanners(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveUpdate = (event) => {
    event.preventDefault();
    setSubmitted(true);

    const requiredFields = ["nombre", "tipo"];

    if (banner.id || isCreating === false) {
      const formData = new FormData();
      let hasChanges = false;

      const originalbanner = banners.find((img) => img.id === banner.id);

      requiredFields.forEach((field) => {
        if (banner[field] !== originalbanner?.[field]) {
          formData.append(field, banner[field]);
          hasChanges = true;
        }
      });

      if (selectedFile) {
        formData.append("file", selectedFile);
        hasChanges = true;
      }

      if (hasChanges) {
        BannerService.updateBanner(banner.id, formData)
          .then(() => {
            getBanners();
            setbannerDialog(false);
            toast.current.show({
              severity: "success",
              summary: "Éxito",
              detail: "Banner Actualizado",
              life: 3000,
            });
          })
          .catch((error) => {
            console.error("Error al actualizar el banner:", error);
          });
      } else {
        setbannerDialog(false);
      }
    } else {
      const formData = new FormData();
      requiredFields.forEach((field) => {
        formData.append(field, banner[field]);
      });
      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      BannerService.createBanner(formData)
        .then(() => {
          getBanners();
          setbannerDialog(false);
          toast.current.show({
            severity: "success",
            summary: "Éxito",
            detail: "Banner Creado",
            life: 3000,
          });
        })
        .catch((error) => {
          console.error("Error al crear el banner:", error);
        });
    }
  };

  const removebanner = () => {
    setBanners((prevbanners) => prevbanners.filter((c) => c.id !== banner.id));
    BannerService.deleteBanner(banner.id)
      .then(() => {
        getBanners();
      })
      .catch((error) => {
        console.log(error);
      });
    setDeletebannerDialog(false);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Banner Eliminado",
      life: 3000,
    });
  };

  const removeSelectedbanners = () => {
    const ids = selectedbanners.map((banner) => banner.id);
    const isMultiple = selectedbanners.length > 1;

    BannerService.deleteSelectedBanners(ids)
      .then(() => {
        getBanners();
        setBanners((prevbanners) =>
          prevbanners.filter((p) => !ids.includes(p.id))
        );
        setSelectedbanners([]);
        if (isMultiple) {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Banners Eliminados",
            life: 3000,
          });
        } else {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Banner Eliminado",
            life: 3000,
          });
        }
      })
      .catch((error) => {
        console.error("Error al eliminar los banners:", error);
      });
    setDeletebannersDialog(false);
    getBanners();
  };

  const openNew = () => {
    setbanner(dataBanner);
    setSubmitted(false);
    setbannerDialog(true);
    setModalTitle("Crear Banner");
    setIsCreating(true);
  };

  const editbanner = (banner) => {
    setbanner({
      ...banner,
      id: banner.id,
      preview: banner.imagen,
      fileName: banner.file ? banner.file.name : banner.imagen,
    });
    setSelectedFile(null);
    setModalTitle("Editar bannero");
    setIsCreating(false);
    setbannerDialog(true);
  };

  const confirmDeletebanner = (banner) => {
    setbanner(banner);
    setDeletebannerDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setbannerDialog(false);
  };

  const hideDeletebannerDialog = () => {
    setDeletebannerDialog(false);
  };

  const hideDeletebannersDialog = () => {
    setDeletebannersDialog(false);
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const exportExcel = () => {
    exportToExcel(banners);
  };

  const exportPDF = () => {
    exportToPdf(banners);
  };

  const confirmDeleteSelected = () => {
    setDeletebannersDialog(true);
  };

  const onInputChange = (e, name) => {
    const val = e.target.value || "";
    setbanner((prevImage) => ({
      ...prevImage,
      [name]: val,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const preview = URL.createObjectURL(file);
    setSelectedFile(file);
    setbanner((prevImage) => ({
      ...prevImage,
      file,
      preview,
      fileName: file ? file.name : prevImage.fileName, // Actualizar el nombre del archivo
    }));
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Nuevo"
          icon="pi pi-plus"
          severity="success"
          onClick={openNew}
        />
        <Button
          label="Eliminar"
          icon="pi pi-trash"
          severity="danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedbanners || !selectedbanners.length}
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
          onClick={() => editbanner(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeletebanner(rowData)}
        />
      </React.Fragment>
    );
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilter(value);
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0 text-xl">Administrar Banners</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={globalFilter}
          onChange={onGlobalFilterChange}
          placeholder="Buscar..."
        />
      </span>
    </div>
  );
  const bannerDialogFooter = (
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
  const deletebannerDialogFooter = (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          outlined
          onClick={hideDeletebannerDialog}
        />
        <Button
          label="Aceptar"
          icon="pi pi-check"
          severity="danger"
          onClick={removebanner}
        />
      </div>
    </React.Fragment>
  );
  const deletebannersDialogFooter = (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          outlined
          onClick={hideDeletebannersDialog}
        />
        <Button
          label="Aceptar"
          icon="pi pi-check"
          severity="danger"
          onClick={removeSelectedbanners}
        />
      </div>
    </React.Fragment>
  );

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={rowData.imagen}
        alt="banner"
        className="shadow-2 border-round"
        style={{ width: "64px" }}
      />
    );
  };

  return (
    <div>
      {/** TABLA de la categoría */}
      <Table
        isCategory={false}
        refToast={toast}
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
        refDT={dt}
        value={banners}
        selection={selectedbanners}
        onSelectionChange={(e) => setSelectedbanners(e.value)}
        dataKey="id"
        filters={filters}
        filterDisplay="menu"
        globalFilterFields={["nombre"]}
        header={header}
        fieldImage="imagen"
        headerImage="Imagen"
        bodyImage={imageBodyTemplate}
        nombre_00="nombre"
        header_00="Nombre"
        nombre_01="tipo"
        header_01="Tipo"
        fieldTimeC="fechaCreacion"
        headerTimeC="Creado"
        body={actionBodyTemplate}
      />
      {/** Modal de CREAR y ACTUALIZAR */}
      <DialogCreateUpdate
        width="45rem"
        isCategory={false}
        visible={bannerDialog}
        header={modalTitle}
        footer={bannerDialogFooter}
        onHide={hideDialog}
        htmlFor_00="nombre"
        label_00="Nombre"
        id_00="nombre"
        value_00={banner.nombre}
        onChange_00={(e) => onInputChange(e, "nombre")}
        className_00={classNames({ "p-invalid": submitted && !banner.nombre })}
        msgRequired_00={
          submitted &&
          !banner.nombre && (
            <small className="p-error">El nombre es obligatorio.</small>
          )
        }
        htmlFor_01="tipo"
        label_01="Tipo"
        id_01="tipo"
        value_01={banner.tipo}
        onChange_01={(e) => onInputChange(e, "tipo")}
        className_01={classNames({ "p-invalid": submitted && !banner.tipo })}
        msgRequired_01={
          submitted &&
          !banner.tipo && (
            <small className="p-error">El tipo es obligatorio.</small>
          )
        }
        onChangeFile={handleFileChange}
        valueFile={banner.fileName}
        imagen={
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={
                banner.preview ||
                "https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
              }
              alt="Vista previa"
              style={{ marginTop: "10px", maxWidth: "200px" }}
            />
          </div>
        }
      />
      {/** Modal de ELIMINAR una categoría */}
      <DialogDelete
        visible={deletebannerDialog}
        footer={deletebannerDialogFooter}
        onHide={hideDeletebannerDialog}
        msgDialogModal={
          banner && (
            <span>
              ¿Estás seguro de que quieres eliminar <b>{banner.nombre}</b>? No
              podrás revertir esto.
            </span>
          )
        }
      />
      {/** Modal de ELIMINAR varias banners */}
      <DialogDelete
        visible={deletebannersDialog}
        footer={deletebannersDialogFooter}
        onHide={hideDeletebannersDialog}
        msgDialogModal={
          banner && (
            <span>
              ¿Estás seguro de que desea eliminar los banneros seleccionados? No
              podrás revertir esto.
            </span>
          )
        }
      />
    </div>
  );
};
