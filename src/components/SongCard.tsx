/* eslint-disable */
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import { SongContext } from "~/context/context";
import { LoadingPage } from "./Loading";
import { api } from "~/utils/api";

function SongCard({ guessNum }: { guessNum: number }) {
  const songContext = useContext(SongContext);
  const song = songContext?.currentSong;
  const todaysSong = api.songs.todaysSong.useQuery().data;

  useEffect(() => {
    if (!todaysSong) return;

    const widgetIFrame = document.getElementById("sc-widget");
    const widget = (window as any)?.SC?.Widget(widgetIFrame);
    widget.bind((window as any)?.SC.Widget.Events.READY, () => {
      widget.load(todaysSong?.url, { show_artwork: false, auto_play: true });
      widget.play();
    });
  }, [todaysSong]);

  if (!todaysSong || !song) return <LoadingPage />;

  return (
    <div className="my-20 flex h-full w-full flex-col items-center justify-start gap-4">
      {guessNum === 7 ? (
        <h2 className="text-xl font-bold tracking-wide">
          Aw no, better luck next time!
        </h2>
      ) : (
        <div>
          <h2 className="text-2xl font-bold tracking-wide">
            You got it in {guessNum} guesses!
          </h2>
          <div className="text-center text-slate-200">
            {guessNum === 1 && <p>Wow, you're a genius!</p>}
            {guessNum === 6 && <p>Wow, that was a close one!</p>}
          </div>
        </div>
      )}

      <div className="flex w-full items-center justify-center">
        <Image
          src={song?.artwork_url}
          alt="song artwork"
          width={200}
          height={200}
        />
      </div>
      <div className="font-bold tracking-wide">{song?.title}</div>
      <div className="flex w-full flex-row items-center justify-center gap-3">
        <span
          className={`content h-2 w-6 ${
            guessNum === 1
              ? "bg-green-500"
              : guessNum >= 1
              ? "bg-red-600"
              : "bg-gray-800"
          }`}
        ></span>
        <span
          className={`content h-2 w-6 ${
            guessNum === 2
              ? "bg-green-500"
              : guessNum >= 2
              ? "bg-red-600"
              : "bg-gray-800"
          }`}
        ></span>
        <span
          className={`content h-2 w-6 ${
            guessNum === 3
              ? "bg-green-500"
              : guessNum >= 3
              ? "bg-red-600"
              : "bg-gray-800"
          }`}
        ></span>
        <span
          className={`content h-2 w-6 ${
            guessNum === 4
              ? "bg-green-500"
              : guessNum >= 4
              ? "bg-red-600"
              : "bg-gray-800"
          }`}
        ></span>
        <span
          className={`content h-2 w-6 ${
            guessNum === 5
              ? "bg-green-500"
              : guessNum >= 5
              ? "bg-red-600"
              : "bg-gray-800"
          }`}
        ></span>
        <span
          className={`content h-2 w-6 ${
            guessNum === 6
              ? "bg-green-500"
              : guessNum >= 6
              ? "bg-red-600"
              : "bg-gray-800"
          }`}
        ></span>
      </div>

      <div className="my-5">
        <iframe
          id="sc-widget"
          src={`https://w.soundcloud.com/player/?url=${todaysSong?.url}}`}
          width={300}
          height={150}
          allow="autoplay"
        ></iframe>
      </div>
    </div>
  );
}

export default SongCard;
