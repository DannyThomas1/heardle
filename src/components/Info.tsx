import Image from "next/image";
import { useEffect, useState } from "react";
import { Modal } from "./Modal";

function Info() {
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const history = localStorage.getItem("firstTime");
    if (history) setIsOpen(false);
    else setIsOpen(true);
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    localStorage.setItem("firstTime", "false");
  }

  return (
    <>
      <Image
        src={"/assets/info.svg"}
        alt="stats"
        width={30}
        height={30}
        onClick={openModal}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        modalHeader="How to Play"
      >
        <div>
          <ul className="flex flex-col gap-4 px-4 py-2">
            <li className="flex items-center justify-start gap-2">
              <Image
                src={"/assets/volume-up.svg"}
                alt="stats"
                width={30}
                height={30}
              />
              Listen to the intro, start typing your answer to what song it
              could be and hit submit.
            </li>

            <li className="flex items-center justify-start gap-2">
              <Image
                src={"/assets/play-pause.svg"}
                alt="stats"
                width={30}
                height={30}
              />
              Skipped or incorrect attempts unlock more of the intro.
            </li>

            <li className="flex items-center justify-start gap-2">
              <Image
                src={"/assets/music-note.svg"}
                alt="stats"
                width={30}
                height={30}
              />
              Answer in as few tries as possible and share your score!
            </li>

            <li className="flex items-center justify-start gap-2">
              <Image
                src={"/assets/joystick.svg"}
                alt="stats"
                width={30}
                height={30}
              />
              Sign in to save your stats!
            </li>
          </ul>

          <div className="mt-3 flex w-full items-center justify-center">
            <button
              className="border-1 w-36 rounded-md bg-green-600 px-2 py-1 hover:bg-green-500"
              onClick={() => setIsOpen(false)}
            >
              Play!
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Info;
