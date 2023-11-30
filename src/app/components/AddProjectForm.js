import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useState, useContext } from "react";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import { UserContext } from "../Context/UserContext";

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

const AddProjectForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const { currentUser } = useContext(UserContext);

  const addProject = async (e) => {
    e.preventDefault();
    try {
      const projectRef = collection(db, "projects");
      await addDoc(projectRef, {
        title: title,
        owner: currentUser.uid,
        author: currentUser.displayName,
      });
      setTitle("");
    } catch (error) {
      console.error("Error uploading data: ", error);
    }
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
          required
        />
        <Button className="w-full" type="submit" variant="contained">
          Add
        </Button>
      </Box>
    </form>
  );
};

export default AddProjectForm;
