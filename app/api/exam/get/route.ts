import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // 假设你已配置好 prisma 实例
import { getExamPaper } from "@/lib/exam-logic";

export async function GET() {
  try {
    const questions = await getExamPaper(prisma);
    
    // 安全处理：在考试模式下，返回给前端的数据不应包含正确答案和解析
    const sanitizedQuestions = questions.map((q: any) => {
      const { answer, explanation, ...rest } = q;
      return rest;
    });

    return NextResponse.json(sanitizedQuestions);
  } catch (error) {
    console.error("获取试卷失败:", error);
    return NextResponse.json({ error: "无法生成试卷" }, { status: 500 });
  }
}
