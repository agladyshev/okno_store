import dotenv from 'dotenv'
import express from 'express'
import { getCollections, getProducts, checkAvailability, addOrder, getPayment, getDelivery, getPromo } from './middleware.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000;

// const cors = require("cors");

// const whitelist = [
//   "http://winxdow.ru",
//   "http://okno.com.ru",
//   "http://okno.store",
//   "http://okno.herokuapp.com",
//   "https://winxdow.ru",
//   "https://okno.com.ru",
//   "https://okno.store",
//   "https://okno.herokuapp.com",
//   "http://localhost:5000"
// ];

// const corsOptions = {
//   origin: function(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   }
// };


// app.use(cors(corsOptions));


// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "https://okno.herokuapp.com/");
//   res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
//  next();
// });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, X-Requested-With");
  next();
});


app.use("/", express.static("public"));

app.get("/getCollections", getCollections, function (req, res, next) {
  res.send(res.collections);
});

app.get("/getProducts", getProducts, function (req, res, next) {
  res.send(res.products);
});

app.get("/getDelivery", getDelivery, function (req, res, next) {
  res.send(res.delivery);
});

app.get("/getPayment", getPayment, function (req, res, next) {
  res.send(res.payment);
});

app.get("/getPromo", getPromo, function (req, res, next) {
  res.send(res.promo);
});

app.post("/addOrder", express.json(), checkAvailability, addOrder, function (
  req,
  res,
  next
) {
  res.send(res.order);
});

app.listen(port, () => console.log(`Listening`));
