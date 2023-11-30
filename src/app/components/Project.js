"use client";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useParams } from "next/navigation";
import AlbumTable from "./AlbumTable";
const Project = () => {
  const [data, setData] = useState([]);
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const id = params.projectid;
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
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);
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
              <img className=" object-scale-down h-72 w-72" src={item.cover} />
              <div className="mt-44 text-3xl font-bold">
                <p className="text-sm font-light text-stone-500">album</p>
                {item.title}
                <p className="font-normal mt-4">{item.author}</p>
              </div>
            </div>
           
          </div>
        ))}
      </div>
    );
  }
};

export default Project;
