import React, { useState, useEffect, useRef } from "react";

// Importaciones de PrimeReact
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "jspdf-autotable";
import Table from "../components/Table";
import { DialogCreateUpdate, DialogDelete } from "../components/DialogImagen";
import * as ImageService from "../services/ImagenService";
import { exportToExcel, exportToPdf } from "../exports/ExportFilePro";

export default function Image() {
  let dataProduct = {
    image_id: "", // Nueva propiedad
    estado: "",
    file: null,
    preview: null,
    fileName: "",
  };

  const [products, setProducts] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(dataProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    estado: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  });
  const [modalTitle, setModalTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    getImages();
  }, []);


  const getImages = () => {
    ImageService.getImageList()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveUpdate = (event) => {
    event.preventDefault();
    setSubmitted(true);

    if (product.estado) {
      if (product.id || isCreating === false) {
        const formData = new FormData();
        let hasChanges = false;

        // Verificar si hay cambios en la propiedad 'type'
        const originalProduct = products.find((img) => img.id === product.id);
        if (product.estado !== originalProduct?.estado) {
          formData.append("estado", product.estado);
          hasChanges = true;
        }

        // Verificar si hay cambios en el archivo seleccionado
        if (selectedFile) {
          formData.append("file", selectedFile);
          hasChanges = true;
        }

        if (hasChanges) {
          // Añadir el image_id al formData
          formData.append("image_id", product.image_id);

          ImageService.updateImage(product.id, formData)
            .then(() => {
              getImages();
              setProductDialog(false);
              toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Imagen actualizado', life: 3000 });
            })
            .catch((error) => {
              console.error("Error al actualizar la imagen:", error);
            });
        } else {
          setProductDialog(false);
        }
      } else {
        const formData = new FormData();
        formData.append("estado", product.estado);
        if (selectedFile) {
          formData.append("file", selectedFile);
        }
        // Añadir el image_id al formData
        formData.append("image_id", product.image_id);
        
        ImageService.createImage(formData)
          .then(() => {
            getImages();
            setProductDialog(false);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Imagen creado', life: 3000 });
          })
          .catch((error) => {
            console.error("Error al crear al imagen:", error);
          });
      }
    }
  };

  const removeProduct = () => {
    setProducts((prevProducts) => prevProducts.filter((c) => c.id !== product.id));
    ImageService.deleteImage(product.id)
      .then(() => {
        getImages();
      })
      .catch((error) => {
        console.log(error);
      });
    setDeleteProductDialog(false);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Imagen Eliminado', life: 3000 });
  };

  const removeSelectedProducts = () => {
    const ids = selectedProducts.map((product) => product.id);
    const isMultiple = selectedProducts.length > 1;

    ImageService.deleteSelectedImages(ids)
      .then(() => {
        getImages();
        setProducts((prevProducts) => prevProducts.filter((p) => !ids.includes(p.id)));
        setSelectedProducts([]);
        if (isMultiple) {
          toast.current.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Imágenes Eliminados',
            life: 3000
          });
        } else {
          toast.current.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Imagen Eliminado',
            life: 3000
          });
        }
      })
      .catch((error) => {
        console.error('Error al eliminar las imágenes:', error);
      });
    setDeleteProductsDialog(false);
    getImages();
  };

  const openNew = () => {
    setProduct(dataProduct);
    setSubmitted(false);
    setProductDialog(true);
    setModalTitle("Imagen Producto");
    setIsCreating(true);
  };

  const editproduct = (product) => {
    setProduct({ ...product, id: product.id, preview: product.url, fileName: product.file ? product.file.name : product.url });
    setSelectedFile(null);
    setModalTitle('Editar Imagen');
    setIsCreating(false);
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const exportExcel = () => {
    exportToExcel(products);
  };

  const exportPDF = () => {
    exportToPdf(products);
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const onInputChange = (e, name) => {
    const val = e.target.value || '';
    setProduct((prevImage) => ({
      ...prevImage,
      [name]: val,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const preview = URL.createObjectURL(file);
    setSelectedFile(file);
    setProduct((prevImage) => ({
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
          disabled={!selectedProducts || !selectedProducts.length}
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
          onClick={() => editproduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilter(value);
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0 text-xl">Administrar Imágenes</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          value={globalFilter} onChange={onGlobalFilterChange}
          placeholder="Buscar..."
        />
      </span>
    </div>
  );
  const productDialogFooter = (
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
  const deleteProductDialogFooter = (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          outlined
          onClick={hideDeleteProductDialog}
        />
        <Button
          label="Aceptar"
          icon="pi pi-check"
          severity="danger"
          onClick={removeProduct}
        />
      </div>
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          label="Cancelar"
          icon="pi pi-times"
          outlined
          onClick={hideDeleteProductsDialog}
        />
        <Button
          label="Aceptar"
          icon="pi pi-check"
          severity="danger"
          onClick={removeSelectedProducts}
        />
      </div>
    </React.Fragment>
  );

  const imageBodyTemplate = (rowData) => {
    return <img src={rowData.url} alt="Product" className="shadow-2 border-round" style={{ width: '64px' }} />;
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
        value={products}
        selection={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        dataKey="id"
        filters={filters} filterDisplay="menu" globalFilterFields={['estado']}
        header={header}
        fieldImage="url" headerImage="Imagen"
        bodyImage={imageBodyTemplate}
        nombre_00="estado"
        header_00="Estado"
        nombre_01="image_id"
        header_01="Imagen por Id"
        body={actionBodyTemplate}
      />
      {/** Modal de CREAR y ACTUALIZAR */}
      <DialogCreateUpdate
        width='45rem'
        isCategory={false}
        visible={productDialog}
        header={modalTitle}
        footer={productDialogFooter}
        onHide={hideDialog}
        htmlFor_00="estado"
        label_00="Estado"
        id_00="estado"
        value_00={product.estado}
        onChange_00={(e) => onInputChange(e, "estado")}
        className_00={classNames({ "p-invalid": submitted && !product.estado })}
        msgRequired_00={
          submitted &&
          !product.estado && (
            <small className="p-error">El nombre es obligatorio.</small>
          )
        }
        onChangeFile={handleFileChange} valueFile={product.fileName}
        imagen={(
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={product.preview || "https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"}
              alt="Vista previa"
              style={{ marginTop: "10px", maxWidth: "200px" }}
            />
          </div>

        )}
      />
      {/** Modal de ELIMINAR una categoría */}
      <DialogDelete
        visible={deleteProductDialog}
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
        msgDialogModal={
          product && (
            <span>
              ¿Estás seguro de que quieres eliminar <b>{product.estado}</b>? No
              podrás revertir esto.
            </span>
          )
        }
      />
      {/** Modal de ELIMINAR varias products */}
      <DialogDelete
        visible={deleteProductsDialog}
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
        msgDialogModal={
          product && (
            <span>
              ¿Estás seguro de que desea eliminar los productos seleccionados?
              No podrás revertir esto.
            </span>
          )
        }
      />
    </div>
  );
}
