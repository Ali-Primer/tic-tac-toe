interface Square {
  index: number;
  value: string;
  winSpots: number[] | null;
  playClickHandler: () => void;
}

const Square = ({ index, value, winSpots, playClickHandler }: Square) => {
  return (
    <>
      <div
        key={index}
        onClick={playClickHandler}
        className={`${
          value === "x"
            ? "bg-red-600/70 hover:bg-red-600/90"
            : value === "o"
            ? "bg-green-600/70 hover:bg-green-600/90"
            : "bg-white/30 hover:bg-white/60"
        } ${
          winSpots && winSpots.includes(index) ? "bg-yellow-400" : ""
        } rounded-md cursor-pointer backdrop-blur-md transition flex justify-center items-center`}
      >
        <p className="text-white text-8xl">{value}</p>
      </div>
    </>
  );
};

export default Square;
