require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const authCtrl = require('./controllers/authController')

const PORT = 4000;

const { SESSION_SECRET, CONNECTION_STRING } = process.env;

const app = express()

app.use(express.json());

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(db => {
  app.set('db', db);
  console.log('db connected');
});

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
  })
);


app.post('/auth/register', authCtrl.register );


app.listen(PORT, ()=>console.log(`Listening on port ${PORT}`))


