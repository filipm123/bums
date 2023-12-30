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
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import { UserContext } from "../Context/UserContext";

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

const AddProjectForm = ({ fetchData }) => {
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
        tracks: [],
      });
      setTitle("");
      setModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error uploading data: ", error);
    }
  };

  return (
    <div>
      {" "}
      <ListItemButton onClick={handleOpen} disableRipple>
        <ListItemIcon>
          <AddIcon className=" text-neutral-400" />
        </ListItemIcon>
        <ListItemText
          className="text-sm text-neutral-400"
          primary="Add Project"
          disableTypography
        />
      </ListItemButton>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedb2y="modal-modal-description"
      >
        <form onSubmit={addProject}>
          <Box sx={style}>
            <h1 className="p-4 text-center text-xl font-bold">Add project</h1>
            <TextField
              size="small"
              id="outlined-basic"
              label="Project name"
              variant="outlined"
              className="w-full text-sm"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Button
              sx={{
                width: 1,
                ":hover": {
                  borderColor: "white",
                },
                textTrasnform:'none'
              }}
              type="submit"
              variant='contained'
            >
              + Add project
            </Button>
          </Box>
        </form>
      </Modal>
    </div>
  );
};

export default AddProjectForm;
