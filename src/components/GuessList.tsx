export const GuestList = () => {
  const guessArr = Array(6).fill("");

  return (
    <div className="flex w-full flex-col gap-5 ">
      {guessArr.map((guess, i) => (
        <div
          key={i}
          className="h-[40px] w-full rounded-sm border-2 border-gray-800 p-1"
        >
          <p>{guess}</p>
        </div>
      ))}
    </div>
  );
};
