import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend working");
});

app.post("/api/auth/register", async (req, res) => {
  try {
    console.log(req.body);

    res.status(201).json({
      message: "User registered",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

app.listen(8000, () => {
  console.log("Server running on port 5000");
});