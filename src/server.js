import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bunyan from "bunyan";
import compression from "compression";
import helmet from "helmet";
import * as sapper from "@sapper/server";

dotenv.config();
const { NODE_ENV } = process.env;
const dev = NODE_ENV === "development";
const port = process.env.PORT || 3000;
const log = bunyan.createLogger({
  name: "main",
  streams: [
    {
      level: "info",
      stream: process.stdout,
    },
    {
      level: "error",
      path: "/var/tmp/okno-error.log",
    },
  ],
});

express()
  .use(express.json())
  .use(cors())
  .use(
    helmet({
      contentSecurityPolicy: false,
    })
  )
  .use(compression())
  .use(function (err, req, res, next) {
    log.error(err.stack);
    res.status(500).send("Something broke!");
  })
  .use("/", express.static("static"))
  .use(sapper.middleware())
  .listen(port, () => console.log(`Listening`));
