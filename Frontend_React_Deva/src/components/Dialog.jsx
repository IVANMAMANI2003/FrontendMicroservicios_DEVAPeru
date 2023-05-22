import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

export const DialogCreateUpdate = (props) => {
  // eslint-disable-next-line react/prop-types
  const { classDrowp, msgRequired,visible, header, footer, onHide, value, onChange, options, optionValue, optionLabel, placeholder, htmlFor_00, label_00, id_00, value_00, onChange_00, className_00, msgRequired_00, htmlFor_01, label_01, id_01, value_01, onChange_01, className_01, msgRequired_01, htmlFor_02, label_02, id_02, value_02, onChange_02, className_02, msgRequired_02, htmlFor_03, label_03, id_03, value_03, onChange_03, className_03, msgRequired_03, htmlFor_04, label_04, id_04, value_04, onChange_04, className_04, msgRequired_04, htmlFor_05, label_05, id_05, value_05, onChange_05, className_05, msgRequired_05, htmlFor_06, label_06, id_06, value_06, onChange_06, className_06, msgRequired_06, htmlFor_07, label_07, id_07, value_07, onChange_07, className_07, msgRequired_07, htmlFor_08, label_08, id_08, value_08, onChange_08, className_08, msgRequired_08, label, isCategory } = props;

  let visibleInputs = [
    {
      input: htmlFor_00, label: label_00, id: id_00, value: value_00, onChange: onChange_00, autoFocus: 'autoFocus', className: className_00, msgRequired: msgRequired_00
    },
    {
      input: htmlFor_01, label: label_01, id: id_01, value: value_01, onChange: onChange_01, className: className_01, msgRequired: msgRequired_01
    },
    // Resto de las columnas visibles
  ];

  if (!isCategory) {
    // Agrega las demás columnas si no es una categoría
    visibleInputs = [
      ...visibleInputs,
      {
        input: htmlFor_02, label: label_02, id: id_02, value: value_02, onChange: onChange_02, className: className_02, msgRequired: msgRequired_02
      },
      {
        input: htmlFor_03, label: label_03, id: id_03, value: value_03, onChange: onChange_03, className: className_03, msgRequired: msgRequired_03
      },
      {
        input: htmlFor_04, label: label_04, id: id_04, value: value_04, onChange: onChange_04, className: className_04, msgRequired: msgRequired_04
      },
      {
        input: htmlFor_05, label: label_05, id: id_05, value: value_05, onChange: onChange_05, className: className_05, msgRequired: msgRequired_05
      },
      {
        input: htmlFor_06, label: label_06, id: id_06, value: value_06, onChange: onChange_06, className: className_06, msgRequired: msgRequired_06
      },
      {
        input: htmlFor_07, label: label_07, id: id_07, value: value_07, onChange: onChange_07, className: className_07, msgRequired: msgRequired_07
      },
      {
        input: htmlFor_08, label: label_08, id: id_08, value: value_08, onChange: onChange_08, className: className_08, msgRequired: msgRequired_08
      }
    ];
  }

  return (
    <Dialog
      visible={visible}
      style={{ width: "32rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      header={header}
      modal
      className="p-fluid"
      footer={footer}
      onHide={onHide}
    >
      {!isCategory && (
        <div className="field">
          <label className="mb-3 font-bold">{label}</label>
          <div>
            <Dropdown
              value={value}
              onChange={onChange}
              options={Array.isArray(options) ? [{ label: "Opción por defecto", value: "default" }, ...options] : []}
              optionValue={optionValue}
              optionLabel={optionLabel}
              placeholder={placeholder}
              className={classDrowp}
              required
            />
            {msgRequired}
          </div>
        </div>
      )}
      {visibleInputs.map((input, index) => (
        <div key={index} className="field">
          <label htmlFor={input.htmlFor} className="font-bold">
            {input.label}
          </label>
          <InputText
            id={input.id}
            value={input.value}
            onChange={input.onChange}
            required
            autoFocus={input.autoFocus}
            className={input.className}
          />
          {input.msgRequired}
        </div>
      ))}
    </Dialog>
  );
};

export const DialogDelete = (props) => {
  // eslint-disable-next-line react/prop-types
  const { visible, footer, onHide, msgDialogModal } = props;
  return (
    <Dialog
      visible={visible}
      style={{ width: "32rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      header={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          Confirmar acción
        </div>
      }
      modal
      footer={footer}
      onHide={onHide}
    >
      <div className="confirmation-content">
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
          <i className="pi pi-exclamation-triangle mb-3" style={{ fontSize: '4rem' }} />
          {msgDialogModal}
        </div>
      </div>
    </Dialog>
  )
}