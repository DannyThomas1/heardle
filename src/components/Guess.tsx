import { type NextPage } from "next";
import Image from "next/image";
import { useState } from "react";

const SearchBar = () => {
  const [input, setInput] = useState("");

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
        <input
          placeholder="Type some emojis!"
          className=" block w-full flex-grow rounded-md border-2 border-gray-600 bg-black/20 p-3 py-2 pl-9 pr-3 outline-none focus:border-2 focus:border-green-500"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          //   disabled={isPosting}
          onKeyDown={(e) => {
            // if (e.key === "Enter") {
            //   e.preventDefault();
            //   if (input !== "") {
            //     mutate({ content: input });
            //   }
            // }
          }}
        />
        <Image
          src={"/assets/close.svg"}
          alt="close btn"
          width={30}
          height={30}
          className="absolute inset-y-3 right-0 flex items-center pr-2"
        />
      </div>

      <div className="my-3 flex w-full items-center justify-between">
        <button className="text-md rounded-md bg-slate-700 p-2 tracking-wider text-white hover:bg-slate-600">
          Skip (+1s)
        </button>
        <button className="text-md rounded-md bg-green-600 p-2 tracking-wider text-white hover:bg-green-500 ">
          Submit
        </button>
      </div>
    </div>
  );
};

export const Guess: NextPage = () => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full items-center justify-between  border-2 border-gray-600 bg-transparent">
        <span className="h-[20px] w-1/6 border-r  bg-transparent"></span>
        <span className="h-[20px] w-1/6 border-r bg-transparent"></span>
        <span className="h-[20px] w-1/6 border-r bg-transparent"></span>
        <span className="h-[20px] w-1/6 border-r bg-transparent"></span>
        <span className="h-[20px] w-1/6 border-r bg-transparent"></span>
        <span className="h-[20px] w-1/6  bg-transparent "></span>
      </div>
      <div className="my-3 flex w-full items-center justify-between">
        <div>0:00</div>
        <Image
          src={"/assets/play.svg"}
          alt="play btn"
          width={50}
          height={50}
          className="rounded-full border-2 border-white"
        />
        <div>0:15</div>
      </div>
      <SearchBar />
    </div>
  );
};
