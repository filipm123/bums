"use client";
import * as React from "react";
import Box from "@mui/material/Box";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
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
          <form className="flex w-full flex-col rounded bg-white p-4">
            <textarea
              spellCheck="false"
              cols="10"
              rows="10"
              placeholder="hold on imma fix wolves..."
              maxLength="100"
              className="mb-4 w-full resize-none rounded-xl p-4 text-black outline-none"
              onChange={handleChange}
              value={note.content}
              required
            ></textarea>
            <Button
              sx={{ color: "black", borderColor: "black:" }}
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

      <div className="mt-2 flex flex-wrap gap-2">
        {data.map((note) => (
          <div
            key={note.id}
            className="mb-4 flex min-h-[200px] w-[320px] flex-col rounded bg-white p-4 text-black"
          >
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
      <Button className="w-full" variant="outlined" onClick={handleOpen}>
        <AddRoundedIcon />
      </Button>
    </div>
  );
};

export default Note;
