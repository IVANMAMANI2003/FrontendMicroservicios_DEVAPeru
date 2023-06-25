import React, { useState, useEffect, useRef } from "react";

// Importaciones de PrimeReact
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "jspdf-autotable";
import Table from "../../components/Table";
import { DialogCreateUpdate } from "../../components/DialogCatalogo";
import { DialogDelete } from "../../components/DialogDelete";
import * as CategoryService from "../../services/CategoriaService";
import { exportToExcel, exportToPdf } from "../../exports/ExportFileCat";

export default function Category() {
  let dataCategory = {
    nombre: "",
    estado: "",
    file: null,
    preview: null,
    fileName: "",
  };

  const [categories, setCategories] = useState([]);
  const [categoryDialog, setCategoryDialog] = useState(false);
  const [deleteCategoryDialog, setDeleteCategoryDialog] = useState(false);
  const [deleteCategoriesDialog, setDeleteCategoriesDialog] = useState(false);
  const [category, setCategory] = useState(dataCategory);
  const [selectedCategories, setSelectedCategories] = useState(null);
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
    getCategories();
  }, []);

  const getCategories = () => {
    CategoryService.getCategoryList()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveUpdate = (event) => {
    event.preventDefault();
    setSubmitted(true);

    const requiredFields = ["nombre", "estado"];

    if (category.id || isCreating === false) {
      const formData = new FormData();
      let hasChanges = false;

      const originalcategory = categories.find((img) => img.id === category.id);

      requiredFields.forEach((field) => {
        if (category[field] !== originalcategory?.[field]) {
          formData.append(field, category[field]);
          hasChanges = true;
        }
      });

      if (selectedFile) {
        formData.append("file", selectedFile);
        hasChanges = true;
      }

      if (hasChanges) {
        CategoryService.updateCategory(category.id, formData)
          .then(() => {
            getCategories();
            setCategoryDialog(false);
            toast.current.show({
              severity: "success",
              summary: "Éxito",
              detail: "Categoría Actualizado",
              life: 3000,
            });
          })
          .catch((error) => {
            console.error("Error al actualizar la categoría:", error);
          });
      } else {
        setCategoryDialog(false);
      }
    } else {
      const formData = new FormData();
      requiredFields.forEach((field) => {
        formData.append(field, category[field]);
      });
      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      CategoryService.createCategory(formData)
        .then(() => {
          getCategories();
          setCategoryDialog(false);
          toast.current.show({
            severity: "success",
            summary: "Éxito",
            detail: "Categoría Creado",
            life: 3000,
          });
        })
        .catch((error) => {
          console.error("Error al crear el categoría:", error);
        });
    }
  };

  const removeCategory = () => {
    CategoryService.deleteCategory(category.id)
      .then(() => {
        getCategories();
      })
      .catch((error) => {
        console.log(error);
      });
    setDeleteCategoryDialog(false);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Categoría Eliminado",
      life: 3000,
    });
  };

  const removeSelectedCategories = () => {
    const ids = selectedCategories.map((c) => c.id);
    const isMultiple = selectedCategories.length > 1;

    CategoryService.deleteSelectedCategories(ids)
      .then(() => {
        getCategories();
        setCategories((prevCategories) =>
          prevCategories.filter((c) => !ids.includes(c.id))
        );
        setSelectedCategories([]);
        if (isMultiple) {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Categorías Eliminadas",
            life: 3000,
          });
        } else {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Categoría Eliminado",
            life: 3000,
          });
        }
      })
      .catch((error) => {
        console.error("Error al eliminar las categorías:", error);
      });
    setDeleteCategoriesDialog(false);
    getCategories();
  };

  const openNew = () => {
    setCategory(dataCategory);
    setSubmitted(false);
    setCategoryDialog(true);
    setModalTitle("Crear Categoría");
    setIsCreating(true);
  };

  const editCategory = (category) => {
    setCategory({
      ...category,
      id: category.id,
      preview: category.imagen,
      fileName: category.file ? category.file.name : category.imagen,
    });
    setSelectedFile(null);
    setModalTitle("Editar Categoría");
    setIsCreating(false);
    setCategoryDialog(true);
  };

  const confirmDeleteCategory = (category) => {
    setCategory(category);
    setDeleteCategoryDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setCategoryDialog(false);
  };

  const hideDeleteCategoryDialog = () => {
    setDeleteCategoryDialog(false);
  };

  const hideDeleteCategoriesDialog = () => {
    setDeleteCategoriesDialog(false);
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const exportExcel = () => {
    exportToExcel(categories);
  };

  const exportPDF = () => {
    exportToPdf(categories);
  };

  const confirmDeleteSelected = () => {
    setDeleteCategoriesDialog(true);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _category = { ...category };

    _category[`${name}`] = val;

    setCategory(_category);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const preview = URL.createObjectURL(file);
    setSelectedFile(file);
    setCategory((prevImage) => ({
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
          disabled={!selectedCategories || !selectedCategories.length}
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
        <div className="flex justify-center">
          <Button
            icon="pi pi-pencil"
            rounded
            outlined
            className="mr-2"
            onClick={() => editCategory(rowData)}
          />
          <Button
            icon="pi pi-trash"
            rounded
            outlined
            severity="danger"
            onClick={() => confirmDeleteCategory(rowData)}
          />
        </div>
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
      <h4 className="m-0 text-xl">Administrar Categorías</h4>
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
  const categoryDialogFooter = (
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
  const deleteCategoryDialogFooter = (
    <React.Fragment>
      <div className="flex justify-center">
        <Button
          label="Cancelar"
          icon="pi pi-times"
          outlined
          onClick={hideDeleteCategoryDialog}
        />
        <Button
          label="Aceptar"
          icon="pi pi-check"
          severity="danger"
          onClick={removeCategory}
        />
      </div>
    </React.Fragment>
  );
  const deleteCategoriesDialogFooter = (
    <React.Fragment>
      <div className="flex justify-center">
        <Button
          label="Cancelar"
          icon="pi pi-times"
          outlined
          onClick={hideDeleteCategoriesDialog}
        />
        <Button
          label="Aceptar"
          icon="pi pi-check"
          severity="danger"
          onClick={removeSelectedCategories}
        />
      </div>
    </React.Fragment>
  );

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={rowData.imagen}
        alt="Category"
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
        value={categories}
        selection={selectedCategories}
        onSelectionChange={(e) => setSelectedCategories(e.value)}
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
        nombre_01="estado"
        header_01="Estado"
        body={actionBodyTemplate}
      />
      {/** Modal de CREAR y ACTUALIZAR */}
      <DialogCreateUpdate
        width="30rem"
        isCategory={true}
        visible={categoryDialog}
        header={modalTitle}
        footer={categoryDialogFooter}
        onHide={hideDialog}
        htmlFor_00="nombre"
        label_00="Nombre"
        id_00="nombre"
        value_00={category.nombre}
        onChange_00={(e) => onInputChange(e, "nombre")}
        className_00={classNames({
          "p-invalid": submitted && !category.nombre,
        })}
        msgRequired_00={
          submitted &&
          !category.nombre && (
            <small className="p-error">El nombre es obligatorio.</small>
          )
        }
        htmlFor_01="estado"
        label_01="Estado"
        id_01="estado"
        value_01={category.estado}
        onChange_01={(e) => onInputChange(e, "estado")}
        className_01={classNames({
          "p-invalid": submitted && !category.estado,
        })}
        msgRequired_01={
          submitted &&
          !category.estado && (
            <small className="p-error">El estado es obligatorio.</small>
          )
        }
        onChangeFile={handleFileChange}
        valueFile={category.fileName}
        imagen={
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={
                category.preview ||
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
        visible={deleteCategoryDialog}
        footer={deleteCategoryDialogFooter}
        onHide={hideDeleteCategoryDialog}
        msgDialogModal={
          category && (
            <span>
              ¿Estás seguro de que quieres eliminar <b>{category.nombre}</b>? No
              podrás revertir esto.
            </span>
          )
        }
      />
      {/** Modal de ELIMINAR varias categorys */}
      <DialogDelete
        visible={deleteCategoriesDialog}
        footer={deleteCategoriesDialogFooter}
        onHide={hideDeleteCategoriesDialog}
        msgDialogModal={
          category && (
            <span>
              ¿Estás seguro de que desea eliminar las categorías seleccionadas?
              No podrás revertir esto.
            </span>
          )
        }
      />
    </div>
  );
}
