"use client";
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { useParams } from "next/navigation";
import { db } from "../../../firebase";

const TrackContext = createContext();

export const TrackProvider = ({ children }) => {
  const params = useParams();
  const id = params.trackid;

  const [trackData, setTrackData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (id) => {
    try {
      const tracksRef = query(collection(db, "tracks"));
      const q = query(tracksRef, where("__name__", "==", id));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTrackData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(id);
  }, [id]); // Make sure to pass the necessary dependencies

  return (
    <TrackContext.Provider value={{ trackData, loading, fetchData, id }}>
      {children}
    </TrackContext.Provider>
  );
};

export const useTrack = () => {
  return useContext(TrackContext);
};
