import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { getStorage, ref } from "firebase/storage";

function MyDropzone() {
  const [selectedImg, setSelectedImg] = useState([]);
  const storage = getStorage();
  const onDrop = useCallback(
    (acceptedFiles) => {
      const storageRef = storage.ref();
      acceptedFiles.forEach((file) => {
        const uploadTask = storageRef.child(`covers/${file.name}`).put(file);
        uploadTask.on(
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            // Handle unsuccessful uploads
            console.error("Error uploading file:", error);
          },
          () => {
            // Handle successful uploads on complete
            console.log("File uploaded successfully");
          }
        );
      });
      setSelectedImg(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
    [storage]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const selected_img = selectedImg?.map((file) => (
    <div key={file.name}>
      <img src={file.preview} alt="" />
    </div>
  ));

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
      <div>{selected_img}</div>
    </div>
  );
}

export default MyDropzone;
