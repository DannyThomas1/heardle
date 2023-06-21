export interface UserStats {
  date: string;
  guessList: { song: string; status: string }[];
  hasFinished: boolean;
  scoreLogged: boolean;
}
