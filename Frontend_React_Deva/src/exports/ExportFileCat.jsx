import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

// Exporta los datos a un archivo PDF
export const exportToPdf = (categorias) => {
  const doc = new jsPDF();
  const columns = [
    { header: "Id", dataKey: "id" },
    { header: "Nombre", dataKey: "nombre" },
    { header: "Estado", dataKey: "estado" },
  ];
  const rows = categorias.map((categoria) => ({
    id: categoria.id,
    nombre: categoria.nombre,
    estado: categoria.estado,
  }));

  doc.autoTable({
    columns: columns,
    body: rows,
    startY: 10,
  });
  doc.save("categories.pdf");
};

// Exporta los datos a un archivo Excel (XLSX)
export const exportToExcel = (categorias) => {
  const worksheet = XLSX.utils.json_to_sheet(categorias);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Categorias');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const categoria = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(categoria, 'categories.xlsx');
};

// Exporta los datos a un archivo CSV
export const exportToCsv = (categorias) => {
  const csvContent = convertDataToCsv(categorias);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "categorias.csv");
  console.log("Exportado a CSV");
};

// Lógica para convertir los datos a formato CSV
const convertDataToCsv = (categorias) => {
  let csvContent = "Categoria ID, Nombre, Estado\n";
  categorias.forEach((category) => {
    csvContent += `${category.id},${category.nombre},${category.estado}\n`;
  });
  return csvContent;
};