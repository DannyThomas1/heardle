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
import Image from "next/image";
import Info from "~/components/Info";
import Player from "~/components/Player";
import { useEffect, useState } from "react";
import SongCard from "~/components/SongCard";

interface UserStats {
  date: Date;
  guessList: { song: string; status: string }[];
  hasFinished: boolean;
}

const Home: NextPage = () => {
  const { isSignedIn } = useUser();
  const [correctGuess, setCorrectGuess] = useState(false);
  const [guessNum, updateGuessNum] = useState(1);

  useEffect(() => {
    const stats = localStorage.getItem("userStats");
    if (!stats) return;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const userJSON = JSON.parse(stats);
    const userStats = userJSON as UserStats;
    if (userStats?.guessList?.length)
      updateGuessNum(userStats?.guessList?.length);
    if (userStats?.hasFinished) setCorrectGuess(userStats?.hasFinished);
  }, []);

  return (
    <main className="flex min-h-screen w-screen justify-center">
      <div className="flex h-screen w-full flex-col items-center bg-black">
        <header className="h-max-content flex w-full items-center justify-center gap-4 border-b-2 border-green-600 py-1">
          <div className="flex w-full items-center px-3 py-2 lg:w-1/3">
            <div className="flex w-1/4 gap-3">
              <Info />
              {isSignedIn && (
                <Image
                  src={"/assets/analytics.svg"}
                  alt="stats"
                  width={30}
                  height={30}
                />
              )}
            </div>
            <div className="flex w-1/2 flex-grow items-center justify-center">
              <h1 className="font-sans text-2xl tracking-wider text-white lg:text-5xl">
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
                  <button className="rounded-md border-2 border-green-600 p-2 text-white hover:bg-green-500 lg:p-1">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
        </header>

        <div className="relative flex w-full flex-grow flex-col items-center justify-between p-4 lg:w-1/3 ">
          {guessNum >= 7 || correctGuess ? (
            <SongCard guessNum={guessNum} />
          ) : (
            <>
              <div className="w-full overflow-y-auto py-3">
                <GuessList />
              </div>
              <footer className="absolute bottom-0 right-0 flex w-full p-4 ">
                <Player
                  updateGuess={setCorrectGuess}
                  updateGuessNum={updateGuessNum}
                />
              </footer>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
