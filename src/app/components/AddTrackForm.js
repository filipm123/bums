"use client";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

import {
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
  collection,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "../../../firebase";

import { useState } from "react";
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

const AddTracks = ({ fetchTrackListData, id, handleClose, currentUser }) => {
  const [trackTitle, setTrackTitle] = useState("");
  const projectRef = doc(db, "projects", id);

  const handleAddTrack = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(projectRef, {
        tracks: arrayUnion(trackTitle),
      });
      const docRef = await addDoc(collection(db, "tracks"), {
        trackName: trackTitle,
        projectId: id,
        owner: currentUser.uid,
        notes: [],
        dateCreated:serverTimestamp()
      });

      fetchTrackListData();
      handleClose();
    } catch (error) {
      console.error("Error adding track: ", error);
    }
  };
  return (
    <>
      <form onSubmit={handleAddTrack}>
        <Box id="box" sx={style}>
          <h3 className="mb-2 text-xl">Add a track</h3>
          <TextField
            id="outlined-basic"
            size='small'
            label="Track name"
            variant="outlined"
            className="w-full"
            onChange={(e) => setTrackTitle(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" variant="contained">
           + Add
          </Button>
        </Box>
      </form>
    </>
  );
};

export default AddTracks;
