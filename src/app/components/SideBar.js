"use client";
import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import AlbumIcon from "@mui/icons-material/Album";
import AddIcon from "@mui/icons-material/Add";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import AddProjectForm from "./AddProjectForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: '#08070B',
  border: "2px solid #000",
  boxShadow: 24,
  p: 8,
};

const SideBar = () => {
  const [open, setOpen] = React.useState(true);
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const handleClick = () => {
    setOpen(!open);
  };
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "projects"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "#08070B" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      className="border-solid border-2 border-black"
    >
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
        <AddProjectForm />
      </Modal>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <AlbumIcon />
        </ListItemIcon>
        <ListItemText primary="Projects" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {data.map((item) => (
            <ListItemButton
              onClick={() =>
                router.push(`/dashboard/projects/${item.id}`, {
                  shallow: true,
                })
              }
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

export default SideBar;
