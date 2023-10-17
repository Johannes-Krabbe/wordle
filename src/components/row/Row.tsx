import { useCallback, useEffect, useState } from "react";
import styles from "./Row.module.scss";
import { BoxStatus } from "@/state/GameState";

export default function Row({
  letters,
  boxStatuses,
}: {
  letters: string;
  boxStatuses?: BoxStatus[];
}) {
  return (
    <div className={styles.row}>
      {[...Array(5)].map((_, i) => {
        return (
          <Box
            key={i}
            letter={letters[i]}
            status={boxStatuses ? boxStatuses[i] : undefined}
          />
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
