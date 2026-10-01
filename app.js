const express = require("express");
const os = require("os");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    application: "CloudOps Enterprise Demo",
    version: process.env.APP_VERSION || "1.0.0",
    environment: process.env.ENVIRONMENT || "local",
    hostname: os.hostname(),
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    hostname: os.hostname()
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Application running on port ${PORT}`);
});