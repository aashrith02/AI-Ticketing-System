import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend working");
});

app.use("/api/auth", authRoutes);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});