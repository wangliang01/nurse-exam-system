// lib/exam-logic.ts
import { Question, QuestionType } from "@prisma/client";

/**
 * 核心抽题逻辑：从题库中抽取 80 道单选和 20 道多选
 */
export async function getExamPaper(prisma: any) {
  // 1. 获取 80 道随机单选题
  const singleQuestions = await prisma.$queryRaw`
    SELECT * FROM "Question" 
    WHERE "type" = 'SINGLE' 
    ORDER BY RANDOM() 
    LIMIT 80
  `;

  // 2. 获取 20 道随机多选题
  const multipleQuestions = await prisma.$queryRaw`
    SELECT * FROM "Question" 
    WHERE "type" = 'MULTIPLE' 
    ORDER BY RANDOM() 
    LIMIT 20
  `;

  // 3. 合并并返回
  const allQuestions = [...(singleQuestions as any[]), ...(multipleQuestions as any[])];
  
  // 打乱顺序 (Fisher-Yates)
  for (let i = allQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
  }

  return allQuestions;
}

/**
 * 核心评分逻辑
 * @param userAnswers 用户答案对象 { "1": "A", "2": "A,B" }
 * @param questions 数据库中的标准答案列表
 */
export function calculateScore(userAnswers: Record<string, string>, questions: Question[]) {
  let score = 0;
  const results = questions.map((q) => {
    const uAnswer = userAnswers[q.id.toString()];
    
    // 多选题逻辑：完全匹配（排序后的字符串一致）
    // 前端提交时需确保多选答案按字母顺序排序，例如 "A,B" 而非 "B,A"
    const isCorrect = uAnswer === q.answer;
    
    if (isCorrect) {
      score += 1;
    }

    return {
      id: q.id,
      isCorrect,
      correctAnswer: q.answer,
      userAnswer: uAnswer
    };
  });

  return { totalScore: score, details: results };
}
