export interface UserStats {
  date: Date;
  guessList: { song: string; status: string }[];
  hasFinished: boolean;
}
