const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/db");
const animeRoutes = require("./routes/anime");
const userRoutes = require("./routes/user");
dotenv.config();
dbConnect();

app.use(cookieParser());
app.use(express.json());

app.use("/", animeRoutes);
app.use("/", userRoutes);

app.use((err, req, res, next) => {
  const { message = "Internal server error", status = 500 } = err;
  res.send(message).status(status);
  next(err);
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port 4000`);
});
