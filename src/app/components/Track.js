"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Divider } from "@mui/material";
import { useRouter } from "next/navigation";

import { db } from "../../../firebase";
const Track = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const params = useParams();
  const id = params.trackid;
  console.log(id);
  const fetchData = async () => {
    try {
      const projectsRef = query(collection(db, "tracks"));
      const q = query(projectsRef, where("__name__", "==", id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex-grow flex items-center justify-center">
      {data.map((track) => (
        <div className="gap-24 flex flex-col h-[90%] w-[95%] rounded-xl border-[1px] border-br p-8">
          <div className="w-full flex justify-between items-center">
            <ChevronLeftIcon
              onClick={() =>
                router.push(`/dashboard/projects/${params.projectid}`, {
                  shallow: true,
                })
              }
            />
            <MenuIcon />
          </div>

          <div className="p-6">
            <p className="mb-2 font-light text-neutral-400">Track name</p>
            <p className="mb-6 font-bold text-4xl">{track.trackName}</p>
            <Divider></Divider>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Track;
