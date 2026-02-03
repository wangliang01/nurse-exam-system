"use client";

interface AnswerSheetProps {
  total: number;
  answers: Record<number, string>;
  currentIndex: number;
  onSelect: (index: number) => void;
}

export default function AnswerSheet({ total, answers, currentIndex, onSelect }: AnswerSheetProps) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-700">答题卡</h3>
        <span className="text-sm text-slate-500">
          已答: <span className="text-blue-600 font-bold">{Object.keys(answers).length}</span> / {total}
        </span>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 overflow-y-auto max-h-[400px] pr-2">
        {Array.from({ length: total }).map((_, i) => {
          const isAnswered = !!answers[i + 1]; // 假设题目ID或索引从1开始
          const isCurrent = currentIndex === i;

          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`h-10 rounded-md text-sm font-medium transition-all ${
                isCurrent
                  ? "ring-2 ring-blue-500 ring-offset-2"
                  : ""
              } ${
                isAnswered
                  ? "bg-blue-600 text-white"
                  : "bg-slate-50 text-slate-400 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      <div className="mt-6 space-y-2 border-t pt-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="w-3 h-3 bg-blue-600 rounded-sm"></span> 已答
          <span className="w-3 h-3 bg-slate-50 border rounded-sm ml-4"></span> 未答
        </div>
      </div>
    </div>
  );
}
