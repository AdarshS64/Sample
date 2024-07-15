import Button from "./Button";

const Modal = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          position: "fixed",
          zIndex: "1000",
          left: "0",
          top: "0",
          width: "50%",
          height: "50%",
          backgroundColor: "rgba(1, 1, 1, 0.5)",
          color: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h3>Are You Sure?</h3>
        <Button></Button>
        <Button></Button>
      </div>
    </>
  );
};

export default Modal;
