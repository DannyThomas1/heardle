import Image from "next/image";
import { useEffect, useState } from "react";
import { Modal } from "./Modal";


function Info() {
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const history = localStorage.getItem("firstTime")
    if (history) setIsOpen(false)
    else setIsOpen(true)
  }, [])

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    localStorage.setItem("firstTime", "false")
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
        <ul className="flex list-disc flex-col gap-4 px-4 py-2">
          <li>
            Listen to the intro,start typing your answer to what song it could
            be and hit submit.
          </li>

          <li>Skipped or incorrect attempts unlock more of the intro</li>

          <li>Answer in as few tries as possible and share your score!</li>
        </ul>
      </Modal>
    </>
  );
}

export default Info;
