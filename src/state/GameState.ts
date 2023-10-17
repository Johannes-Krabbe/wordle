import { correctWords } from "@/assets/correctWords";
import wordlist from "@/assets/words";
import { getSeededRandomNumber } from "@/helpers/random";
import { create } from "zustand";

export type BoxStatus = "correct" | "semi-correct" | "wrong" | undefined;

interface RowState {
  letters: string;
  boxes?: BoxStatus[];
}

interface GameState {
  correctWord: string;
  tryedLetters: {
    correct: string[];
    wrong: string[];
    semiCorrect: string[];
  };
  isNotWord: boolean;
  isDone: boolean;
  rows: RowState[];
  currentRowIndex: number;
  setInput: (input: string) => void;
  checkCurrentRow: () => void;
}

export const useGameStore = create<GameState>()((set, get) => ({
  correctWord:
    correctWords[getSeededRandomNumber(correctWords.length)].toUpperCase(),
  tryedLetters: {
    correct: [],
    wrong: [],
    semiCorrect: [],
  },
  isNotWord: false,
  isDone: false,
  rows: [
    { letters: "" },
    { letters: "" },
    { letters: "" },
    { letters: "" },
    { letters: "" },
    { letters: "" },
  ],
  currentRowIndex: 0,
  setInput: (input: string) => {
    const rows = get().rows;
    const index = get().currentRowIndex;
    const row = rows[index];
    if (!row) return;
    set((state) => ({
      ...state,
      rows: rows.map((row, i) =>
        i === index ? { ...row, letters: input.toUpperCase() } : row,
      ),
    }));
  },
  checkCurrentRow: () => {
    set((state) => ({ ...state, isNotWord: false }));
    const rows = get().rows;
    const index = get().currentRowIndex;
    const row = rows[index];
    if (!row) return;
    if (row.letters.length !== 5) return;
    if (wordlist.includes(row.letters.toLowerCase()) === false) {
      set((state) => ({ ...state, isNotWord: true }));
      return;
    }

    const correctWord = get().correctWord;

    let tmpCorrectWord = correctWord?.split("");

    let tmpStati: BoxStatus[] = [];
    let tmpWrongLetters: string[] = [];
    let tmpCorrectLetters: string[] = [];
    let tmpSemiCorrectLetters: string[] = [];
    for (let i = 0; i < 5; i++) {
      let status: BoxStatus = undefined;
      if (correctWord) {
        if (correctWord[i] === row.letters[i]?.toUpperCase()) {
          status = "correct";
          tmpCorrectWord[i] = "0";
          tmpCorrectLetters.push(row.letters[i]?.toUpperCase());
        }
      }
      tmpStati.push(status);
    }
    for (let i = 0; i < 5; i++) {
      let status: BoxStatus = undefined;
      if (correctWord) {
        if (tmpCorrectWord.includes(row.letters[i]?.toUpperCase())) {
          status = "semi-correct";
          tmpCorrectWord[
            tmpCorrectWord.indexOf(row.letters[i]?.toUpperCase())
          ] = "0";
          tmpSemiCorrectLetters.push(row.letters[i]?.toUpperCase());
        } else {
          status = "wrong";
          tmpWrongLetters.push(row.letters[i]?.toUpperCase());
        }
      }
      if (!tmpStati[i]) {
        tmpStati[i] = status;
      }
    }
    set((state) => ({
      ...state,
      rows: rows.map((row, i) =>
        i === index ? { ...row, boxes: tmpStati } : row,
      ),
      tryedLetters: {
        correct: [...state.tryedLetters.correct, ...tmpCorrectLetters],
        wrong: [...state.tryedLetters.wrong, ...tmpWrongLetters],
        semiCorrect: [
          ...state.tryedLetters.semiCorrect,
          ...tmpSemiCorrectLetters,
        ],
      },
      currentRowIndex: index + 1,
      isDone: tmpStati.every((status) => status === "correct"),
    }));
  },
}));
