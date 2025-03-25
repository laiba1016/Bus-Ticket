require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectdb = require('./database/connect');
const authRouter = require('./Routes/Auth');
const contactRoutes = require('./Routes/contactus');
const app = express();
const port = 5000;

connectdb();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use('/', authRouter);
app.use('/api', contactRoutes)

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

