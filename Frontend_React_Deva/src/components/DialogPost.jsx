import React from 'react'
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export const DialogCreateUpdate = (props) => {
  // eslint-disable-next-line react/prop-types
  const { width, visible, header, footer, onHide, htmlFor_00, label_00, id_00, value_00, onChange_00, className_00, msgRequired_00,htmlFor_01, label_01, id_01, value_01, onChange_01, className_01, msgRequired_01, valueFile, imagen, onChangeFile } = props;

  const fileInputRef = React.createRef();

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Dialog
      visible={visible}
      style={{ width: width }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      header={header}
      modal
      className="p-fluid"
      footer={footer}
      onHide={onHide}
    >
      <div className="field">
        <label htmlFor={htmlFor_00} className="font-bold">
          {label_00}
        </label>
        <InputText
          id={id_00}
          value={value_00}
          onChange={onChange_00}
          required
          autoFocus
          className={className_00}
        />
        {msgRequired_00}
      </div><div className="field">
        <label htmlFor={htmlFor_01} className="font-bold">
          {label_01}
        </label>
        <InputText
          id={id_01}
          value={value_01}
          onChange={onChange_01}
          required
          autoFocus
          className={className_01}
        />
        {msgRequired_01}
      </div>
      <div className="field">
        <div className="p-field">
          <label htmlFor="file" className="font-bold">Imagen:</label>
          <div className="p-inputgroup mt-3">
            <input
              ref={fileInputRef}
              accept="image/*"
              type="file"
              className="p-inputtext"
              style={{ display: "none" }}
              onChange={onChangeFile}
            />
            <Button
              type="button"
              icon="pi pi-upload"
              label="Seleccionar"
              onClick={handleClick}
            />
            <InputText
              readOnly
              value={valueFile}
              placeholder="Seleccionar archivo"
            />
          </div>
          {imagen}
        </div>
      </div>
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