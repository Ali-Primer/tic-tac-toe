interface WinnerNotif {
  winner: string;
  show: boolean;
}

const WinnerNotif = ({ winner, show }: WinnerNotif) => {
  return (
    <>
      <div
        className={`bg-white/70 absolute top-2 h-10 w-1/6 flex justify-center items-center rounded p-1 transition cursor-default hover:bg-white  ${
          show ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="p-1 h-full w-full flex justify-center items-center">
          <p className="flex items-center justify-center gap-2 text-lg">
            <span
              className={`${
                winner === "x"
                  ? "text-red-600"
                  : winner === "o"
                  ? "text-green-600"
                  : "text-amber-400"
              } text-2xl`}
            >
              {winner}
            </span>{" "}
            {winner !== "draw" && "is winner!"}
          </p>
        </div>
      </div>
    </>
  );
};

export default WinnerNotif;
