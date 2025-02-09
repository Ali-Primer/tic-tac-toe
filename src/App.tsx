import { useState } from "react";
import "./App.css";

function App() {
  const startArray: string[] = ["", "", "", "", "", "", "", "", ""];
  const [spots, setSpots] = useState<string[]>(startArray);
  const [isX, setIsX] = useState<boolean>(true);

  const playClickHandler = (index: number) => {
    const newArray = [...spots];
    if (newArray[index] === "") {
      if (isX) {
        newArray[index] = "x";
      } else {
        newArray[index] = "o";
      }
      setSpots(newArray);
      setIsX(!isX);
    }
    console.log(newArray);
  };

  const resetButton = () => {
    setSpots(startArray)
  }

  return (
    <>
      <div className="w-full h-screen bg-slate-800 flex justify-center items-center font-poppins">
        <div className="flex w-1/2 flex-col justify-evenly items-center">
          <p className="text-yellow-300 text-5xl font-dancing">Tic Tac Toe</p>
          <div className="grid h-96 w-96 grid-cols-3 grid-rows-3 gap-4 mt-6">
            {spots.map((value, index) => (
              <div
                key={index}
                onClick={() => playClickHandler(index)}
                className={`${
                  spots[index] === "x"
                    ? "bg-red-600/70 hover:bg-red-600/90"
                    : spots[index]
                    ? "bg-green-600/70 hover:bg-green-600/90"
                    : "bg-white/30 hover:bg-white/60"
                } rounded-md cursor-pointer backdrop-blur-md transition flex justify-center items-center`}
              >
                <p className="text-white text-8xl">{spots[index]}</p>
              </div>
            ))}
            {/* <div className="bg-white/30 h-24 w-24 rounded-md backdrop-blur-md"></div>
              <div className="bg-white/30 h-24 w-24 rounded-md backdrop-blur-md"></div>
              <div className="bg-white/30 h-24 w-24 rounded-md backdrop-blur-md"></div>
              <div className="bg-white/30 h-24 w-24 rounded-md backdrop-blur-md"></div>
              <div className="bg-white/30 h-24 w-24 rounded-md backdrop-blur-md"></div>
              <div className="bg-white/30 h-24 w-24 rounded-md backdrop-blur-md"></div>
              <div className="bg-white/30 h-24 w-24 rounded-md backdrop-blur-md"></div> */}
          </div>
          <div className="mt-6 flex justify-between w-2/3">
            <div onClick={resetButton} className="text-lg text-white rounded px-8 py-2 border cursor-pointer hover:bg-red-600 hover:border-red-600 transition">
              Reset
            </div>
            <div className="text-lg bg-red-600 cursor-pointer text-slate-50 rounded px-8 py-2 hover:bg-green-600 transition">
              Auto-Mode
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default App;
