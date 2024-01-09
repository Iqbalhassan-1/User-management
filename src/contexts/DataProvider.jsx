import { createContext, useState } from "react";

const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [searchText, setSearchText] = useState("");

  const updateData = (newData) => {
    setData([...newData]);
  };
  const uploadFiles = (file) => {
    setUploadedFiles((prevFiles) => {
      // Check if the file with the same name already exists
      const fileIndex = prevFiles.findIndex((f) => f?.name === file?.name);

      if (fileIndex !== -1) {
        // If the file with the same name exists, replace it
        const updatedFiles = [...prevFiles];
        updatedFiles[fileIndex] = file;
        return updatedFiles;
      } else {
        // If the file with the same name doesn't exist, add the new file
        return [...prevFiles, file];
      }
    });
  };

  return (
    <DataContext.Provider
      value={{
        data,
        updateData,
        searchText,
        setSearchText,
        uploadedFiles,
        uploadFiles,
        setUploadedFiles,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;
