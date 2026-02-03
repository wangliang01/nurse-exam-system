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
    <div className="modern-card p-8 bg-white border-slate-200/60 shadow-xl shadow-slate-200/20">
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="font-black text-slate-800 text-xl tracking-tight uppercase">Navigation</h3>
            <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Question Matrix</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-2xl font-black text-indigo-600 leading-none">
              {answeredCount}<span className="text-slate-200 mx-1">/</span>{total}
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Completed</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span>Overall Progress</span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200/50 shadow-inner">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-indigo-700 h-full rounded-full transition-all duration-700 ease-out shadow-sm" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {Array.from({ length: total }).map((_, i) => {
          const isAnswered = !!answers[i + 1];
          const isCurrent = currentIndex === i;

          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`h-12 rounded-xl text-sm font-black transition-all transform active:scale-90 relative ${
                isCurrent
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105 z-10"
                  : isAnswered
                  ? "bg-indigo-50 text-indigo-600 border-2 border-indigo-100 hover:border-indigo-300 hover:bg-indigo-100"
                  : "bg-slate-50 text-slate-400 hover:bg-slate-100 border border-slate-100"
              }`}
            >
              {i + 1}
              {isAnswered && !isCurrent && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-600 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full" />
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="mt-10 pt-8 border-t border-slate-100 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 rounded-full bg-indigo-600 shadow-sm shadow-indigo-200" />
             <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Answered</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 rounded-full bg-slate-200 border border-slate-300" />
             <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending</span>
          </div>
        </div>
        
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
           <div className="flex items-center gap-2 text-indigo-600 mb-1">
             <CheckCircle2 size={16} />
             <span className="text-xs font-black uppercase tracking-widest">Guideline</span>
           </div>
           <p className="text-[10px] font-medium text-slate-500 leading-relaxed">
             Click any number to jump to that question. Questions with a dot in the corner have been answered.
           </p>
        </div>
      </div>
    </div>
  );
}
