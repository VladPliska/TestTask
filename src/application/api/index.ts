import "reflect-metadata";
require("dotenv").config();
import express, { Response, Request, Router } from "express";
import container from "../../contatiner/container";
import routes from "./routes";
import IDB from "../../interfaces/db";
import TYPES from "../../contatiner/Types";

const app = express();
app.use(express.urlencoded());
app.use(express.json());

const apiRouts = Router();
routes.forEach((RouterFactory) => {
  const { path, router } = RouterFactory(container);
  apiRouts.use(path, router);
});

app.use("/api", apiRouts);

app.use("*", (req: Request, res: Response) => {
  res.status(404).send("NOT FOUND");
});

const apiPort = process.env.PORT || 5000;

app.listen(apiPort, async () => {
  try {
    const db = container.get<IDB>(TYPES.DB);
    await db.connect();
    console.log(`Server start on ${apiPort} port`);
  }catch(err){
    console.log('Server start failed', {cause: err})
    return 0;
  }
});
