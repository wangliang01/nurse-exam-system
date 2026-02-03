"use client";

import { useState, useEffect } from "react";
import QuestionCard from "@/components/exam/QuestionCard";
import AnswerSheet from "@/components/exam/AnswerSheet";
import Timer from "@/components/exam/Timer";
import { Question } from "@/types";
import { ChevronLeft, ChevronRight, Send, History as HistoryIcon } from "lucide-react";

// Mock Data
const mockQuestions: Question[] = Array.from({ length: 100 }).map((_, i) => ({
  id: i + 1,
  content: i < 80 ? `临床场景：一位病人出现急性呼吸窘迫。此时的首要护理措施是什么？` : `以下哪些是长期卧床病人可能出现的并发症？（多选题）`,
  type: i < 80 ? "SINGLE" : "MULTIPLE",
  options: ["选项 A: 详细的临床响应描述", "选项 B: 干预策略 B 的实施", "选项 C: 启动紧急处置协议 C", "选项 D: 执行评估程序 D"],
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
    if (confirm("确定要提交试卷吗？提交后将无法修改。")) {
      alert("提交成功！");
      localStorage.removeItem("nurse_exam_progress");
      window.location.href = "/";
    }
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Premium Header */}
      <header className="glass-header shadow-sm">
        <div className="max-w-[1440px] mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl italic shadow-lg shadow-indigo-100 ring-4 ring-indigo-50">N</div>
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight leading-none mb-1">2026年度护理岗位考核</h1>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded tracking-widest uppercase">正式考试</span>
                <p className="text-xs font-bold text-indigo-600/60 uppercase tracking-tighter">考生：王力 (工号: N20240912)</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <Timer initialSeconds={7200} onTimeUp={handleFinish} />
            <div className="h-8 w-px bg-slate-200" />
            <button onClick={handleFinish} className="btn-primary flex items-center gap-2 py-3 px-8 text-sm">
              <Send size={18} /> 结束并交卷
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-8 py-12 grid grid-cols-12 gap-12">
        {/* Left: Main Content */}
        <div className="col-span-12 lg:col-span-8 space-y-10">
          <div className="relative">
            <QuestionCard
              question={mockQuestions[currentIndex]}
              selectedAnswer={answers[mockQuestions[currentIndex].id] || ""}
              onAnswerChange={handleAnswerChange}
              index={currentIndex}
            />
          </div>

          <div className="flex justify-between items-center py-6 border-t border-slate-200/60">
            <button
              disabled={currentIndex === 0}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setCurrentIndex((p) => p - 1);
              }}
              className="btn-secondary flex items-center gap-2 px-8"
            >
              <ChevronLeft size={20} /> 上一题
            </button>
            
            <div className="flex items-center gap-3">
               <span className="text-sm font-black text-slate-400 mr-2 uppercase tracking-widest">答题进度</span>
               <div className="flex gap-2.5">
                  {Array.from({length: 5}).map((_, i) => (
                    <div key={i} className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentIndex % 5 ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-200'
                    }`} />
                  ))}
               </div>
            </div>

            <button
              disabled={currentIndex === mockQuestions.length - 1}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setCurrentIndex((p) => p + 1);
              }}
              className="btn-primary flex items-center gap-2 px-10"
            >
              下一题 <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="hidden lg:block lg:col-span-4">
          <div className="sticky top-28">
            <AnswerSheet
              total={mockQuestions.length}
              answers={answers}
              currentIndex={currentIndex}
              onSelect={(idx) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setCurrentIndex(idx);
              }}
            />
            
            <div className="mt-8 p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex items-start gap-4">
               <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                 <HistoryIcon size={20} />
               </div>
               <div>
                 <h4 className="text-sm font-bold text-indigo-900 mb-1">系统实时存盘</h4>
                 <p className="text-xs font-medium text-indigo-600/70 leading-relaxed">
                   您的答题进度已实时保存。即使意外关闭浏览器，重新打开后仍可继续答题。
                 </p>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
