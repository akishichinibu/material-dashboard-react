const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://192.168.1.231:2222/',
      changeOrigin: true,
      logLevel: "debug",
      onProxyReq: (req, res, proxyOptions) => {
        req.setHeader("X-Forwarded-Host", `http://localhost:9999/`);
      },
    })
  );
};
