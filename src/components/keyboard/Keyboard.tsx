import React from "react";
import styles from "./keyboard.module.scss";

type KeyStyle = "correct" | "semiCorrect" | "wrong" | undefined;

export default function Keyboard({
  letters,
  addToInput,
}: {
  letters: { correct: string[]; semiCorrect: string[]; wrong: string[] };
  addToInput: (text: string) => void;
}) {
  const row1 = "QWERTYUIOP".split("");
  const row2 = "ASDFGHJKL".split("");
  const row3 = "ZXCVBNM".split("");
  return (
    <div>
      <div className={styles.row}>
        {row1.map((l, i) => {
          let style: KeyStyle = undefined;
          if (letters.correct.includes(l)) {
            style = "correct";
          } else if (letters.semiCorrect.includes(l)) {
            style = "semiCorrect";
          } else if (letters.wrong.includes(l)) {
            style = "wrong";
          }
          return (
            <Key key={i} letter={l} style={style} addToInput={addToInput} />
          );
        })}
      </div>
      <div className={styles.row}>
        {row2.map((l, i) => {
          let style: KeyStyle = undefined;
          if (letters.correct.includes(l)) {
            style = "correct";
          } else if (letters.semiCorrect.includes(l)) {
            style = "semiCorrect";
          } else if (letters.wrong.includes(l)) {
            style = "wrong";
          }
          return (
            <Key key={i} letter={l} style={style} addToInput={addToInput} />
          );
        })}
      </div>
      <div className={styles.row}>
        <Key letter={"Enter"} addToInput={addToInput} />
        {row3.map((l, i) => {
          let style: KeyStyle = undefined;
          if (letters.correct.includes(l)) {
            style = "correct";
          } else if (letters.semiCorrect.includes(l)) {
            style = "semiCorrect";
          } else if (letters.wrong.includes(l)) {
            style = "wrong";
          }
          return (
            <Key key={i} letter={l} style={style} addToInput={addToInput} />
          );
        })}

        <Key letter={"Back"} addToInput={addToInput} />
      </div>
    </div>
  );
}

function Key({
  letter,
  style,
  addToInput,
}: {
  letter: string;
  style?: KeyStyle;
  addToInput: (text: string) => void;
}) {
  let keyStyle: string | undefined = undefined;
  switch (style) {
    case "correct":
      keyStyle = styles.correct;
      break;
    case "semiCorrect":
      keyStyle = styles.semiCorrect;
      break;
    case "wrong":
      keyStyle = styles.wrong;
      break;
  }
  const handleClick = () => {
    if (letter === "Back") {
      addToInput("Backspace");
      return;
    }
    addToInput(letter);
  };

  return (
    <div
      className={`${styles.key} ${
        letter.length > 1 ? styles.specialKey : ""
      } ${keyStyle}`}
      onClick={handleClick}
    >
      <span>{letter}</span>
    </div>
  );
}
