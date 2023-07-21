const http = require('http');
const express = require('express');
const path = require('path');
const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, 'build')));

http.createServer(app).listen(port, () => {
    console.log(`Server started on port ${port}`);
});