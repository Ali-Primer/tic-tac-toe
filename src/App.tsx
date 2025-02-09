import { useState, useEffect } from "react";
import "./App.css";
import WinnerNotif from "./components/WinnerNotif";

function App() {
  const startArray: string[] = ["", "", "", "", "", "", "", "", ""];
  const [spots, setSpots] = useState<string[]>(startArray);
  const [isX, setIsX] = useState<boolean>(true);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>("");
  const [showWinner, setShowWinner] = useState<boolean>(false);
  const [winSpots, setWinSpots] = useState<number[] | null>();

  const winnerHandler = () => {
    const winCombination = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of winCombination) {
      if (spots[a] !== "" && spots[b] === spots[a] && spots[a] === spots[c]) {
        const winArrays = [a, b, c];
        setWinSpots(winArrays);
        setWinner(spots[a]);
        setIsFinished(true);
        setShowWinner(true);
        return;
      }
    }

    if (!spots.includes("")) {
      setIsFinished(true);
      setShowWinner(true);
      setWinner("draw");
    }
  };

  useEffect(() => {
    winnerHandler();
  }, [spots]);

  const playClickHandler = (index: number) => {
    if (!isFinished) {
      const newArray = [...spots];
      if (newArray[index] === "") {
        newArray[index] = isX ? "x" : "o";
        setSpots(newArray);
        setIsX(!isX);
      }
    }
  };

  const resetButton = () => {
    setSpots(startArray);
    setWinner("");
    setIsFinished(false);
    setShowWinner(false);
    setIsX(true);
    setWinSpots(null);
  };

  return (
    <>
      <div className="w-full h-screen bg-slate-800 flex justify-center items-center font-poppins">
        {/* winner notification */}
        <WinnerNotif show={showWinner} winner={winner} />

        <div className="flex w-1/2 flex-col justify-evenly items-center">
          <p className="text-yellow-300 text-5xl font-dancing">Tic Tac Toe</p>
          <div className="grid h-96 w-96 grid-cols-3 grid-rows-3 gap-4 mt-6">
            {spots.map((value, index) => (
              <div
                key={index}
                onClick={() => playClickHandler(index)}
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
            ))}
          </div>
          <div className="mt-6 flex justify-between w-2/3">
            <div
              onClick={resetButton}
              className="text-lg text-white rounded px-8 py-2 border cursor-pointer hover:bg-red-600 hover:border-red-600 transition"
            >
              Reset
            </div>
            <div className="text-lg bg-red-600 cursor-pointer text-slate-50 rounded px-8 py-2 hover:bg-green-600 transition">
              Auto-Mode
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
