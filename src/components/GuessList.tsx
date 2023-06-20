import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { GuessContext } from "~/context/guess";

export const GuessList = () => {
  const guessCtx = useContext(GuessContext);
  const [guessArr, setGuessArr] = useState(
    Array(6).fill({ song: "", status: "" })
  );

  useEffect(() => {
    if (!guessCtx?.guess) return;
    const length = guessCtx?.guess?.length || 0;
    const emptyArr: { song: string; status: string }[] = [];
    for (let i = 0; i < 6 - length; i++) {
      emptyArr.push({ song: "", status: "" });
    }
    const arr = [...guessCtx?.guess, ...emptyArr];
    setGuessArr(arr);
  }, [guessCtx]);

  return (
    <div className="flex w-full flex-col gap-5">
      {guessArr.map((guess: { song: string; status: string }, i) => (
        <div
          key={i}
          className=" flex h-[30px] w-full items-center justify-start gap-2 rounded-sm border-2 border-gray-800 p-1 md:h-[40px]"
        >
          {guess?.status !== "" && (
            <Image
              src={"/assets/wrong.svg"}
              alt="wrong"
              width={20}
              height={20}
              className={`${guess?.status === "partial" ? "text-yellow-400" : "text-white"
                }`}
            />
          )}
          <p
            className={`${guess?.status === "partial" ? "text-yellow-400" : "text-white"
              } overflow-hidden truncate`}
          >
            {guess?.song}
          </p>
        </div>
      ))}
    </div>
  );
};
