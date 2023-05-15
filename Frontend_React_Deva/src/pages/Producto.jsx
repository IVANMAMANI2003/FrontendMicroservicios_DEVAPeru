import React, { useState, useEffect, useRef } from 'react';

// Importaciones de PrimeReact
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import 'jspdf-autotable';
import Table from '../components/Table';
import { DialogCreateUpdate, DialogDelete } from '../components/Dialog';
import { createProduct, deleteProduct, deleteSelectedProducts, getProductList, updateProduct } from '../services/ProductoService';
import { exportToExcel, exportToPdf } from '../exports/ExportFilePro';
import { getCategoryList } from '../services/CategoriaService';

export default function Product() {

  let dataCategory = {
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
    }
  };

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(dataCategory);
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
    getProductList()
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
        updateProduct(product)
          .then(() => {
            getProducts();
            getCategories();
            setProductDialog(false);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Categoría actualizado', life: 3000 });
          })
          .catch((error) => {
            console.error('Error al actualizar el producto:', error);
          });
      } else {
        createProduct(product)
          .then(() => {
            getProducts();
            getCategories();
            setProductDialog(false);
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Producto creado', life: 3000 });
          })
          .catch((error) => {
            console.error('Error al crear el producto', error)
            console.log('Error al crear el producto:', error);
          });
      }
    }
  };

  const removeProduct = () => {
    deleteProduct(product.id)
      .then(() => {
        getProducts();
        getCategories();
      })
      .catch((error) => {
        console.log(error);
      });
    setDeleteProductDialog(false);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Producto Eliminado', life: 3000 });
  };

  const removeSelectedProducts = () => {
    const productIds = selectedProducts.map((product) => product.id);
    deleteSelectedProducts(productIds)
      .then(() => {
        setProducts((prevproducts) => prevproducts.filter((c) => !productIds.includes(c.id)));
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Productos Eliminados', life: 3000 });
        getProducts();
        getCategories();
      })
      .catch((error) => {
        console.error('Error al eliminar los productos:', error);
      });
    setDeleteProductsDialog(false);
  };

  const openNew = () => {
    setProduct(dataCategory);
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
    const val = (e.target && e.target.value) || '';
    let _product = { ...product };

    _product[`${name}`] = val;

    setProduct(_product);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
        <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected}
          disabled={!selectedProducts || !selectedProducts.length} />
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
        <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editproduct(rowData)} />
        <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Administrar Productos</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
      </span>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button label="Cancelar" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Guardar" icon="pi pi-check" onClick={saveUpdate} />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
      <Button label="Sí" icon="pi pi-check" severity="danger" onClick={removeProduct} />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
      <Button label="Sí" icon="pi pi-check" severity="danger" onClick={removeSelectedProducts} />
    </React.Fragment>
  );

  return (
    <div>
      {/** TABLA de la categoría */}
      <Table refToast={toast} left={leftToolbarTemplate} right={rightToolbarTemplate} refDT={dt} value={products}
        selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)} dataKey="id"
        globalFilter={globalFilter} header={header} nombre_01="nombre" header_01="Nombre" nombre_02="precio" header_02="Precio" nombre_03="stock" header_03="Stock" nombre_04="detalle" header_04="Detalle" nombre_05="material" header_05="Material" nombre_06="largo" header_06="Largo" nombre_07="ancho" header_07="Ancho" nombre_08="alto" header_08="Alto" nombre_09="estado" header_09="Estado" nombre_10="categoria.nombre" header_10="Categoria" body={actionBodyTemplate} />
      {/** Modal de CREAR y ACTUALIZAR */}
      <DialogCreateUpdate visible={productDialog} header={modalTitle} footer={productDialogFooter}
        onHide={hideDialog} htmlFor_01="nombre" label_01="Nombre" id_01="nombre"
        value_01={product.nombre} onChange_01={(e) => onInputChange(e, 'nombre')}
        className_01={classNames({ 'p-invalid': submitted && !product.nombre })} msgRequired_01={submitted
          && !product.nombre && <small className="p-error">El nombre es obligatorio.</small>}
        htmlFor_02="precio" label_02="Precio" id_02="precio"
        value_02={product.precio} onChange_02={(e) => onInputChange(e, 'precio')}
        className_02={classNames({ 'p-invalid': submitted && !product.precio })}
        msgRequired_02={submitted && !product.precio && <small className="p-error">El precio es
          obligatorio.</small>}
        htmlFor_03="stock" label_03="Stock" id_03="stock"
        value_03={product.stock} onChange_03={(e) => onInputChange(e, 'stock')}
        className_03={classNames({ 'p-invalid': submitted && !product.stock })}
        msgRequired_03={submitted && !product.stock && <small className="p-error">El stock es
          obligatorio.</small>}
        htmlFor_04="detalle" label_04="Detalle" id_04="detalle"
        value_04={product.detalle} onChange_04={(e) => onInputChange(e, 'detalle')}
        className_04={classNames({ 'p-invalid': submitted && !product.detalle })}
        msgRequired_04={submitted && !product.detalle && <small className="p-error">El detalle es
          obligatorio.</small>}
        htmlFor_05="material" label_05="Material" id_05="material"
        value_05={product.material} onChange_05={(e) => onInputChange(e, 'material')}
        className_05={classNames({ 'p-invalid': submitted && !product.material })}
        msgRequired_05={submitted && !product.material && <small className="p-error">El material es
          obligatorio.</small>}
        htmlFor_06="largo" label_06="Largo" id_06="largo"
        value_06={product.largo} onChange_06={(e) => onInputChange(e, 'largo')}
        className_06={classNames({ 'p-invalid': submitted && !product.largo })}
        msgRequired_06={submitted && !product.largo && <small className="p-error">El largo es
          obligatorio.</small>}
        htmlFor_07="ancho" label_07="Ancho" id_07="ancho"
        value_07={product.ancho} onChange_07={(e) => onInputChange(e, 'ancho')}
        className_07={classNames({ 'p-invalid': submitted && !product.ancho })}
        msgRequired_07={submitted && !product.ancho && <small className="p-error">El ancho es
          obligatorio.</small>}
        htmlFor_08="alto" label_08="Alto" id_08="alto"
        value_08={product.alto} onChange_08={(e) => onInputChange(e, 'alto')}
        className_08={classNames({ 'p-invalid': submitted && !product.alto })}
        msgRequired_08={submitted && !product.alto && <small className="p-error">El alto es
          obligatorio.</small>}
        htmlFor_09="estado" label_09="Estado" id_09="estado"
        value_09={product.estado} onChange_09={(e) => onInputChange(e, 'estado')}
        className_09={classNames({ 'p-invalid': submitted && !product.estado })}
        msgRequired_09={submitted && !product.estado && <small className="p-error">El estado es
          obligatorio.</small>}
        label="Categoría"
        value={product.categoria.id} onChange={(event) =>
          setProduct({
            ...product,
            categoria: {
              id: event.target.value,
            },
          })}
        options={categories}
        optionValue="id"
        optionLabel="nombre"
        placeholder="Selecciona una categoría"
      />
      {/** Modal de ELIMINAR una categoría */}
      <DialogDelete visible={deleteProductDialog} footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog} msgDialogModal={product && (<span>
          Are you sure you want to delete <b>{product.nombre}</b>?
        </span>
        )} />
      {/** Modal de ELIMINAR varias products */}
      <DialogDelete visible={deleteProductsDialog} footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog} msgDialogModal={product && <span>Are you sure you want to
          delete the selected products?</span>} />
    </div>
  );
}
