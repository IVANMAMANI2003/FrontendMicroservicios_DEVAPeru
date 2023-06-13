/* eslint-disable react/prop-types */
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { FileUpload } from "primereact/fileupload";

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
    imagen,
    onChangeFile,
    emptyTemplate,
    uploadHandler,
    onClearFile
  } = props;

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
          autoFocus
          className={className_01}
        />
        {msgRequired_01}
      </div>
      <div className="field">
        <div className="p-field">
          <label htmlFor="file">Imágenes</label>
          <FileUpload
            name="file"
            url="/imagen"
            multiple
            customUpload
            emptyTemplate={emptyTemplate}
            chooseLabel="Seleccionar imágenes"
            uploadLabel="Subir"
            cancelLabel="Cancelar"
            uploadHandler={uploadHandler}
            onSelect={onChangeFile}
            onClear={onClearFile}
          >
            {imagen}
          </FileUpload>
        </div>
      </div>
    </Dialog>
  );
};
