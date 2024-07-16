const SelectField = (props) => {
  const onChange = (e) => {
    if (props.onChange) {
      console.log(e.target.value, props.id, "SelecField");
      props.onChange(e, props.id ? props.id : e.target.value);
    }
  };

  return (
    <>
      <label htmlFor={props.label}>{props.label}</label>
      <br />
      <select type={props.type} name={props.label} onChange={onChange}>
        <option value="" disabled hidden selected={true}>
          {props.name}
        </option>
        {props?.options?.map((value) => {
          return <option value={value}>{value}</option>;
        })}
      </select>
    </>
  );
};

export default SelectField;
