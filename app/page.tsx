import Link from "next/link";
import { BookOpen, GraduationCap, ClipboardCheck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">护士岗位技能考核系统</h1>
          <p className="text-lg text-slate-600">专业、严谨、高效的年终考核平台</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 模拟考试卡片 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <GraduationCap size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">正式模拟考试</h2>
            <ul className="text-slate-500 mb-8 space-y-2">
              <li className="flex items-center gap-2">
                <ClipboardCheck size={16} className="text-green-500" /> 100道题目 (80单选 + 20多选)
              </li>
              <li className="flex items-center gap-2">
                <ClipboardCheck size={16} className="text-green-500" /> 限时 120 分钟
              </li>
              <li className="flex items-center gap-2">
                <ClipboardCheck size={16} className="text-green-500" /> 自动保存进度，防止断网
              </li>
            </ul>
            <Link 
              href="/exam" 
              className="block w-full text-center py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
            >
              进入考试
            </Link>
          </div>

          {/* 自由练习卡片 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
              <BookOpen size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">日常自由练习</h2>
            <ul className="text-slate-500 mb-8 space-y-2">
              <li className="flex items-center gap-2">
                <ClipboardCheck size={16} className="text-green-500" /> 即时显示答案与解析
              </li>
              <li className="flex items-center gap-2">
                <ClipboardCheck size={16} className="text-green-500" /> 不限时间，随时退出
              </li>
              <li className="flex items-center gap-2">
                <ClipboardCheck size={16} className="text-green-500" /> 针对性强化多选题练习
              </li>
            </ul>
            <button 
              className="w-full py-4 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 transition-colors"
            >
              开始练习 (开发中)
            </button>
          </div>
        </div>

        <footer className="mt-16 text-center text-slate-400 text-sm">
          &copy; 2026 医院护理部 版权所有 | 技术支持：IT信息科
        </footer>
      </div>
    </div>
  );
}
