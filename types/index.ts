export type QuestionType = "SINGLE" | "MULTIPLE";

export interface Question {
  id: number;
  content: string;
  type: QuestionType;
  options: string[]; // 例如 ["选项A", "选项B"...]
  answer?: string;   // 考试模式下通常不传给前端，交卷后才下发
}

export interface ExamStatus {
  currentIndex: number;
  answers: Record<number, string>; // { questionId: "A" } 或 { questionId: "A,B" }
  timeRemaining: number;
  isSubmitting: boolean;
}
