const express = require("express");
const {createProxyMiddleware} = require('http-proxy-middleware');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

const PORT = 3000
const HOST = "localhost"
const { API_KEY_VALUE } = process.env;
if (!API_KEY_VALUE) {
    console.error("Missing OPENWEATHER_API_KEY in .env file");
    process.exit(1);
  }
const { API_BASE_URL} = process.env;
const API_SERVICE_URL = `${API_BASE_URL}?lat=19.0760&lon=72.8777&appid=${API_KEY_VALUE}`

app.use(morgan("dev"));

app.use('/weather', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/weather`]: '',
    },
}));

app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});