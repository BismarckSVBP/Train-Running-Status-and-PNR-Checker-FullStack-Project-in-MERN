
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import data from "./routes/route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Define allowed origins dynamically
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://train-tracker-frontend.vercel.app", // Replace with actual production domain
  /\.vercel\.app$/ // Allows all Vercel preview deployments
];

// CORS configuration with credentials support
app.use(
  cors({
    origin: function (origin, callback) {
      console.log("CORS Request from:", origin);

      if (!origin || allowedOrigins.some((domain) => origin.match(domain))) {
        callback(null, true);
      } else {
        console.error("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

app.use(express.json()); // Allows parsing of incoming requests: req.body
app.use("/", data);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
;
});