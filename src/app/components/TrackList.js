"use client";
import * as React from "react";
import { useState, useEffect, useContext, useReducer } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../Context/UserContext";
import { collection, query, getDocs, where } from "firebase/firestore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddTracks from "./AddTrackForm";
import { db } from "../../../firebase";
import { Add } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";

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
export default function TrackList({ id, currentUser, handleAddClose }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchTrackListData = async () => {
    try {
      const projectsRef = query(collection(db, "tracks"));
      const q = query(projectsRef, where("projectId", "==", id));
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
  useEffect(() => {
    fetchTrackListData();
  }, []);

  if (loading) {
    return (
      <div className="">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-3 p-2">
        <Button variant="outlined" onClick={handleOpen}>
          <AddIcon /> Add tracks
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <AddTracks
            id={id}
            currentUser={currentUser}
            handleClose={handleClose}
            fetchTrackListData={fetchTrackListData}
          />
        </Modal>
        {data &&
          data.map((track) => (
            <div
              onClick={() =>
                router.push(`/dashboard/projects/${id}/${track.id}`, {
                  shallow: true,
                })
              }
              key={track.id}
              className="cursor-grab flex justify-between w-full rounded border-[1px] hover:border-white transition-colors  border-br p-2 text-sm items-center"
            >
              <p>{track.trackName}</p>
              <ChevronRightIcon />
            </div>
          ))}
      </div>
    );
  }
}
