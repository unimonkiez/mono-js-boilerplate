const path = require('path');
const express = require('express');
// eslint-disable-next-line import/no-unresolved
const app = require('./dist/app');

const staticPath = path.join(__dirname, 'dist', 'client');
const port = process.env.PORT;

const start = () => {
  app.listen(port, (err) => {
    if (err) {
      throw err;
    }
    // eslint-disable-next-line no-console
    console.log(`Listening at localhost:${port}`);
  });
};

app.use(express.static(staticPath));
app.use((req, res, next) => {
  if ((req.method === 'GET' || req.method === 'HEAD') && req.accepts('html')) {
    res.sendfile(path.join(staticPath, 'index.html'));
  } else {
    next();
  }
});

start();
app.connect();
