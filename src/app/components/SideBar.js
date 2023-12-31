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
import Avatar from "@mui/material/Avatar";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../../firebase";
import AddProjectForm from "./AddProjectForm";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@emotion/react";

const SideBar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
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
        where("owner", "==", currentUser.uid),
      );
      const querySnapshot = await getDocs(q);
      const newData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData((prevData) => [...newData]);
      console.log("FETCHED");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {matches ? (
        <List
          sx={{ width: "100%", maxWidth: 300, position: "fixed" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <AddProjectForm fetchData={fetchData} />

          <ListItemButton onClick={handleClick} disableRipple>
            <ListItemIcon>
              <FolderRoundedIcon />
            </ListItemIcon>
            <ListItemText
              className="text-sm"
              primary="Projects"
              disableTypography
            />
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
                    <Avatar
                      sx={{ width: 28, height: 28, bgcolor:"white" }}
                      alt={item.title}
                      src={item.cover}
                    >
                      <AlbumIcon />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    className="text-sm"
                    primary={item.title}
                    disableTypography
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>
      ) : (
        <List
          sx={{ width: "100%", maxWidth: 300 }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <AddProjectForm fetchData={fetchData} />

          <ListItemButton onClick={handleClick} disableRipple>
            <ListItemIcon>
              <FolderRoundedIcon />
            </ListItemIcon>
            <ListItemText
              className="text-sm"
              primary="Projects"
              disableTypography
            />
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
                    <Avatar
                      sx={{ width: 28, height: 28 }}
                      alt={item.title}
                      src={item.cover}
                    >
                      B
                    </Avatar>
                    {/*<AlbumIcon />*/}
                  </ListItemIcon>
                  <ListItemText
                    className="text-sm"
                    primary={item.title}
                    disableTypography
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>
      )}
    </>
  );
};

export default SideBar;
