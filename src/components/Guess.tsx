import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Player from "./Player";

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
        setPlayWidth((2000 / 17000) * 100);
        return 2000;

      case 2:
        setPlayWidth((3000 / 17000) * 100);
        return 3000;

      case 3:
        setPlayWidth((5000 / 17000) * 100);
        return 5000;

      case 4:
        setPlayWidth((8000 / 17000) * 100);
        return 8000;

      case 5:
        setPlayWidth((14000 / 17000) * 100);
        return 14000;

      case 6:
        setPlayWidth(100);
        return 17000;
      default:
        return 2000;
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
    <div className="relative flex w-full flex-col gap-4">
      <div
        className="absolute left-[2px] top-[2px] z-10 flex h-[12px] items-center justify-start bg-gray-800 "
        style={{ width: `${playWidth}%` }}
      >
        <span
          ref={ref}
          className={`h-[15px] bg-green-600 transition `}
          style={{ width: "10px" }}
        ></span>
      </div>

      <div className="relative flex h-[16px] w-full items-center justify-between border-2 border-gray-600 ">
        <span
          className={`absolute z-20  h-[11px] border-r `}
          style={{ width: `${(2000 / 17000) * 100}%` }}
        ></span>
        <span
          className={`absolute z-20  h-[11px] border-r `}
          style={{ width: `${(3000 / 17000) * 100}%` }}
        ></span>
        <span
          className={`absolute z-20  h-[11px] border-r `}
          style={{ width: `${(5000 / 17000) * 100}%` }}
        ></span>
        <span
          className={`absolute z-20  h-[11px] border-r `}
          style={{ width: `${(8000 / 17000) * 100}%` }}
        ></span>
        <span
          className={`absolute z-20  h-[11px] border-r `}
          style={{ width: `${(14000 / 17000) * 100}%` }}
        ></span>
        <span
          className={`absolute z-20  h-[11px] border-r `}
          style={{ width: `${(17000 / 17000) * 100}%` }}
        ></span>
      </div>
    </div>
  );
};
