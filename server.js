const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

const contactsRouter = require('./routes/api/contacts')

app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

const {DB_HOST, PORT = 3000} = process.env;

mongoose.connect(DB_HOST)
.then(() => app.listen(PORT, () => console.log('Database connection successful')))
.catch(error => {console.log(error.message); process.exit(1);})