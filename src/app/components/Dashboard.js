"use client";
import SideBar from "./SideBar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
const Dashboard = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <div className="flex flex-grow">
      {matches ? (
        <div className="flex flex-grow items-center justify-center">
          <p className="text-4xl">Pick a project or create one!</p>
        </div>
      ) : (
        <div className="mt-24 flex flex-grow">
          <div className="flex flex-grow items-center justify-center">
            <p className="text-lg">Pick a project or create one!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
