import { createContext, useEffect, useState } from "react";
import useUserStatsStore from "~/stores/stats";

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
  const [updateGuessList, guessList] = useUserStatsStore((state) => [
    state.updateGuessList,
    state.guessList,
  ]);

  const addGuess = (guess: Guess) => {
    setGuess((prev) => [...prev, guess]);
    updateGuessList(guess);
  };

  useEffect(() => {
    if (guessList?.length) setGuess(guessList);
  }, []);

  return (
    <GuessContext.Provider value={{ guess, setGuess, addGuess }}>
      {children}
    </GuessContext.Provider>
  );
}

export default GuessProvider;
