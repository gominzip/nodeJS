"use strict";

const fs = require("fs");
const HTTPS = require("https");
require("dotenv").config();

const app = require("../app"); // app.js 파일 연결

const port = process.env.PORT || 443;

try {
  const options = {
    cert: fs.readFileSync(
      "/etc/letsencrypt/live/gominzipsession.o-r.kr/fullchain.pem"
    ),
    key: fs.readFileSync(
      "/etc/letsencrypt/live/gominzipsession.o-r.kr/privkey.pem"
    ),
  };
  HTTPS.createServer(options, app).listen(port, () => {
    console.log(`[HTTPS] Server is running on port ${port}`);
  });
} catch (error) {
  console.log("[HTTPS] HTTPS 오류가 발생하였습니다.", error);
}
