import React, { useState, useEffect, useRef } from "react";

// Importaciones de PrimeReact
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "jspdf-autotable";
import Table from "../components/Table";
import { DialogCreateUpdate, DialogDelete } from "../components/Dialog";
import * as ProductoService from "../services/ProductoService";
import { exportToExcel, exportToPdf } from "../exports/ExportFilePro";
import { getCategoryList } from "../services/CategoriaService";

export default function Product() {
  let dataProduct = {
    id: null,
    nombre: "",
    precio: "",
    stock: "",
    detalle: "",
    material: "",
    largo: "",
    ancho: "",
    alto: "",
    estado: "",
    categoria: {
      id: "",
    },
  };

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(dataProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getCategories = () => {
    getCategoryList()
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProducts = () => {
    ProductoService.getProductList()
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveUpdate = () => {
    setSubmitted(true);

    if (product.nombre && product.estado) {
      if (product.id || isCreating === false) {
        ProductoService.updateProduct(product)
          .then(() => {
            getProducts();
            getCategories();
            setProductDialog(false);
            toast.current.show({
              severity: "success",
              summary: "Éxito",
              detail: "Categoría actualizado",
              life: 3000,
            });
          })
          .catch((error) => {
            console.error("Error al actualizar el producto:", error);
          });
      } else {
        ProductoService.createProduct(product)
          .then(() => {
            getProducts();
            getCategories();
            setProductDialog(false);
            toast.current.show({
              severity: "success",
              summary: "Éxito",
              detail: "Producto creado",
              life: 3000,
            });
          })
          .catch((error) => {
            console.error("Error al crear el producto", error);
            console.log("Error al crear el producto:", error);
          });
      }
    }
  };

  const removeProduct = () => {
    ProductoService.deleteProduct(product.id)
      .then(() => {
        getProducts();
        getCategories();
      })
      .catch((error) => {
        console.log(error);
      });
    setDeleteProductDialog(false);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Producto Eliminado",
      life: 3000,
    });
  };

  const removeSelectedProducts = () => {
    const productIds = selectedProducts.map((product) => product.id);
    ProductoService.deleteSelectedProducts(productIds)
      .then(() => {
        setProducts((prevproducts) =>
          prevproducts.filter((c) => !productIds.includes(c.id))
        );
        setSelectedProducts(null);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Productos Eliminados",
          life: 3000,
        });
        getProducts();
        getCategories();
      })
      .catch((error) => {
        console.error("Error al eliminar los productos:", error);
      });
    setDeleteProductsDialog(false);
  };

  const openNew = () => {
    setProduct(dataProduct);
    setSubmitted(false);
    setProductDialog(true);
    setModalTitle("Crear producto");
    setIsCreating(true);
  };

  const editproduct = (product) => {
    setProduct({ ...product });
    setSubmitted(false);
    setProductDialog(true);
    setModalTitle("Editar producto");
    setIsCreating(false);
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
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };

    _product[`${name}`] = val;

    setProduct(_product);
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

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Administrar Productos</h4>
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
        globalFilter={globalFilter}
        header={header}
        nombre_00="nombre"
        header_00="Nombre"
        nombre_01="precio"
        header_01="Precio"
        nombre_02="stock"
        header_02="Stock"
        nombre_03="detalle"
        header_03="Detalle"
        nombre_04="material"
        header_04="Material"
        nombre_05="largo"
        header_05="Largo"
        nombre_06="ancho"
        header_06="Ancho"
        nombre_07="alto"
        header_07="Alto"
        nombre_08="estado"
        header_08="Estado"
        nombre_09="categoria.nombre"
        header_09="Categoria"
        body={actionBodyTemplate}
      />
      {/** Modal de CREAR y ACTUALIZAR */}
      <DialogCreateUpdate
        isCategory={false}
        visible={productDialog}
        header={modalTitle}
        footer={productDialogFooter}
        onHide={hideDialog}
        htmlFor_00="nombre"
        label_00="Nombre"
        id_00="nombre"
        value_00={product.nombre}
        onChange_00={(e) => onInputChange(e, "nombre")}
        className_00={classNames({ "p-invalid": submitted && !product.nombre })}
        msgRequired_00={
          submitted &&
          !product.nombre && (
            <small className="p-error">El nombre es obligatorio.</small>
          )
        }
        htmlFor_01="precio"
        label_01="Precio"
        id_01="precio"
        value_01={product.precio}
        onChange_01={(e) => onInputChange(e, "precio")}
        className_01={classNames({ "p-invalid": submitted && !product.precio })}
        msgRequired_01={
          submitted &&
          !product.precio && (
            <small className="p-error">El precio es obligatorio.</small>
          )
        }
        htmlFor_02="stock"
        label_02="Stock"
        id_02="stock"
        value_02={product.stock}
        onChange_02={(e) => onInputChange(e, "stock")}
        className_02={classNames({ "p-invalid": submitted && !product.stock })}
        msgRequired_02={
          submitted &&
          !product.stock && (
            <small className="p-error">El stock es obligatorio.</small>
          )
        }
        htmlFor_03="detalle"
        label_03="Detalle"
        id_03="detalle"
        value_03={product.detalle}
        onChange_03={(e) => onInputChange(e, "detalle")}
        className_03={classNames({
          "p-invalid": submitted && !product.detalle,
        })}
        msgRequired_03={
          submitted &&
          !product.detalle && (
            <small className="p-error">El detalle es obligatorio.</small>
          )
        }
        htmlFor_04="material"
        label_04="Material"
        id_04="material"
        value_04={product.material}
        onChange_04={(e) => onInputChange(e, "material")}
        className_04={classNames({
          "p-invalid": submitted && !product.material,
        })}
        msgRequired_04={
          submitted &&
          !product.material && (
            <small className="p-error">El material es obligatorio.</small>
          )
        }
        htmlFor_05="largo"
        label_05="Largo"
        id_05="largo"
        value_05={product.largo}
        onChange_05={(e) => onInputChange(e, "largo")}
        className_05={classNames({ "p-invalid": submitted && !product.largo })}
        msgRequired_05={
          submitted &&
          !product.largo && (
            <small className="p-error">El largo es obligatorio.</small>
          )
        }
        htmlFor_06="ancho"
        label_06="Ancho"
        id_06="ancho"
        value_06={product.ancho}
        onChange_06={(e) => onInputChange(e, "ancho")}
        className_06={classNames({ "p-invalid": submitted && !product.ancho })}
        msgRequired_06={
          submitted &&
          !product.ancho && (
            <small className="p-error">El ancho es obligatorio.</small>
          )
        }
        htmlFor_07="alto"
        label_07="Alto"
        id_07="alto"
        value_07={product.alto}
        onChange_07={(e) => onInputChange(e, "alto")}
        className_07={classNames({ "p-invalid": submitted && !product.alto })}
        msgRequired_07={
          submitted &&
          !product.alto && (
            <small className="p-error">El alto es obligatorio.</small>
          )
        }
        htmlFor_08="estado"
        label_08="Estado"
        id_08="estado"
        value_08={product.estado}
        onChange_08={(e) => onInputChange(e, "estado")}
        className_08={classNames({ "p-invalid": submitted && !product.estado })}
        msgRequired_08={
          submitted &&
          !product.estado && (
            <small className="p-error">El estado es obligatorio.</small>
          )
        }
        label="Categoría"
        value={product.categoria.id}
        onChange={(event) =>
          setProduct({
            ...product,
            categoria: {
              id: event.target.value,
            },
          })
        }
        options={categories}
        optionValue="id"
        optionLabel="nombre"
        placeholder="Selecciona una categoría"
        classDrowp={classNames({ "p-invalid": submitted && !product.categoria.id })}
        msgRequired={
          submitted &&
          !product.categoria.id && (
            <small className="p-error">La categoria es obligatorio.</small>
          )
        }
      />
      {/** Modal de ELIMINAR una categoría */}
      <DialogDelete
        visible={deleteProductDialog}
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
        msgDialogModal={
          product && (
            <span>
              ¿Estás seguro de que quieres eliminar <b>{product.nombre}</b>? No
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
