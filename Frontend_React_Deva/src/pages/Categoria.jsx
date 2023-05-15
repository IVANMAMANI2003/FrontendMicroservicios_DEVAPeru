import React, { useState, useEffect, useRef } from 'react';

// Importaciones de PrimeReact
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import 'jspdf-autotable';
import Table from '../components/Table';
import { DialogCreateUpdate, DialogDelete } from '../components/Dialog';
import { createCategory, deleteCategory, deleteSelectedCategories, getCategoryList, updateCategory } from '../services/CategoriaService';
import { exportToExcel, exportToPdf } from '../exports/ExportFileCat';

export default function Category() {

  let datosCategoria = {
    id: null,
    nombre: "",
    estado: "",
  };

  const [categorias, setCategorias] = useState([]);
  const [categoriaDialog, setCategoriaDialog] = useState(false);
  const [deleteCategoriaDialog, setDeleteCategoriaDialog] = useState(false);
  const [deleteCategoriasDialog, setDeleteCategoriasDialog] = useState(false);
  const [categoria, setCategoria] = useState(datosCategoria);
  const [selectedCategorias, setSelectedCategorias] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    getCategoryList()
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveUpdate = () => {
    setSubmitted(true);

    if (categoria.nombre && categoria.estado) {
      if (categoria.id || isCreating === false) {
        updateCategory(categoria)
          .then(() => {
            getCategories();
            setCategoriaDialog(false);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Categoría actualizado', life: 3000 });
          })
          .catch((error) => {
            console.error('Error al actualizar el categoria:', error);
          });
      } else {
        createCategory(categoria)
          .then(() => {
            getCategories();
            setCategoriaDialog(false);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Categoría creado', life: 3000 });
          })
          .catch((error) => {
            console.error('Error al crear el categoría', error)
            console.log('Error al crear el categoría:', error);
          });
      }
    }
  };

  const deleteCategoria = () => {
    deleteCategory(categoria.id)
      .then(() => {
        getCategories();
      })
      .catch((error) => {
        console.log(error);
      });
    setDeleteCategoriaDialog(false);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Categoría Eliminado', life: 3000 });
  };

  const deleteSelectedCategorias = () => {
    const categoryIds = selectedCategorias.map((categoria) => categoria.id);
    deleteSelectedCategories(categoryIds)
      .then(() => {
        setCategorias((prevCategorias) => prevCategorias.filter((c) => !categoryIds.includes(c.id)));
        setSelectedCategorias(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Categorías Eliminadas', life: 3000 });
        getCategories();
      })
      .catch((error) => {
        console.error('Error al eliminar las categorías:', error);
      });
    setDeleteCategoriasDialog(false);
  };

  const openNew = () => {
    setCategoria(datosCategoria);
    setSubmitted(false);
    setCategoriaDialog(true);
    setModalTitle("Crear Categoria");
    setIsCreating(true);
  };

  const editCategoria = (categoria) => {
    setCategoria({ ...categoria });
    setSubmitted(false);
    setCategoriaDialog(true);
    setModalTitle("Editar categoria");
    setIsCreating(false);
  };

  const confirmDeleteCategoria = (categoria) => {
    setCategoria(categoria);
    setDeleteCategoriaDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setCategoriaDialog(false);
  };

  const hideDeleteCategoriaDialog = () => {
    setDeleteCategoriaDialog(false);
  };

  const hideDeleteCategoriasDialog = () => {
    setDeleteCategoriasDialog(false);
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const exportExcel = () => {
    exportToExcel(categorias);
  };

  const exportPDF = () => {
    exportToPdf(categorias);
  };

  const confirmDeleteSelected = () => {
    setDeleteCategoriasDialog(true);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _categoria = { ...categoria };

    _categoria[`${name}`] = val;

    setCategoria(_categoria);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
        <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected}
          disabled={!selectedCategorias || !selectedCategorias.length} />
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <div className="flex align-items-center justify-content-end gap-2">
        <Button label='CSV' type="button" icon="pi pi-file" rounded onClick={exportCSV} data-pr-tooltip="CSV" />
        <Button label='XLSX' type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel}
          data-pr-tooltip="XLS" />
        <Button label='PDF' type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPDF}
          data-pr-tooltip="PDF" />
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editCategoria(rowData)} />
        <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteCategoria(rowData)} />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Administrar Categorías</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
      </span>
    </div>
  );
  const categoriaDialogFooter = (
    <React.Fragment>
      <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Guardar" icon="pi pi-check" onClick={saveUpdate} />
    </React.Fragment>
  );
  const deleteCategoriaDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteCategoriaDialog} />
      <Button label="Sí" icon="pi pi-check" severity="danger" onClick={deleteCategoria} />
    </React.Fragment>
  );
  const deleteCategoriasDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteCategoriasDialog} />
      <Button label="Sí" icon="pi pi-check" severity="danger" onClick={deleteSelectedCategorias} />
    </React.Fragment>
  );

  return (
    <div>
      {/** TABLA de la categoría */}
      <Table isCategory={true} refToast={toast} left={leftToolbarTemplate} right={rightToolbarTemplate} refDT={dt} value={categorias}
        selection={selectedCategorias} onSelectionChange={(e) => setSelectedCategorias(e.value)} dataKey="id"
        globalFilter={globalFilter} header={header} nombre_00="nombre" header_00="Nombre"
        nombre_01="estado" header_01="Estado" body={actionBodyTemplate} />
      {/** Modal de CREAR y ACTUALIZAR */}
      <DialogCreateUpdate isCategory={true} visible={categoriaDialog} header={modalTitle} footer={categoriaDialogFooter}
        onHide={hideDialog} htmlFor_00="nombre" label_00="Nombre" id_00="nombre"
        value_00={categoria.nombre} onChange_00={(e) => onInputChange(e, 'nombre')}
        className_00={classNames({ 'p-invalid': submitted && !categoria.nombre })} msgRequired_00={submitted
          && !categoria.nombre && <small className="p-error">El nombre es obligatorio.</small>}
        htmlFor_01="estado" label_01="Estado" id_01="estado"
        value_01={categoria.estado} onChange_01={(e) => onInputChange(e, 'estado')}
        className_01={classNames({ 'p-invalid': submitted && !categoria.estado })}
        msgRequired_01={submitted && !categoria.estado && <small className="p-error">El estado es
          obligatorio.</small>} />
      {/** Modal de ELIMINAR una categoría */}
      <DialogDelete visible={deleteCategoriaDialog} footer={deleteCategoriaDialogFooter}
        onHide={hideDeleteCategoriaDialog} msgDialogModal={categoria && (<span>
          Are you sure you want to delete <b>{categoria.nombre}</b>?
        </span>
        )} />
      {/** Modal de ELIMINAR varias categorias */}
      <DialogDelete visible={deleteCategoriasDialog} footer={deleteCategoriasDialogFooter}
        onHide={hideDeleteCategoriasDialog} msgDialogModal={categoria && <span>Are you sure you want to
          delete the selected categories?</span>} />
    </div>
  );
}
