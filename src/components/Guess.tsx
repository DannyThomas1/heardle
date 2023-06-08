import Image from "next/image";
import { useState } from "react";
import Player from "./Player";

export const Guess = ({
  guessNum,
  isPlaying,
}: {
  guessNum: number;
  isPlaying: boolean;
}) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full items-center justify-between  border-2 border-gray-600 ">
        <span
          id="firstSec"
          className={`h-[15px] border-r ${guessNum >= 1 ? "bg-gray-800" : ""}`}
        ></span>
        <span
          id="secondSec"
          className={`h-[15px] border-r ${guessNum >= 2 ? "bg-gray-800" : ""}`}
        ></span>
        <span
          id="thirdSec"
          className={`h-[15px] border-r ${guessNum >= 3 ? "bg-gray-800" : ""}`}
        ></span>
        <span
          id="fourthSec"
          className={`h-[15px] border-r ${guessNum >= 4 ? "bg-gray-800" : ""}`}
        ></span>
        <span
          id="fifthSec"
          className={`h-[15px] border-r ${guessNum >= 5 ? "bg-gray-800" : ""}`}
        ></span>
        <span
          id="sixthSec"
          className={`h-[15px] border-r ${guessNum >= 6 ? "bg-gray-800" : ""}`}
        ></span>
      </div>
    </div>
  );
};
