"use client";

import { Question } from "@/types";
import { Check, Circle } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string;
  onAnswerChange: (answer: string) => void;
  index: number;
}

export default function QuestionCard({ question, selectedAnswer, onAnswerChange, index }: QuestionCardProps) {
  const options = ["A", "B", "C", "D", "E", "F"];
  const selectedList = selectedAnswer ? selectedAnswer.split(",") : [];

  const handleToggle = (label: string) => {
    if (question.type === "SINGLE") {
      onAnswerChange(label);
    } else {
      const newList = selectedList.includes(label)
        ? selectedList.filter((i) => i !== label)
        : [...selectedList, label].sort();
      onAnswerChange(newList.join(","));
    }
  };

  return (
    <div className="modern-card p-10 bg-white border-slate-200/60 shadow-xl shadow-slate-200/30">
      <div className="flex items-start gap-6 mb-12">
        <div className="flex-shrink-0 w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg shadow-indigo-100 ring-4 ring-indigo-50">
          {index + 1}
        </div>
        <div className="flex-1 pt-1">
          <div className="flex items-center gap-3 mb-3">
            <span className={`status-badge ${
              question.type === 'SINGLE' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-purple-50 text-purple-600 border border-purple-100'
            }`}>
              {question.type === "SINGLE" ? "单选题" : "多选题"}
            </span>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">题目编号: Q{question.id.toString().padStart(4, '0')}</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 leading-snug">
            {question.content}
          </h2>
        </div>
      </div>

      <div className="grid gap-5">
        {question.options.map((option, idx) => {
          const label = options[idx];
          const isSelected = selectedList.includes(label);

          return (
            <button
              key={idx}
              onClick={() => handleToggle(label)}
              className={`group relative flex items-center gap-5 p-6 rounded-[1.25rem] border-2 transition-all text-left ${
                isSelected
                  ? "border-indigo-600 bg-indigo-50/30 shadow-md shadow-indigo-100"
                  : "border-slate-100 hover:border-indigo-200 hover:bg-slate-50/50 text-slate-700"
              }`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all duration-300 font-bold text-sm ${
                isSelected 
                  ? "bg-indigo-600 border-indigo-600 text-white scale-110 shadow-lg shadow-indigo-200" 
                  : "border-slate-200 bg-white text-slate-400 group-hover:border-indigo-400 group-hover:text-indigo-600"
              }`}>
                {isSelected ? <Check size={18} strokeWidth={3} /> : label}
              </div>
              <div className="flex-1">
                <span className="font-semibold text-lg leading-relaxed">{option}</span>
              </div>
              
              {isSelected && (
                <div className="absolute right-6 w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
