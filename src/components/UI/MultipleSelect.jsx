import { useCallback, useEffect } from "react";

const MultipleSelect = ({
  name,
  label,
  options: possiblesValues,
  firstOption = "Select",
  register,
  trigger,
  values,
  setValue,
  disabled,
  errors,
  validationSchema,
}) => {
  const customOnChange = useCallback(
    (event) => {
      const selectedValue = event.target.value;
      setValue("values", Array.from(new Set([...values, selectedValue])));
      trigger("values");
    },
    [values, setValue, trigger]
  );

  useEffect(() => {
    register("values", validationSchema);
  }, [register, validationSchema]);

  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        <span className="text-gray-900">{label}</span>
        <span className="text-red-500"> *</span>
      </label>
      <select
        id={name}
        name={name}
        onChange={customOnChange}
        className={`box-border w-full max-w-7xl border text-gray-600 focus-within:outline-none rounded-md transition-colors px-1 whitespace-pre-line py-2 border-gray-200 focus:outline-none ${
          errors[name]?.message ? "border-red-500" : "focus:border-blue-500"
        } ${disabled ? "bg-slate-100" : ""}`}
      >
        <option value="">{firstOption}</option>
        {possiblesValues?.length > 0 &&
          possiblesValues
            .filter((value) => {
              return !values?.includes(value._id);
            })
            ?.map((value) => {
              return (
                <option key={value?._id} value={value?._id}>
                  {value?.title}
                </option>
              );
            })}
      </select>
      {errors && errors?.values && values?.length === 0 && (
        <p className="mt-1 text-sm text-red-500" role="alert">
          {errors.values.message}
        </p>
      )}
    </div>
  );
};

export default MultipleSelect;
