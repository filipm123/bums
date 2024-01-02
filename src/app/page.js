"use client";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import cat from "../app/cat.png";
import anime from "animejs/lib/anime.es.js";
import Image from "next/image";
export default function Home() {
  useEffect(() => {
    anime({
      targets: "#fade",
      opacity: [0, 1],
      duration: 4000,
      easing: "easeInOutExpo",
    });
    console.log(cat);
  }, []);
  return (
    <div className="flex flex-grow flex-col items-center justify-center">
      <strong className="text-6xl">Bums</strong>
      <h1 className='font-thin'>An easy to way to manage your wip albums.</h1>
      <Link className="" href="/dashboard">
        <Image src="/images/vinyl.png" height={500} width={500} alt="cat" />
      </Link>
    </div>
  );
}
