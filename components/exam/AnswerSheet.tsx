"use client";

import { Clock, CheckCircle2 } from "lucide-react";

interface AnswerSheetProps {
  total: number;
  answers: Record<number, string>;
  currentIndex: number;
  onSelect: (index: number) => void;
}

export default function AnswerSheet({ total, answers, currentIndex, onSelect }: AnswerSheetProps) {
  const answeredCount = Object.keys(answers).length;
  const progressPercent = (answeredCount / total) * 100;

  return (
    <div className="modern-card p-6 sticky top-28">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-end">
          <h3 className="font-bold text-slate-800 text-lg">Question Sheet</h3>
          <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
            {answeredCount}/{total}
          </span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-600 h-full transition-all duration-500 ease-out" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: total }).map((_, i) => {
          const isAnswered = !!answers[i + 1];
          const isCurrent = currentIndex === i;

          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`h-11 rounded-xl text-sm font-bold transition-all transform active:scale-90 ${
                isCurrent
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105"
                  : isAnswered
                  ? "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                  : "bg-slate-50 text-slate-400 hover:bg-slate-100 border border-slate-100"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      
      <div className="mt-8 p-4 bg-slate-50 rounded-2xl space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
           <div className="w-2 h-2 rounded-full bg-indigo-600" /> Finished
           <div className="w-2 h-2 rounded-full bg-slate-300 ml-4" /> Pending
        </div>
      </div>
    </div>
  );
}
