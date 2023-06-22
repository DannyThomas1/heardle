import Image from "next/image";
import { useContext, useState } from "react";
import { GuessContext } from "~/context/guess";
import useDebounce from "~/hooks/debouce";
import { api, type RouterOutputs } from "~/utils/api";

type Song = RouterOutputs["songs"]["todaysSong"];

const SearchBar = ({
  skipSelected,
  correctSelected,
  guessSubmitted,
  guessNumber,
  todaysSong,
  isPlaying,
}: {
  skipSelected: () => void;
  correctSelected: (x: boolean) => void;
  guessSubmitted: () => void;
  guessNumber: number;
  todaysSong: Song | undefined;
  isPlaying: boolean;
}) => {
  const guessContext = useContext(GuessContext);
  const [input, setInput] = useState("");
  const debouncedSearch = useDebounce(input, 500);
  const [selected, setSelected] = useState<Song | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const { data } = api.songs.getAll.useQuery(
    {
      search: debouncedSearch,
    },
    {
      enabled: debouncedSearch !== "" && !selected,
    }
  );

  const submitClicked = () => {
    if (!selected) return;

    if (selected?.name === todaysSong?.name) {
      correctSelected(true);
    } else {
      if (selected?.artist === todaysSong?.artist) {
        guessContext?.addGuess({ song: selected?.name, status: "partial" });
      } else {
        guessContext?.addGuess({ song: selected?.name, status: "incorrect" });
      }
      guessSubmitted();
      setInput("");
      setSelected(null);
    }
  };

  const skipClicked = () => {
    guessContext?.addGuess({ song: "Skipped", status: "skipped" });
    skipSelected();
  };

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="relative block">
        <Image
          src={"/assets/search.svg"}
          alt="search icon"
          width={30}
          height={30}
          className="absolute inset-y-3 left-0 flex items-center pl-2"
        />
        <div className="absolute bottom-16 right-0 z-30 w-full bg-black">
          {!selected &&
            input &&
            data?.map((song) => (
              <div
                key={song.id}
                className="p-1 hover:text-green-500"
                onClick={() => {
                  setSelected(song);
                  setInput(song.name);
                }}
              >
                {song.name}
              </div>
            ))}
        </div>
        <input
          placeholder="Search for the artist/title!"
          className=" block w-full flex-grow truncate rounded-md border-2 border-gray-600 bg-black/20 p-3 py-2 pl-9 pr-3 outline-none focus:border-2 focus:border-green-500"
          value={input}
          onChange={handleChange}
        />
        <Image
          src={"/assets/close.svg"}
          alt="close btn"
          width={30}
          height={30}
          className="absolute inset-y-3 right-0 flex items-center pr-2"
          onClick={() => {
            setInput("");
            setSelected(null);
          }}
        />
      </div>

      <div className="my-3 flex w-full items-center justify-between">
        <button
          className={`text-md rounded-md ${
            isPlaying
              ? "cursor-not-allowed bg-gray-400"
              : "hover:bg-slate-600` bg-slate-700"
          }  p-2 tracking-wider text-white`}
          onClick={skipClicked}
          disabled={isPlaying}
        >
          Skip (+{guessNumber}s)
        </button>
        <button
          className={`text-md rounded-md ${
            isPlaying
              ? "cursor-not-allowed bg-gray-400"
              : "bg-green-600 hover:bg-green-500"
          } p-2 tracking-wider text-white `}
          onClick={submitClicked}
          disabled={isPlaying}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
