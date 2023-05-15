import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Table = (props) => {
  // eslint-disable-next-line react/prop-types
  const { refToast, left, right, refDT, value, selection, onSelectionChange, dataKey, globalFilter, header, nombre_01, header_01, nombre_02, header_02, nombre_03, header_03, nombre_04, header_04, nombre_05, header_05, nombre_06, header_06, nombre_07, header_07, nombre_08, header_08, nombre_09, header_09, nombre_10, header_10, body, isCategory } = props;

  let visibleColumns = [
    { field: nombre_01, header: header_01, minWidth: '12rem' },
    { field: nombre_02, header: header_02, minWidth: '12rem' },
    // Resto de las columnas visibles
  ];

  if (!isCategory) {
    // Agrega las demás columnas si no es una categoría
    visibleColumns = [
      ...visibleColumns,
      {
        field: nombre_03, header: header_03, minWidth: '12rem'
      },
      {
        field: nombre_04, header: header_04, minWidth: '12rem'
      },
      {
        field: nombre_05, header: header_05, minWidth: '12rem'
      },
      {
        field: nombre_06, header: header_06, minWidth: '12rem'
      },
      {
        field: nombre_07, header: header_07, minWidth: '12rem'
      },
      {
        field: nombre_08, header: header_08, minWidth: '12rem'
      },
      {
        field: nombre_09, header: header_09, minWidth: '12rem'
      },
      {
        field: nombre_10, header: header_10, minWidth: '12rem'
      },
    ];
  }
  return (
    <>
      <Toast ref={refToast} />
      <div className="card" style={{ padding: 15 }}>
        <Toolbar className="mb-4" left={left} right={right}></Toolbar>
        <DataTable ref={refDT} value={value} selection={selection} onSelectionChange={onSelectionChange}
          dataKey={dataKey} paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} clientes" globalFilter={globalFilter} header={header} emptyMessage="No se encontraron resultados">
          <Column selectionMode="multiple" exportable={false}></Column>
          {visibleColumns.map((column, index) => (
            <Column
              key={index}
              field={column.field}
              header={column.header}
              sortable
              style={{ minWidth: column.minWidth }}
            />
          ))}
          <Column body={body} exportable={false} style={{ minWidth: '12rem' }}></Column>
        </DataTable>
      </div>
    </>
  )
}

export default Table
