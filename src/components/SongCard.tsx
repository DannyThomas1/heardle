/* eslint-disable */
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { LoadingSpinner } from "./Loading";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { UserStats } from "~/pages/types/types";
import { toast } from "react-hot-toast";

function SongCard({ guessNum }: { guessNum: number }) {
  const { data: todaysSong } = api.songs.todaysSong.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const { mutate } = api.songs.submitScore.useMutation({
    onSuccess: () => {
      toast.success("Score saved!");
      const stats = JSON.parse(localStorage.getItem("userStats")!);
      stats.scoreLogged = true;
      localStorage.setItem("userStats", JSON.stringify(stats));
      setLoggedScore(true);
    },
    onError: (err) => {
      console.log(err);
      toast.error("Error saving score, please try again later");
    },
  });
  const { isSignedIn } = useUser();
  const [loggedScore, setLoggedScore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [songArtwork, setSongArtwork] = useState("");

  useEffect(() => {
    if (!todaysSong) return;
    try {
      const widgetIFrame = document.getElementById("sc-widget");
      const widget = (window as any)?.SC?.Widget(widgetIFrame);
      widget.bind((window as any)?.SC.Widget.Events.READY, () => {
        widget.load(todaysSong?.url, { show_artwork: false, auto_play: true });
        widget.bind((window as any)?.SC.Widget.Events.READY, () => {
          widget.getCurrentSound((song: any) => {
            if (!song) return;
            setSongArtwork(song?.artwork_url?.replace("-large", "-t200x200"));
          });
        });
        widget.play();
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  }, [todaysSong]);

  useEffect(() => {
    const stats = localStorage.getItem("userStats");
    if (!stats) return;
    const userStats = JSON.parse(stats) as UserStats;
    if (userStats?.scoreLogged) setLoggedScore(true);
  }, []);

  const saveScore = () => {
    if (!todaysSong) return;
    mutate({
      score: guessNum,
      songId: todaysSong?.id,
      success: guessNum > 6 ? false : true,
    });
  };

  return (
    <div className="my-5 flex h-full w-full flex-col items-center justify-start gap-4">
      {guessNum === 7 ? (
        <h2 className="text-xl font-bold tracking-wide">
          Aw no, better luck next time!
        </h2>
      ) : (
        <div>
          <h2 className="text-2xl font-bold tracking-wide">
            You got it in {guessNum > 1 ? `${guessNum} guesses!` : "1 guess!"}
          </h2>
          <div className="text-center text-slate-200">
            {guessNum === 1 && <p>Wow, you're a genius!</p>}
            {guessNum === 6 && <p>Wow, that was a close one!</p>}
          </div>
        </div>
      )}
      {loading || !songArtwork ? (
        <LoadingSpinner size={15} />
      ) : (
        <div className="flex w-full items-center justify-center">
          <Image
            src={songArtwork}
            alt="song artwork"
            width={200}
            height={200}
          />
        </div>
      )}
      <div className="flex flex-col items-center justify-center gap-1">
        <h1 className="text-2xl font-bold tracking-wide">
          {todaysSong?.title}
        </h1>
        <p className="text-lg text-gray-400">{todaysSong?.artist}</p>
      </div>
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

      <div>
        {!isSignedIn && (
          <div>
            <p className="mt-3 font-bold">Sign in to save your scores!</p>
          </div>
        )}

        {isSignedIn && !loggedScore && (
          <div>
            <button
              className="border-1 w-32 rounded-md bg-green-500 p-1"
              onClick={saveScore}
            >
              Save Score!
            </button>
          </div>
        )}
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
