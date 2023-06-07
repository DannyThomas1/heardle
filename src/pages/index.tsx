import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { type NextPage } from "next";
import { Guess } from "~/components/Guess";
import { GuestList } from "~/components/GuessList";
import { api } from "~/utils/api";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Info from "~/components/Info";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const { isSignedIn } = useUser();

  return (
    <main className="flex min-h-screen w-screen justify-center">
      <div className="flex h-screen w-full flex-col items-center bg-black">
        <header className="flex h-24 w-full items-center justify-center gap-4 border-b-2 border-green-600">
          <div className="flex w-full items-center px-3 md:w-1/3">
            <div className="flex gap-3">
              <Info />
              {isSignedIn && (
                <Image
                  src={"/assets/analytics.svg"}
                  alt="stats"
                  width={30}
                  height={30}
                />
              )}
            </div>
            <div className="flex flex-grow items-center justify-center">
              <h1 className="font-sans text-2xl tracking-wider text-white md:text-5xl">
                Heardle
              </h1>
            </div>
            <div className="">
              <SignedIn>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    baseTheme: dark,
                  }}
                />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="rounded-md border-2 border-green-600 p-2 text-white hover:bg-green-500">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </div>
          </div>
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
