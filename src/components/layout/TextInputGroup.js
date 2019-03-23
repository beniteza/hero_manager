import React from "react";
import PropTypes from "prop-types";

//Used to verify if a specific component has errors to mark them as invalid in the html
import classnames from "classnames";

const TextInputGroup = ({
  //props we expect
  label,
  name,
  value,
  placeholder,
  type,
  onChange,
  errors
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        //classnames() first param are default classes. second is the class that we want w/ the condition required
        className={classnames("form-control form-control-lg", {
          "is-invalid": errors
        })}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {/* Validation: contains the msg that appears when a field is invalid aka has an error */}
      {/* if there's an error then (&&) display the div */}
      {errors && <div className="invalid-feedback">{errors}</div>}
    </div>
  );
};

TextInputGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

//type default is text. When otherwise, email, passwd, etc overrides text
TextInputGroup.defaultProps = {
  type: "text"
};

export default TextInputGroup;
