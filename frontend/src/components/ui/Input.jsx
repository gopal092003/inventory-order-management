import { forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Input = forwardRef(({
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  onBlur,
  error,
  helperText,
  required = false,
  disabled = false,
  fullWidth = true,
  className,
  ...props
}, ref) => {
  return (
    <div
      className={clsx(
        "input-group",
        {
          "input-group--full":
            fullWidth,
        }
      )}
    >
      {label && (
        <label
          htmlFor={name}
          className="input-label"
        >
          {label}

          {required && (
            <span className="input-required">
              *
            </span>
          )}
        </label>
      )}

      <input
        ref={ref}
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={clsx(
          "input",
          {
            "input--error":
              Boolean(error),
          },
          className
        )}
        {...props}
      />

      {error ? (
        <span className="input-error">
          {error}
        </span>
      ) : (
        helperText && (
          <span className="input-helper">
            {helperText}
          </span>
        )
      )}
    </div>
  );
});

Input.displayName = "Input";

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};

export default Input;
