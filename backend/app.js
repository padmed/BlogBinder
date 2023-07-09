require("dotenv").config;
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { mongoURL } = require("./utils/config");
const logger = require("./utils/logger");
const noteRouter = require("./controllers/notes");
const {
  errorHandler,
  requestLogger,
  unknownEndpoint,
} = require("./utils/middleware");

logger.info("Connecting to MongoDB");
mongoose
  .connect(mongoURL)
  .then(() => {
    logger.info("Successfully connected to MongoDB");
  })
  .catch((e) => {
    logger.error(`Cannot connect to MongoDB: ${e.message}`);
  });

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use("/api/blogs", noteRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;