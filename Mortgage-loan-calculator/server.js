var express = require('express');
var compression = require('compression');
const { createProxyMiddleware } = require('http-proxy-middleware');
var API_HOST = process.env.API_HOST || 'localhost:8080';
var PORT = process.env.PORT || 8080

var buildPath = 'Mortgage-loan-calculator/dist/mortgage-loan-calculator'

// Initialize
var app = express();

// Serve static resources from 'build' folder
app.use(express.static(buildPath));

// Enable gzip response compression
app.use(compression());

// Enable proxy to api
app.use('/api', createProxyMiddleware({
    target: API_HOST,
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    }
}));

// Otherwise serve index.html
app.get('*', function (req, res) {
    res.sendFile(__dirname + buildPath + "/index.html");
});

app.listen(PORT);
