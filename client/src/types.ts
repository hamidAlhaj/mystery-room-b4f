export interface Mystery {
  id: number;
  slug: string;
  title: string;
  intro: string;
  totalStages: number;
  currentStage: number;
  solved: boolean;
  locked?: boolean 
  currentHint?: string
  hintsUsed: number;
  hintsRemaining: number;
  reveal: string | null;
  currentQuestion: string;
  currentOptions: string[];
}

export interface AnswerResponse {
  correct: boolean;
  message: string;
  nextStage?: number | null;
}

export interface HintResponse {
  hint: string;
  hintsRemaining: number;
}
