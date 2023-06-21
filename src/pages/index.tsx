import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { type NextPage } from "next";
import { GuessList } from "~/components/GuessList";
import { dark } from "@clerk/themes";
import Info from "~/components/Info";
import Player from "~/components/Player";
import { useEffect, useState } from "react";
import SongCard from "~/components/SongCard";
import { type UserStats } from "./types/types";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";
import Scores from "~/components/Scores";

function initLocalStorage() {
  const statsObj = {
    guessList: [],
    hasFinished: false,
    date: new Date()?.toLocaleDateString(),
    scoreLogged: false,
  };
  localStorage.setItem("userStats", JSON.stringify(statsObj));
}

const Home: NextPage = () => {
  const { isSignedIn } = useUser();
  const [correctGuess, setCorrectGuess] = useState(false);
  const [guessNum, updateGuessNum] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const todaysSong = api.songs.todaysSong.useQuery(undefined).data!;

  useEffect(() => {
    const stats = localStorage.getItem("userStats");
    if (!stats) {
      initLocalStorage();
    } else {
      const todaysDate = new Date()?.toLocaleDateString();
      const userStats = JSON.parse(stats) as UserStats;
      if (userStats?.date === todaysDate) {
        if (userStats?.guessList?.length)
          updateGuessNum(userStats?.guessList?.length + 1);
        if (userStats?.hasFinished) setCorrectGuess(userStats?.hasFinished);
      } else {
        initLocalStorage();
      }
    }
  }, []);

  const { mutate } = api.songs.submitScore.useMutation({
    onSuccess: () => {
      toast.success("Score saved!");
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const stats = JSON.parse(localStorage.getItem("userStats")!) as UserStats;
      stats.scoreLogged = true;
      localStorage.setItem("userStats", JSON.stringify(stats));
    },
  });

  const correctGuessChosen = (value: boolean) => {
    setCorrectGuess(value);
    const stats = localStorage.getItem("userStats");
    if (!stats) return;
    const userStats = JSON.parse(stats) as UserStats;
    userStats.hasFinished = value;
    localStorage.setItem("userStats", JSON.stringify(userStats));

    if (!userStats?.scoreLogged && isSignedIn) {
      mutate({
        score: guessNum,
        songId: todaysSong?.id,
        success: value,
      });
    }
  };

  useEffect(() => {
    const stats = localStorage.getItem("userStats");
    if (!stats) return;
    const userStats = JSON.parse(stats) as UserStats;
    if (guessNum >= 7 && isSignedIn && !userStats?.scoreLogged) {
      mutate({
        score: guessNum,
        songId: todaysSong?.id,
        success: false,
      });
    }
  }, [guessNum]);

  return (
    <main className="relative flex h-full min-h-full w-full flex-col items-center bg-black">
      <header className="h-max-content flex w-full items-center justify-center gap-4 border-b-2 border-green-600 py-2">
        <div className="lg:w- flex w-full items-center px-3 lg:w-2/5">
          <div className="flex w-1/4 gap-3">
            <Info />
            {isSignedIn && <Scores />}
          </div>
          <div className="flex w-1/2 flex-grow items-center justify-center">
            <h1 className="font-sans text-3xl font-semibold tracking-wider text-white lg:text-5xl">
              Heardle
            </h1>
          </div>
          <div className="flex w-1/4 items-center justify-end">
            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  baseTheme: dark,
                }}
              />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="rounded-md border-2 border-transparent  p-2 text-white hover:text-green-500 lg:p-1">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </header>

      <div className="flex w-full flex-grow flex-col items-center justify-between p-4 lg:w-2/5">
        {guessNum >= 7 || correctGuess ? (
          <SongCard guessNum={guessNum} />
        ) : (
          <>
            <div className="relative flex w-full flex-grow flex-col ">
              <GuessList />
            </div>
            <footer className="mx-auto w-full  flex-col ">
              <Player
                updateCorrectGuess={correctGuessChosen}
                updateGuessNum={updateGuessNum}
                todaysSong={todaysSong}
              />
            </footer>
          </>
        )}
      </div>
    </main>
  );
};

export default Home;
