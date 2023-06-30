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
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";
import Scores from "~/components/Scores";
import { LoadingPage } from "~/components/Loading";
import useUserStatsStore from "~/stores/stats";
import { shallow } from "zustand/shallow";

const Home: NextPage = () => {
  const { isSignedIn } = useUser();
  const [correctGuess, setCorrectGuess] = useState(false);
  const [guessNum, updateGuessNum] = useState(1);
  const {
    date,
    guessList,
    scoreLogged,
    hasFinished,
    songID,
    resetState,
    updateHasFinished,
    updateScoreLogged,
  } = useUserStatsStore(
    (state) => ({
      date: state.date,
      guessList: state.guessList,
      scoreLogged: state.scoreLogged,
      hasFinished: state.hasFinished,
      songID: state.songID,
      resetState: state.resetState,
      updateHasFinished: state.updateHasFinished,
      updateScoreLogged: state.updateScoreLogged,
    }),
    shallow
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { data: todaysSong, isLoading } =
    api.songs.todaysSong.useQuery(undefined);

  useEffect(() => {
    if (!todaysSong) return;
    //Check if date/song has changed
    if (songID !== todaysSong.id) {
      resetState(todaysSong?.id, new Date().toLocaleDateString());
    } else {
      if (guessList?.length > 0) updateGuessNum(guessList.length + 1);
      if (hasFinished) setCorrectGuess(hasFinished);
    }
  }, [todaysSong]);

  const { mutate } = api.songs.submitScore.useMutation({
    onSuccess: () => {
      toast.success("Score saved!");
      updateScoreLogged(true);
    },
  });

  const correctGuessChosen = (value: boolean) => {
    updateHasFinished(value);
    if (!scoreLogged && isSignedIn) {
      if (!todaysSong?.id) return;
      mutate({
        score: guessNum,
        songId: todaysSong?.id,
        success: value,
      });
    }
    setCorrectGuess(value);
  };

  useEffect(() => {
    if (guessNum >= 7 && isSignedIn && !scoreLogged) {
      if (!todaysSong?.id) return;
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

      {isLoading ? (
        <LoadingPage />
      ) : !todaysSong ? (
        <div className="flex h-full items-center justify-center">
          <h1>Theres been a problem, please try again!</h1>
        </div>
      ) : (
        <div className="flex w-full flex-grow flex-col items-center justify-between p-4 lg:w-2/5">
          {guessNum >= 7 || correctGuess ? (
            <SongCard guessNum={guessNum} todaysSong={todaysSong} />
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
      )}
    </main>
  );
};

export default Home;
