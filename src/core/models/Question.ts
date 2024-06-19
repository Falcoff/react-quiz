export type AnswerType ="A" | "B" | "C" | "D"

export default interface Question {
  question: string;
  answers: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  goodAnswer: AnswerType;
}
