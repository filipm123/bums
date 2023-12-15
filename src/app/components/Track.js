"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { createContext } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Divider } from "@mui/material";
import { useRouter } from "next/navigation";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Note from "./Note";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FileUpload from "./FileUpload";
import Player from "./Player";
import { db } from "../../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

const Track = () => {
  const [url, setUrl] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const regexPattern = /\/tracks%2F([^\/]+\.wav)\?/;
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params.trackid;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchData = async () => {
    try {
      const tracksRef = query(collection(db, "tracks"));
      const q = query(tracksRef, where("__name__", "==", id));
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
    fetchData();
  }, []);

  const deleteTrack = async () => {
    await deleteDoc(doc(db, "tracks", id));
    router.push(`/dashboard/projects/${params.projectid}`, {
      shallow: true,
    });
    handleClose();
  };
  if (loading) {
    return (
      <div className="flex flex-grow items-center justify-center">
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
      <div className="p-8 flex-grow flex flex-col items-center justify-center">
        {data.map((track) => (
          <div
            key={track}
            className="gap-12 flex flex-col h-[100%] w-[100%] rounded-xl border-[1px] border-br p-8"
          >
            <div className="w-full flex justify-between items-center">
              <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <FileUpload
                  handleCloseModal={handleCloseModal}
                  fetchData={fetchData}
                  id={id}
                />
              </Modal>
              <ChevronLeftIcon
                className="cursor-grab"
                onClick={() =>
                  router.push(`/dashboard/projects/${params.projectid}`, {
                    shallow: true,
                  })
                }
              />
              <MenuIcon
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className="cursor-grab"
              />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={deleteTrack}>Delete track</MenuItem>
                <MenuItem onClick={handleOpenModal}>Upload audio</MenuItem>
              </Menu>
            </div>
            <div>
              <div className="p-6">
                <p className="mb-2 font-light text-neutral-400">track name</p>
                <p className="mb-6 font-bold text-4xl">{track.trackName}</p>
                <Divider></Divider>
              </div>

              <div className="w-full flex flex-col justify-between p-6">
                <p className="mb-2 font-light text-neutral-400">files</p>
                {track.audioFiles &&
                  track.audioFiles.map((file) => (
                    <div
                      onClick={() => setUrl(file)}
                      key={file}
                      className="cursor-grab mb-2 flex justify-between items-center w-full rounded border-[1px] hover:border-[#3d364d] hover:bg-[#3d364d] border-br p-4"
                    >
                      <p>
                        {file.match(regexPattern)
                          ? decodeURIComponent(file.match(regexPattern)[1])
                          : file}
                      </p>
                      <PlayArrowIcon />
                    </div>
                  ))}
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <Player url={url} />
          </div>
        ))}
      </div>
    );
  }
};

export default Track;
