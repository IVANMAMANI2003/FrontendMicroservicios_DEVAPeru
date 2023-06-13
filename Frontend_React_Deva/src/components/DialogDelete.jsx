import { Dialog } from "primereact/dialog";

export const DialogDelete = (props) => {
  // eslint-disable-next-line react/prop-types
  const { visible, footer, onHide, msgDialogModal } = props;
  return (
    <Dialog
      visible={visible}
      style={{ width: "32rem" }}
      breakpoints={{ "960px": "75vw", "641px": "90vw" }}
      header={
        <div style={{ display: "flex", alignItems: "center" }}>
          Confirmar acción
        </div>
      }
      modal
      footer={footer}
      onHide={onHide}
    >
      <div className="confirmation-content">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <i
            className="pi pi-exclamation-triangle mb-3"
            style={{ fontSize: "4rem" }}
          />
          {msgDialogModal}
        </div>
      </div>
    </Dialog>
  );
};
