import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

// Exporta los datos a un archivo PDF
export const exportToPdf = (users) => {
    const doc = new jsPDF();
    const columns = [
        { header: "Id", dataKey: "id" },
        { header: "Nombre", dataKey: "nombre" },
        { header: "Categoría", dataKey: "categoria" },
        { header: "Estado", dataKey: "estado" },
        { header: "Precio", dataKey: "precio" },
        { header: "Stock", dataKey: "stock" },
        { header: "Detalle", dataKey: "detalle" },
        { header: "Material", dataKey: "material" },
        { header: "Largo", dataKey: "largo" },
        { header: "Ancho", dataKey: "ancho" },
        { header: "Alto", dataKey: "alto" },

    ];
    const rows = users.map((user) => ({
        id: user.id,
        nombre: user.nombre,
        categoria: user.categoria.nombre,
        estado: user.estado,
        precio: user.precio,
        stock: user.stock,
        detalle: user.detalle,
        material: user.material,
        largo: user.largo,
        ancho: user.ancho,
        alto: user.alto,
    }));

    doc.autoTable({
        columns: columns,
        body: rows,
        startY: 10,
    });
    doc.save("products.pdf");
};

// Exporta los datos a un archivo Excel (XLSX)
export const exportToExcel = (products) => {
    const excelData = products.map((user) => ({
      id: user.id,
      nombre: user.nombre,
      categoria: user.categoria.nombre,
      estado: user.estado,
      precio: user.precio,
      stock: user.stock,
      detalle: user.detalle,
      material: user.material,
      largo: user.largo,
      ancho: user.ancho,
      alto: user.alto,
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Productos");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const product = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(product, "products.xlsx");
  };

// Exporta los datos a un archivo CSV
export const exportToCsv = (products) => {
    const csvContent = convertDataToCsv(products);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "products.csv");
    console.log("Exportado a CSV");
};

// Lógica para convertir los datos a formato CSV
const convertDataToCsv = (products) => {
    let csvContent = "ID, Nombre, Estado\n";
    products.forEach((product) => {
        csvContent += `${product.id},${product.nombre},${product.estado}\n`;
    });
    return csvContent;
};