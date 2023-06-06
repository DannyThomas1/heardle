import { type NextPage } from "next";
import { Guess } from "~/components/Guess";
import { GuestList } from "~/components/GuessList";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <main className="flex min-h-screen w-screen justify-center">
      <div className="flex h-screen w-full flex-col items-center bg-black">
        <header className="flex h-24 w-full items-center justify-center gap-4 border-b-2 border-green-600">
          <h1 className="font-sans text-2xl tracking-wider text-white md:text-5xl">
            Heardle
          </h1>
        </header>

        <div className="flex h-full w-full flex-col items-center justify-center p-4 md:w-1/3 ">
          <div className="w-full flex-grow">
            <GuestList />
          </div>
          <footer className="flex w-full">
            <Guess />
          </footer>
        </div>
      </div>
    </main>
  );
};

export default Home;
