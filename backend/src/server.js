import express from "express";
import path from "path";
import cors from "cors";
import { ENV } from "./lib/env.js";

const app = express();

const __dirname = path.resolve();

const { PORT, CLIENT_URL, NODE_ENV } = ENV;

app.use(cors({ origin: CLIENT_URL, credentials: true }));

if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/{*splat}", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}
app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
