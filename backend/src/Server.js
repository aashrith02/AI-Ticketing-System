import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import queueRoutes from "./routes/queueRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend working");
});

app.use("/api/auth", authRoutes);
app.use("/api/queues", queueRoutes);
app.use("/api/tickets", ticketRoutes);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});