import { createContext, useState } from "react";

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
  };
  return (
    <GuessContext.Provider value={{ guess, setGuess, addGuess }}>
      {children}
    </GuessContext.Provider>
  );
}

export default GuessProvider;
