import { MdErrorOutline } from "react-icons/md";

const TextArea = ({
  label,
  name,
  placeholder,
  register,
  errors,
  validationSchema,
  isOptional,
  disabled,
  defaultValue,
  size = {
    col: 40,
    row: 2,
  },
  className = "",
  errMsg = undefined,
}) => {
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      <label htmlFor={name} className="block font-medium">
        <span className="text-gray-900">{label}</span>{" "}
        {isOptional ? "" : <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        id={name}
        placeholder={placeholder && placeholder}
        defaultValue={defaultValue}
        cols={size.col}
        rows={size.row}
        disabled={disabled}
        className={`box-border border text-gray-900 focus-within:outline-none rounded-md transition-colors inputShadow px-3 py-2 w-full border-gray-200 focus:outline-none ${
          errors[name]?.message ? "border-red-500" : "focus:border-blue-500"
        } ${disabled ? "bg-slate-100" : ""}`}
        {...register(name, validationSchema)}
      ></textarea>
      {errors && errMsg && (
        <p
          className="flex items-center gap-1 text-sm text-red-500"
          role="alert"
        >
          <span aria-label="Error">
            <MdErrorOutline />
          </span>
          <span>{errMsg}</span>
        </p>
      )}
      {errors && errors[name]?.type === "required" && (
        <p
          className="flex items-center gap-1 text-sm text-red-500"
          role="alert"
        >
          <span aria-label="Error">
            <MdErrorOutline />
          </span>
          <span>{errors[name]?.message}</span>
        </p>
      )}
    </div>
  );
};

export default TextArea;
