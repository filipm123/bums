"use client";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

//firebase
import {
  collection,
  query,
  getDocs,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
  listAll,
} from "firebase/storage";
import { db } from "../../../firebase";

//mui
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import Divider from "@mui/material/Divider";

//components
import AddTracks from "./AddTrackForm";
import { FileUploader } from "react-drag-drop-files";
import TrackList from "./TrackList";
import ProjectMenu from "./ProjectMenu";
import Loading from "./Loading";
import InviteCollaborator from "./InviteCollaborator";

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
  borderRadius: "0.25rem",
};

const Project = () => {
  const { currentUser } = useContext(UserContext);
  const storage = getStorage();
  const router = useRouter();
  const [data, setData] = useState([]);
  const params = useParams();
  const id = params.projectid;
  const [loading, setLoading] = useState(true);
  const fileTypes = ["JPG", "PNG", "GIF"];

  const [rightClickMenu, setRightClickMenu] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);

  const [addOpen, setAddOpen] = useState(false);
  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);

  const [inviteOpen, setInviteOpen] = useState(false);
  const handleInviteOpen = () => setInviteOpen(true);
  const handleInviteClose = () => setInviteOpen(false);

  const fetchData = async () => {
    try {
      const projectsRef = query(collection(db, "projects"));
      const q = query(projectsRef, where("__name__", "==", id));
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

  const [cover, setCover] = useState(null);

  const handleCoverChange = (cover) => {
    setCover(cover);
    const coverRef = ref(storage, `covers/${cover.name}`);
    const projectRef = doc(db, "projects", id);
    uploadBytes(coverRef, cover).then((snapshot) => {
      getDownloadURL(coverRef).then((url) =>
        updateDoc(projectRef, { cover: url }).then(fetchData()),
      );
      console.log("Cover uploaded");
    });
  };
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleChange = async (e) => {
    const newTitle = e.target.value;

    const projectRef = doc(db, "projects", id);
    await updateDoc(projectRef, {
      title: newTitle,
    });
  };
  const handleEditTitle = () => {
    setIsEditing(true);
  };

  const handleDelete = async () => {
    const projectRef = doc(db, "projects", id);
    await deleteDoc(projectRef);
    const tracksRef = ref(storage, id);
    listAll(tracksRef).then((listResults) => {
      const promises = listResults.items.map((item) => {
        return deleteObject(item);
      });
      Promise.all(promises);
    });
    handleDeleteClose();
    router.push("/dashboard");
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div
        id="fade-in"
        className="mb-[64px] min-h-full w-full bg-black p-12 lg:ml-[300px]"
      >
        {data.map((item) => (
          <div key={item.id}>
            <div className="mt-4 flex w-full justify-between gap-6">
              <div className="gap-4 lg:flex">
                <div>
                  {item.cover ? (
                    <FileUploader
                      handleChange={handleCoverChange}
                      name="file"
                      types={fileTypes}
                      children={
                        <>
                          <div className="group cursor-grab ">
                            <img
                              className="h-48 w-48 rounded transition-opacity hover:opacity-50 "
                              src={item.cover}
                            />

                            <div className="absolute top-[160px] hidden h-8 w-48 rounded-b bg-black text-center text-sm opacity-80 transition-opacity hover:opacity-50 group-hover:block"></div>
                            <div className="absolute left-[36px] top-[165px] hidden text-sm group-hover:block">
                              Change cover art
                            </div>
                          </div>
                        </>
                      }
                    />
                  ) : (
                    <FileUploader
                      handleChange={handleCoverChange}
                      name="file"
                      types={fileTypes}
                      children={
                        <>
                          <div className="group">
                            <div
                              className="mb-2 h-48 w-48 cursor-grab rounded-2xl object-scale-down transition-opacity hover:opacity-50"
                              id="cover-placeholder"
                            ></div>

                            <div className="absolute left-[38px] top-[160px] hidden text-sm  transition-opacity hover:opacity-50 group-hover:block">
                              Change cover art
                            </div>
                          </div>
                        </>
                      }
                    />
                  )}
                </div>
                {isEditing ? (
                  <div className="group text-3xl font-bold lg:mt-24">
                    <p className="text-sm font-light text-stone-500">album</p>

                    <div>
                      <input
                        type="text"
                        placeholder={item.title}
                        className="bg-black text-white outline-none"
                        onChange={handleTitleChange}
                      />
                    </div>

                    <p className="mt-4 text-xl font-thin">{item.author} </p>
                  </div>
                ) : (
                  <div className="group text-3xl font-bold lg:mt-24">
                    <p className="text-sm font-light text-stone-500">album</p>

                    <div className="flex gap-2 ">
                      {item.title}
                      <div className=" hidden cursor-grab transition-opacity hover:opacity-50 group-hover:block">
                        <DriveFileRenameOutlineRoundedIcon
                          onClick={handleEditTitle}
                        />
                      </div>
                    </div>

                    <p className="mt-4 text-xl font-thin">{item.author} </p>
                  </div>
                )}
              </div>
              <span className="mr-2">
                <ProjectMenu handleDeleteOpen={handleDeleteOpen} handleInviteOpen={handleInviteOpen} />
              </span>
            </div>
            <div className="flex flex-col">
              <div>
                <div className="mt-4 flex justify-between gap-2 px-2 py-2 text-neutral-600">
                  <p>name</p>
                  <div className="flex gap-6">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>

                  <h1 className="mr-31">added</h1>
                </div>

                <Divider></Divider>
              </div>
              <TrackList
                handleAddClose={handleAddClose}
                id={id}
                currentUser={currentUser}
              />
            </div>

            {/*delete project modal*/}
            <Modal
              open={deleteOpen}
              onClose={handleDeleteClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <h3 className="mb-2 text-xl">
                  Are you sure you want to delete this project?
                </h3>
                <p className="mb-8 font-light text-gray-500">
                  This action is not reversible.
                </p>
                <div className="float-right">
                  <Button
                    className="mr-3"
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                  <Button
                    sx={{
                      marginLeft: 1,
                    }}
                    onClick={handleDeleteClose}
                    variant="contained"
                  >
                    Cancel
                  </Button>
                </div>
              </Box>
            </Modal>

            {/*add tracks modal*/}
            <Modal
              open={addOpen}
              onClose={handleAddClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <AddTracks />
            </Modal>

            {/*add collaborator modal*/}
            <Modal
              open={inviteOpen}
              onClose={handleInviteClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <InviteCollaborator />
            </Modal>
          </div>
        ))}
      </div>
    );
  }
};

export default Project;
