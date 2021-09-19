const express = require('express');

const app = express();

// db connection

const db = require('./helper/db.js')();