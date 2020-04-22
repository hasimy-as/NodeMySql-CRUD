"use strict";

const express = require('express');
const route = express.Router();

const db = require('../database/db');

// untuk test connect server (HOME)
route.get('/', (req, res) => {
  res.json({ 
    status: 200, 
    response: "OK", 
    message: "connected to server" 
  });
});

// GET semua user
route.get('/user', (req, res) => {
  db.query('SELECT * from user', (err, rows, fields) => {
    if (err) throw err;
    res.json({
      status: 200, 
      response: "OK",
      message: "semua user diambil",
      data: rows 
    });
  });
});

// GET user per ID
route.get('/user/:id_user', (req, res) => {
  var id_user = req.params.id_user;
  
  db.query('SELECT * FROM user WHERE id_user = ?', [id_user], (err, rows, fields) => {
    if (err) throw err;
    res.json({
      status: 200,
      response: "OK",
      message: "user per id",
      data: rows
    })
  });
});

// POST / memasukkan data
route.post('/user', (req, res) => {
  let dataInput = {
  id_user : req.body.id_user,
  nama : req.body.nama,
  umur : req.body.umur,
  hobi : req.body.hobi
}

  db.query('INSERT INTO user SET ?', dataInput, (err, rows, fields) => {
    if (err) throw err;
    res.json({
      status: 200,
      response: "OK",
      message: "data masuk register",
      result: rows
    });
  });
});

// PUT / update data
route.put('/user', (req, res) => {
  let id_user = req.body.id_user;
  let updateData = {
  nama : req.body.nama,
  umur : req.body.umur,
  hobi : req.body.hobi
}

  db.query('UPDATE user SET ? WHERE id_user = ?', [updateData, id_user], (err, rows, fields) => {
    if (err) throw err;
    res.json({
      status: 200,
      response: "OK",
      message: "data telah terupdate",
      result: rows
    });
  });
});

// DELETE / hapus data
route.delete('/user', (req, res) => {
  let id_user = req.body.id_user;

  db.query('DELETE FROM user WHERE id_user = ?', [id_user], (err, rows, fields) => {
    if (err) throw err;
    res.json({
      status: 200,
      response: "OK",
      message: "data telah dihapus",
      result: rows
    });
  });
});

module.exports = route;