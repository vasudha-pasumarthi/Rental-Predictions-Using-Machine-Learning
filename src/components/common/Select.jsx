const Select = (props) => {
  return (
    <div className={props.className}>
      <select
        className="form-select"
        aria-label="Default select example"
        name={props.name}
        id={props.name}
        onChange={props.onChange}
        value={props.value}
        disabled={props.disabled}
      >
        <option value="">{props.default}</option>
        {props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
