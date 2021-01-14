import express from "express";
import indexRoute from "./routes/indexRoute";
import getId from "./routes/Utility/getId";
import getGame from "./routes/Utility/getGame";

const app = express();

app.set("view engine", "ejs");
app.set("vews", "views");

app.use(indexRoute);
app.use(getId);
app.use(getGame);

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
