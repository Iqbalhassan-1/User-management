import { useMutation } from "@tanstack/react-query";
import { MdErrorOutline } from "react-icons/md";
import { uploadFile } from "../../api/mctdService";
import toast from "react-hot-toast";
import useDataContext from "../../utils/hooks/useDataContext";

const FileInput = ({
  label,
  name,
  register,
  errors,
  validationSchema,
  isOptional,
  errMsg = undefined,
  setFiles,
  defaultValue,
  rest,
}) => {
  const { uploadFiles, uploadedFiles } = useDataContext();
  console.log("uplaodfiles", uploadedFiles);
  const uploadFileMutation = useMutation(uploadFile, {
    onSuccess: (data) => {
      toast.success("File Uploaded");
      setFiles((prevUrls) => [
        ...prevUrls,
        { url: data?.url, name: data?.name },
      ]);
      console.log("data", data);
      uploadFiles({ url: data?.url, name: data?.name });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleUploadFile = (e) => {
    const file = e.target.files[0]; // Get the selected file
    const fieldName = e.target.name;
    const fileName = file?.name;
    if (file) {
      const formData = new FormData(); // Create a new FormData object
      formData.append("file", file); // Append the file to the FormData object with a key 'file'

      // Make an API call to upload the file using formData
      uploadFileMutation.mutate({ formData, name: fieldName });
    }
  };

  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block font-medium">
        <span className="text-gray-900">{label}</span>
        {isOptional ? "" : <span className="text-red-500"> *</span>}
      </label>
      <input
        type="file"
        id={name}
        name={name}
        disabled={uploadFileMutation.isLoading}
        defaultValue={defaultValue}
        className="block w-full text-sm text-gray-900
        file:mr-4 file:py-3 file:px-6 rounded-md file:text-sm file:font-medium file:border-0 file:bg-gray-800 file:text-white hover:file:bg-gray-800/80 border border-gray-300 bg-gray-50 transition-colors cursor-pointer file:hover:cursor-pointer hover:bg-gray-100 disabled:bg-gray-300 disabled:cursor-wait file:disabled:cursor-wait"
        {...register(name, {
          ...validationSchema,
          onChange: (e) => handleUploadFile(e),
        })}
        {...rest}
      />
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
    </div>
  );
};

export default FileInput;
