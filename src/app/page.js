"use client";
import { Button } from "@mui/material";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import DOTS from "vanta/src/vanta.dots";
import anime from "animejs/lib/anime.es.js";
export default function Home() {
  
  return (
    <div
     
      className="flex flex-grow flex-col items-center justify-center gap-12 overflow-hidden text-center text-5xl"
    >
     
      <div id='fade' className="px-4 text-base xl:text-4xl">
        <strong>BUMS: </strong> an easy way to manage your wip albums!
      </div>
      <Link href="/dashboard">
        <Button id='fade' variant="outlined" size="large">
          Get started
        </Button>
      </Link>
    </div>
  );
}
