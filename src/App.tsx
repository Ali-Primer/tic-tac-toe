import { useState, useEffect } from "react";
import "./App.css";
import WinnerNotif from "./components/WinnerNotif";
import GameButtons from "./components/GameButtons";
import Square from "./components/Square";

function App() {
  const startArray: string[] = ["", "", "", "", "", "", "", "", ""];
  const [spots, setSpots] = useState<string[]>(startArray);
  const [isX, setIsX] = useState<boolean>(true);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>("");
  const [showWinner, setShowWinner] = useState<boolean>(false);
  const [winSpots, setWinSpots] = useState<number[] | null>(null);
  const [autoMode, setAutoMode] = useState<boolean>(false);

  const winnerHandler = (): void => {
    const winCombination: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    //ایجاد حلقه در برای بررسی حالات برد و مقایسه با انتخاب شده ها
    for (const [a, b, c] of winCombination) {
      if (spots[a] !== "" && spots[b] === spots[a] && spots[a] === spots[c]) {
        setWinSpots([a, b, c]);
        setWinner(spots[a]);
        setIsFinished(true);
        setShowWinner(true);
        return;
      }
    }
    // برای مساوری کردن بازی
    if (!spots.includes("")) {
      setIsFinished(true);
      setShowWinner(true);
      setWinner("draw");
    }
  };

  useEffect(() => {
    winnerHandler();
  }, [spots]);

  useEffect(() => {
    if (!isX && autoMode && !isFinished) {
      setTimeout(() => {
        // به وجود آردن ایندکس آرایه ای از خالی ها
        const emptyIndices: number[] = spots
          .map((val, index) => (val === "" ? index : -1))
          .filter((val) => val !== -1);
        if (emptyIndices.length > 0) {
          const randomIndex =
            emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          playClickHandler(randomIndex);
        }
      }, 500);
    }
  }, [isX, autoMode, spots, isFinished]);

  // از نقاط باقی مانده، نقطه مورد نظر رو برای کاربر در نظر میگیره
  const playClickHandler = (index: number): void => {
    if (!isFinished && spots[index] === "") {
      const newArray = [...spots];
      newArray[index] = isX ? "x" : "o";
      setSpots(newArray);
      setIsX(!isX);
    }
  };
  // بازی به طور کامل از اول شروع میشه
  const resetButton = (): void => {
    setSpots(startArray);
    setWinner("");
    setIsFinished(false);
    setShowWinner(false);
    setIsX(true);
    setWinSpots(null);
  };

  return (
    <div className="w-full h-screen bg-slate-800 flex justify-center items-center font-poppins">
      <WinnerNotif show={showWinner} winner={winner} />
      <div className="flex w-1/2 flex-col justify-evenly items-center">
        <p className="text-yellow-300 text-5xl font-dancing">Tic Tac Toe</p>
        <div className="grid h-96 w-96 grid-cols-3 grid-rows-3 gap-4 mt-6">
          {spots.map((value, index) => (
            <Square
              key={index}
              index={index}
              value={value}
              winSpots={winSpots}
              playClickHandler={() => playClickHandler(index)}
            />
          ))}
        </div>

        <GameButtons
          onReset={resetButton}
          onAutoMode={() => setAutoMode(!autoMode)}
          autoMode={autoMode}
        />
      </div>
    </div>
  );
}

export default App;
