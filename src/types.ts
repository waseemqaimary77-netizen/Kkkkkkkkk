export type Color = 'blue' | 'green' | 'orange' | 'sky';

export interface Rule {
  from: string[];
  to: string;
  conditions: string[];
}

export interface LessonType {
  title: string;
  from: string[];
  to: string;
  example: string;
}

export interface AnalysisExample {
  word: string;
  original: string;
  evidence: string;
  reason: string;
}

export interface WeightExample {
  word: string;
  original: string;
  weight: string;
}

export interface OriginExample {
  word: string;
  answer: string;
  evidence: string;
}

export interface AgentExample {
  verb: string;
  agent: string;
  original: string;
}

export type Group =
  | { title: string; intro?: string; kind: 'analysis'; examples: AnalysisExample[] }
  | { title: string; intro?: string; kind: 'weight'; examples: WeightExample[] }
  | { title: string; intro?: string; kind: 'origin'; examples: OriginExample[] }
  | { title: string; intro?: string; kind: 'agent'; examples: AgentExample[]; analysis?: string };

export interface Lesson {
  id: string;
  title: string;
  short: string;
  color: Color;
  icon: string;
  definition: string;
  explanation: string[];
  rule: Rule | null;
  types?: LessonType[];
  steps: string[];
  groups: Group[];
  notes: string[];
  summary: string[];
}

export interface Question {
  id: string;
  topic?: string;
  text: string;
  options: string[];
  answer: number;
  explanation: string;
}

/** سؤال جاهز للعرض بعد خلط الخيارات */
export interface QuizItem {
  id: string;
  topic?: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Attempt {
  id: string;
  date: string;
  score: number;
  total: number;
}

export interface Store {
  /** معرّفات الأسئلة التي ظهرت في الدورة الحالية */
  seen: string[];
  cycle: number;
  attempts: Attempt[];
  visited: string[];
}
