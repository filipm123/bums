"use client";
import * as React from "react";
import { useState, useEffect, useContext, useReducer } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../Context/UserContext";
import { collection, query, getDocs, where } from "firebase/firestore";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { db } from "../../../firebase";
export default function TrackList({ id }) {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { currentUser } = useContext(UserContext);

  const fetchTrackListData = async () => {
    try {
      const projectsRef = query(collection(db, "tracks"));
      const q = query(projectsRef, where("projectId", "==", id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchTrackListData();
  }, []);

  return (
    <div className='flex flex-col gap-3 p-2'>
      {data &&
        data.map((track) => (
          <div
            onClick={() =>
              router.push(`/dashboard/projects/${id}/${track.id}`, {
                shallow: true,
              })
            }
            key={track.id}
            className='flex justify-between w-full rounded border-[1px] border-br p-4'
          >
            <p>{track.trackName}</p>
            <ChevronRightIcon/>
          </div>
        ))}
    </div>
  );
}
