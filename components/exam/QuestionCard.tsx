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
    <div className="modern-card p-8 transition-all hover:shadow-md">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-bold text-xl shadow-inner">
          {index + 1}
        </div>
        <div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
            question.type === 'SINGLE' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
          }`}>
            {question.type === "SINGLE" ? "Single Choice" : "Multiple Choice"}
          </span>
          <h2 className="text-xl font-bold text-slate-800 mt-1">
            {question.content}
          </h2>
        </div>
      </div>

      <div className="grid gap-4">
        {question.options.map((option, idx) => {
          const label = options[idx];
          const isSelected = selectedList.includes(label);

          return (
            <button
              key={idx}
              onClick={() => handleToggle(label)}
              className={`group relative flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
                isSelected
                  ? "border-indigo-600 bg-indigo-50/50 shadow-sm"
                  : "border-slate-100 hover:border-indigo-200 hover:bg-white text-slate-700"
              }`}
            >
              <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                isSelected ? "bg-indigo-600 border-indigo-600" : "border-slate-300 group-hover:border-indigo-400"
              }`}>
                {isSelected ? <Check size={14} className="text-white" /> : null}
              </div>
              <div className="flex-1">
                <span className="text-xs font-bold text-slate-400 block mb-0.5">Option {label}</span>
                <span className="font-medium">{option}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
