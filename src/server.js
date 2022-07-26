import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import { gamesRoutes } from "./routes/gamesRoutes.js";
import { customersRoutes } from "./routes/customersRoutes.js";
dotenv.config();

const server = express();

server.use(cors(), json());

server.use(categoriesRoutes);
server.use(gamesRoutes);
server.use(customersRoutes);

server.listen(process.env.PORT, () => {
  console.log(`The server is runnig on port: ${process.env.PORT}`);
});
