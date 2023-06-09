/* eslint-disable */
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AudioPlaying } from "./AudioPlaying";
import { LoadingSpinner } from "./Loading";
import SearchBar from "./SearchBar";
import { Guess } from "./Guess";
import {
  FIFTH_CLIP,
  FIRST_CLIP,
  FOURTH_CLIP,
  SECOND_CLIP,
  SIXTH_CLIP,
  THIRD_CLIP,
} from "~/constants";
import { RouterOutputs } from "~/utils/api";
import useUserStatsStore from "~/stores/stats";

interface Player {
  isPaused: (x: (b: boolean) => void) => void;
  play: () => void;
  pause: () => void;
  getPosition: (x: (x: string) => void) => void;
  seekTo: (x: number) => void;
  bind: (x: string, y: any) => void;
  unbind: (x: string) => void;
  getCurrentSound: (x: (x: any) => void) => void;
  load: (x: string) => void;
  setVolume: (x: number) => void;
}

type Song = RouterOutputs["songs"]["todaysSong"];

function Player({
  updateCorrectGuess,
  updateGuessNum,
  todaysSong,
}: {
  updateCorrectGuess: (x: boolean) => void;
  updateGuessNum: (x: number) => void;
  todaysSong: Song;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<Player>();
  const [loading, setLoading] = useState(false);
  const [guessNum, setGuessNum] = useState(1);
  const [counter, setCounter] = useState(0);
  const [counterID, setCounterID] = useState("");
  const [timerID, setTimerID] = useState("");
  const [guessList] = useUserStatsStore((state) => [state.guessList]);

  useEffect(() => {
    if (guessList?.length) setGuessNum(guessList?.length + 1);
  }, []);

  useEffect(() => {
    setLoading(true);
    const widgetIFrame = document.getElementById("sc-widget");
    const widget = (window as any)?.SC?.Widget(widgetIFrame);
    widget.bind((window as any)?.SC.Widget.Events.READY, async () => {
      setLoading(false);
      widget.setVolume(100);
    });

    setPlayer(widget);
  }, []);

  const guessToSeconds: { [key: number]: number } = {
    1: FIRST_CLIP,
    2: SECOND_CLIP,
    3: THIRD_CLIP,
    4: FOURTH_CLIP,
    5: FIFTH_CLIP,
    6: SIXTH_CLIP,
  };

  const playSong = (guessNumber: number) => {
    if (!player || !guessNum) {
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    let counterID = setInterval(() => setCounter((prev) => prev + 1), 1000);
    setCounterID(String(counterID));
    if (guessToSeconds[guessNumber]) {
      let timerId = createTimer(guessToSeconds[guessNumber] || 1000, counterID);
      setTimerID(String(timerId));
    }
  };

  const createTimer = (guessNumber: number, counterID: any) => {
    if (!player) return;
    return setTimeout(
      (counterID) => {
        player.pause();
        setIsPlaying(false);
        player.seekTo(0);
        clearInterval(counterID);
        setCounter(0);
      },
      guessNumber,
      counterID
    );
  };

  const playSelected = (guessNumber: number) => {
    if (!player) return;

    player.play();
    player.bind((window as any)?.SC.Widget.Events.PLAY, playSong(guessNumber));
  };

  const pauseSelected = (counterID: string, timerID: string) => {
    setIsPlaying(false);
    clearInterval(counterID);
    clearTimeout(timerID);
    setCounter(0);
    player?.seekTo(0);
  };

  const reset = async (counterID: string, timerID: string) => {
    setIsPlaying(false);
    setCounter(0);
    player?.seekTo(0);
    clearInterval(counterID);
    clearTimeout(timerID);
  };

  const skipSelected = async (counterID: string, timerID: string) => {
    if (isPlaying) {
      await reset(counterID, timerID);
    }

    let numGuesses = guessNum;
    if (numGuesses !== 6) {
      setGuessNum((currentGuessNum) => currentGuessNum + 1);
      numGuesses++;
      updateGuessNum(numGuesses);
      playSelected(numGuesses);
    } else {
      updateGuessNum(7);
    }
  };

  const guessSubmitted = async (counterID: string, timerID: string) => {
    if (isPlaying) {
      await reset(counterID, timerID);
    }

    let numGuesses = guessNum;
    if (numGuesses !== 6) {
      setGuessNum((currentGuessNum) => currentGuessNum + 1);
      numGuesses++;
      updateGuessNum(numGuesses);
      playSelected(numGuesses);
    } else {
      updateGuessNum(7);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <iframe
        id="sc-widget"
        src={`https://w.soundcloud.com/player/?url=${todaysSong?.url}`}
        width={0}
        height={0}
        allow="autoplay"
        onLoad={() => setLoading(false)}
      ></iframe>

      <Guess guessNum={guessNum} isPlaying={isPlaying} />

      <div className="flex w-full items-center justify-between">
        <div>0:{String(counter).padStart(2, "0")}</div>
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
            <AudioPlaying onClick={() => pauseSelected(counterID, timerID)} />
          )}
        </div>
        <div>0:17</div>
      </div>

      <div className="mt-3 w-full">
        <SearchBar
          skipSelected={() => skipSelected(counterID, timerID)}
          guessSubmitted={() => guessSubmitted(counterID, timerID)}
          correctSelected={() => updateCorrectGuess(true)}
          guessNumber={guessNum}
          todaysSong={todaysSong}
        />
      </div>
    </div>
  );
}

export default Player;
