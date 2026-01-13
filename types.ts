
export interface AbacusColumnState {
  heaven: boolean;
  earth: number;
}

export interface AbacusState {
  [key: string]: AbacusColumnState;
}

export interface Question {
  q: string;
  ans: number;
  explanation?: string;
}

export enum PracticeCategory {
  DirectSingle = 'direct-single',
  DirectDouble = 'direct-double',
  DirectTriple = 'direct-triple',
  SmallFriends = 'small-friends',
  BigFriends = 'big-friends',
  Family = 'family',
}

export interface AIResponse {
  hint: string;
  cheer: string;
}

export interface UserStats {
  level: number;
  xp: number;
  streak: number;
  bestStreak: number;
  totalCorrect: number;
  totalAttempted: number;
  badges: string[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  requirement: string;
}
