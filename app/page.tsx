import Link from "next/link";
import { GraduationCap, Trophy, History, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full pt-24 pb-20 px-6 text-center bg-gradient-to-b from-indigo-50/50 to-transparent">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
          </span>
          ANNUAL ASSESSMENT 2026 NOW OPEN
        </div>
        <h1 className="text-6xl font-black text-slate-900 mb-6 tracking-tight">
          Excellence in <br />
          <span className="text-indigo-600">Nursing Practice.</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          The comprehensive assessment platform designed to evaluate and enhance 
          clinical competencies for professional nursing staff.
        </p>
      </section>

      {/* Grid Menu */}
      <div className="max-w-6xl w-full px-8 grid md:grid-cols-3 gap-8 -mt-8">
        {/* Main Mock Exam */}
        <div className="md:col-span-2 group modern-card p-1 bg-gradient-to-br from-indigo-500 to-indigo-800 border-none">
          <div className="bg-white rounded-[calc(1rem-1px)] p-8 h-full flex flex-col">
            <div className="flex justify-between items-start mb-12">
              <div className="p-4 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-200">
                <GraduationCap size={32} />
              </div>
              <span className="px-4 py-2 bg-slate-100 rounded-xl text-sm font-bold text-slate-500">120 Minutes</span>
            </div>
            <h2 className="text-3xl font-black text-slate-800 mb-4">Official Mock Examination</h2>
            <p className="text-slate-500 mb-12 flex-1">
              Final year-end assessment covering clinical skills, pharmacology, 
              patient safety, and ethics. Full format: 80 Single + 20 Multiple choice questions.
            </p>
            <Link 
              href="/exam" 
              className="flex items-center justify-center gap-2 w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 hover:-translate-y-1"
            >
              Start Official Exam <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        {/* Secondary Options */}
        <div className="space-y-8 flex flex-col">
          <div className="modern-card p-8 flex-1 group hover:border-indigo-300 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
              <Trophy size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Practice Mode</h3>
            <p className="text-slate-400 text-sm mb-4">Practice questions with instant feedback and explanations.</p>
            <div className="text-indigo-600 font-bold text-sm flex items-center gap-1 group-hover:translate-x-2 transition-transform">
              Launch Lab <ArrowRight size={14} />
            </div>
          </div>

          <div className="modern-card p-8 flex-1 group hover:border-slate-400 transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center mb-6">
              <History size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Results & History</h3>
            <p className="text-slate-400 text-sm mb-4">View your previous attempts, performance analytics and certificates.</p>
            <div className="text-slate-600 font-bold text-sm flex items-center gap-1 group-hover:translate-x-2 transition-transform">
              View Analytics <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-20 py-10 text-slate-400 text-sm font-medium">
        &copy; 2026 GENERAL HOSPITAL NURSING DEPARTMENT
      </footer>
    </div>
  );
}
