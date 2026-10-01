import express from "express";
import mysteriesRouter from "./routes/mysteries.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/api/mysteries", mysteriesRouter);

app.get("/", (req, res) => {
  res.json({ message: "Mystery Room API is running." });
});

app.listen(PORT, () => {
  console.log(`Mystery Room API running at http://localhost:${PORT}`);
});
