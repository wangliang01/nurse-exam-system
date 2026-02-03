"use client";

import { useState, useEffect } from "react";
import QuestionCard from "@/components/exam/QuestionCard";
import AnswerSheet from "@/components/exam/AnswerSheet";
import Timer from "@/components/exam/Timer";
import { Question } from "@/types";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";

// Mock Data
const mockQuestions: Question[] = Array.from({ length: 100 }).map((_, i) => ({
  id: i + 1,
  content: i < 80 ? `Clinical scenario: A patient presents with acute respiratory distress. What is the immediate nursing priority?` : `Which of the following are potential complications of long-term immobility? (Select all that apply)`,
  type: i < 80 ? "SINGLE" : "MULTIPLE",
  options: ["Option Alpha: Detailed clinical response", "Option Beta: Intervention strategy B", "Option Gamma: Emergency protocol C", "Option Delta: Assessment procedure D"],
}));

export default function ExamPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("nurse_exam_progress");
    if (saved) setAnswers(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem("nurse_exam_progress", JSON.stringify(answers));
    }
  }, [answers]);

  const handleAnswerChange = (answer: string) => {
    setAnswers((prev) => ({ ...prev, [mockQuestions[currentIndex].id]: answer }));
  };

  const handleFinish = () => {
    if (confirm("Are you sure you want to submit your exam?")) {
      alert("Submitted successfully!");
      localStorage.removeItem("nurse_exam_progress");
    }
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Premium Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black italic">N</div>
            <div>
              <h1 className="text-lg font-black text-slate-800 tracking-tight uppercase">Nurse Assessment 2026</h1>
              <p className="text-xs font-bold text-slate-400">ID: N20240912 | CANDIDATE: ALEX WANG</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Timer initialSeconds={7200} onTimeUp={handleFinish} />
            <button onClick={handleFinish} className="btn-primary flex items-center gap-2 py-2.5">
              <Send size={18} /> Submit Exam
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-8 py-10 grid grid-cols-12 gap-10">
        {/* Left: Main Content */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <QuestionCard
            question={mockQuestions[currentIndex]}
            selectedAnswer={answers[mockQuestions[currentIndex].id] || ""}
            onAnswerChange={handleAnswerChange}
            index={currentIndex}
          />

          <div className="flex justify-between items-center pt-4">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((p) => p - 1)}
              className="btn-secondary flex items-center gap-2"
            >
              <ChevronLeft size={20} /> Previous
            </button>
            
            <div className="flex gap-2">
               {Array.from({length: 5}).map((_, i) => (
                 <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === currentIndex % 5 ? 'bg-indigo-600' : 'bg-slate-200'}`} />
               ))}
            </div>

            <button
              disabled={currentIndex === mockQuestions.length - 1}
              onClick={() => setCurrentIndex((p) => p + 1)}
              className="btn-primary flex items-center gap-2"
            >
              Next Question <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="hidden lg:block lg:col-span-4">
          <AnswerSheet
            total={mockQuestions.length}
            answers={answers}
            currentIndex={currentIndex}
            onSelect={setCurrentIndex}
          />
        </div>
      </main>
    </div>
  );
}
