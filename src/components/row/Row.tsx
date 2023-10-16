import { useCallback, useEffect, useState } from "react";
import styles from "./Row.module.scss";

type BoxStatus = "correct" | "semi-correct" | "wrong" | undefined;

export default function Row({
  input,
  correctWord,
  setCorrect,
  correct,
  setSemiCorrect,
  semiCorrect,
  setWrong,
  wrong,
}: {
  input: string;
  correctWord?: string;

  setCorrect: (letter: string[]) => void;
  correct: string[];
  setSemiCorrect: (letter: string[]) => void;
  semiCorrect: string[];
  setWrong: (letter: string[]) => void;
  wrong: string[];
}) {
  const [stati, setStati] = useState<BoxStatus[]>([]);

  const dings = useCallback(() => {
    let tmpCorrectWord = correctWord?.toUpperCase().split("");

    if (tmpCorrectWord) {
      let tmpStati: BoxStatus[] = [];
      let tmpWrongLetters: string[] = [];
      let tmpCorrectLetters: string[] = [];
      let tmpSemiCorrectLetters: string[] = [];
      for (let i = 0; i < 5; i++) {
        let status: BoxStatus = undefined;
        if (correctWord) {
          if (correctWord[i] === input[i]?.toUpperCase()) {
            status = "correct";
            tmpCorrectWord[i] = "0";
            tmpCorrectLetters.push(input[i]?.toUpperCase());
          }
        }
        tmpStati.push(status);
      }
      for (let i = 0; i < 5; i++) {
        let status: BoxStatus = undefined;
        if (correctWord) {
          if (tmpCorrectWord.includes(input[i]?.toUpperCase())) {
            status = "semi-correct";
            tmpCorrectWord[tmpCorrectWord.indexOf(input[i]?.toUpperCase())] =
              "0";
            tmpSemiCorrectLetters.push(input[i]?.toUpperCase());
          } else {
            status = "wrong";
            tmpWrongLetters.push(input[i]?.toUpperCase());
          }
        }
        if (!tmpStati[i]) {
          tmpStati[i] = status;
        }
      }
      setWrong([...wrong, ...tmpWrongLetters]);
      setSemiCorrect([...semiCorrect, ...tmpSemiCorrectLetters]);
      setCorrect([...correct, ...tmpCorrectLetters]);
      setStati(tmpStati);
    }
  }, [correctWord, input, stati]);

  useEffect(() => {
    if (stati.length < 5) {
      if (correctWord && input) {
        dings();
      }
    }
  }, [correctWord, dings]);

  return (
    <div className={styles.row}>
      {[...Array(5)].map((_, i) => {
        return (
          <Box key={i} letter={input[i]?.toUpperCase()} status={stati[i]} />
        );
      })}
    </div>
  );
}

function Box({
  letter,
  status,
}: {
  letter: string | null;
  status?: BoxStatus;
}) {
  let otherStyle;
  if (letter) {
    otherStyle = styles.filled;
  } else {
    otherStyle = styles.empty;
  }

  if (status === "correct") {
    otherStyle = styles.correct;
  } else if (status === "semi-correct") {
    otherStyle = styles.semiCorrect;
  } else if (status === "wrong") {
    otherStyle = styles.wrong;
  }

  return <div className={`${styles.box} ${otherStyle}`}>{letter}</div>;
}
