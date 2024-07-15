"use client";
import React from "react";
import Popup from "reactjs-popup";
import { ChatBubbleRounded } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";

export default () => (
  <Popup
    trigger={
      <button className="flex place-self-end mt-96 ml-20 fixed">
        <ChatBubbleRounded className="border bg-gradient-to-r text-white from-amber-500 via-orange-600 to-yellow-500 rounded-3xl p-2 md:text-5xl text-4xl " />
      </button>
    }
    modal
    nested
  >
    {(close) => (
      <div className="flex flex-col min-h-[200px] min-w-[200px] md:min-h-[300px] md:min-w-[200px] md:place-self-end md:-mt-10 md:ml-80 -ml-20 px-3 py-2 rounded-3xl fixed bg-black text-white">
        <button className="flex justify-end" onClick={close}>
          <CancelIcon />
        </button>
        <div className="orange_gradient"> Chat box </div>
        {/* add content here */}

        <div className=""></div>
      </div>
    )}
  </Popup>
);
