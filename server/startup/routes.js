const express = require("express");
const cors = require("cors")


// Routes
const supplierRoutes = require("../routes/supplierRoutes")
const storeRoutes = require("../routes/storeRoutes")

module.exports = function (app) {
  //---------------------------------
  app.use(express.json());
  app.use(cors())

  app.use('/api/supplier', supplierRoutes);
  app.use('/api/store', storeRoutes);


  //----------------------------------
};
