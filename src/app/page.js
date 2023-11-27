import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Button } from "@mui/material";
import Link from "next/link";
export default function Home() {
  return (
    <div className="gap-12 flex justify-center flex-col items-center flex-grow text-center text-5xl">
      <div>
        <strong>BUMS: </strong> an easy way to organise your wip projects!
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
