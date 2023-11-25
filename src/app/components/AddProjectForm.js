import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import MyDropzone from "./Dropzone";

const AddProjectForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cover, setCover] = useState("");
  const [files, setFiles] = useState([]);

  const addProject = () => {
    setDoc(doc(db, "projects"), {
      title: title,
      author: author,
      cover: cover,
      files: files,
    });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#08070B",
    border: "2px solid #000",
    boxShadow: 24,
    p: 8,
  };
  return (
    <form onSubmit={addProject}>
      <Box className="rounded flex items-center flex-col gap-4" sx={style}>
        <h1 className="text-center font-bold text-2xl">Add project</h1>
        <TextField
          id="outlined-basic"
          label="Project name"
          variant="outlined"
          className="w-full"
        />
        <TextField
          id="outlined-basic"
          label="Artist"
          variant="outlined"
          className="w-full"
        />
        <MyDropzone />
        <Button className="w-full" type="submit" variant="contained">
          Add
        </Button>
      </Box>
    </form>
  );
};

export default AddProjectForm;
