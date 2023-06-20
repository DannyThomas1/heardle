import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Player from "./Player";
import {
  FIFTH_CLIP,
  FIRST_CLIP,
  FOURTH_CLIP,
  SECOND_CLIP,
  SIXTH_CLIP,
  THIRD_CLIP,
} from "~/constants";

export const Guess = ({
  guessNum,
  isPlaying,
  counter = 0,
}: {
  guessNum: number;
  isPlaying: boolean;
  counter: number;
}) => {
  const [playWidth, setPlayWidth] = useState((2000 / 17000) * 100);

  const setWidths = (guessNum: number) => {
    switch (guessNum) {
      case 1:
        setPlayWidth((FIRST_CLIP / SIXTH_CLIP) * 100);
        return FIRST_CLIP;

      case 2:
        setPlayWidth((SECOND_CLIP / SIXTH_CLIP) * 100);
        return SECOND_CLIP;

      case 3:
        setPlayWidth((THIRD_CLIP / SIXTH_CLIP) * 100);
        return THIRD_CLIP;

      case 4:
        setPlayWidth((FOURTH_CLIP / SIXTH_CLIP) * 100);
        return FOURTH_CLIP;

      case 5:
        setPlayWidth((FIFTH_CLIP / SIXTH_CLIP) * 100);
        return FIFTH_CLIP;

      case 6:
        setPlayWidth(100);
        return SIXTH_CLIP;
      default:
        return FIRST_CLIP;
    }
  };

  const ref = useRef<HTMLElement>(null);
  let width = 1;
  const [intervalID, setIntervalID] = useState("");

  useEffect(() => {
    function progressBar() {
      const totalSeconds = setWidths(guessNum);
      resetProgressBar();
      if (!ref) return;

      const interval = String(setInterval(frame, totalSeconds / 100));
      setIntervalID(interval);

      function frame() {
        if (!ref.current) return;
        if (width >= 100) {
          clearInterval(intervalID);
        } else {
          width++;
          ref.current.style.width = String(width) + "%";
        }
      }
    }
    if (isPlaying) {
      progressBar();
    } else {
      resetProgressBar();
    }

    setWidths(guessNum);

    return () => resetProgressBar();
  }, [isPlaying]);

  function resetProgressBar() {
    if (!ref.current) return;
    width = 1;
    clearInterval(intervalID);
    ref.current.style.width = String(width) + "%";
  }

  return (
    <div className="flex w-screen items-center justify-center border-y-2 border-gray-800">
      <div className="flex w-full items-center justify-center px-3 lg:w-2/5">
        <div className="relative flex w-full flex-col gap-4">
          <div
            className="absolute left-[2px] top-[2px]  flex h-[12px] items-center justify-start bg-gray-800 "
            style={{ width: `${playWidth}%` }}
          >
            <span
              ref={ref}
              className={`h-[15px] bg-green-600 transition `}
              style={{ width: "10px" }}
            ></span>
          </div>

          <div className="relative flex h-[16px] w-full items-center justify-between border-2 border-gray-700 ">
            <span
              className={`absolute h-[11px] border-r `}
              style={{ width: `${(FIRST_CLIP / SIXTH_CLIP) * 100}%` }}
            ></span>
            <span
              className={`absolute h-[11px] border-r `}
              style={{ width: `${(SECOND_CLIP / SIXTH_CLIP) * 100}%` }}
            ></span>
            <span
              className={`absolute h-[11px] border-r `}
              style={{ width: `${(THIRD_CLIP / SIXTH_CLIP) * 100}%` }}
            ></span>
            <span
              className={`absolute h-[11px] border-r `}
              style={{ width: `${(FOURTH_CLIP / SIXTH_CLIP) * 100}%` }}
            ></span>
            <span
              className={`absolute h-[11px] border-r `}
              style={{ width: `${(FIFTH_CLIP / SIXTH_CLIP) * 100}%` }}
            ></span>
            <span
              className={`absolute h-[11px] border-r `}
              style={{ width: `${(SIXTH_CLIP / SIXTH_CLIP) * 100}%` }}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
};
