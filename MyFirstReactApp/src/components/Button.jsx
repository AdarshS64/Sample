const Button = (props) => {
  return (
    <>
      <button
        onClick={props.handleSub}
        className={props.className}
        style={{ background: props.color, color: props.textcolor }}
        
      >
        {props.value}
      </button>
    </>
  );
};

export default Button;
