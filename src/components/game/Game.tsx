"use client";
import Row from "@/components/row/Row";
import { useInput } from "@/hooks/input";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import styles from "./game.module.scss";
import Keyboard from "../keyboard/Keyboard";
import wordlist from "@/assets/words";

export default function Game() {
  const [inputs, setInputs] = useState<string[]>([]);
  const [currentRow, setCurrentRow] = useState<number>(0);

  const [correctWord, setCorrectWord] = useState<string>(
    //wordlist[Math.floor(Math.random() * wordlist.length)].toUpperCase(),
    "AYYYY",
  );

  const [isDone, setIsDone] = useState(false);

  const [correct, setCorrect] = useState<string[]>([]);
  const [semiCorrect, setSemiCorrect] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string[]>([]);

  const { input, clearInput, addToInput } = useInput({
    onEnter: () => {
      if (input.length < 5) return;
      setInputs([...inputs, input]);
      currentRow < 6 && setCurrentRow(currentRow + 1);
      if (input.toUpperCase() === correctWord) {
        setIsDone(true);
      }
      clearInput();
    },
    maxLength: 5,
    done: isDone,
  });

  useEffect(() => {
    console.log("CORRECT_WORD:" + correctWord);
  }, []);

  return (
    <div>
      {[...Array(6)].map((_, i) => {
        if (i === currentRow) {
          return (
            <Row
              key={i}
              input={input}
              setCorrect={setCorrect}
              correct={correct}
              setSemiCorrect={setSemiCorrect}
              semiCorrect={semiCorrect}
              setWrong={setWrong}
              wrong={wrong}
            />
          );
        }
        if (i < currentRow) {
          return (
            <Row
              key={i}
              input={inputs[i]}
              correctWord={correctWord}
              setCorrect={setCorrect}
              correct={correct}
              setSemiCorrect={setSemiCorrect}
              semiCorrect={semiCorrect}
              setWrong={setWrong}
              wrong={wrong}
            />
          );
        } else {
          return (
            <Row
              key={i}
              input={""}
              setCorrect={setCorrect}
              correct={correct}
              setSemiCorrect={setSemiCorrect}
              semiCorrect={semiCorrect}
              setWrong={setWrong}
              wrong={wrong}
            />
          );
        }
      })}

      <div className={styles.confetti}>
        <Confetti active={isDone} config={confettiConfig} />
      </div>
      <div className={styles.keyboard}>
        <Keyboard
          letters={{ correct, semiCorrect, wrong }}
          addToInput={addToInput}
        />
      </div>
    </div>
  );
}

const confettiConfig = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 2000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};
