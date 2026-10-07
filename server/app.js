import express from "express";
import cors from "cors";
import mysteriesRouter from "./routes/mysteries.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173", // للتطوير المحلي
      "https://hamidalhaj.github.io", // GitHub Pages
    ],
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json({ limit: "10kb" }));
app.use("/api/mysteries", mysteriesRouter);
app.get("/", (req, res) => {
  res.json({ message: "Mystery Room API is running." });
});
app.use((req, res) => {
  res.status(404).json({ error: "This API route does not exist." });
});

// Keep JSON parsing failures readable by the client; no custom error framework.
app.use((error, req, res, next) => {
  if (error.type === "entity.parse.failed") {
    return res
      .status(400)
      .json({ error: "Request body must contain valid JSON." });
  }
  if (error.type === "entity.too.large") {
    return res.status(413).json({ error: "Request body is too large." });
  }
  next(error);
});

export default app;