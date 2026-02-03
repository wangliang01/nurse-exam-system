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
            2026年度 护士岗位技能考核已开启
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 tracking-tight leading-[1.1]">
            提升<span className="text-indigo-600">护理</span>专业标准 <br />
            守护生命健康
          </h1>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            专为临床护理人员设计的全方位评估平台。
            以专业、严谨、精准的方式评价临床核心胜任力。
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
                <span className="px-4 py-2 bg-slate-100 rounded-xl text-sm font-bold text-slate-600 border border-slate-200/60">120 分钟</span>
                <span className="text-xs font-bold text-slate-400">80题单选 + 20题多选</span>
              </div>
            </div>
            <h2 className="text-4xl font-black text-slate-800 mb-4">官方模拟考试</h2>
            <p className="text-slate-500 text-lg mb-12 flex-1 leading-relaxed">
              涵盖临床技能、药理学、病人安全及伦理准则的综合性年终考核。
              完整还原真实考场环境，助力专业认证。
            </p>
            <Link 
              href="/exam" 
              className="btn-primary py-5 text-xl flex items-center justify-center gap-3 w-full"
            >
              进入考场 <ArrowRight size={24} />
            </Link>
          </div>
        </div>

        {/* Secondary Options */}
        <div className="space-y-8 flex flex-col">
          <div className="modern-card p-8 flex-1 group modern-card-hover cursor-pointer border-slate-200/60 bg-white">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 border border-emerald-100">
              <Trophy size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">练习模式</h3>
            <p className="text-slate-400 font-medium mb-6">交互式练习，提供即时反馈及详细的临床案例解析。</p>
            <div className="text-indigo-600 font-bold text-sm flex items-center gap-1 group-hover:translate-x-2 transition-transform">
              开始练习 <ArrowRight size={16} />
            </div>
          </div>

          <div className="modern-card p-8 flex-1 group modern-card-hover cursor-pointer border-slate-200/60 bg-white">
            <div className="w-14 h-14 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center mb-8 border border-slate-100">
              <History size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">成绩与记录</h3>
            <p className="text-slate-400 font-medium mb-6">分析既往尝试记录、能力图谱映射及下载电子证书。</p>
            <div className="text-slate-600 font-bold text-sm flex items-center gap-1 group-hover:translate-x-2 transition-transform">
              查看我的历史 <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-24 py-12 w-full text-center border-t border-slate-100">
        <div className="flex justify-center gap-8 mb-4 text-slate-300">
          <span className="font-bold tracking-widest text-[10px] uppercase">严谨</span>
          <span className="font-bold tracking-widest text-[10px] uppercase">安全</span>
          <span className="font-bold tracking-widest text-[10px] uppercase">专业</span>
        </div>
        <p className="text-slate-400 text-sm font-bold">
          &copy; 2026 中心医院护理部 版权所有
        </p>
      </footer>
    </div>
  );
}
