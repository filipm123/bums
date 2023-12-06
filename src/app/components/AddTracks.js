"use client";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../firebase";

import { useState } from "react";

const AddTracks = ({ id, fetchData, handleAddClose }) => {
  const [trackTitle, setTrackTitle] = useState("");
  const projectRef = doc(db, "projects", id);
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

  const handleAddTrack = async (e) => {
    e.preventDefault();
    await updateDoc(projectRef, {
      tracks: arrayUnion(trackTitle),
    });
    handleAddClose();
    fetchData();
  };
  return (
    <>
      <form onSubmit={handleAddTrack}>
        <Box
          id="box"
          className="flex flex-col justify-center items-center gap-4"
          sx={style}
        >
          <h3 className="text-xl mb-2">Add a track</h3>
          <TextField
            id="outlined-basic"
            label="Track name"
            F
            variant="outlined"
            className="w-full"
            onChange={(e) => setTrackTitle(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" variant="outlined">
            Add
          </Button>
        </Box>
      </form>
    </>
  );
};

export default AddTracks;
