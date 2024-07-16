import Button from "./Button";

const Modal = ({ buttonStyle, onClose, value, style, onSubmit }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundColor: "rgb(0,0,0,0.5)",
          zIndex: "1000",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          top: 0,
          left: 0,
        }}
      >
        <div style={style}>
          <div
            className="close"
            style={{
              position: "absolute",
              right: "20px",
              top: "20px",
              fontWeight: "600",
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            x
          </div>
          <h3>Are You Sure?</h3>
          <div>
            <Button
              textcolor={buttonStyle}
              value={value.Del}
              handleSub={onSubmit}
            ></Button>
            <Button
              textcolor={buttonStyle}
              handleSub={onClose}
              value={value.Cancel}
            ></Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
