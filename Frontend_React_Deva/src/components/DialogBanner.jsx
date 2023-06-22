/* eslint-disable react/prop-types */
import React from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export const DialogCreateUpdate = (props) => {
  const {
    width,
    visible,
    header,
    footer,
    onHide,
    htmlFor_00,
    label_00,
    id_00,
    value_00,
    onChange_00,
    className_00,
    msgRequired_00,
    htmlFor_01,
    label_01,
    id_01,
    value_01,
    onChange_01,
    className_01,
    msgRequired_01,
    isCategory,
    valueFile,
    imagen,
    onChangeFile,
  } = props;

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
      {!isCategory && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "2rem",
            }}
          >
            <div>
              <div className="field">
                <label htmlFor={htmlFor_00} className="font-bold">
                  {label_00}
                </label>
                <InputText
                  id={id_00}
                  value={value_00}
                  onChange={onChange_00}
                  required
                  className={className_00}
                />
                {msgRequired_00}
              </div>
              <div className="field">
                <label htmlFor={htmlFor_01} className="font-bold">
                  {label_01}
                </label>
                <InputText
                  id={id_01}
                  value={value_01}
                  onChange={onChange_01}
                  required
                  className={className_01}
                />
                {msgRequired_01}
              </div>
            </div>
            <div className="field">
              <div className="p-field">
                <label htmlFor="file" className="font-bold">
                  Imagen:
                </label>
                <div className="p-inputgroup mt-3">
                  <input
                    ref={fileInputRef}
                    accept="image/*"
                    type="file"
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
          </div>
        </>
      )}
    </Dialog>
  );
};
