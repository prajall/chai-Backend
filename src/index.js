import dotenv from "dotenv";
import connectDB from "./db/db.js";
import app from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server connected: port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("Database Connection error: ", err);
  });
