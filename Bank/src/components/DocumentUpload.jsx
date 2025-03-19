import React, { useState } from "react";
import axios from "axios";

const DocumentUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file!");

    const formData = new FormData();
    formData.append("document", selectedFile);

    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData);
      console.log(response.data);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
//     <div class="input-group mb-3">
//   <input type="file"  onChange={handleFileChange} class="form-control" id="inputGroupFile02"/>
//   <label class="input-group-text" for="inputGroupFile02" onClick={handleUpload}>Upload</label>
// </div>
  );
};

export default DocumentUpload;
