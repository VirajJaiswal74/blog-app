import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDb } from "./database/db.js";
import { userRoute } from "./routes/user.route.js";
import { postRoute } from "./routes/post.route.js";

const app = express();
const port = process.env.PORT || 4000;
connectDb();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(port, () => {
  console.log(`Server is listen on http://localhost:${port}`);
});
