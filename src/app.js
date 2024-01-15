import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

export default app;

app.use(cors({ origin: process.CORS }));
app.use(cookieParser());
app.use(express.static("public"));

// ROUTER IMPORT

import userRouter from "./routes/user.routes.js";

app.use("/api/users", userRouter);
