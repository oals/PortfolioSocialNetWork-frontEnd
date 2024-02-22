// const express = require("express");
// const { createProxyMiddleware } = require("http-proxy-middleware");
// const app = express();

// // API 라우트 먼저 등록
// app.use(
//   "/api",
//   createProxyMiddleware({
//     target: "http://localhost:8102",
//     changeOrigin: true,
//   }),
// );

// // 그 다음에 정적 파일 라우트 등록
// app.use(express.static("public"));

// app.listen(3000, () => console.log("Server listening on port 3000"));
