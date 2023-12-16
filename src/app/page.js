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
      color: 0x3e3d63,
      color2: 0x2a293c,
      backgroundColor: 0x000000,
      showLines: false,
    });
  }, []);
  return (
    <div
      id="vanta"
      className="gap-12 flex justify-center flex-col items-center flex-grow text-center text-5xl"
    >
      <div>
        <strong>BUMS: </strong> an easy way to manage your wip albums!
      </div>
      <Link href="/dashboard">
        {" "}
        <Button
          sx={{ color: "#ffffff", borderColor: "#2A293C" }}
          variant="outlined"
          size="large"
        >
          Get started
        </Button>
      </Link>
    </div>
  );
}
