"use client";
import SideBar from "./SideBar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
const Dashboard = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <div>
      {matches ? (
        <div className="flex flex-grow">
          <SideBar />
          <div className="flex justify-center items-center flex-grow">
            <p className="text-4xl">Pick a project or create one!</p>
          </div>
        </div>
      ) : (
        <div className="flex mt-24 flex-grow">
          <div className="flex justify-center items-center flex-grow">
            <p className="text-lg">Pick a project or create one!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
