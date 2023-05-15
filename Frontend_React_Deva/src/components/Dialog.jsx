import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

export const DialogCreateUpdate = (props) => {
  // eslint-disable-next-line react/prop-types
  const { visible, header, footer, onHide, value, onChange, options, optionValue, optionLabel, placeholder, htmlFor_01, label_01, id_01, value_01, onChange_01, className_01, msgRequired_01, htmlFor_02, label_02, id_02, value_02, onChange_02, className_02, msgRequired_02, htmlFor_03, label_03, id_03, value_03, onChange_03, className_03, msgRequired_03, htmlFor_04, label_04, id_04, value_04, onChange_04, className_04, msgRequired_04, htmlFor_05, label_05, id_05, value_05, onChange_05, className_05, msgRequired_05, htmlFor_06, label_06, id_06, value_06, onChange_06, className_06, msgRequired_06, htmlFor_07, label_07, id_07, value_07, onChange_07, className_07, msgRequired_07, htmlFor_08, label_08, id_08, value_08, onChange_08, className_08, msgRequired_08, htmlFor_09, label_09, id_09, value_09, onChange_09, className_09, msgRequired_09, label } = props;

  const inputs = [{
    input: htmlFor_01, label: label_01, id: id_01, value: value_01, onChange: onChange_01, autoFocus: 'autoFocus', className: className_01, msgRequired: msgRequired_01
  },
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
  },
  {
    input: htmlFor_09, label: label_09, id: id_09, value: value_09, onChange: onChange_09, className: className_09, msgRequired: msgRequired_09
  }
  ];

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
      <div className="field">
        <label className="mb-3 font-bold">{label}</label>
        <div className="formgrid grid">
          <Dropdown
            value={value}
            onChange={onChange}
            options={options}
            optionValue={optionValue}
            optionLabel={optionLabel}
            placeholder={placeholder}
            className="form-select"
          />
        </div>
      </div>
      {inputs.map((input, index) => (
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
    <Dialog visible={visible} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirmar" modal footer={footer} onHide={onHide}>
      <div className="confirmation-content">
        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
        {msgDialogModal}
      </div>
    </Dialog>
  )
}