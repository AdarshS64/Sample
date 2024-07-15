const SelectField = (props) => {
  const onChange = (e) => {
    if (props.onChange) {
      console.log(e.target.value, props.id);
      props.onChange(e, props.id);
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
