import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Polyfill for `__dirname`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getTrainDetails = (train_no) => {
  try {
    // Correct path to access the JSON file inside the "public" folder
    const filePath = path.join(__dirname, "../public/trains.json");

    // Read the JSON file
    const data = fs.readFileSync(filePath, "utf8");
    const trains = JSON.parse(data);

    // Check if the train number exists
    if (trains[train_no]) {
      return trains[train_no];
    } else {
      return { error: "Train not found" };
    }
  } catch (error) {
    return { error: "Error reading JSON file", details: error.message };
  }
};
