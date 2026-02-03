"use client";

import { useState, useEffect } from "react";
import QuestionCard from "@/components/exam/QuestionCard";
import AnswerSheet from "@/components/exam/AnswerSheet";
import Timer from "@/components/exam/Timer";
import { Question } from "@/types";

// 模拟题目数据（实际应从 API 获取）
const mockQuestions: Question[] = Array.from({ length: 100 }).map((_, i) => ({
  id: i + 1,
  content: i < 80 ? `这是第 ${i + 1} 道单项选择题的题干内容？` : `这是第 ${i + 1} 道多项选择题的题干内容（选出所有正确项）？`,
  type: i < 80 ? "SINGLE" : "MULTIPLE",
  options: ["选项 A 的详细描述内容", "选项 B 的详细描述内容", "选项 C 的详细描述内容", "选项 D 的详细描述内容"],
}));

export default function ExamPage() {
  const [mockQuestions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 初始化：获取题目并尝试从 LocalStorage 恢复进度
  useEffect(() => {
    async function initExam() {
      try {
        const res = await fetch("/api/exam/get");
        const data = await res.json();
        setQuestions(data);
        
        const saved = localStorage.getItem("nurse_exam_progress");
        if (saved) {
          setAnswers(JSON.parse(saved));
        }
      } catch (err) {
        alert("题目加载失败，请检查网络");
      } finally {
        setIsLoading(false);
        setIsMounted(true);
      }
    }
    initExam();
  }, []);

  // ... 之前的自动保存 useEffect 保持不变 ...

  const handleFinish = async () => {
    if (confirm("确定要交卷吗？交卷后将无法修改。")) {
      try {
        const res = await fetch("/api/api/exam/submit", {
          method: "POST",
          body: JSON.stringify({
            userId: "current-user-id", // 实际应从 Session 获取
            userAnswers: answers
          })
        });
        const result = await res.json();
        if (result.success) {
          alert(`提交成功！你的得分是：${result.score}`);
          localStorage.removeItem("nurse_exam_progress");
          window.location.href = "/dashboard"; // 跳转到成绩单页
        }
      } catch (err) {
        alert("提交失败，请联系管理员");
      }
    }
  };

  if (!isMounted || isLoading) return <div className="flex items-center justify-center h-screen">试卷加载中...</div>;
  if (mockQuestions.length === 0) return <div>暂无题目数据</div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-slate-800">2026年护士年终岗位技能考核</h1>
            <p className="text-sm text-slate-500">姓名：张三 | 工号：N2024001</p>
          </div>
          <div className="flex items-center gap-6">
            <Timer initialSeconds={7200} onTimeUp={handleFinish} />
            <button
              onClick={handleFinish}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              立即交卷
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 左侧题目区 */}
        <div className="lg:col-span-3 space-y-6">
          <QuestionCard
            question={mockQuestions[currentIndex]}
            selectedAnswer={answers[mockQuestions[currentIndex].id] || ""}
            onAnswerChange={handleAnswerChange}
            index={currentIndex}
          />

          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((p) => p - 1)}
              className="px-6 py-2 text-slate-600 font-medium disabled:opacity-30"
            >
              上一题
            </button>
            <span className="text-slate-400 font-medium">
              题目进度: {currentIndex + 1} / 100
            </span>
            <button
              disabled={currentIndex === mockQuestions.length - 1}
              onClick={() => setCurrentIndex((p) => p + 1)}
              className="px-6 py-2 bg-slate-800 text-white rounded-lg font-medium disabled:opacity-30"
            >
              下一题
            </button>
          </div>
        </div>

        {/* 右侧答题卡区 */}
        <div className="lg:col-span-1">
          <div className="sticky top-28">
            <AnswerSheet
              total={mockQuestions.length}
              answers={answers}
              currentIndex={currentIndex}
              onSelect={setCurrentIndex}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
