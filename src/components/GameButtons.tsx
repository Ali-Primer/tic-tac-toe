// components/GameControls.tsx
type GameControlsProps = {
    onReset: () => void;
    onAutoMode: () => void;
    autoMode: boolean;
  };
  
  const GameButtons = ({ onReset, onAutoMode, autoMode }: GameControlsProps) => {
    return (
      <div className="mt-6 flex justify-between w-2/3">
          <div
            onClick={onReset}
            className="text-lg text-white rounded px-8 py-2 border cursor-pointer hover:bg-red-600 hover:border-red-600 transition"
          >
            Reset
          </div>
          <div
            onClick={onAutoMode}
            className={`text-lg cursor-pointer text-slate-50 rounded px-8 py-2 transition ${
              autoMode ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {autoMode ? "Auto-Mode On" : "Auto-Mode Off"}
          </div>
        </div>
    );
  };
  
  export default GameButtons;