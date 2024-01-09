import { MdErrorOutline } from "react-icons/md";

const Input = ({
  label,
  name,
  type,
  placeholder = "",
  icon: Icon,
  autoComplete = "on",
  keyHint = "next",
  disabled,
  register,
  errors,
  validationSchema,
  isOptional,
  errMsg = undefined,
}) => {
  return (
    <div className="space-y-1 w-full">
      <label htmlFor={name} className="block sm:font-medium">
        <span className="text-gray-900">{label}</span>
        {isOptional ? "" : <span className="text-red-500"> *</span>}
      </label>
      <div className="relative flex items-center rounded-md w-full">
        {Icon && (
          <span className="absolute left-3 top-[55%] transform -translate-y-1/2">
            <Icon className="w-4 h-4 text-gray-400" />
          </span>
        )}
        <input
          type={type}
          name={name}
          id={name}
          autoComplete={autoComplete}
          placeholder={placeholder}
          enterKeyHint={keyHint}
          disabled={disabled}
          {...register(name, {
            ...validationSchema,
          })}
          className={`box-border text-gray-900 border focus-within:outline-none rounded-md p-3 transition-colors py-2 ${
            Icon ? "pl-8" : ""
          } w-full focus:outline-none ${
            errors[name]?.message
              ? "border-red-500"
              : "focus:border-blue-500 border-gray-200"
          } ${disabled ? "bg-slate-100" : ""}`}
        />
      </div>
      {errors && errMsg && (
        <p
          className="mt-1 flex items-center gap-1 text-sm text-red-500"
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
          className="mt-1 flex items-center gap-1 text-sm text-red-500"
          role="alert"
        >
          <span aria-label="Error">
            <MdErrorOutline />
          </span>
          <span>{errors[name]?.message}</span>
        </p>
      )}
      {errors && errors[name]?.type === "pattern" && (
        <p
          className="mt-1 flex items-center gap-1 text-sm text-red-500"
          role="alert"
        >
          <span aria-label="Error">
            <MdErrorOutline />
          </span>
          <span>{errors[name]?.message}</span>
        </p>
      )}
      {errors && errors[name]?.type === "minLength" && (
        <p className="mt-1 text-sm text-red-500" role="alert">
          {errors[name]?.message}
        </p>
      )}
      {errors && errors[name]?.type === "maxLength" && (
        <p
          className="mt-1 flex items-center gap-1 text-sm text-red-500 opac"
          role="alert"
        >
          <span aria-label="Error">
            <MdErrorOutline />
          </span>
          <span>{errors[name]?.message}</span>
        </p>
      )}
      {errors && errors[name]?.type === "min" && (
        <p
          className="mt-1 flex items-center gap-1 text-sm text-red-500 opac"
          role="alert"
        >
          <span aria-label="Error">
            <MdErrorOutline />
          </span>
          <span>{errors[name]?.message}</span>
        </p>
      )}
      {errors && errors[name]?.type === "max" && (
        <p
          className="mt-1 flex items-center gap-1 text-sm text-red-500 opac"
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
export default Input;
