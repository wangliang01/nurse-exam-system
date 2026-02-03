"use client";

import { Question } from "@/types";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: string;
  onAnswerChange: (answer: string) => void;
  index: number;
}

export default function QuestionCard({ question, selectedAnswer, onAnswerChange, index }: QuestionCardProps) {
  const options = ["A", "B", "C", "D", "E", "F"]; // 支持最多F个选项
  const selectedList = selectedAnswer ? selectedAnswer.split(",") : [];

  const handleToggle = (label: string) => {
    if (question.type === "SINGLE") {
      onAnswerChange(label);
    } else {
      // 多选逻辑
      const newList = selectedList.includes(label)
        ? selectedList.filter((i) => i !== label)
        : [...selectedList, label].sort();
      onAnswerChange(newList.join(","));
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="flex items-start gap-3 mb-6">
        <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
          {index + 1}
        </span>
        <div>
          <span className="inline-block px-2 py-0.5 mb-2 text-xs font-medium rounded bg-slate-100 text-slate-600">
            {question.type === "SINGLE" ? "单选题" : "多选题 (20分)"}
          </span>
          <h2 className="text-lg font-semibold text-slate-800 leading-relaxed">
            {question.content}
          </h2>
        </div>
      </div>

      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const label = options[idx];
          const isSelected = selectedList.includes(label);

          return (
            <button
              key={idx}
              onClick={() => handleToggle(label)}
              className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all text-left ${
                isSelected
                  ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                  : "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700"
              }`}
            >
              <span className={`flex-shrink-0 w-6 h-6 rounded-md border flex items-center justify-center text-sm font-medium ${
                isSelected ? "bg-blue-500 border-blue-500 text-white" : "border-slate-300 text-slate-400"
              }`}>
                {label}
              </span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
