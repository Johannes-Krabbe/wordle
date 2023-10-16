const fs = require("fs");

// Step 1: Read the content of the text file
fs.readFile("tmp.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Could not read file", err);
    return;
  }

  // Step 2: Split the content into an array of words
  const words = data.split(" "); // assuming words are separated by a space

  // Prepare the content to write in TypeScript format
  const tsContent =
    "export const words: string[] = " + JSON.stringify(words, null, 2) + ";";

  // Step 3: Write the array into a new TypeScript (.ts) file
  fs.writeFile("words.ts", tsContent, (err) => {
    if (err) {
      console.error("Could not write file", err);
      return;
    }
    console.log("File converted to TypeScript array.");
  });
});
