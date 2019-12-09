import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import {
  getCollections,
  getProducts,
  checkAvailability,
  addOrder,
  getPayment,
  getDelivery,
  getPromo
} from "./middleware.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/", express.static("public"));

app.get("/getCollections", getCollections, function(req, res, next) {
  res.send(res.collections);
});

app.get("/getProducts", getProducts, function(req, res, next) {
  res.send(res.products);
});

app.get("/getDelivery", getDelivery, function(req, res, next) {
  res.send(res.delivery);
});

app.get("/getPayment", getPayment, function(req, res, next) {
  res.send(res.payment);
});

app.get("/getPromo", getPromo, function(req, res, next) {
  res.send(res.promo);
});

app.post("/addOrder", express.json(), checkAvailability, addOrder, function(
  req,
  res,
  next
) {
  res.send(res.order);
});

app.listen(port, () => console.log(`Listening`));
