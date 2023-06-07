import Image from "next/image";

function Info() {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Image
        src={"/assets/info.svg"}
        alt="stats"
        width={30}
        height={30}
        // onClick={onOpen}
      />

      {/* <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent color="white" bg="gray.800">
          <ModalHeader>How to Play</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ul className="flex list-disc flex-col gap-4 px-4 py-2">
              <li>
                Listen to the intro,start typing your answer to what song it
                could be and hit submit.
              </li>

              <li>Skipped or incorrect attempts unlock more of the intro</li>

              <li>Answer in as few tries as possible and share your score!</li>
            </ul>
          </ModalBody>

          {/* <ModalFooter>
            <button
              className="border-2 border-white bg-transparent"
              onClick={onClose}
            >
              Close
            </button>
            <button>Secondary Action</button>
          </ModalFooter> 
        </ModalContent>
      </Modal> 
    */}
    </>
  );
}

export default Info;
