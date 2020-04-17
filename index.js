import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bunyan from "bunyan";
import {
  getCollections,
  getProducts,
  checkAvailability,
  addOrder,
  getPayment,
  getDelivery,
  getPromo,
  checkDiscount,
  getContacts,
} from "./middleware.js";

dotenv.config();
const app = express();
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

app.use(cors());

app.use(function (err, req, res, next) {
  log.error(err.stack);
  res.status(500).send("Something broke!");
});

app.use("/", express.static("public"));

app.get("/getCollections", getCollections, function (req, res, next) {
  res.json(res.collections);
});

app.get("/getProducts", getProducts, function (req, res, next) {
  res.json(res.products);
});

app.get("/getDelivery", getDelivery, function (req, res, next) {
  res.json(res.delivery);
});

app.get("/getPayment", getPayment, function (req, res, next) {
  res.json(res.payment);
});

app.get("/getPromo", getPromo, function (req, res, next) {
  res.json(res.promo);
});

app.get("/getContacts", getContacts, function (req, res, next) {
  res.json(res.contacts);
});

app.post("/checkDiscount", express.json(), checkDiscount, function (
  req,
  res,
  next
) {
  res.json(res.discount);
});

app.post("/addOrder", express.json(), checkAvailability, addOrder, function (
  req,
  res,
  next
) {
  if (!res.order.status && !res.order.number) {
    log.error(res.order);
    res.status(500).json(res.order);
  } else {
    res.json(res.order);
  }
});

app.listen(port, () => console.log(`Listening`));
