const express = require("express");


// Routes
const supplierRoutes = require("../routes/supplierRoutes")
const storeRoutes = require("../routes/storeRoutes")

module.exports = function (app) {
  //---------------------------------
  app.use(express.json());

  app.use('/api/supplier', supplierRoutes);
  app.use('/api/store', storeRoutes);


  //----------------------------------
};
