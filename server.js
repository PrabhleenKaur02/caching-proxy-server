const express = require("express");
const {createProxyMiddleware} = require('http-proxy-middleware');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

const PORT = 3000
const HOST = "localhost"
const { API_BASE_URL, API_KEY_VALUE } = process.env;
if (!API_KEY_VALUE || !API_BASE_URL) {
    console.error("Missing base url or key value");
    process.exit(1);
  }

app.use(morgan("dev"));

app.use('/weather', createProxyMiddleware({
    target: API_BASE_URL,
    changeOrigin: true,
    ws: true,
    onProxyReq: (proxyReq, req) => {
        const url = new URL(proxyReq.path, API_BASE_URL);
        url.searchParams.append("appId", API_KEY_VALUE);
        proxyReq.path = url.pathname + url.search;
    }
}));

app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});