import { createContext, useEffect, useState } from "react";
import { type UserStats } from "~/pages/types/types";

interface GuessContextValue {
  guess: Guess[];
  setGuess: React.Dispatch<React.SetStateAction<Guess[]>>;
  addGuess: (x: Guess) => void;
}

type Guess = {
  song: string;
  status: string;
};

export const GuessContext = createContext<GuessContextValue | null>(null);

function GuessProvider({ children }: { children: React.ReactNode }) {
  const [guess, setGuess] = useState<Guess[]>([]);

  const addGuess = (guess: Guess) => {
    setGuess((prev) => [...prev, guess]);
    const stats = localStorage.getItem("userStats");

    if (stats) {
      const statsJSON = JSON.parse(stats) as UserStats;
      const newStats = {
        ...statsJSON,
        guessList: [...statsJSON.guessList, guess],
      };
      localStorage.setItem("userStats", JSON.stringify(newStats));
    }
  };

  useEffect(() => {
    const stats = localStorage.getItem("userStats");
    if (!stats) return;
    const statsJSON = JSON.parse(stats) as UserStats;
    if (statsJSON?.guessList?.length) setGuess(statsJSON?.guessList);
  }, []);

  return (
    <GuessContext.Provider value={{ guess, setGuess, addGuess }}>
      {children}
    </GuessContext.Provider>
  );
}

export default GuessProvider;
