"use client";
//firebase/react stuff
import * as React from "react";
import { useState, useEffect, useContext, useReducer } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../Context/UserContext";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../../firebase";

//mui
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Add } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

//components
import AddTracks from "./AddTrackForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "black",
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

  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null,
    );
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

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
      <div
        onContextMenu={handleContextMenu}
        className="mt-4 flex flex-col gap-3"
      >
        {/*Adding track*/}
        <Menu
          open={contextMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
              : undefined
          }
        >
          <MenuItem onClick={handleOpen}>+ Add track</MenuItem>
        </Menu>

        <Button variant="contained" onClick={handleOpen}>
          <AddIcon sx={{ height: "18px", width: "18px" }} />
          Add track
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

        <ol>
          {data &&
            data.map((track) => (
              <li
                onClick={() =>
                  router.push(`/dashboard/projects/${id}/${track.id}`, {
                    shallow: true,
                  })
                }
                key={track.key}
              >
                <div className="mb-2 flex w-full cursor-grab items-center justify-between rounded border-[1px] border-br p-4 text-sm transition-colors hover:border-white">
                  <h1>{track.trackName}</h1>
                  <div className="flex items-center">
                    <h1>{track.dateCreated.toDate().toDateString()}</h1>
                  </div>
                </div>
              </li>
            ))}
        </ol>
      </div>
    );
  }
}
