"use client";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useState, useContext } from "react";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import { UserContext } from "../Context/UserContext";
import { useRouter } from "next/navigation";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#08070B",
  border: "1px solid #545363",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const AddProjectForm = () => {
  const [title, setTitle] = useState("");
  const { currentUser } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
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
      setModalOpen(false);
      this.forceUpdate(); 
    } catch (error) {
      console.error("Error uploading data: ", error);
    }
  };

  return (
    <div>
      {" "}
      <ListItemButton onClick={handleOpen}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Add Project"></ListItemText>
      </ListItemButton>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedb2y="modal-modal-description"
      >
        <form onSubmit={addProject}>
          <Box className="rounded flex items-center flex-col gap-4" sx={style}>
            <h1 className="p-4 text-center font-bold text-2xl">Add project</h1>
            <TextField
              id="outlined-basic"
              label="Project name"
              F
              variant="outlined"
              className="w-full"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Button
              sx={{
                borderColor: "#545363",
                color: "#545363",
                width: 1 ,  
                ":hover": {
                  borderColor: "#8785AF",
                
                },
               
              }}
              type="submit"
              variant="outlined"
            >
              Add project
            </Button>
          </Box>
        </form>
      </Modal>
    </div>
  );
};

export default AddProjectForm;
