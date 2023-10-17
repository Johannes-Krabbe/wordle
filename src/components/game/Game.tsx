"use client";
import Row from "@/components/row/Row";
import { useInput } from "@/hooks/input";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import styles from "./game.module.scss";
import Keyboard from "../keyboard/Keyboard";
import { useGameStore } from "@/state/GameState";

export default function Game() {
  const { rows, tryedLetters, isDone, isNotWord, setInput, checkCurrentRow } =
    useGameStore();

  const { input, addToInput, clearInput } = useInput({
    onEnter: () => {
      checkCurrentRow();
      clearInput();
    },
  });

  useEffect(() => {
    setInput(input);
  }, [input]);

  return (
    <div>
      {[...Array(6)].map((_, i) => {
        return (
          <Row key={i} letters={rows[i].letters} boxStatuses={rows[i].boxes} />
        );
      })}
      {isNotWord ? (
        <div className={styles.notWord}>Not a word!</div>
      ) : (
        <div className={styles.notWord}></div>
      )}

      <div className={styles.confetti}>
        <Confetti active={isDone} config={confettiConfig} />
      </div>
      <div className={styles.keyboard}>
        <Keyboard letters={tryedLetters} addToInput={addToInput} />
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
