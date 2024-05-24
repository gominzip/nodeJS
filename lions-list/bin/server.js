const express = require("express");
const fs = require("fs");
const path = require("path");
const HTTPS = require("https");
require("dotenv").config();

const port = process.env.PORT || 443;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

try {
  const option = {
    ca: fs.readFileSync(
      "/etc/letsencrypt/live/gominzipsession.o-r.kr/fullchain.pem"
    ),
    key: fs
      .readFileSync(
        path.resolve(
          process.cwd(),
          "/etc/letsencrypt/live/gominzipsession.o-r.kr/privkey.pem"
        ),
        "utf8"
      )
      .toString(),
    cert: fs
      .readFileSync(
        path.resolve(
          process.cwd(),
          "/etc/letsencrypt/live/gominzipsession.o-r.kr/cert.pem"
        ),
        "utf8"
      )
      .toString(),
  };
  HTTPS.createServer(option, app).listen(port, () => {
    console.log(`[HTTPS] Server is runnig on port ${port}`);
  });
} catch (error) {
  console.log("[HTTPS] HTTPS 오류가 발생하였습니다.");
}
