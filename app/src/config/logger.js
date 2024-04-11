//  로그 관리 파일
const { createLogger, transports, format } = require("winston");
const { combine, timestamp, simple, colorize, printf, label } = format;

const printFormat = printf(({ timestamp, label, level, message }) => {
  return `${timestamp} [${label}] ${level} : ${message}`;
});

const printLogFormat = {
  file: combine(
    label({
      label: "nodeJS",
    }),
    //   colorize(),
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    printFormat
  ),
  console: combine(
    colorize(),
    simple()
  )
};

const opts = {
  file: new transports.File({
    filename: "access.log",
    dirname: "./logs",
    level: "info", // 출력해줄 단계 설정
    format: printLogFormat.file,
  }),
  console: new transports.Console({
    level: "info",
    format: printLogFormat.console,
  }),
};

const logger = createLogger({
  transports: [opts.file],
});

// 개발용 서버일때만 로그가 콘솔에 찍히도록
if (process.env.NODE_ENV !== "production") {
  logger.add(opts.console);
}

logger.stream = {
    write: (message)=> logger.info(message),
}
module.exports = logger;
