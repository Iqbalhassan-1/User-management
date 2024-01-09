const CustomSelect = ({
  children,
  name,
  label,
  fisrtOp,
  defaultValue,
  disabled,
  register,
  errors,
  validationSchema,
  isOptional,
}) => {
  return (
    <div className="space-y-1 w-full">
      <label htmlFor={name} className="block sm:font-medium">
        <span className="text-gray-900">{label}</span>
        {isOptional ? "" : <span className="text-red-500"> *</span>}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
        className={`box-border w-full border text-gray-800 focus-within:outline-none rounded-md transition-colors px-1 py-2 border-gray-300 focus:outline-none ${
          errors[name]?.message ? "border-red-500" : "focus:border-blue-500"
        } ${disabled ? "bg-slate-100" : ""}`}
        {...register(name, validationSchema)}
      >
        <option value="">{fisrtOp}</option>
        {children}
      </select>
      {errors && errors[name]?.type === "required" && (
        <p className="mt-1 text-sm text-red-500" role="alert">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};

export default CustomSelect;
