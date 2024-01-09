import { useTranslation } from "react-i18next";

const Select = ({
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
  const { t } = useTranslation();
  return (
    <div className="space-y-1 w-full">
      <label htmlFor={name} className="block font-medium">
        <span className="text-gray-900">{label}</span>
        {isOptional ? "" : <span className="text-red-500"> *</span>}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
        className={`box-border w-full border text-gray-600 focus-within:outline-none rounded-md transition-colors p-[10px] border-gray-200 focus:outline-none ${
          errors[name]?.message ? "border-red-500" : "focus:border-blue-500"
        } ${disabled ? "bg-slate-100" : ""}`}
        {...register(name, validationSchema)}
      >
        <option value="">{t(fisrtOp)}</option>
        {t(children)}
      </select>
      {errors && errors[name]?.type === "required" && (
        <p className="mt-1 text-sm text-red-500" role="alert">
          {errors[name]?.message}
        </p>
      )}
    </div>
  );
};

export default Select;
