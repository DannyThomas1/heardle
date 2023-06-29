import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  date: string | null;
  guessList: Guess[];
  hasFinished: boolean;
  scoreLogged: boolean;
  songID: number | null;
};

type Guess = { song: string; status: string };

type Actions = {
  resetState: (songID: number, date: string) => void;
  updateGuessList: (guess: Guess) => void;
  updateHasFinished: (hasFinished: boolean) => void;
  updateScoreLogged: (scoreLogged: boolean) => void;
};

const setIntialState = (songID: number | null, date: string | null): State => {
  return {
    date: date,
    guessList: [],
    hasFinished: false,
    scoreLogged: false,
    songID: songID,
  };
};

const initialState = setIntialState(null, null);

const useUserStatsStore = create<State & Actions>()(
  persist(
    (set, _) => ({
      ...initialState,
      resetState: (songID: number, date: string) =>
        set(setIntialState(songID, date)),
      updateGuessList: (guess: Guess) =>
        set((state) => ({ guessList: [...state.guessList, guess] })),
      updateHasFinished: (hasFinished: boolean) => set({ hasFinished }),
      updateScoreLogged: (scoreLogged: boolean) => set({ scoreLogged }),
    }),
    {
      name: "userStats",
    }
  )
);

export default useUserStatsStore;
