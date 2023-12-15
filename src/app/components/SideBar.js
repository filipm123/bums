"use client";
import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import AlbumIcon from "@mui/icons-material/Album";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../../firebase";
import AddProjectForm from "./AddProjectForm";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [data, setData] = useState([]);
  const { currentUser } = useContext(UserContext);
  const router = useRouter();
  const handleClick = () => {
    setOpen(!open);
  };

  const fetchData = async () => {
    try {
      const q = query(
        collection(db, "projects"),
        where("owner", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const newData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData((prevData) => [...newData]);
      console.log('FETCHED')
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "#08070B" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      className="border-solid border-2 border-black"
    >
      <AddProjectForm fetchData={fetchData} />

      <ListItemButton onClick={handleClick} disableRipple>
        <ListItemIcon>
          <AlbumIcon />
        </ListItemIcon>
        <ListItemText primary="Projects" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {data.map((item) => (
            <ListItemButton
              onClick={() =>
                router.push(`/dashboard/projects/${item.id}`, {
                  shallow: true,
                })
              }
              sx={{ pl: 4 }}
              key={item}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

export default SideBar;
