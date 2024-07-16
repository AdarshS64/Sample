import Button from "./Button";

const Modal = ({ buttonStyle, onClose, value, style }) => {
  return (
    <>
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
          <Button textcolor={buttonStyle} value={value.Del}></Button>
          <Button
            textcolor={buttonStyle}
            handleSub={onClose}
            value={value.Cancel}
          ></Button>
        </div>
      </div>
    </>
  );
};

export default Modal;
