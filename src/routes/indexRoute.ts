import express from "express";

const style = "color: rebeccapurple;";

const indexRoute = express.Router();

indexRoute.get("/", (req, res, next) => {
  res.send(`<h1 style="${style}">YANNICK NANDURY</h1>`);
});

export default indexRoute;
