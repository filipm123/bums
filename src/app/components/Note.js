"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import {
  doc,
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { Delete } from "@mui/icons-material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "1px solid #545363",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};
const Note = ({ id }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [note, setNote] = useState("");
  const [data, setData] = useState([]);
  const handleChange = (e) => {
    const content = e.target.value;
    setNote(content);
    console.log(content);
  };

  const fetchNotes = async () => {
    try {
      const tracksRef = query(collection(db, "notes"));
      const q = query(tracksRef, where("trackid", "==", id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const trackRef = await addDoc(collection(db, "notes"), {
      content: note,
      trackid: id,
    });
    console.log(trackRef);
    setNote("");
    fetchNotes();
    handleClose();
  };
  const handleDelete = async (noteId) => {
    await deleteDoc(doc(db, "notes", noteId));
    fetchNotes();
  };
  useEffect(() => {
    fetchNotes();
  }, []);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="overflow-auto w-full bg-white flex flex-col p-4 rounded">
            <textarea
              spellCheck="false"
              cols="10"
              rows="10"
              placeholder="Type...."
              maxLength="100"
              className="w-full p-4 text-black rounded-xl outline-none mb-4"
              onChange={handleChange}
              value={note.content}
              required
            ></textarea>
            <Button
              sx={{ color: "black", borderColor: "black" }}
              className=""
              variant="outlined"
              onClick={handleSubmit}
            >
              <AddRoundedIcon className="text-md" />
              add note
            </Button>
            <div></div>
          </form>
        </Box>
      </Modal>

      <div className="flex flex-wrap mt-2 gap-2">
        {data.map((note) => (
          <div className="flex flex-col rounded p-4 w-[320px] min-h-[200px] bg-white text-black">
            <p className="flex-grow">{note.content}</p>
            <Button
              sx={{ color: "red", borderColor: "red" }}
              variant="outlined"
              onClick={() => handleDelete(note.id)}
              className="w-4"
            >
              <DeleteRoundedIcon />
            </Button>
          </div>
        ))}{" "}
      </div>
      <Button
        className="mt-4 w-full"
        variant="outlined"
        onClick={handleOpen}
      >
        <AddRoundedIcon />
      </Button>
    </div>
  );
};

export default Note;
