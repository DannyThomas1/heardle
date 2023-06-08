/* eslint-disable */
import Script from "next/script";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AudioPlaying } from "./AudioPlaying";
import { LoadingSpinner } from "./Loading";
import SearchBar from "./SearchBar";
import { Guess } from "./Guess";

interface Player {
  isPaused: (x: (b: boolean) => void) => void;
  play: () => void;
  pause: () => void;
  getPosition: (x: (x: string) => void) => void;
  seekTo: (x: number) => void;
  bind: (x: string, y: any) => void;
  unbind: (x: string) => void;
}

function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<Player>();
  const [loading, setLoading] = useState(false);
  const [guessNum, setGuessNum] = useState(1);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setLoading(true);
    const widgetIFrame = document.getElementById("sc-widget");
    const widget = (window as any)?.SC?.Widget(widgetIFrame);
    widget.bind((window as any)?.SC.Widget.Events.READY, () =>
      setLoading(false)
    );

    setPlayer(widget);
  }, []);

  const guessToSeconds: { [key: number]: number } = {
    1: 1000,
    2: 2000,
    3: 4000,
    4: 7000,
    5: 13000,
    6: 16000,
  };

  const setTimer = (guessNum: number) => {
    if (!player) {
      setIsPlaying(false);
      return;
    }

    setTimeout(() => {
      player.pause();
      setIsPlaying(false);
      player.seekTo(0);
    }, guessToSeconds[guessNum]);
  };

  const playSelected = (guessNum: number) => {
    if (!player) return;

    setIsPlaying(true);
    player.bind((window as any)?.SC.Widget.Events.PLAY, setTimer(guessNum));
  };

  const skipSelected = () => {
    let numGuesses = guessNum;
    if (numGuesses !== 6) {
      setGuessNum((currentGuessNum) => currentGuessNum + 1);
      numGuesses++;
    } else console.log("Finished Game");

    playSelected(numGuesses);
  };

  // adjust playback in SC player to match isPlaying state
  useEffect(() => {
    if (!player) return; // player loaded async - make sure available

    player.isPaused((playerIsPaused: boolean) => {
      if (isPlaying && playerIsPaused) {
        player.play();
      } else if (!isPlaying && !playerIsPaused) {
        player.pause();
      }
    });
  }, [isPlaying]);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <iframe
        id="sc-widget"
        src="https://w.soundcloud.com/player/?url=https://soundcloud.com/youngthegiant/my-way"
        width={100}
        height={100}
        allow="autoplay"
      ></iframe>

      <Guess guessNum={guessNum} isPlaying={isPlaying} />

      <div className="flex w-full items-center justify-between">
        <div>0:00</div>
        <div className="my-3">
          {loading ? (
            <LoadingSpinner size={25} />
          ) : !isPlaying ? (
            <Image
              src={"/assets/play.svg"}
              alt="play btn"
              width={50}
              height={50}
              className="rounded-full border-2 border-white"
              onClick={() => playSelected(guessNum)}
            />
          ) : (
            <AudioPlaying onClick={() => setIsPlaying(false)} />
          )}
        </div>
        <div>0:17</div>
      </div>

      <div className="mt-3 w-full">
        <SearchBar skipSelected={skipSelected} submitSelected={() => {}} />
      </div>
    </div>
  );
}

export default Player;
