"use client";
import SideBar from "./SideBar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
const Dashboard = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <div id='fade-in' className="flex flex-grow">
      {matches ? (
        <div className="flex flex-grow items-center justify-center">
         
        </div>
      ) : (
        <div className="mt-24 flex flex-grow">
          <div className="flex flex-grow items-center justify-center">
           
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
