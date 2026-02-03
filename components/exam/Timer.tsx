"use client";

import { useEffect, useState } from "react";
import { Timer as TimerIcon } from "lucide-react";

interface TimerProps {
  initialSeconds: number;
  onTimeUp: () => void;
}

export default function Timer({ initialSeconds, onTimeUp }: TimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onTimeUp]);

  const formatTime = (s: number) => {
    const hours = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return `${hours > 0 ? hours + ':' : ''}${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const isLowTime = seconds < 300;

  return (
    <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-mono shadow-sm transition-all duration-300 border ${
      isLowTime 
        ? "bg-red-50 text-red-600 border-red-100 animate-pulse shadow-red-100" 
        : "bg-slate-50 text-slate-700 border-slate-100"
    }`}>
      <div className={`${isLowTime ? 'text-red-500' : 'text-indigo-600'}`}>
        <TimerIcon size={22} strokeWidth={2.5} />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] leading-none mb-0.5 text-slate-400">剩余时间</span>
        <span className="text-xl font-black tabular-nums leading-none">{formatTime(seconds)}</span>
      </div>
    </div>
  );
}
