import express from "express";
import dotenv from "dotenv";
import router from "./routes/openai-routes";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 8000;

const app = express();

// Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use("/openai", router);

app.listen(port, () => console.log(`Server started on prot ${port}`));
