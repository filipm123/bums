"use client";
import Box from "@mui/material/Box";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, useRef } from "react";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  collection,
  query,
  getDocs,
  where,
  deleteDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { storage } from "firebase.js";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "black",
  border: "1px solid #242424",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",
  borderRadius: "0.25rem",
};

const FileUpload = ({ handleCloseModal, fetchData, id, projectid }) => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const [duration, setDuration] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const metadata = { contentType: "audio/wav" };
  const storage = getStorage();

  const uploadFiles = async () => {
    for (const file of files) {
      const fileRef = ref(storage, `${projectid}/${file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file, metadata);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              setUploadProgress(progress);
          }
        },
        (error) => {
          //TODO: Handle unsuccessful uploads
        },
        async () => {
          const downloadUrl = await getDownloadURL(fileRef);
          const tracksRef = doc(db, "tracks", id);

          updateDoc(tracksRef, {
            audioFiles: arrayUnion(downloadUrl),
            trackDuration: duration,
          }).then(fetchData());

          handleCloseModal();
        },
      );
    }
  };
  const FilePreview = () => {
    const filesArray = Array.from(files);
    return (
      <List>
        {filesArray.map((file, index) => (
          <ListItem key={index}>
            <ListItemText primary={file.name} />
          </ListItem>
        ))}
      </List>
    );
  };

  

  if (uploadProgress == 0) {
    return (
      <>
        <Box id="box" sx={style}>
          <h3 className="mb-2 text-xl">Upload your tracks</h3>
          <FilePreview />
          <Button className="w-full" component="label" variant="contained">
            + Add files
            <VisuallyHiddenInput
              type="file"
              multiple
              onChange={(e) => {
                setFiles(e.target.files);
              }}
            />
          </Button>

          <Button
            className="w-full"
            component="label"
            variant="contained"
            onClick={uploadFiles}
          >
            <CloudUploadIcon className="mr-2" />
            Upload
          </Button>
        </Box>
      </>
    );
  }
  return (
    <>
      <Box id="box" sx={style}>
        <h1>Uploading...</h1>{" "}
        <CircularProgress variant="determinate" value={uploadProgress} />
      </Box>
    </>
  );
};

export default FileUpload;
