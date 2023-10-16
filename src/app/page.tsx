"use client";
import Game from "@/components/game/Game";
import styles from "./page.module.scss";

import { Stint_Ultra_Condensed } from "next/font/google";
const headderFont = Stint_Ultra_Condensed({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>
      <div className={styles.headder}>
        <h1 className={headderFont.className}>Wordle</h1>
      </div>
      <div className={styles.game}>
        <Game />
      </div>
    </div>
  );
}
