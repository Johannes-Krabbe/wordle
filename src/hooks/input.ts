import { useEffect, useState } from "react";

export const useInput = (options: {
  onEnter?: () => any;
  onFirstInput?: () => any;
  maxLength?: number;
  done?: boolean;
}) => {
  const [input, setInput] = useState<string>("");

  const handleKeyDown = (event: any) => {
    if (!document.hasFocus()) {
      return;
    }

    if (event.key === "Backspace") {
      setInput(input.slice(0, -1));
    } else if (event.key === "Enter") {
      if (options.onEnter) {
        options.onEnter();
      }
    } else if (event.key.length === 1) {
      // This check is to ensure that only printable characters are added
      if (!(event.key === " " && input.at(-1) == " ")) {
        if (input === "") {
          if (options.onFirstInput) {
            options.onFirstInput();
          }
        }
        if (!options.maxLength || input.length < options.maxLength) {
          if (!options.done) {
            if (event.key.match(/^[a-z]$/i)) {
              setInput(input + event.key);
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const clearInput = () => {
    setInput("");
  };

  return {
    input,
    clearInput,
    addToInput: (text: string) => {
      handleKeyDown({ key: text });
    },
  };
};
