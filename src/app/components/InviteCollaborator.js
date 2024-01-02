"use client";
import { useState } from "react";

//mui
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const InviteCollaborator = () => {
  return (
    <Box sx={style}>
      <h3 className="mb-2 text-xl">Invite a collaborator:</h3>
      <p className="mb-8 font-light text-gray-500">
        Enter the username of the person you want to invite
      </p>
      <TextField label="Username" id="outlined-size-small" size="small" />
      <div className="float-right">
        <Button variant="contained">Invite</Button>
      </div>
    </Box>
  );
};

export default InviteCollaborator;
