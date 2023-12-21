"use client";
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
import { useEffect, useState, useContext } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useParams } from "next/navigation";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import AddTracks from "./AddTrackForm";
import { FileUploader } from "react-drag-drop-files";
import TrackList from "./TrackList";
import Divider from "@mui/material/Divider";
import { UserContext } from "../Context/UserContext";
import ProjectMenu from "./ProjectMenu";

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

const Project = () => {
  const { currentUser } = useContext(UserContext);
  const storage = getStorage();
  const router = useRouter();
  const [data, setData] = useState([]);
  const params = useParams();
  const id = params.projectid;
  const [loading, setLoading] = useState(true);
  const fileTypes = ["JPG", "PNG", "GIF"];

  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => setDeleteOpen(false);
  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);

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
      <div className="mb-[64px] h-full w-full bg-black p-10 lg:ml-[330px]">
        {data.map((item) => (
          <div key={item.id}>
            <div className="flex w-full justify-between gap-6">
              <div className="gap-4 lg:flex">
                <div>
                  {item.cover ? (
                    <img className="h-48 w-48 rounded" src={item.cover} />
                  ) : (
                    <FileUploader
                      handleChange={handleCoverChange}
                      name="file"
                      types={fileTypes}
                      children={
                        <>
                          <div>
                            <img
                              className="mb-2 h-48 w-48 object-scale-down"
                              src={item.cover}
                            />

                            <div className="absolute left-[30px] top-[80px] text-sm underline">
                              Drag and drop your artwork here
                            </div>
                          </div>
                        </>
                      }
                    />
                  )}
                </div>

                <div className="text-3xl font-bold lg:mt-24">
                  <p className="text-sm font-light text-stone-500">album</p>
                  {item.title}
                  <p className="mt-4 text-xl font-thin">{item.author}</p>
                </div>
              </div>
              <span className="mr-2">
                <ProjectMenu handleDeleteOpen={handleDeleteOpen} />
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <div className="flex justify-between gap-2 p-2 text-neutral-600">
                  <p>track name</p>
                  <div className="flex gap-5">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>

                <Divider></Divider>
              </div>
              <TrackList
                handleAddClose={handleAddClose}
                id={id}
                currentUser={currentUser}
              />
            </div>

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

                <Button
                  className="mr-3"
                  variant="outlined"
                  color="error"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button
                  sx={{
                    borderColor: "#545363",
                    color: "#545363",
                    ":hover": {
                      borderColor: "#8785AF",
                    },
                  }}
                  onClick={handleDeleteClose}
                  variant="outlined"
                >
                  Cancel
                </Button>
              </Box>
            </Modal>
            <Modal
              open={addOpen}
              onClose={handleAddClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <AddTracks />
            </Modal>
          </div>
        ))}
      </div>
    );
  }
};

export default Project;
