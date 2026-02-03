import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateScore } from "@/lib/exam-logic";

export async function POST(req: Request) {
  try {
    const { userId, userAnswers } = await req.json();

    // 1. 根据提交的答案 ID，获取数据库中的原始题目（包含正确答案）
    const questionIds = Object.keys(userAnswers).map(id => parseInt(id));
    const questions = await prisma.question.findMany({
      where: {
        id: { in: questionIds }
      }
    });

    // 2. 调用核心评分逻辑
    const { totalScore, details } = calculateScore(userAnswers, questions);

    // 3. 保存考试记录到 PostgreSQL
    const record = await prisma.examRecord.create({
      data: {
        userId,
        score: totalScore,
        correctCount: details.filter(d => d.isCorrect).length,
        wrongCount: details.filter(d => !d.isCorrect).length,
        answers: userAnswers as any,
        isFinished: true,
        endTime: new Date(),
        type: "MOCK"
      }
    });

    return NextResponse.json({
      success: true,
      score: totalScore,
      recordId: record.id
    });
  } catch (error) {
    console.error("提交试卷失败:", error);
    return NextResponse.json({ error: "评分失败" }, { status: 500 });
  }
}
