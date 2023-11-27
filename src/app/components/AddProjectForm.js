import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useState, } from "react";
import { doc, setDoc, addDoc } from "firebase/firestore";
import { db } from "../../../firebase";


const AddProjectForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const addProject = async () => {
    try {
      const docRef = await addDoc(collection(db, "projects"), {
        title: title,
        author: author,
      });
    } catch (error) {
      console.error("Error uploading data: ", error);
    }
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
          F
          variant="outlined"
          className="w-full"
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Artist"
          variant="outlined"
          className="w-full"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <Button className="w-full" type="submit" variant="contained">
          Add
        </Button>
      </Box>
    </form>
  );
};

export default AddProjectForm;
