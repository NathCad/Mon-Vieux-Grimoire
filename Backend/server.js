const express = require("express");
const path = require('path');
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth.js");
const booksRoutes = require("./routes/books.js");
const corsHeaders = require("./middlewares/cors.js");

app.use(express.json())
app.use(corsHeaders);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/api/auth", authRoutes);
app.use("/api/books", booksRoutes);

mongoose
  .connect(process.env.DATABASE_URI)
  .then((mongoose) => {
    const port = process.env.LISTENING_PORT;
    console.log("App listening on " + port);
    return app.listen(port);
  })
  .catch((err) => console.error(err));
