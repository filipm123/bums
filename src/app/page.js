"use client";
import { Button } from "@mui/material";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import DOTS from "vanta/src/vanta.dots";

export default function Home() {
  useEffect(() => {
    DOTS({
      el: "#vanta",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x242424,
      color2: 0x242424,
      backgroundColor: 0x000000,
      showLines: false,
    });
  }, []);
  return (
    <div
      id="vanta"
      className="flex flex-grow flex-col items-center justify-center gap-12 text-center text-5xl"
    >
      <div className="px-4 text-base xl:text-4xl">
        <strong>BUMS: </strong> an easy way to manage your wip albums!
      </div>
      <Link href="/dashboard">
        {" "}
        <Button variant="outlined" size="large">
          Get started
        </Button>
      </Link>
    </div>
  );
}
