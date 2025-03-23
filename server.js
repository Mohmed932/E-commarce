import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./config/db.js";
import { routes } from "./routes/route.js";
import { config } from "dotenv";

config();

const port = process.env.PORT;
const domain = process.env.DOMAIN;
const url = process.env.MONGODB_URL;

if (!port || !domain || !url) {
  console.error("Missing environment variables.");
  process.exit(1);
}

const server = express();
server.use(express.json());
server.use(cookieParser());

const corsOptions = {
  origin: domain,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

server.use(cors(corsOptions));

routes(server);

server.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Error handling middleware
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

server.listen(port, () => {
  console.log(`Server is running on ${domain}:${port}`);
  dbConnection(url);
});
