import { useState } from "react";

const Note = () => {
  return (
    <div className="overflow-auto w-full">
      <textarea
        cols="10"
        rows="5"
        placeholder="Type...."
        maxLength="100"
        className="w-full p-4 text-black rounded-xl outline-none"
      ></textarea>
      <div></div>
    </div>
  );
};

export default Note;
