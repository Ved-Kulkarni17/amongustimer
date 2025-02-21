import { useState, useEffect } from "react";

export default function App() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    setTimeLeft(minutes * 60 + seconds);
    setIsRunning(true);
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60).toString().padStart(2, "0");
    const secs = (time % 60).toString().padStart(2, "0");
    return { mins, secs };
  };

  const { mins, secs } = formatTime(timeLeft);

  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{ backgroundImage: "url('src/assets/bg.png')" }}
    >
      <div className="flex items-center space-x-3 mb-8">
        <span className="text-6xl font-[Impostograph] text-white">{mins}</span>
        <span className="text-6xl font-[Impostograph] text-white">:</span>
        <span className="text-6xl font-[Impostograph] text-white">{secs}</span>
      </div>

      {!isRunning && (
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Minutes"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="w-24 text-center rounded p-2 bg-white"
          />
          <input
            type="number"
            placeholder="Seconds"
            value={seconds}
            onChange={(e) => setSeconds(Number(e.target.value))}
            className="w-24 text-center rounded p-2 bg-white"
          />
          <button
            onClick={startTimer}
            className="bg-red-500 hover:bg-red-600 text-white rounded p-2 transition"
          >
            Start
          </button>
        </div>
      )}
    </div>
  );
}
