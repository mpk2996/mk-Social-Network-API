const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/social-network-api', { useNewUrlParser: true });

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});