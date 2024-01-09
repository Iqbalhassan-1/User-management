import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { uploadFile } from "../../api/mctdApi";

function useFileUpload() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const queryClient = useQueryClient();

  const uploadFileMutation = useMutation(uploadFile, {
    onSuccess: (data) => {
      toast.success("File Uploaded");
      setUploadedFiles((prevState) => [...prevState, data]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleUploadFile = (e) => {
    const file = e.target.files[0]; // Get the selected file
    const name = e.target.name;
    if (file) {
      const formData = new FormData(); // Create a new FormData object
      formData.append("file", file); // Append the file to the FormData object with a key 'file'

      // Make an API call to upload the file using formData
      uploadFileMutation.mutate({ formData, name });
    }
  };

  return { uploadedFiles, handleUploadFile };
}

export default useFileUpload;
