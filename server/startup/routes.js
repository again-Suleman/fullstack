const express = require("express");


// Routes
const supplierRoutes = require("../routes/supplierRoutes")

module.exports = function (app) {
  //---------------------------------
  app.use(express.json());

  app.use('/api/supplier', supplierRoutes);


  //----------------------------------
};
