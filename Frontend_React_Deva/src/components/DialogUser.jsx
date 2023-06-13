import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

export const DialogCreateUpdate = (props) => {
  // eslint-disable-next-line react/prop-types
  const { visible, header, footer, onHide, htmlFor_00, label_00, id_00, value_00, onChange_00, className_00, msgRequired_00, htmlFor_01, label_01, id_01, value_01, onChange_01, className_01, msgRequired_01, htmlFor_02, label_02, id_02, value_02, onChange_02, className_02, msgRequired_02, htmlFor_03, label_03, id_03, value_03, onChange_03, className_03, msgRequired_03, htmlFor_04, label_04, id_04, value_04, onChange_04, className_04, msgRequired_04, isCategory } = props;

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