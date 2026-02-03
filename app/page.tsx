import Link from "next/link";
import { GraduationCap, Trophy, History, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full pt-32 pb-24 px-6 text-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-transparent to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
            </span>
            ANNUAL ASSESSMENT 2026 NOW OPEN
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 tracking-tight leading-[1.1]">
            Elevating <span className="text-indigo-600">Nursing</span> <br />
            Standard of Care.
          </h1>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            The next-generation assessment platform for professional nursing staff. 
            Evaluate clinical competencies with precision and ease.
          </p>
        </div>
      </section>

      {/* Grid Menu */}
      <div className="max-w-6xl w-full px-8 grid md:grid-cols-3 gap-8 -mt-8 relative z-10">
        {/* Main Mock Exam */}
        <div className="md:col-span-2 group modern-card p-1 bg-gradient-to-br from-indigo-500 to-indigo-800 border-none shadow-xl shadow-indigo-100">
          <div className="bg-white rounded-[calc(1rem-1px)] p-10 h-full flex flex-col">
            <div className="flex justify-between items-start mb-16">
              <div className="p-4 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-200 ring-4 ring-indigo-50">
                <GraduationCap size={32} />
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="px-4 py-2 bg-slate-100 rounded-xl text-sm font-bold text-slate-600 border border-slate-200/60">120 Minutes</span>
                <span className="text-xs font-bold text-slate-400">80 Single + 20 Multiple Choice</span>
              </div>
            </div>
            <h2 className="text-4xl font-black text-slate-800 mb-4">Official Mock Examination</h2>
            <p className="text-slate-500 text-lg mb-12 flex-1 leading-relaxed">
              Comprehensive year-end assessment covering clinical skills, pharmacology, 
              patient safety, and ethical practice. Prepare for your professional certification.
            </p>
            <Link 
              href="/exam" 
              className="btn-primary py-5 text-xl flex items-center justify-center gap-3 w-full"
            >
              Enter Examination Room <ArrowRight size={24} />
            </Link>
          </div>
        </div>

        {/* Secondary Options */}
        <div className="space-y-8 flex flex-col">
          <div className="modern-card p-8 flex-1 group modern-card-hover cursor-pointer border-slate-200/60 bg-white">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 border border-emerald-100">
              <Trophy size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Practice Mode</h3>
            <p className="text-slate-400 font-medium mb-6">Interactive practice with instant feedback and detailed clinical rationales.</p>
            <div className="text-indigo-600 font-bold text-sm flex items-center gap-1 group-hover:translate-x-2 transition-transform">
              Start Practice Session <ArrowRight size={16} />
            </div>
          </div>

          <div className="modern-card p-8 flex-1 group modern-card-hover cursor-pointer border-slate-200/60 bg-white">
            <div className="w-14 h-14 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center mb-8 border border-slate-100">
              <History size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Performance</h3>
            <p className="text-slate-400 font-medium mb-6">Analyze your previous attempts, competency mapping, and certificates.</p>
            <div className="text-slate-600 font-bold text-sm flex items-center gap-1 group-hover:translate-x-2 transition-transform">
              Review My History <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-24 py-12 w-full text-center border-t border-slate-100">
        <div className="flex justify-center gap-8 mb-4 text-slate-300">
          <span className="font-bold tracking-widest text-[10px] uppercase">Reliable</span>
          <span className="font-bold tracking-widest text-[10px] uppercase">Secure</span>
          <span className="font-bold tracking-widest text-[10px] uppercase">Professional</span>
        </div>
        <p className="text-slate-400 text-sm font-bold">
          &copy; 2026 GENERAL HOSPITAL NURSING DEPARTMENT
        </p>
      </footer>
    </div>
  );
}
