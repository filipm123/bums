"use client";
import {
  collection,
  query,
  getDocs,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useParams } from "next/navigation";
import { Button } from "@mui/material";
const Project = () => {
  const [data, setData] = useState([]);
  const [triggerFetch, setTriggerFetch] = useState(true);
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const id = params.projectid;
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "#08070B",
    border:"1px solid #545363",
    borderRadius:2,
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
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
    fetchData();
  }, [id, triggerFetch]);

  const handleDelete = async () => {
    const projectRef = doc(db, "projects", id);
    await deleteDoc(projectRef);
    handleClose();
    setTriggerFetch((prev) => !prev);
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
      <div className="overflow-auto w-full h-full flex p-8 bg-bg">
        {data.map((item) => (
          <div className=" w-full gap-8 flex flex-col" key={item.id}>
            <div className="flex gap-6">
              <div>
                {item.cover ? (
                  <img
                    className="object-scale-down h-72 w-72"
                    src={item.cover}
                  />
                ) : (
                  <div>
                    <img
                      className="object-scale-down h-72 w-72"
                      src={item.cover}
                    />
                    <div className="absolute top-[286px] left-[475px] underline">
                      Upload artwork
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-44 text-3xl font-bold">
                <p className="text-sm font-light text-stone-500">album</p>
                {item.title}
                <p className="font-normal mt-4">{item.author}</p>
              </div>
            </div>
            <Button
              className="right-[48px] w-24 absolute"
              variant="outlined"
              color="error"
              onClick={handleOpen}
            >
              Delete
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <h3 className="text-xl mb-2">
                  Are you sure you want to delete this project?
                </h3>
                <p className="font-light text-gray-500 mb-8">
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
                  onClick={handleClose}
                  variant="outlined"
                >
                  Cancel
                </Button>
              </Box>
            </Modal>
          </div>
        ))}
      </div>
    );
  }
};

export default Project;
