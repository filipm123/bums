"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { createContext } from "react";
import {
  collection,
  query,
  getDocs,
  where,
  updateDoc,
} from "firebase/firestore";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
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
import TrackMenu from "./TrackMenu";
import { useTrack } from "../Context/TracksContext";
import { usePlayer } from "../Context/PlayerContext";

import FileInfo from "./FileInfo";

const Track = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80vw",
    bgcolor: "black",
    border: "1px solid #242424",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
    borderRadius: "0.25rem",
  };
  const { track, initializePlayer } = usePlayer();
  const [url, setUrl] = useState("");
  const [openInfo, setOpenInfo] = useState(false);
  const handleOpenInfo = () => setOpenInfo(true);
  const handleCloseInfo = () => setOpenInfo(false);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const regexPattern = /\/o\/[^%]+%2F([^\/]+(?:\.wav|\.mp3))\?/;
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params.trackid;
  const projectid = params.projectid;
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

  const [isEditing, setIsEditing] = useState(false);

  const handleTitleChange = async (e) => {
    const newTitle = e.target.value;

    const projectRef = doc(db, "tracks", id);
    await updateDoc(projectRef, {
      trackName: newTitle,
    });
  };

  const handleEditTitle = () => {
    setIsEditing(true);
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
      <div
        id="fade-in"
        className="flex flex-grow flex-col items-center justify-center bg-black lg:ml-[300px]"
      >
        {data.map((track) => (
          <div
            key={track}
            className="flex h-[100%] w-[100%] flex-col gap-12 rounded-xl bg-black p-8"
          >
            <div className="flex w-full items-center justify-between">
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
                  projectid={projectid}
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
              <TrackMenu
                deleteTrack={deleteTrack}
                handleOpenModal={handleOpenModal}
              />
            </div>
            <div>
              {isEditing ? (
                <div className="p-6">
                  <p className="mb-2 font-light text-neutral-400">track name</p>
                  <p className="mb-6 break-words text-2xl font-bold lg:text-4xl">
                    <div>
                      <input
                        type="text"
                        placeholder={track.trackName}
                        className="bg-black text-white outline-none"
                        onChange={handleTitleChange}
                      />
                    </div>
                  </p>
                  <Divider></Divider>
                </div>
              ) : (
                <div className="p-6">
                  <p className="mb-2 font-light text-neutral-400">track name</p>

                  <div className="group mb-6 flex gap-2 ">
                    <p className="break-words text-2xl font-bold lg:text-4xl ">
                      {track.trackName}{" "}
                    </p>
                    <div className="hidden cursor-grab transition-opacity hover:opacity-50 group-hover:block">
                      <DriveFileRenameOutlineRoundedIcon
                        onClick={handleEditTitle}
                        className='mt-3'
                      />
                    </div>
                  </div>
                  <Divider></Divider>
                </div>
              )}

              <div className="flex flex-col p-6">
                <p className="font-light text-neutral-400">notes</p>
                <Note data={data.notes} id={id} />
              </div>
              <div className="mb-[93px] flex w-full flex-col justify-between p-6">
                <p className="mb-2 flex justify-between font-light text-neutral-400">
                  <h1>files</h1>
                </p>
                {track.audioFiles &&
                  track.audioFiles.map((file) => (
                    <div
                      onClick={() => initializePlayer(file)}
                      key={file.id}
                      className="mb-2 flex w-full items-center justify-between overflow-auto rounded border-br p-2 text-sm transition-colors hover:border-white hover:bg-br"
                    >
                      <p className="flex w-full justify-between">
                        <h1>
                          {file.match(regexPattern)
                            ? decodeURIComponent(file.match(regexPattern)[1])
                            : file}
                        </h1>
                      </p>
                      <div className="hidden hover:flex">
                        <PlayArrowIcon />
                      </div>
                      <div>
                        <Button onClick={handleOpenInfo}>
                          <MoreHorizIcon />
                        </Button>
                        <Modal
                          open={openInfo}
                          onClose={handleCloseInfo}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <FileInfo url={file} />
                          </Box>
                        </Modal>
                      </div>
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
          </div>
        ))}
      </div>
    );
  }
};

export default Track;
